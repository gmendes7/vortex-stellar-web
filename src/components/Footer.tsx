
import { useState } from 'react';

export const Footer = () => {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const socialLinks = [
    { name: 'Instagram', icon: '📸', url: '#', color: 'from-pink-500 to-purple-500' },
    { name: 'YouTube', icon: '🎥', url: '#', color: 'from-red-500 to-red-600' },
    { name: 'Facebook', icon: '👤', url: '#', color: 'from-blue-500 to-blue-600' },
    { name: 'TikTok', icon: '🎵', url: '#', color: 'from-black to-gray-800' }
  ];

  return (
    <footer className="relative z-10 py-16 px-4 border-t border-vortex-purple/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Footer Content */}
        <div className="text-center mb-12">
          {/* Logo */}
          <h3 className="text-4xl md:text-5xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-vortex-purple to-vortex-neon mb-6">
            VORTEX
          </h3>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl text-vortex-neon font-orbitron font-bold mb-8 text-glow-neon">
            Energia que transcende galáxias.
          </p>

          {/* Contact */}
          <div className="mb-8">
            <p className="text-gray-400 mb-2">Entre em contato conosco:</p>
            <a 
              href="mailto:contato@vortex.energy" 
              className="text-vortex-neon hover:text-white transition-colors duration-300 font-mono text-lg hover:text-glow"
            >
              contato@vortex.energy
            </a>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex justify-center space-x-6 mb-12">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              className="group relative"
              onMouseEnter={() => setHoveredSocial(social.name)}
              onMouseLeave={() => setHoveredSocial(null)}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${social.color} flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-vortex-neon/50`}>
                {social.icon}
              </div>
              
              {/* Social name tooltip */}
              {hoveredSocial === social.name && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg text-sm text-white whitespace-nowrap animate-fade-in">
                  {social.name}
                </div>
              )}

              {/* Pulse effect */}
              <div className="absolute inset-0 rounded-full bg-vortex-neon opacity-0 group-hover:opacity-20 group-hover:animate-ping"></div>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-vortex-purple to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-4">
            © 2024 Vortex Energy. Todos os direitos reservados.
          </p>
          <p className="text-xs text-gray-600">
            Desenvolvido com ⚡ por Gabriel Mendes | Uma experiência cósmica
          </p>
        </div>

        {/* Floating energy orbs */}
        <div className="absolute bottom-10 left-10 w-3 h-3 bg-vortex-neon rounded-full animate-float opacity-40"></div>
        <div className="absolute bottom-20 right-20 w-4 h-4 bg-vortex-purple rounded-full animate-float opacity-30" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-vortex-neon rounded-full animate-float opacity-50" style={{animationDelay: '2s'}}></div>
      </div>
    </footer>
  );
};
