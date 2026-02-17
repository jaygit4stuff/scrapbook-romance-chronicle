import { useState, useRef } from 'react';
import gsap from 'gsap';

const CONFETTI_COLORS = ['#d4365c', '#c9a44a', '#d4a0b9', '#8b5e83', '#e8d5b7'];

const SurpriseButton = () => {
  const [revealed, setRevealed] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; color: string; rotation: number; delay: number }>>([]);
  const messageRef = useRef<HTMLDivElement>(null);

  const triggerSurprise = () => {
    if (revealed) return;
    
    // Generate confetti
    const pieces = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rotation: Math.random() * 360,
      delay: Math.random() * 0.5,
    }));
    setConfetti(pieces);
    setRevealed(true);

    setTimeout(() => {
      if (messageRef.current) {
        gsap.fromTo(messageRef.current,
          { scale: 0.5, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'back.out(2)' }
        );
      }
    }, 300);

    // Clear confetti after animation
    setTimeout(() => setConfetti([]), 3000);
  };

  return (
    <section className="relative py-20 px-4 flex flex-col items-center justify-center">
      <div className="absolute inset-0 scrapbook-page" />
      
      {/* Confetti */}
      {confetti.map(piece => (
        <div
          key={piece.id}
          className="fixed z-50 pointer-events-none animate-fall"
          style={{
            left: `${piece.x}%`,
            top: '-5%',
            width: '10px',
            height: '10px',
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
          }}
        />
      ))}

      <div className="relative z-10 text-center">
        {!revealed ? (
          <button
            onClick={triggerSurprise}
            className="group relative px-10 py-5 bg-gradient-to-r from-valentine-gold to-valentine-rose rounded-2xl font-handwriting text-2xl text-primary-foreground shadow-2xl hover:shadow-valentine-gold/40 transition-all duration-300 hover:scale-110 animate-sway"
          >
            <span className="relative z-10">🎁 A Surprise For You!</span>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-valentine-rose to-valentine-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        ) : (
          <div ref={messageRef} className="max-w-lg mx-auto opacity-0">
            <div className="bg-card/80 backdrop-blur rounded-2xl p-8 md:p-10 border border-valentine-gold/30 shadow-2xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-valentine-gold/30 rounded-sm" />
              <span className="text-5xl block mb-4">💕</span>
              <h3 className="font-handwriting text-3xl text-valentine-cream mb-4">
                My Promise to You
              </h3>
              <p className="font-body text-lg text-valentine-blush/90 leading-relaxed italic">
                Zoeh, from the moment I started pursuing you at the end of November 2025, 
                I knew you were the one. Every day since, my love has only grown stronger. 
                You are my today, my tomorrow, and my forever. I promise to protect you, 
                cherish you, and love you with every fiber of my being.
              </p>
              <p className="font-handwriting text-xl text-valentine-gold mt-6">
                — Your Jay, always and forever 🌹
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-20 text-center">
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-valentine-rose/50 to-transparent mx-auto mb-6" />
        <p className="font-handwriting text-2xl text-valentine-blush/80 mb-2">
          Made with all my love 💕
        </p>
        <p className="font-casual text-sm text-muted-foreground">
          Jay & Zoeh — Since November 2025
        </p>
        <p className="font-casual text-xs text-muted-foreground/50 mt-4">
          🌹 Forever Yours 🌹
        </p>
      </div>
    </section>
  );
};

export default SurpriseButton;
