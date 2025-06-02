
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
import { AuthModal } from '@/components/AuthModal';
import { ParticlesBackground } from '@/components/ParticlesBackground';
import { Footer } from '@/components/Footer';
import { ChatBot } from '@/components/ChatBot';
import { useProducts } from '@/hooks/useProducts';

const Promotions = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { promotionalProducts } = useProducts();

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
              Promoções Estelares
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ofertas que explodem como supernovas. Energia cósmica com preços terrestres.
            </p>
          </div>

          {/* Promotional Banner */}
          <div className="bg-gradient-to-r from-vortex-purple/20 to-vortex-neon/20 border border-vortex-neon/30 rounded-2xl p-8 mb-12 text-center">
            <h2 className="text-3xl font-orbitron font-bold text-vortex-neon mb-4">
              🚀 MEGA PROMOÇÃO GALÁCTICA
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Até 40% de desconto em energéticos selecionados. Por tempo limitado!
            </p>
            <div className="flex justify-center space-x-8 text-center">
              <div>
                <div className="text-2xl font-bold text-vortex-neon">23</div>
                <div className="text-sm text-gray-400">Dias</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-vortex-neon">14</div>
                <div className="text-sm text-gray-400">Horas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-vortex-neon">37</div>
                <div className="text-sm text-gray-400">Minutos</div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {promotionalProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* No Promotions */}
          {promotionalProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-vortex-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌟</span>
              </div>
              <h3 className="text-xl font-orbitron font-bold text-white mb-2">
                Nenhuma promoção ativa
              </h3>
              <p className="text-gray-400">
                Fique ligado! Novas ofertas estelares chegam em breve.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default Promotions;
