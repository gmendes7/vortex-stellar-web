
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  flavor: string;
  description: string;
  color: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Vortex Nova",
    flavor: "Explosão Cósmica",
    description: "Sabor intenso de frutas vermelhas com toque ácido que desperta seus sentidos",
    color: "from-red-500 to-orange-500"
  },
  {
    id: 2,
    name: "Vortex Pulse",
    flavor: "Energia Quântica",
    description: "Mistura tropical com guaraná que acelera sua performance",
    color: "from-vortex-purple to-blue-500"
  },
  {
    id: 3,
    name: "Vortex Blackhole",
    flavor: "Matéria Escura",
    description: "Sabor misterioso de açaí com toque de menta que absorve o cansaço",
    color: "from-gray-800 to-vortex-dark"
  }
];

export const ProductsSection = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="products" className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-vortex-purple to-vortex-neon mb-4">
            Nossos Energéticos
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Cada sabor é uma jornada através do cosmos, criado para despertar a energia que existe dentro de você.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className={`relative bg-gradient-to-br ${product.color} p-8 rounded-2xl card-hover cursor-pointer group overflow-hidden`}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-vortex-neon/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Product Icon/Symbol */}
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-8 h-8 bg-vortex-neon rounded-full animate-pulse"></div>
                </div>

                {/* Product Name */}
                <h3 className="text-2xl font-orbitron font-bold text-white mb-2 group-hover:text-glow-neon transition-all duration-300">
                  {product.name}
                </h3>

                {/* Flavor */}
                <p className="text-vortex-neon font-semibold mb-4 text-lg">
                  {product.flavor}
                </p>

                {/* Description */}
                <p className="text-gray-200 leading-relaxed">
                  {product.description}
                </p>

                {/* Hover effect - energy burst */}
                {hoveredId === product.id && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-vortex-neon/20 rounded-full animate-ping pointer-events-none"></div>
                )}
              </div>

              {/* Animated border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-vortex-neon transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
