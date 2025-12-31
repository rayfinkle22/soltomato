import { useEffect, useState } from "react";

interface Seed {
  id: number;
  x: number;
  delay: number;
  duration: number;
  showPlant: boolean;
}

export const GrowingSeeds = () => {
  const [seeds, setSeeds] = useState<Seed[]>([]);

  useEffect(() => {
    const generateSeeds = () => {
      const newSeeds: Seed[] = [];
      for (let i = 0; i < 15; i++) {
        newSeeds.push({
          id: i,
          x: 5 + Math.random() * 90,
          delay: Math.random() * 10,
          duration: 8 + Math.random() * 4,
          showPlant: Math.random() > 0.3,
        });
      }
      setSeeds(newSeeds);
    };

    generateSeeds();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dirt ground at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-garden-dirt to-transparent" />
      
      {seeds.map((seed) => (
        <div
          key={seed.id}
          className="absolute"
          style={{
            left: `${seed.x}%`,
            top: 0,
            animationDelay: `${seed.delay}s`,
          }}
        >
          {/* Falling seed */}
          <div
            className="animate-seed-fall text-2xl"
            style={{
              animationDelay: `${seed.delay}s`,
              animationDuration: `${seed.duration}s`,
            }}
          >
            🌰
          </div>
          
          {/* Growing plant */}
          {seed.showPlant && (
            <div
              className="absolute bottom-0"
              style={{
                left: 0,
                bottom: '-100vh',
                marginBottom: '60px',
              }}
            >
              <div
                className="flex flex-col items-center animate-plant-grow"
                style={{
                  animationDelay: `${seed.delay + seed.duration * 0.35}s`,
                  animationDuration: `${seed.duration}s`,
                }}
              >
                {/* Tomato */}
                <div
                  className="animate-tomato-grow text-3xl mb-1"
                  style={{
                    animationDelay: `${seed.delay + seed.duration * 0.6}s`,
                    animationDuration: `${seed.duration}s`,
                  }}
                >
                  🍅
                </div>
                {/* Leaves */}
                <div className="flex gap-1 animate-leaf-sway">
                  <span className="text-xl transform -rotate-45">🌿</span>
                  <span className="text-xl transform rotate-45">🌿</span>
                </div>
                {/* Stem */}
                <div className="w-1 h-8 bg-garden-stem rounded-full" />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
