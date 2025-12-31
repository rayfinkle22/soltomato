import { useEffect, useState } from "react";

const CHARS = "01アイウエオカキクケコサシスセソタチツテト🍅🌱💧☀️🤖";

interface MatrixDrop {
  id: number;
  x: number;
  chars: string[];
  speed: number;
  delay: number;
}

export const FooterAnimation = () => {
  const [drops, setDrops] = useState<MatrixDrop[]>([]);

  useEffect(() => {
    const generateDrops = () => {
      const newDrops: MatrixDrop[] = [];
      const numDrops = 30;
      
      for (let i = 0; i < numDrops; i++) {
        const chars = Array.from({ length: Math.floor(Math.random() * 8) + 4 }, () =>
          CHARS[Math.floor(Math.random() * CHARS.length)]
        );
        
        newDrops.push({
          id: i,
          x: Math.random() * 100,
          chars,
          speed: Math.random() * 3 + 2,
          delay: Math.random() * 5,
        });
      }
      setDrops(newDrops);
    };

    generateDrops();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
      
      {/* Matrix drops */}
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute top-0 flex flex-col items-center animate-matrix-fall"
          style={{
            left: `${drop.x}%`,
            animationDuration: `${drop.speed}s`,
            animationDelay: `${drop.delay}s`,
          }}
        >
          {drop.chars.map((char, idx) => (
            <span
              key={idx}
              className="text-xs font-mono"
              style={{
                color: idx === 0 
                  ? 'hsl(145, 100%, 70%)' 
                  : idx < 3 
                    ? 'hsl(145, 100%, 50%)' 
                    : 'hsl(145, 80%, 30%)',
                textShadow: idx === 0 
                  ? '0 0 10px hsl(145, 100%, 50%)' 
                  : 'none',
                opacity: 1 - (idx * 0.1),
              }}
            >
              {char}
            </span>
          ))}
        </div>
      ))}

      {/* Horizontal scan lines */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              animation: `scan-line ${3 + i * 0.5}s linear infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Data pulse bars */}
      <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-around gap-1 px-4 opacity-30">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="w-1 bg-primary rounded-t animate-data-pulse"
            style={{
              height: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.05}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};