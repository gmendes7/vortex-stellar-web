
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';

interface MobileMenuProps {
  onAuthClick: () => void;
}

export const MobileMenu = ({ onAuthClick }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="fixed top-4 right-4 z-50 bg-vortex-dark/80 backdrop-blur-sm border border-vortex-neon/30 hover:bg-vortex-neon/10 sm:hidden"
        >
          <Menu className="h-6 w-6 text-vortex-neon" />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-[280px] bg-vortex-dark/95 backdrop-blur-md border-l border-vortex-neon/30 text-white"
      >
        <div className="flex flex-col space-y-6 mt-8">
          <Button
            variant="ghost"
            onClick={() => scrollToSection('products')}
            className="justify-start text-left hover:text-vortex-neon hover:bg-vortex-neon/10"
          >
            Energéticos
          </Button>
          <Button
            variant="ghost"
            onClick={() => scrollToSection('about')}
            className="justify-start text-left hover:text-vortex-neon hover:bg-vortex-neon/10"
          >
            Sobre Nós
          </Button>
          <Button
            variant="ghost"
            onClick={() => scrollToSection('interactive')}
            className="justify-start text-left hover:text-vortex-neon hover:bg-vortex-neon/10"
          >
            Experiência
          </Button>
          <div className="border-t border-vortex-neon/30 pt-4">
            <Button
              onClick={() => {
                onAuthClick();
                setIsOpen(false);
              }}
              className="w-full bg-gradient-to-r from-vortex-purple to-vortex-neon hover:from-vortex-neon hover:to-vortex-purple text-white font-bold"
            >
              Entrar / Cadastrar
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
