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
      for (let i = 0; i < 6; i++) {
        newTomatoes.push({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 15,
          duration: 10 + Math.random() * 10,
          size: 1 + Math.random() * 0.8,
        });
      }
      setTomatoes(newTomatoes);
    };

    generateTomatoes();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {tomatoes.map((tomato) => (
        <div
          key={tomato.id}
          className="fixed animate-tomato-fall opacity-40"
          style={{
            left: `${tomato.x}%`,
            animationDelay: `${tomato.delay}s`,
            animationDuration: `${tomato.duration}s`,
            fontSize: `${tomato.size}rem`,
          }}
        >
          <span className="inline-block">🍅</span>
        </div>
      ))}
    </div>
  );
};
