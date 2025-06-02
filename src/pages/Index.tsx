
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
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-vortex-purple to-vortex-neon animate-pulse mb-2 sm:mb-4 leading-tight">
              VORTEX
            </h1>
            <div className="w-16 sm:w-24 md:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-vortex-purple to-vortex-neon mx-auto animate-pulse"></div>
          </div>

          {/* Main tagline */}
          <div className="space-y-3 sm:space-y-4">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-light text-gray-300 font-inter px-4">
              Energia que colapsa estrelas, move sua rotina.
            </p>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-vortex-neon mb-8 sm:mb-12 px-4">
              Bem-vindo à VORTEX.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md mx-auto">
            <Link to="/produtos" className="w-full sm:w-auto">
              <Button className="bg-gradient-to-r from-vortex-purple to-vortex-neon hover:from-vortex-neon hover:to-vortex-purple text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-sm sm:text-base lg:text-lg transition-all duration-200 hover:scale-105 w-full">
                Ver Produtos
              </Button>
            </Link>
            <Link to="/promocoes" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="border-vortex-neon text-vortex-neon hover:bg-vortex-neon hover:text-vortex-dark font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-sm sm:text-base lg:text-lg transition-all duration-200 hover:scale-105 w-full"
              >
                Promoções
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-vortex-purple to-vortex-neon mb-4">
              Ofertas Estelares
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Descubra nossos energéticos em promoção. Explosões de sabor com preços que derrubam meteoros.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {promotionalProducts.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/produtos">
              <Button className="bg-gradient-to-r from-vortex-purple to-vortex-neon hover:from-vortex-neon hover:to-vortex-purple text-white font-bold py-3 px-6 sm:px-8 rounded-full text-sm sm:text-base lg:text-lg transition-all duration-200 hover:scale-105">
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
