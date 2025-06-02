
import { HeroSection } from "@/components/HeroSection";
import { ProductsSection } from "@/components/ProductsSection";
import { AboutSection } from "@/components/AboutSection";
import { InteractiveSection } from "@/components/InteractiveSection";
import { Footer } from "@/components/Footer";
import { ParticlesBackground } from "@/components/ParticlesBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-vortex-dark text-white relative overflow-x-hidden">
      <ParticlesBackground />
      <HeroSection />
      <ProductsSection />
      <AboutSection />
      <InteractiveSection />
      <Footer />
    </div>
  );
};

export default Index;
