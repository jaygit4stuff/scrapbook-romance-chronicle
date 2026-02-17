import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PLACEHOLDER_PHOTOS = [
  { id: 1, rotation: -3, caption: 'That smile ✨' },
  { id: 2, rotation: 2, caption: 'My favorite view 💕' },
  { id: 3, rotation: -1, caption: 'Always glowing 🌟' },
  { id: 4, rotation: 4, caption: 'Heart eyes forever 😍' },
  { id: 5, rotation: -2, caption: 'Pure magic ♥' },
  { id: 6, rotation: 1, caption: 'Can\'t look away 💘' },
];

const PhotoGallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.polaroid-card');
    if (cards) {
      gsap.fromTo(cards, 
        { y: 80, opacity: 0, rotation: (i) => (i % 2 === 0 ? -15 : 15) },
        { 
          y: 0, opacity: 1, rotation: (i) => PLACEHOLDER_PHOTOS[i]?.rotation || 0,
          duration: 0.8, stagger: 0.15, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-20 px-4">
      <div className="absolute inset-0 scrapbook-page" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Title with tape decoration */}
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-6 bg-valentine-gold/30 rotate-2 rounded-sm" />
            <h2 className="font-serif-display text-4xl md:text-5xl text-valentine-cream">
              Moments of Zoeh
            </h2>
          </div>
          <p className="font-casual text-lg text-valentine-blush/70 mt-4">📸 My favorite memories</p>
        </div>

        {/* Polaroid grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {PLACEHOLDER_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              className="polaroid-card group cursor-pointer"
              style={{ '--rotation': `${photo.rotation}deg` } as React.CSSProperties}
              onClick={() => setSelectedPhoto(photo.id)}
            >
              <div className="polaroid relative transition-all duration-500 hover:scale-105 hover:rotate-0 hover:shadow-2xl hover:shadow-valentine-rose/20">
                {/* Photo corners */}
                <div className="relative">
                  <div className="photo-corner photo-corner-tl" />
                  <div className="photo-corner photo-corner-tr" />
                  <div className="photo-corner photo-corner-bl" />
                  <div className="photo-corner photo-corner-br" />
                  
                  {/* Placeholder image */}
                  <div className="aspect-square bg-gradient-to-br from-valentine-blush/30 to-valentine-lavender/20 rounded-sm flex items-center justify-center overflow-hidden">
                    <div className="text-center">
                      <span className="text-5xl">📷</span>
                      <p className="font-casual text-sm text-valentine-burgundy mt-2">Photo of Zoeh</p>
                      <p className="font-casual text-xs text-valentine-burgundy/60">Replace with real photo</p>
                    </div>
                  </div>

                  {/* Hover heart burst */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="text-4xl animate-heartbeat">💕</span>
                  </div>
                </div>

                {/* Caption */}
                <p className="font-handwriting text-base text-center mt-2" style={{ color: 'hsl(20 20% 25%)' }}>
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative stickers */}
        <div className="absolute -bottom-4 left-8 text-4xl rotate-12 hidden md:block">🌹</div>
        <div className="absolute top-32 -right-2 text-3xl -rotate-6 hidden md:block">💝</div>
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-background/90 flex items-center justify-center p-8" onClick={() => setSelectedPhoto(null)}>
          <div className="polaroid max-w-lg w-full animate-scale-in" style={{ '--rotation': '0deg' } as React.CSSProperties} onClick={e => e.stopPropagation()}>
            <div className="aspect-square bg-gradient-to-br from-valentine-blush/30 to-valentine-lavender/20 rounded-sm flex items-center justify-center">
              <div className="text-center">
                <span className="text-8xl">📷</span>
                <p className="font-casual text-lg text-valentine-burgundy mt-4">Photo of Zoeh #{selectedPhoto}</p>
                <p className="font-casual text-sm text-valentine-burgundy/60">Replace with real photo</p>
              </div>
            </div>
            <p className="font-handwriting text-xl text-center mt-3" style={{ color: 'hsl(20 20% 25%)' }}>
              {PLACEHOLDER_PHOTOS.find(p => p.id === selectedPhoto)?.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;
