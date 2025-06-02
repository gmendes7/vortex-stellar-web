
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { AuthModal } from '@/components/AuthModal';
import { ParticlesBackground } from '@/components/ParticlesBackground';
import { Footer } from '@/components/Footer';

const About = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const teamMembers = [
    {
      name: "Gabriel Mendes",
      role: "Dev Programador e criador do site",
      username: "@schjneiderr",
      color: "from-vortex-neon to-green-400"
    },
    {
      name: "Allan",
      role: "Co-fundador",
      color: "from-vortex-purple to-purple-400"
    },
    {
      name: "Maria Oliveira",
      role: "Diretora de criação",
      color: "from-pink-500 to-rose-400"
    }
  ];

  return (
    <div className="min-h-screen bg-vortex-dark text-white relative overflow-x-hidden">
      <ParticlesBackground />
      
      <Navbar onAuthClick={() => setIsAuthModalOpen(true)} />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      {/* Main Content */}
      <main className="pt-24 pb-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-vortex-purple to-vortex-neon mb-6">
              Sobre Nós
            </h1>
          </div>

          {/* Mission Statement */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed mb-8">
              Somos uma marca <span className="text-vortex-neon font-semibold">disruptiva</span>, 
              criada para despertar a energia que existe no cosmos e dentro de cada um de nós.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Nossa missão é ser <span className="text-vortex-purple font-semibold">energética e intensa</span> como o espaço infinito, 
              conectando pessoas através de experiências que transcendem os limites terrestres.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center group hover:bg-white/10 transition-all duration-300 card-hover"
              >
                {/* Avatar */}
                <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-20 h-20 rounded-full bg-vortex-dark flex items-center justify-center">
                    <span className="text-2xl font-orbitron font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-xl font-orbitron font-bold text-white mb-2 group-hover:text-glow transition-all duration-300">
                  {member.name}
                </h3>

                {/* Username */}
                {member.username && (
                  <p className="text-vortex-neon text-sm font-mono mb-3">
                    {member.username}
                  </p>
                )}

                {/* Role */}
                <p className="text-gray-300 leading-relaxed">
                  {member.role}
                </p>
              </div>
            ))}
          </div>

          {/* Company Values */}
          <div className="bg-gradient-to-r from-vortex-purple/20 to-vortex-neon/20 border border-vortex-neon/30 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-orbitron font-bold text-vortex-neon mb-6">
              Nossa Filosofia
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Acreditamos que a energia verdadeira vem do cosmos infinito. Cada gole de Vortex 
              é uma conexão com as forças que movem estrelas e planetas. Não somos apenas uma 
              marca de energéticos – somos uma ponte entre a energia cósmica e a vida terrestre.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
