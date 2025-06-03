
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
  ingredientes: string[];
  etiqueta?: 'Novo' | 'Oferta' | '+Vendidos' | 'Premium';
  estoque: number;
}

const mockProducts: Product[] = [
  {
    id: 1,
    nome: "Vortex Nova",
    descricao: "Sabor maçã cósmica com cafeína interestelar para máxima performance",
    preco: 8.99,
    promocao: 6.49,
    imagem: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=400&fit=crop",
    sabor: "Maçã Cósmica",
    categoria: "Energético",
    emEstoque: true,
    ingredientes: ["Cafeína", "Taurina", "Vitamina B12", "Açaí"],
    etiqueta: "Oferta",
    estoque: 15
  },
  {
    id: 2,
    nome: "Vortex Pulse",
    descricao: "Mistura tropical com guaraná que acelera sua performance mental e física",
    preco: 9.49,
    promocao: 7.99,
    imagem: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=400&fit=crop",
    sabor: "Tropical",
    categoria: "Energético",
    emEstoque: true,
    ingredientes: ["Guaraná", "Cafeína", "Ginseng", "Vitamina C"],
    etiqueta: "+Vendidos",
    estoque: 8
  },
  {
    id: 3,
    nome: "Vortex Blackhole",
    descricao: "Sabor misterioso de açaí com toque de menta para energia duradoura",
    preco: 10.99,
    imagem: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=400&fit=crop",
    sabor: "Açaí Menta",
    categoria: "Premium",
    emEstoque: true,
    ingredientes: ["Açaí", "Menta", "Cafeína Premium", "L-Carnitina"],
    etiqueta: "Premium",
    estoque: 12
  },
  {
    id: 4,
    nome: "Vortex Supernova",
    descricao: "Explosão de frutas vermelhas com energia extrema para treinos intensos",
    preco: 11.99,
    promocao: 9.99,
    imagem: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=400&fit=crop",
    sabor: "Frutas Vermelhas",
    categoria: "Premium",
    emEstoque: true,
    ingredientes: ["Mix de Frutas Vermelhas", "Creatina", "Beta-Alanina", "Cafeína"],
    etiqueta: "Novo",
    estoque: 20
  },
  {
    id: 5,
    nome: "Vortex Galaxy",
    descricao: "Sabor limão galáctico com vitaminas espaciais para foco mental",
    preco: 7.99,
    imagem: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=400&fit=crop",
    sabor: "Limão",
    categoria: "Energético",
    emEstoque: false,
    ingredientes: ["Limão", "Vitamina D", "Magnésio", "Cafeína Natural"],
    estoque: 0
  },
  {
    id: 6,
    nome: "Vortex Comet",
    descricao: "Sabor uva cósmica que desperta todos os sentidos com energia natural",
    preco: 8.49,
    promocao: 6.99,
    imagem: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=400&fit=crop",
    sabor: "Uva",
    categoria: "Energético",
    emEstoque: true,
    ingredientes: ["Uva", "Eletrólitos", "Vitamina B6", "Guaraná"],
    etiqueta: "+Vendidos",
    estoque: 5
  },
  {
    id: 7,
    nome: "Vortex Infinity Pro",
    descricao: "Cápsulas de energia concentrada para performance profissional extrema",
    preco: 24.99,
    promocao: 19.99,
    imagem: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=400&fit=crop",
    sabor: "Neutro",
    categoria: "Cápsulas",
    emEstoque: true,
    ingredientes: ["Cafeína Anidra", "L-Theanina", "Rhodiola Rosea", "Vitamina B Complex"],
    etiqueta: "Premium",
    estoque: 30
  },
  {
    id: 8,
    nome: "Vortex Thunder Powder",
    descricao: "Pó energético sabor thunder berry para misturar com água gelada",
    preco: 15.99,
    promocao: 12.99,
    imagem: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=400&fit=crop",
    sabor: "Thunder Berry",
    categoria: "Pó",
    emEstoque: true,
    ingredientes: ["Berry Mix", "Creatina Monohidratada", "BCAA", "Cafeína"],
    etiqueta: "Novo",
    estoque: 18
  },
  {
    id: 9,
    nome: "Kit Vortex Starter",
    descricao: "Kit iniciante com 3 energéticos diferentes + coqueteleira premium",
    preco: 35.99,
    promocao: 27.99,
    imagem: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=400&fit=crop",
    sabor: "Mix Variado",
    categoria: "Kit",
    emEstoque: true,
    ingredientes: ["3x Energéticos", "1x Coqueteleira", "Guia de Uso"],
    etiqueta: "Oferta",
    estoque: 10
  },
  {
    id: 10,
    nome: "Vortex Midnight",
    descricao: "Energia noturna com melatonina para foco sem afetar o sono",
    preco: 13.99,
    imagem: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=400&fit=crop",
    sabor: "Berries Escuras",
    categoria: "Premium",
    emEstoque: true,
    ingredientes: ["Melatonina", "L-Theanina", "Magnésio", "Extrato de Camomila"],
    etiqueta: "Novo",
    estoque: 7
  }
];

export const useProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showPromotions, setShowPromotions] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 40]);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesSearch = product.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.sabor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || product.categoria === categoryFilter;
      const matchesPromotion = !showPromotions || product.promocao !== undefined;
      const finalPrice = product.promocao || product.preco;
      const matchesPrice = finalPrice >= priceRange[0] && finalPrice <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPromotion && matchesPrice;
    });
  }, [searchTerm, categoryFilter, showPromotions, priceRange]);

  const promotionalProducts = useMemo(() => {
    return mockProducts.filter(product => product.promocao !== undefined);
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(mockProducts.map(product => product.categoria)));
  }, []);

  return {
    products: mockProducts,
    filteredProducts,
    promotionalProducts,
    categories,
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
