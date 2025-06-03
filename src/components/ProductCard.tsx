
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LazyImage } from '@/components/LazyImage';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Info } from 'lucide-react';
import type { Product } from '@/hooks/useProducts';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const hasPromotion = product.promocao !== undefined;
  const finalPrice = hasPromotion ? product.promocao! : product.preco;
  const discountPercent = hasPromotion ? Math.round(((product.preco - product.promocao!) / product.preco) * 100) : 0;
  const isLowStock = product.estoque <= 5 && product.estoque > 0;

  const handleAddToCart = () => {
    if (!product.emEstoque) return;
    
    addToCart(product);
    toast({
      title: "Produto adicionado!",
      description: `${product.nome} foi adicionado ao carrinho.`,
      duration: 2000,
    });
  };

  return (
    <div
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3 sm:p-4 group hover:bg-white/10 transition-all duration-200 hover:transform hover:scale-[1.02] relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges Container */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
        {hasPromotion && (
          <Badge className="bg-vortex-neon text-vortex-dark font-bold text-xs">
            -{discountPercent}%
          </Badge>
        )}
        {product.etiqueta && (
          <Badge className={`text-xs font-bold ${
            product.etiqueta === 'Novo' ? 'bg-green-500 text-white' :
            product.etiqueta === 'Oferta' ? 'bg-red-500 text-white' :
            product.etiqueta === '+Vendidos' ? 'bg-yellow-500 text-black' :
            'bg-purple-500 text-white'
          }`}>
            {product.etiqueta}
          </Badge>
        )}
      </div>

      {/* Low Stock Warning */}
      {isLowStock && (
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-orange-500 text-white font-bold text-xs">
            Restam {product.estoque}
          </Badge>
        </div>
      )}

      {/* Out of Stock Overlay */}
      {!product.emEstoque && (
        <div className="absolute inset-0 bg-black/50 z-20 flex items-center justify-center rounded-2xl">
          <span className="text-white font-bold text-sm sm:text-lg">Fora de Estoque</span>
        </div>
      )}

      {/* Product Image */}
      <div className="relative mb-3 sm:mb-4 rounded-xl overflow-hidden h-32 sm:h-48">
        <LazyImage
          src={product.imagem}
          alt={product.nome}
          className="w-full h-full"
        />
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-vortex-purple/30 to-transparent transition-opacity duration-200"></div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2 sm:space-y-3">
        <div>
          <h3 className="text-sm sm:text-lg font-orbitron font-bold text-white group-hover:text-vortex-neon transition-colors duration-200 line-clamp-1">
            {product.nome}
          </h3>
          <p className="text-xs sm:text-sm text-vortex-neon font-medium">{product.sabor}</p>
        </div>

        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-2">
          {product.descricao}
        </p>

        {/* Ingredients Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowIngredients(!showIngredients)}
          className="text-xs text-gray-400 hover:text-vortex-neon p-0 h-auto"
        >
          <Info className="h-3 w-3 mr-1" />
          {showIngredients ? 'Ocultar' : 'Ver'} ingredientes
        </Button>

        {/* Ingredients List */}
        {showIngredients && (
          <div className="text-xs text-gray-400 border-t border-white/10 pt-2">
            <p className="font-medium text-gray-300 mb-1">Ingredientes:</p>
            <p>{product.ingredientes.join(', ')}</p>
          </div>
        )}

        {/* Pricing */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
            {hasPromotion && (
              <span className="text-gray-400 line-through text-xs sm:text-sm">
                R$ {product.preco.toFixed(2)}
              </span>
            )}
            <span className="text-vortex-neon font-bold text-sm sm:text-lg">
              R$ {finalPrice.toFixed(2)}
            </span>
          </div>
          
          <Button
            disabled={!product.emEstoque}
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-vortex-purple to-vortex-neon hover:from-vortex-neon hover:to-vortex-purple text-white font-bold px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 flex items-center gap-1"
          >
            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
            {product.emEstoque ? 'Adicionar' : 'Indisponível'}
          </Button>
        </div>
      </div>

      {/* Subtle Hover Glow Effect */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-br from-vortex-neon/5 to-transparent pointer-events-none rounded-2xl transition-opacity duration-200"></div>
      )}
    </div>
  );
};
