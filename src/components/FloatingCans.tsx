
import { useEffect, useState } from 'react';

interface FloatingCan {
  id: number;
  left: string;
  top: string;
  delay: number;
  size: string;
  rotation: number;
}

export const FloatingCans = () => {
  const [cans, setCans] = useState<FloatingCan[]>([]);

  useEffect(() => {
    // Gerar posições aleatórias para os energéticos flutuantes
    const generateCans = () => {
      const newCans: FloatingCan[] = [];
      for (let i = 0; i < 6; i++) {
        newCans.push({
          id: i,
          left: `${Math.random() * 90}%`,
          top: `${Math.random() * 80 + 10}%`,
          delay: Math.random() * 5,
          size: Math.random() > 0.5 ? 'w-8 h-12' : 'w-6 h-9',
          rotation: Math.random() * 30 - 15
        });
      }
      setCans(newCans);
    };

    generateCans();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {cans.map((can) => (
        <div
          key={can.id}
          className={`absolute ${can.size} opacity-10 hover:opacity-20 transition-opacity duration-500`}
          style={{
            left: can.left,
            top: can.top,
            transform: `rotate(${can.rotation}deg)`,
            animation: `float 6s ease-in-out infinite`,
            animationDelay: `${can.delay}s`
          }}
        >
          <div className="w-full h-full bg-gradient-to-b from-vortex-neon to-vortex-purple rounded-full opacity-60 blur-sm"></div>
        </div>
      ))}
      
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(${cans[0]?.rotation || 0}deg);
          }
          50% {
            transform: translateY(-20px) rotate(${(cans[0]?.rotation || 0) + 5}deg);
          }
        }
      `}</style>
    </div>
  );
};
