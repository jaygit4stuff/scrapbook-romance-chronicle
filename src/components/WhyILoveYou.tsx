import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  { emoji: '✨', text: 'Your playful energy that lights up every room', detail: 'The way you dance through life makes mine worth living.' },
  { emoji: '💫', text: 'The courage it took for you to confess', detail: 'That moment changed everything. You made our love real.' },
  { emoji: '🔥', text: 'How you make me want to be a better man', detail: 'Your love pushes me to protect, to provide, to cherish.' },
  { emoji: '🌹', text: 'Your laugh — it\'s my favorite sound', detail: 'I\'d move mountains just to hear it one more time.' },
  { emoji: '💎', text: 'The way you trust me completely', detail: 'Your faith in me gives me strength I never knew I had.' },
  { emoji: '🦋', text: 'Your ability to be unapologetically yourself', detail: 'In a world that tries to dim you, you shine even brighter.' },
  { emoji: '❤️‍🔥', text: 'How you turn every moment into magic', detail: 'Even the ordinary becomes extraordinary with you.' },
  { emoji: '👑', text: 'You are my king, my treasure, my everything', detail: 'From the end of November 2025 until forever, you\'re mine.' },
];

const WhyILoveYou = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.reason-card');
    if (cards) {
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { x: i % 2 === 0 ? -60 : 60, opacity: 0, rotation: i % 2 === 0 ? -5 : 5 },
          {
            x: 0, opacity: 1, rotation: 0, duration: 0.7, ease: 'back.out(1.3)',
            scrollTrigger: { trigger: card, start: 'top 85%' },
          }
        );
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-20 px-4">
      <div className="absolute inset-0 scrapbook-page" />
      
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="ribbon mx-auto mb-6">
            <span className="font-casual text-sm text-primary-foreground tracking-widest uppercase">From the Heart</span>
          </div>
          <h2 className="font-serif-display text-4xl md:text-5xl text-valentine-cream">
            Why I Love You, Zoeh
          </h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-valentine-gold to-transparent mx-auto mt-4" />
        </div>

        <div className="space-y-6">
          {REASONS.map((reason, i) => (
            <div
              key={i}
              className="reason-card group relative bg-card/60 backdrop-blur rounded-xl p-6 md:p-8 border border-valentine-rose/15 hover:border-valentine-rose/40 transition-all duration-500 hover:shadow-lg hover:shadow-valentine-rose/10 cursor-default"
            >
              {/* Tape decoration - alternating sides */}
              <div className={`absolute -top-2 ${i % 2 === 0 ? 'left-8' : 'right-8'} w-10 h-5 bg-valentine-gold/25 ${i % 2 === 0 ? 'rotate-6' : '-rotate-6'} rounded-sm`} />
              
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0 group-hover:animate-heartbeat">{reason.emoji}</span>
                <div>
                  <h3 className="font-handwriting text-xl md:text-2xl text-valentine-cream group-hover:text-valentine-blush transition-colors">
                    {reason.text}
                  </h3>
                  <p className="font-body text-base text-muted-foreground mt-2 italic opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {reason.detail}
                  </p>
                </div>
              </div>

              {/* Decorative ribbon on left */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-valentine-rose/50 to-transparent rounded-r" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyILoveYou;
