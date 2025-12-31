import { useEffect, useState } from "react";

interface Tomato {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

export const GrowingSeeds = () => {
  const [tomatoes, setTomatoes] = useState<Tomato[]>([]);

  useEffect(() => {
    const generateTomatoes = () => {
      const newTomatoes: Tomato[] = [];
      for (let i = 0; i < 20; i++) {
        newTomatoes.push({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 15,
          duration: 8 + Math.random() * 8,
          size: 1.5 + Math.random() * 1.5,
        });
      }
      setTomatoes(newTomatoes);
    };

    generateTomatoes();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      
      {tomatoes.map((tomato) => (
        <div
          key={tomato.id}
          className="absolute animate-tomato-fall"
          style={{
            left: `${tomato.x}%`,
            top: 0,
            animationDelay: `${tomato.delay}s`,
            animationDuration: `${tomato.duration}s`,
            fontSize: `${tomato.size}rem`,
          }}
        >
          <span className="animate-pulse-glow-red inline-block">🍅</span>
        </div>
      ))}
    </div>
  );
};
