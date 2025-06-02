
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
import { AuthModal } from '@/components/AuthModal';
import { ParticlesBackground } from '@/components/ParticlesBackground';
import { Footer } from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useProducts } from '@/hooks/useProducts';
import { Search } from 'lucide-react';

const Products = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const {
    filteredProducts,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    showPromotions,
    setShowPromotions,
    priceRange,
    setPriceRange
  } = useProducts();

  const categories = ['Energético', 'Premium'];

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
              Nossos Energéticos
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Descubra toda a linha de energéticos Vortex. Energia cósmica para sua rotina terrestre.
            </p>
          </div>

          {/* Filters Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar energéticos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-vortex-dark border-vortex-neon/30 text-white placeholder:text-gray-400"
                />
              </div>

              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="bg-vortex-dark border-vortex-neon/30 text-white">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent className="bg-vortex-dark border-vortex-neon/30 text-white">
                  <SelectItem value="">Todas</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Promotion Filter */}
              <Button
                variant={showPromotions ? "default" : "outline"}
                onClick={() => setShowPromotions(!showPromotions)}
                className={showPromotions 
                  ? "bg-vortex-neon text-vortex-dark hover:bg-vortex-neon/80" 
                  : "border-vortex-neon/30 text-white hover:bg-vortex-neon/10"
                }
              >
                Apenas Promoções
              </Button>

              {/* Price Range */}
              <div className="space-y-2">
                <label className="text-sm text-gray-300">
                  Preço: R$ {priceRange[0]} - R$ {priceRange[1]}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={15}
                  min={0}
                  step={0.5}
                  className="w-full"
                />
              </div>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              {searchTerm && (
                <Badge variant="secondary" className="bg-vortex-purple/20 text-vortex-neon">
                  Busca: {searchTerm}
                </Badge>
              )}
              {categoryFilter && (
                <Badge variant="secondary" className="bg-vortex-purple/20 text-vortex-neon">
                  {categoryFilter}
                </Badge>
              )}
              {showPromotions && (
                <Badge variant="secondary" className="bg-vortex-purple/20 text-vortex-neon">
                  Em Promoção
                </Badge>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-vortex-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-12 w-12 text-vortex-neon" />
              </div>
              <h3 className="text-xl font-orbitron font-bold text-white mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-400 mb-6">
                Tente ajustar os filtros para encontrar o que procura.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('');
                  setShowPromotions(false);
                  setPriceRange([0, 15]);
                }}
                className="bg-gradient-to-r from-vortex-purple to-vortex-neon hover:from-vortex-neon hover:to-vortex-purple"
              >
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
