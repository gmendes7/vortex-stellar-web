
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
import { AuthModal } from '@/components/AuthModal';
import { ParticlesBackground } from '@/components/ParticlesBackground';
import { Footer } from '@/components/Footer';
import { ChatBot } from '@/components/ChatBot';
import { useProducts } from '@/hooks/useProducts';

const Kits = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { products } = useProducts();

  // Filtrar apenas produtos da categoria "Kit"
  const kits = products.filter(product => product.categoria === 'Kit');

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-vortex-purple to-vortex-neon mb-4">
              Kits Promocionais
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Combos especiais com descontos exclusivos. Economize mais comprando kits completos.
            </p>
          </div>

          {/* Banner Promocional */}
          <div className="bg-gradient-to-r from-vortex-purple/20 to-vortex-neon/20 border border-vortex-neon/30 rounded-2xl p-8 mb-12 text-center">
            <h2 className="text-3xl font-orbitron font-bold text-vortex-neon mb-4">
              🎁 KITS COM ATÉ 30% DE DESCONTO
            </h2>
            <p className="text-lg text-gray-300 mb-4">
              Combos pensados para diferentes perfis: iniciantes, atletas e entusiastas.
            </p>
            <p className="text-sm text-vortex-neon">
              Todos os kits incluem frete grátis e brindes especiais!
            </p>
          </div>

          {/* Kits Grid */}
          {kits.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {kits.map((kit) => (
                <ProductCard key={kit.id} product={kit} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-vortex-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📦</span>
              </div>
              <h3 className="text-xl font-orbitron font-bold text-white mb-2">
                Kits em breve
              </h3>
              <p className="text-gray-400">
                Estamos preparando kits especiais para você. Fique ligado!
              </p>
            </div>
          )}

          {/* Vantagens dos Kits */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-vortex-neon/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-orbitron font-bold text-white mb-2">
                Economia Garantida
              </h3>
              <p className="text-gray-400">
                Descontos de até 30% comparado à compra individual dos produtos.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-vortex-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-orbitron font-bold text-white mb-2">
                Frete Grátis
              </h3>
              <p className="text-gray-400">
                Todos os kits têm frete grátis para qualquer lugar do Brasil.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-vortex-neon/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="text-xl font-orbitron font-bold text-white mb-2">
                Brindes Exclusivos
              </h3>
              <p className="text-gray-400">
                Coqueteleiras, adesivos e materiais educativos inclusos.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default Kits;
