
import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { ProductsSection } from "@/components/ProductsSection";
import { AboutSection } from "@/components/AboutSection";
import { InteractiveSection } from "@/components/InteractiveSection";
import { Footer } from "@/components/Footer";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { MobileMenu } from "@/components/MobileMenu";
import { AuthModal } from "@/components/AuthModal";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-vortex-dark text-white relative overflow-x-hidden">
      <ParticlesBackground />
      
      {/* Desktop Auth Button */}
      <Button
        onClick={() => setIsAuthModalOpen(true)}
        className="hidden sm:block fixed top-4 right-4 z-50 bg-gradient-to-r from-vortex-purple to-vortex-neon hover:from-vortex-neon hover:to-vortex-purple text-white font-bold py-2 px-4 rounded-full"
      >
        Entrar / Cadastrar
      </Button>

      {/* Mobile Menu */}
      <MobileMenu onAuthClick={() => setIsAuthModalOpen(true)} />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      <HeroSection />
      <div id="products">
        <ProductsSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="interactive">
        <InteractiveSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
