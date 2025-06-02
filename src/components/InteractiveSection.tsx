
import { useState, useRef, useEffect } from 'react';

export const InteractiveSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 relative z-10 overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-vortex-purple to-vortex-neon mb-6">
            Experiência Espacial
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Mova o mouse para pilotar através do cosmos e descobrir a energia do universo
          </p>
        </div>

        {/* Interactive Area */}
        <div className="relative h-96 bg-gradient-to-br from-vortex-dark via-purple-900/30 to-vortex-dark rounded-3xl border border-vortex-purple/30 overflow-hidden group cursor-none">
          
          {/* Mouse follower - Spaceship */}
          <div 
            className="absolute w-8 h-8 bg-vortex-neon rounded-full transition-all duration-100 ease-out pointer-events-none z-20"
            style={{
              left: mousePosition.x - 16,
              top: mousePosition.y - 16,
              transform: isHovering ? 'scale(1.5)' : 'scale(0)',
              boxShadow: '0 0 20px #00FFAA, 0 0 40px #00FFAA'
            }}
          >
            <div className="absolute inset-2 bg-white rounded-full animate-pulse"></div>
          </div>

          {/* Floating cosmic elements */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-4 h-4 bg-gradient-to-r ${
                i % 3 === 0 ? 'from-vortex-neon to-green-400' : 
                i % 3 === 1 ? 'from-vortex-purple to-purple-400' : 
                'from-blue-400 to-cyan-400'
              } rounded-full animate-float opacity-60`}
              style={{
                left: `${20 + (i * 7) % 60}%`,
                top: `${15 + (i * 11) % 70}%`,
                animationDelay: `${i * 0.5}s`,
                transform: isHovering ? `translate(${(mousePosition.x - 400) * 0.1}px, ${(mousePosition.y - 200) * 0.1}px)` : 'none',
                transition: 'transform 0.3s ease-out'
              }}
            ></div>
          ))}

          {/* Energy waves */}
          {isHovering && (
            <div
              className="absolute w-32 h-32 border-2 border-vortex-neon rounded-full animate-ping opacity-30"
              style={{
                left: mousePosition.x - 64,
                top: mousePosition.y - 64
              }}
            ></div>
          )}

          {/* Instructions */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`text-center transition-opacity duration-500 ${isHovering ? 'opacity-0' : 'opacity-100'}`}>
              <div className="text-6xl mb-4">🚀</div>
              <p className="text-vortex-neon font-orbitron font-bold text-xl mb-2">
                Pilote sua Nave
              </p>
              <p className="text-gray-400">
                Mova o mouse para explorar o cosmos
              </p>
            </div>
          </div>

          {/* Energy meter */}
          {isHovering && (
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 min-w-[150px]">
              <p className="text-vortex-neon text-sm font-orbitron font-bold mb-2">ENERGIA</p>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-vortex-purple to-vortex-neon transition-all duration-300"
                  style={{ 
                    width: `${Math.min(100, (mousePosition.x / 400) * 100)}%` 
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Fun facts */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { number: "∞", label: "Energia Infinita", unit: "" },
            { number: "299", label: "Velocidade da Luz", unit: "km/h" },
            { number: "42", label: "Resposta do Universo", unit: "" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-orbitron font-bold text-vortex-neon mb-2">
                {stat.number}<span className="text-lg">{stat.unit}</span>
              </div>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
