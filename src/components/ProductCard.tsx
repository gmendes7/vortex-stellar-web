
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/hooks/useProducts';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasPromotion = product.promocao !== undefined;
  const finalPrice = hasPromotion ? product.promocao! : product.preco;
  const discountPercent = hasPromotion ? Math.round(((product.preco - product.promocao!) / product.preco) * 100) : 0;

  return (
    <div
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 group hover:bg-white/10 transition-all duration-300 card-hover relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Promotion Badge */}
      {hasPromotion && (
        <Badge className="absolute top-3 right-3 z-10 bg-vortex-neon text-vortex-dark font-bold">
          -{discountPercent}%
        </Badge>
      )}

      {/* Out of Stock Overlay */}
      {!product.emEstoque && (
        <div className="absolute inset-0 bg-black/50 z-20 flex items-center justify-center rounded-2xl">
          <span className="text-white font-bold text-lg">Fora de Estoque</span>
        </div>
      )}

      {/* Product Image */}
      <div className="relative mb-4 rounded-xl overflow-hidden">
        <img
          src={product.imagem}
          alt={product.nome}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-vortex-purple/50 to-transparent"></div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-orbitron font-bold text-white group-hover:text-vortex-neon transition-colors duration-300">
            {product.nome}
          </h3>
          <p className="text-sm text-vortex-neon font-medium">{product.sabor}</p>
        </div>

        <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
          {product.descricao}
        </p>

        {/* Pricing */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {hasPromotion && (
              <span className="text-gray-400 line-through text-sm">
                R$ {product.preco.toFixed(2)}
              </span>
            )}
            <span className="text-vortex-neon font-bold text-lg">
              R$ {finalPrice.toFixed(2)}
            </span>
          </div>
          
          <Button
            disabled={!product.emEstoque}
            className="bg-gradient-to-r from-vortex-purple to-vortex-neon hover:from-vortex-neon hover:to-vortex-purple text-white font-bold px-4 py-2 rounded-full text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {product.emEstoque ? 'Comprar' : 'Indisponível'}
          </Button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-br from-vortex-neon/10 to-transparent pointer-events-none rounded-2xl"></div>
      )}
    </div>
  );
};
