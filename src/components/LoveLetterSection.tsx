import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LETTER_TEXT = `My Dearest Zoeh,

From the moment I first saw you at the end of November 2025, something shifted inside me. You had this spark — this playful, irresistible energy that pulled me in like gravity. I knew right then that I had to pursue you, to let you know what you meant to me.

Day after day, I found myself thinking about your laugh, your eyes, the way you light up every room. I was patient, I was persistent, because you were worth every moment of the wait.

And then came the day you confessed your feelings too. That moment? It was everything. All the courage I'd built up, all the pursuit — it all came together in the most beautiful way. Our love became mutual, real, undeniable.

Zoeh, you are the reason my heart beats with purpose. From courtship to confession, from that first spark to this eternal flame — I love you with everything I am.

Forever yours,
Jay 💕`;

const LoveLetterSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current.children, { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }
  }, []);

  const openEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);

    const tl = gsap.timeline();
    
    if (flapRef.current) {
      tl.to(flapRef.current, { rotateX: 180, duration: 0.8, ease: 'power2.inOut' });
    }
    if (letterRef.current) {
      tl.fromTo(letterRef.current, 
        { y: 0, opacity: 0 }, 
        { y: -280, opacity: 1, duration: 1, ease: 'power2.out' }, '-=0.3'
      );
    }
    
    tl.call(() => {
      setIsTyping(true);
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < LETTER_TEXT.length) {
          setDisplayedText(LETTER_TEXT.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, 25);
    });
  };

  return (
    <section id="love-letter" ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4">
      <div className="absolute inset-0 scrapbook-page" />
      
      {/* Section title */}
      <div className="relative z-10 mb-12 text-center">
        <span className="font-casual text-lg text-valentine-gold">💌</span>
        <h2 className="font-serif-display text-4xl md:text-5xl text-valentine-cream mt-2">
          A Letter For You
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-valentine-rose to-transparent mx-auto mt-4" />
      </div>

      {/* Envelope */}
      <div className="relative z-10 cursor-pointer" onClick={openEnvelope}>
        <div ref={envelopeRef} className="relative w-80 md:w-96 h-56 md:h-64">
          {/* Envelope body */}
          <div className="absolute inset-0 bg-gradient-to-b from-valentine-paper to-valentine-cream rounded-lg shadow-xl border border-valentine-gold/30 overflow-hidden">
            {/* Envelope inner flap pattern */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,hsl(var(--valentine-rose)/0.03)_10px,hsl(var(--valentine-rose)/0.03)_20px)]" />
            
            {/* Center seal */}
            {!isOpen && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-valentine-deep-red flex items-center justify-center shadow-lg animate-pulse-glow">
                  <span className="font-handwriting text-xl text-valentine-cream">J♥Z</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Envelope flap */}
          <div 
            ref={flapRef}
            className="absolute top-0 left-0 right-0 h-1/2 origin-top"
            style={{ transformStyle: 'preserve-3d', perspective: '800px' }}
          >
            <div className="w-full h-full bg-gradient-to-b from-valentine-cream to-valentine-paper"
              style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
            />
          </div>

          {/* Letter that slides out */}
          <div
            ref={letterRef}
            className="absolute left-4 right-4 top-8 opacity-0 pointer-events-none"
          >
            <div className="bg-valentine-cream rounded-lg p-6 md:p-8 shadow-2xl border border-valentine-gold/20 max-h-[60vh] overflow-y-auto pointer-events-auto">
              <div className="absolute top-2 left-2 photo-corner photo-corner-tl" />
              <div className="absolute top-2 right-2 photo-corner photo-corner-tr" />
              
              <p className="font-handwriting text-base md:text-lg leading-relaxed whitespace-pre-line" style={{ color: 'hsl(20 20% 20%)' }}>
                {displayedText}
                {isTyping && <span className="animate-pulse text-valentine-rose">|</span>}
              </p>
            </div>
          </div>
        </div>

        {!isOpen && (
          <p className="text-center mt-6 font-casual text-valentine-blush animate-pulse-glow">
            ✨ Tap to open your letter ✨
          </p>
        )}
      </div>

      {/* Decorative doodles */}
      <div className="absolute bottom-10 left-10 font-casual text-4xl text-valentine-rose/10 rotate-12 hidden md:block">♥</div>
      <div className="absolute top-20 right-10 font-casual text-3xl text-valentine-gold/10 -rotate-12 hidden md:block">✿</div>
      <div className="absolute bottom-20 right-20 font-casual text-2xl text-valentine-lavender/10 rotate-6 hidden md:block">★</div>
    </section>
  );
};

export default LoveLetterSection;
