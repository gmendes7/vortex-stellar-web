
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-4xl mx-auto w-full">
        {/* Logo/Brand */}
        <div 
          className={`mb-6 sm:mb-8 transform transition-all duration-2000 ${
            isVisible ? 'animate-supernova' : 'scale-0 opacity-0'
          }`}
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-vortex-purple to-vortex-neon animate-glow mb-2 sm:mb-4 leading-tight">
            VORTEX
          </h1>
          <div className="w-24 sm:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-vortex-purple to-vortex-neon mx-auto animate-pulse-neon"></div>
        </div>

        {/* Main tagline */}
        <div 
          className={`transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-300 mb-3 sm:mb-4 font-inter px-4">
            Sinta o colapso estelar da energia.
          </p>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-vortex-neon text-glow-neon mb-8 sm:mb-12 px-4">
            Bem-vindo à VORTEX.
          </p>
        </div>

        {/* CTA Button */}
        <div 
          className={`transform transition-all duration-1000 delay-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <Button 
            onClick={scrollToProducts}
            className="bg-gradient-to-r from-vortex-purple to-vortex-neon hover:from-vortex-neon hover:to-vortex-purple text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-all duration-300 hover:scale-105 animate-pulse-neon w-full sm:w-auto max-w-xs sm:max-w-none"
          >
            Explorar Energéticos
          </Button>
        </div>

        {/* Floating energy elements - Hidden on mobile for performance */}
        <div className="hidden sm:block absolute top-1/4 left-1/4 w-3 sm:w-4 h-3 sm:h-4 bg-vortex-neon rounded-full animate-float opacity-70"></div>
        <div className="hidden sm:block absolute top-1/3 right-1/4 w-4 sm:w-6 h-4 sm:h-6 bg-vortex-purple rounded-full animate-float opacity-50" style={{animationDelay: '1s'}}></div>
        <div className="hidden md:block absolute bottom-1/4 left-1/3 w-2 sm:w-3 h-2 sm:h-3 bg-vortex-neon rounded-full animate-float opacity-60" style={{animationDelay: '2s'}}></div>
      </div>
    </section>
  );
};
