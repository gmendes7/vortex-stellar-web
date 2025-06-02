
import { useState, useMemo } from 'react';

export interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  promocao?: number;
  imagem: string;
  sabor: string;
  categoria: string;
  emEstoque: boolean;
}

const mockProducts: Product[] = [
  {
    id: 1,
    nome: "Vortex Nova",
    descricao: "Sabor maçã cósmica com cafeína interestelar",
    preco: 8.99,
    promocao: 6.49,
    imagem: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=400&fit=crop",
    sabor: "Maçã Cósmica",
    categoria: "Energético",
    emEstoque: true
  },
  {
    id: 2,
    nome: "Vortex Pulse",
    descricao: "Mistura tropical com guaraná que acelera sua performance",
    preco: 9.49,
    promocao: 7.99,
    imagem: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=400&fit=crop",
    sabor: "Tropical",
    categoria: "Energético",
    emEstoque: true
  },
  {
    id: 3,
    nome: "Vortex Blackhole",
    descricao: "Sabor misterioso de açaí com toque de menta",
    preco: 10.99,
    imagem: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=400&fit=crop",
    sabor: "Açaí Menta",
    categoria: "Premium",
    emEstoque: true
  },
  {
    id: 4,
    nome: "Vortex Supernova",
    descricao: "Explosão de frutas vermelhas com energia extrema",
    preco: 11.99,
    promocao: 9.99,
    imagem: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=400&fit=crop",
    sabor: "Frutas Vermelhas",
    categoria: "Premium",
    emEstoque: true
  },
  {
    id: 5,
    nome: "Vortex Galaxy",
    descricao: "Sabor limão galáctico com vitaminas espaciais",
    preco: 7.99,
    imagem: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=400&fit=crop",
    sabor: "Limão",
    categoria: "Energético",
    emEstoque: false
  },
  {
    id: 6,
    nome: "Vortex Comet",
    descricao: "Sabor uva cósmica que desperta todos os sentidos",
    preco: 8.49,
    promocao: 6.99,
    imagem: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=400&fit=crop",
    sabor: "Uva",
    categoria: "Energético",
    emEstoque: true
  }
];

export const useProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showPromotions, setShowPromotions] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 15]);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesSearch = product.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.sabor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || product.categoria === categoryFilter;
      const matchesPromotion = !showPromotions || product.promocao !== undefined;
      const matchesPrice = product.preco >= priceRange[0] && product.preco <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPromotion && matchesPrice;
    });
  }, [searchTerm, categoryFilter, showPromotions, priceRange]);

  const promotionalProducts = useMemo(() => {
    return mockProducts.filter(product => product.promocao !== undefined);
  }, []);

  return {
    products: mockProducts,
    filteredProducts,
    promotionalProducts,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    showPromotions,
    setShowPromotions,
    priceRange,
    setPriceRange
  };
};
