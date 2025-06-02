
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { AuthModal } from "@/components/AuthModal";
import { ProductCard } from "@/components/ProductCard";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";

const Index = () => {
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

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative z-10 px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center max-w-4xl mx-auto w-full">
          {/* Logo/Brand */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-vortex-purple to-vortex-neon animate-glow mb-2 sm:mb-4 leading-tight">
              VORTEX
            </h1>
            <div className="w-24 sm:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-vortex-purple to-vortex-neon mx-auto animate-pulse-neon"></div>
          </div>

          {/* Main tagline */}
          <div>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-300 mb-3 sm:mb-4 font-inter px-4">
              Energia que colapsa estrelas, move sua rotina.
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-vortex-neon text-glow-neon mb-8 sm:mb-12 px-4">
              Bem-vindo à VORTEX.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Link to="/produtos" className="w-full sm:w-auto">
              <Button className="bg-gradient-to-r from-vortex-purple to-vortex-neon hover:from-vortex-neon hover:to-vortex-purple text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-all duration-300 hover:scale-105 animate-pulse-neon w-full">
                Ver Produtos
              </Button>
            </Link>
            <Link to="/promocoes" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="border-vortex-neon text-vortex-neon hover:bg-vortex-neon hover:text-vortex-dark font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-all duration-300 hover:scale-105 w-full"
              >
                Promoções
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-vortex-purple to-vortex-neon mb-4">
              Ofertas Estelares
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Descubra nossos energéticos em promoção. Explosões de sabor com preços que derrubam meteoros.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {promotionalProducts.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/produtos">
              <Button className="bg-gradient-to-r from-vortex-purple to-vortex-neon hover:from-vortex-neon hover:to-vortex-purple text-white font-bold py-3 px-8 rounded-full text-lg">
                Ver Todos os Produtos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
