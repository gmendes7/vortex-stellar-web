
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Cart } from '@/components/Cart';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onAuthClick: () => void;
}

export const Navbar = ({ onAuthClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Produtos', path: '/produtos' },
    { name: 'Promoções', path: '/promocoes' },
    { name: 'Kits', path: '/kits' },
    { name: 'Sobre Nós', path: '/sobre' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-vortex-dark/95 backdrop-blur-md border-b border-vortex-neon/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-vortex-purple to-vortex-neon rounded-full flex items-center justify-center">
              <span className="text-sm font-orbitron font-black text-white">V</span>
            </div>
            <span className="text-xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-vortex-purple to-vortex-neon">
              VORTEX
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-vortex-neon ${
                  isActive(item.path) ? 'text-vortex-neon' : 'text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Cart />
            <Button
              onClick={onAuthClick}
              className="bg-gradient-to-r from-vortex-purple to-vortex-neon hover:from-vortex-neon hover:to-vortex-purple text-white font-bold py-2 px-4 rounded-full"
            >
              Entrar / Cadastrar
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="md:hidden bg-vortex-dark/80 backdrop-blur-sm border border-vortex-neon/30 hover:bg-vortex-neon/10"
              >
                <Menu className="h-6 w-6 text-vortex-neon" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-[280px] bg-vortex-dark/95 backdrop-blur-md border-l border-vortex-neon/30 text-white"
            >
              <div className="flex flex-col space-y-6 mt-8">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-left hover:text-vortex-neon hover:bg-vortex-neon/10 p-2 rounded transition-colors ${
                      isActive(item.path) ? 'text-vortex-neon bg-vortex-neon/10' : 'text-gray-300'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="border-t border-vortex-neon/30 pt-4 space-y-4">
                  <div className="flex justify-center">
                    <Cart />
                  </div>
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
        </div>
      </div>
    </nav>
  );
};
