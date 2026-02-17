import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const COURTSHIP_START = new Date('2025-11-28T00:00:00');

const LoveCalculator = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [name1] = useState('Jay');
  const [name2] = useState('Zoeh');
  const [showResult, setShowResult] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const meterRef = useRef<HTMLDivElement>(null);
  const [daysSince, setDaysSince] = useState(0);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diff = now.getTime() - COURTSHIP_START.getTime();
      setDaysSince(Math.floor(diff / (1000 * 60 * 60 * 24)));
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current.querySelector('.calc-card'),
        { y: 60, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }
  }, []);

  const calculate = () => {
    // Fun deterministic "love percentage" based on names
    const combined = (name1 + name2).toLowerCase();
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      hash = combined.charCodeAt(i) + ((hash << 5) - hash);
    }
    // Always between 90-100 for Jay & Zoeh 😉
    const result = 90 + Math.abs(hash % 11);
    
    setShowResult(true);
    
    // Animate meter
    let current = 0;
    const targetPercentage = result;
    const interval = setInterval(() => {
      current += 1;
      setPercentage(current);
      if (current >= targetPercentage) {
        clearInterval(interval);
        // Celebration
        if (meterRef.current) {
          gsap.to(meterRef.current, { scale: 1.1, duration: 0.3, yoyo: true, repeat: 3, ease: 'power2.inOut' });
        }
      }
    }, 20);
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center py-20 px-4">
      <div className="absolute inset-0 scrapbook-page" />
      
      <div className="relative z-10 max-w-lg w-full">
        <div className="calc-card bg-card/80 backdrop-blur rounded-2xl p-8 md:p-10 border border-valentine-rose/20 shadow-2xl torn-edge-top torn-edge-bottom">
          {/* Tape decoration */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-valentine-gold/30 rounded-sm rotate-1" />
          
          <div className="text-center mb-8">
            <h2 className="font-serif-display text-3xl md:text-4xl text-valentine-cream">
              💘 Love Calculator
            </h2>
            <p className="font-casual text-valentine-blush/70 mt-2">How strong is our love?</p>
          </div>

          {/* Courting countdown */}
          <div className="bg-secondary/30 rounded-xl p-6 mb-8 border border-valentine-gold/20">
            <p className="font-casual text-valentine-gold text-center text-lg">Days of Pursuit</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="font-serif-display text-5xl font-bold text-valentine-cream">{daysSince}</span>
              <span className="font-casual text-valentine-blush/70">days</span>
            </div>
            <p className="font-casual text-sm text-muted-foreground text-center mt-2">
              Since end of November 2025 ♥
            </p>
          </div>

          {/* Names display */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="bg-secondary/40 rounded-lg px-6 py-3 border border-valentine-rose/20">
              <span className="font-handwriting text-2xl text-valentine-cream">{name1}</span>
            </div>
            <span className="text-3xl animate-heartbeat">💕</span>
            <div className="bg-secondary/40 rounded-lg px-6 py-3 border border-valentine-rose/20">
              <span className="font-handwriting text-2xl text-valentine-cream">{name2}</span>
            </div>
          </div>

          {/* Calculate button */}
          {!showResult && (
            <button
              onClick={calculate}
              className="w-full py-4 bg-gradient-to-r from-valentine-rose to-valentine-deep-red rounded-full font-handwriting text-xl text-primary-foreground shadow-lg hover:shadow-valentine-rose/40 transition-all duration-300 hover:scale-105"
            >
              Calculate Our Love ♥
            </button>
          )}

          {/* Result */}
          {showResult && (
            <div className="text-center">
              <div ref={meterRef} className="relative w-48 h-48 mx-auto mb-6">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--secondary))" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="url(#heartGradient)" strokeWidth="8"
                    strokeLinecap="round" strokeDasharray={`${percentage * 2.64} 264`}
                  />
                  <defs>
                    <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--valentine-rose))" />
                      <stop offset="100%" stopColor="hsl(var(--valentine-gold))" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-serif-display text-4xl font-bold text-valentine-cream">{percentage}%</span>
                  <span className="font-casual text-sm text-valentine-blush">mutual love</span>
                </div>
              </div>
              <p className="font-handwriting text-xl text-valentine-gold">
                {percentage >= 95 ? '🔥 Soulmates! Destined lovers!' : 
                 percentage >= 90 ? '💕 An unbreakable bond!' : '♥ Love is in the air!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LoveCalculator;
