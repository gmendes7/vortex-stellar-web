
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, getCartItemsCount, isFreteGratis } = useCart();

  const total = getCartTotal();
  const itemsCount = getCartItemsCount();
  const frete = isFreteGratis() ? 0 : 8.90;
  const totalComFrete = total + frete;

  return (
    <>
      {/* Cart Button */}
      <div className="relative">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-vortex-purple to-vortex-neon hover:from-vortex-neon hover:to-vortex-purple text-white relative"
        >
          <ShoppingCart className="h-4 w-4" />
          {itemsCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
              {itemsCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Cart Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* Cart Panel */}
          <div className="relative ml-auto w-full max-w-md bg-vortex-dark border-l border-vortex-neon/30 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-vortex-neon/30">
              <h2 className="text-xl font-orbitron font-bold text-white">
                Carrinho ({itemsCount})
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">Carrinho vazio</p>
                  <p className="text-gray-500 text-sm">Adicione produtos para começar</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.product.id} className="bg-white/5 rounded-xl p-3 space-y-3">
                    <div className="flex gap-3">
                      <img 
                        src={item.product.imagem} 
                        alt={item.product.nome}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-medium text-sm line-clamp-1">
                          {item.product.nome}
                        </h3>
                        <p className="text-vortex-neon text-xs">{item.product.sabor}</p>
                        <p className="text-vortex-neon font-bold text-sm">
                          R$ {(item.product.promocao || item.product.preco).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 bg-vortex-dark border-vortex-neon/30"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-white font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 bg-vortex-dark border-vortex-neon/30"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.estoque}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer with Totals */}
            {cartItems.length > 0 && (
              <div className="border-t border-vortex-neon/30 p-4 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal:</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Frete:</span>
                    <span className={isFreteGratis() ? 'text-green-400' : ''}>
                      {isFreteGratis() ? 'GRÁTIS' : `R$ ${frete.toFixed(2)}`}
                    </span>
                  </div>
                  {!isFreteGratis() && (
                    <p className="text-xs text-vortex-neon">
                      Frete grátis em compras acima de R$ 50,00
                    </p>
                  )}
                  <div className="border-t border-vortex-neon/30 pt-2 flex justify-between text-white font-bold text-lg">
                    <span>Total:</span>
                    <span>R$ {totalComFrete.toFixed(2)}</span>
                  </div>
                </div>
                
                <Link to="/checkout" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-vortex-purple to-vortex-neon hover:from-vortex-neon hover:to-vortex-purple text-white font-bold">
                    Finalizar Compra
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
