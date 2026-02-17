import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SPICY_PHOTOS = [
  { id: 1, caption: 'For your eyes only 🔥' },
  { id: 2, caption: 'All yours, baby 💋' },
  { id: 3, caption: 'Just for you 😏' },
  { id: 4, caption: 'Thinking of you 💭' },
  { id: 5, caption: 'Miss you tonight ♥' },
  { id: 6, caption: 'Come closer 🌹' },
];

const SpicyGallery = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [error, setError] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const chainRefs = useRef<(HTMLDivElement | null)[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heartRef.current) {
      gsap.fromTo(heartRef.current, { scale: 0.8, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }
  }, []);

  const handleUnlock = () => {
    if (password.toLowerCase() === 'loveunlocks') {
      setError('');
      setShowPrompt(false);
      
      const tl = gsap.timeline();
      
      // Chains break
      chainRefs.current.forEach((chain, i) => {
        if (chain) {
          tl.to(chain, {
            x: i % 2 === 0 ? -200 : 200,
            rotation: i % 2 === 0 ? -45 : 45,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.out',
          }, i * 0.1);
        }
      });

      // Heart pulses and glows
      if (heartRef.current) {
        tl.to(heartRef.current, { scale: 1.3, duration: 0.3, ease: 'power2.out' })
          .to(heartRef.current, { scale: 0, opacity: 0, duration: 0.5, ease: 'power2.in' });
      }

      tl.call(() => setIsUnlocked(true));

      // Gallery reveal
      tl.call(() => {
        setTimeout(() => {
          const cards = galleryRef.current?.querySelectorAll('.spicy-card');
          if (cards) {
            gsap.fromTo(cards,
              { y: 100, opacity: 0, scale: 0.5, rotation: () => Math.random() * 20 - 10 },
              { y: 0, opacity: 1, scale: 1, rotation: 0, duration: 0.8, stagger: 0.15, ease: 'back.out(1.5)' }
            );
          }
        }, 100);
      });
    } else {
      setError('Wrong password, try again 💔');
      gsap.to('.prompt-card', { keyframes: { x: [-10, 10, -10, 10, 0] }, duration: 0.4, ease: 'power2.inOut' });
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center py-20 px-4">
      <div className="absolute inset-0 scrapbook-page" />
      
      <div className="relative z-10 max-w-5xl w-full">
        {!isUnlocked ? (
          <div className="flex flex-col items-center">
            <div className="text-center mb-8">
              <h2 className="font-serif-display text-4xl md:text-5xl text-valentine-cream">
                🔒 The Secret Page
              </h2>
              <p className="font-casual text-lg text-valentine-blush/70 mt-4">
                Only for you, Zoeh...
              </p>
            </div>

            {/* Chained heart */}
            <div ref={heartRef} className="relative cursor-pointer mb-8" onClick={() => setShowPrompt(true)}>
              {/* Chains */}
              {[0, 1, 2, 3].map(i => (
                <div
                  key={i}
                  ref={el => { chainRefs.current[i] = el; }}
                  className="absolute text-valentine-gold/60"
                  style={{
                    top: i < 2 ? '-20px' : 'auto',
                    bottom: i >= 2 ? '-20px' : 'auto',
                    left: i % 2 === 0 ? '-30px' : 'auto',
                    right: i % 2 === 1 ? '-30px' : 'auto',
                    fontSize: '24px',
                  }}
                >
                  ⛓️
                </div>
              ))}
              
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-valentine-rose to-valentine-deep-red rounded-full flex items-center justify-center shadow-2xl glow-rose animate-pulse-glow">
                <span className="text-5xl md:text-6xl">🔒</span>
              </div>
            </div>

            <p className="font-casual text-muted-foreground animate-sway">
              Click the heart to unlock...
            </p>

            {/* Password prompt */}
            {showPrompt && (
              <div className="fixed inset-0 z-50 bg-background/90 flex items-center justify-center p-4" onClick={() => setShowPrompt(false)}>
                <div className="prompt-card bg-card rounded-2xl p-8 border border-valentine-rose/30 shadow-2xl max-w-sm w-full" onClick={e => e.stopPropagation()}>
                  <h3 className="font-handwriting text-2xl text-valentine-cream text-center mb-6">
                    🔑 Enter the Password
                  </h3>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleUnlock()}
                    placeholder="Type the magic word..."
                    className="w-full bg-secondary/50 border border-valentine-rose/20 rounded-lg px-4 py-3 text-foreground font-casual text-center focus:outline-none focus:border-valentine-rose/60 transition-colors"
                    autoFocus
                  />
                  {error && <p className="text-valentine-rose font-casual text-sm text-center mt-2">{error}</p>}
                  <button
                    onClick={handleUnlock}
                    className="w-full mt-4 py-3 bg-gradient-to-r from-valentine-rose to-valentine-deep-red rounded-lg font-handwriting text-lg text-primary-foreground hover:scale-105 transition-transform"
                  >
                    Unlock 💕
                  </button>
                  <p className="font-casual text-xs text-muted-foreground text-center mt-3">
                    Hint: what does love do? 😏
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div ref={galleryRef}>
            <div className="text-center mb-12">
              <h2 className="font-serif-display text-4xl md:text-5xl text-valentine-cream">
                ✨ Just For You, Zoeh ✨
              </h2>
              <p className="font-casual text-lg text-valentine-blush/70 mt-3">
                From your Jay, with all my love 🔥
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {SPICY_PHOTOS.map(photo => (
                <div key={photo.id} className="spicy-card group">
                  <div className="relative bg-card/60 backdrop-blur rounded-xl overflow-hidden border border-valentine-rose/20 hover:border-valentine-rose/50 transition-all duration-500 hover:shadow-xl hover:shadow-valentine-rose/20 hover:scale-105">
                    <div className="aspect-[3/4] bg-gradient-to-br from-valentine-burgundy/40 to-valentine-deep-red/20 flex items-center justify-center">
                      <div className="text-center p-4">
                        <span className="text-6xl">🔥</span>
                        <p className="font-casual text-sm text-valentine-blush mt-3">Photo of Jay</p>
                        <p className="font-casual text-xs text-valentine-blush/50">Replace with real photo</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="font-handwriting text-lg text-valentine-cream text-center">{photo.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SpicyGallery;
