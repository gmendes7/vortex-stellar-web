
interface TeamMember {
  name: string;
  role: string;
  username?: string;
  color: string;
}

const teamMembers: TeamMember[] = [
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

export const AboutSection = () => {
  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-vortex-purple to-vortex-neon mb-6">
            Sobre Nós
          </h2>
        </div>

        {/* Mission Statement */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
            Somos uma marca <span className="text-vortex-neon font-semibold">disruptiva</span>, 
            criada para despertar a energia que existe no cosmos e dentro de cada um de nós.
          </p>
          <p className="text-lg text-gray-400 leading-relaxed">
            Nossa missão é ser <span className="text-vortex-purple font-semibold">energética e intensa</span> como o espaço infinito, 
            conectando pessoas através de experiências que transcendem os limites terrestres.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-3 gap-8">
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

              {/* Decorative element */}
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-vortex-neon to-transparent mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
