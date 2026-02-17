import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const valentine = new Date('2026-02-14T00:00:00');
      const now = new Date();
      const diff = valentine.getTime() - now.getTime();
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    if (titleRef.current) {
      tl.fromTo(titleRef.current, { y: 60, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.7)' });
    }
    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.5');
    }
    if (buttonRef.current) {
      tl.fromTo(buttonRef.current, { y: 20, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)' }, '-=0.3');
    }
  }, []);

  const scrollToContent = () => {
    const nextSection = document.getElementById('love-letter');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isValentinesDay = countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0;

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-valentine-burgundy/30 via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--valentine-rose)/0.15),_transparent_60%)]" />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border-2 border-valentine-gold/20 rounded-full animate-pulse-glow hidden md:block" />
      <div className="absolute bottom-20 right-10 w-24 h-24 border border-valentine-blush/20 rounded-full animate-float hidden md:block" />
      
      {/* Scrapbook tape decorations */}
      <div className="absolute top-0 left-1/4 w-8 h-16 bg-valentine-gold/20 rotate-12 rounded-sm" />
      <div className="absolute top-0 right-1/3 w-8 h-16 bg-valentine-blush/15 -rotate-6 rounded-sm" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Ribbon banner */}
        <div className="ribbon mb-8 mx-auto">
          <span className="font-casual text-sm md:text-base text-primary-foreground tracking-widest uppercase">
            A Love Story
          </span>
        </div>

        <h1
          ref={titleRef}
          className="font-handwriting text-6xl md:text-8xl lg:text-9xl text-valentine-cream text-glow mb-6 opacity-0"
        >
          Jay & Zoeh
        </h1>

        <p
          ref={subtitleRef}
          className="font-serif-display text-xl md:text-2xl text-valentine-blush/80 italic mb-12 opacity-0"
        >
          A courtship that began with courage, blossomed with confession, and now burns eternal.
        </p>

        {/* Countdown */}
        {!isValentinesDay && (
          <div className="mb-12">
            <p className="font-casual text-lg text-valentine-gold mb-4">Valentine's Day Countdown</p>
            <div className="flex gap-4 md:gap-6 justify-center">
              {[
                { value: countdown.days, label: 'Days' },
                { value: countdown.hours, label: 'Hours' },
                { value: countdown.minutes, label: 'Min' },
                { value: countdown.seconds, label: 'Sec' },
              ].map(item => (
                <div key={item.label} className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-secondary/50 border border-valentine-rose/30 flex items-center justify-center glow-rose">
                    <span className="font-serif-display text-2xl md:text-3xl font-bold text-valentine-cream">
                      {item.value.toString().padStart(2, '0')}
                    </span>
                  </div>
                  <span className="font-casual text-xs md:text-sm text-muted-foreground mt-2">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {isValentinesDay && (
          <div className="mb-12">
            <p className="font-handwriting text-3xl text-valentine-rose animate-heartbeat">
              💕 Happy Valentine's Day! 💕
            </p>
          </div>
        )}

        <button
          ref={buttonRef}
          onClick={scrollToContent}
          className="group relative px-8 py-4 bg-gradient-to-r from-valentine-rose to-valentine-deep-red rounded-full font-handwriting text-xl text-primary-foreground shadow-lg hover:shadow-valentine-rose/40 transition-all duration-300 hover:scale-105 opacity-0"
        >
          <span className="relative z-10">Open Our Story 💌</span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-valentine-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="font-casual text-sm text-muted-foreground">Scroll down</span>
        <div className="w-6 h-10 rounded-full border-2 border-valentine-blush/40 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-valentine-blush/60 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
