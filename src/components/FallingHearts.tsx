import { useMemo } from 'react';

const FallingHearts = () => {
  const hearts = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 12,
      size: 10 + Math.random() * 20,
      opacity: 0.1 + Math.random() * 0.3,
    })), []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map(h => (
        <div
          key={h.id}
          className="absolute animate-fall text-valentine-rose"
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
};

export default FallingHearts;
