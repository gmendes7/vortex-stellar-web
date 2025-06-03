
import { useState, useEffect } from 'react';
import type { Product } from './useProducts';

export interface CartItem {
  product: Product;
  quantity: number;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Carregar carrinho do localStorage na inicialização
  useEffect(() => {
    const savedCart = localStorage.getItem('vortex-cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('vortex-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.estoque) }
            : item
        );
      } else {
        return [...prevItems, { product, quantity: Math.min(quantity, product.estoque) }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.product.id === productId) {
          const maxQuantity = item.product.estoque;
          return { ...item, quantity: Math.min(quantity, maxQuantity) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product.promocao || item.product.preco;
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const isFreteGratis = () => {
    return getCartTotal() >= 50; // Frete grátis acima de R$ 50
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    isFreteGratis
  };
};
