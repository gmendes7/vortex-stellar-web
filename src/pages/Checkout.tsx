
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { AuthModal } from '@/components/AuthModal';
import { ParticlesBackground } from '@/components/ParticlesBackground';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
  });
  const { cartItems, getCartTotal, clearCart, isFreteGratis } = useCart();
  const { toast } = useToast();

  const total = getCartTotal();
  const frete = isFreteGratis() ? 0 : 8.90;
  const totalComFrete = total + frete;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    const requiredFields = ['nome', 'email', 'telefone', 'cep', 'endereco', 'numero', 'bairro', 'cidade', 'estado'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Simular finalização do pedido
    toast({
      title: "Pedido realizado com sucesso! 🚀",
      description: `Seu pedido de R$ ${totalComFrete.toFixed(2)} foi confirmado. Você receberá um email com os detalhes.`,
      duration: 5000,
    });

    // Limpar carrinho
    clearCart();
    
    // Simular redirecionamento
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-vortex-dark text-white relative overflow-x-hidden">
        <ParticlesBackground />
        <Navbar onAuthClick={() => setIsAuthModalOpen(true)} />
        
        <main className="pt-24 pb-16 relative z-10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-orbitron font-bold text-white mb-4">
              Carrinho Vazio
            </h1>
            <p className="text-gray-300 mb-8">
              Adicione produtos ao carrinho para finalizar sua compra.
            </p>
            <Link to="/produtos">
              <Button className="bg-gradient-to-r from-vortex-purple to-vortex-neon hover:from-vortex-neon hover:to-vortex-purple">
                Ver Produtos
              </Button>
            </Link>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-vortex-dark text-white relative overflow-x-hidden">
      <ParticlesBackground />
      
      <Navbar onAuthClick={() => setIsAuthModalOpen(true)} />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      <main className="pt-24 pb-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/produtos">
              <Button variant="ghost" size="icon" className="text-vortex-neon hover:bg-vortex-neon/10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl sm:text-4xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-vortex-purple to-vortex-neon">
              Finalizar Compra
            </h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Formulário */}
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Dados Pessoais */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-orbitron font-bold text-white mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-vortex-neon" />
                    Dados Pessoais
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      name="nome"
                      placeholder="Nome completo *"
                      value={formData.nome}
                      onChange={handleInputChange}
                      className="bg-vortex-dark border-vortex-neon/30 text-white"
                      required
                    />
                    <Input
                      name="email"
                      type="email"
                      placeholder="E-mail *"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-vortex-dark border-vortex-neon/30 text-white"
                      required
                    />
                    <Input
                      name="telefone"
                      placeholder="Telefone *"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      className="bg-vortex-dark border-vortex-neon/30 text-white sm:col-span-2"
                      required
                    />
                  </div>
                </div>

                {/* Endereço */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-orbitron font-bold text-white mb-4 flex items-center gap-2">
                    <Truck className="h-5 w-5 text-vortex-neon" />
                    Endereço de Entrega
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      name="cep"
                      placeholder="CEP *"
                      value={formData.cep}
                      onChange={handleInputChange}
                      className="bg-vortex-dark border-vortex-neon/30 text-white"
                      required
                    />
                    <Input
                      name="endereco"
                      placeholder="Endereço *"
                      value={formData.endereco}
                      onChange={handleInputChange}
                      className="bg-vortex-dark border-vortex-neon/30 text-white"
                      required
                    />
                    <Input
                      name="numero"
                      placeholder="Número *"
                      value={formData.numero}
                      onChange={handleInputChange}
                      className="bg-vortex-dark border-vortex-neon/30 text-white"
                      required
                    />
                    <Input
                      name="complemento"
                      placeholder="Complemento"
                      value={formData.complemento}
                      onChange={handleInputChange}
                      className="bg-vortex-dark border-vortex-neon/30 text-white"
                    />
                    <Input
                      name="bairro"
                      placeholder="Bairro *"
                      value={formData.bairro}
                      onChange={handleInputChange}
                      className="bg-vortex-dark border-vortex-neon/30 text-white"
                      required
                    />
                    <Input
                      name="cidade"
                      placeholder="Cidade *"
                      value={formData.cidade}
                      onChange={handleInputChange}
                      className="bg-vortex-dark border-vortex-neon/30 text-white"
                      required
                    />
                    <Input
                      name="estado"
                      placeholder="Estado *"
                      value={formData.estado}
                      onChange={handleInputChange}
                      className="bg-vortex-dark border-vortex-neon/30 text-white sm:col-span-2"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-vortex-purple to-vortex-neon hover:from-vortex-neon hover:to-vortex-purple text-white font-bold py-4 text-lg"
                >
                  Finalizar Pedido - R$ {totalComFrete.toFixed(2)}
                </Button>
              </form>
            </div>

            {/* Resumo do Pedido */}
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-orbitron font-bold text-white mb-4">
                  Resumo do Pedido
                </h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <img 
                        src={item.product.imagem} 
                        alt={item.product.nome}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-medium text-sm">
                          {item.product.nome}
                        </h3>
                        <p className="text-vortex-neon text-xs">{item.product.sabor}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-gray-400 text-xs">Qtd: {item.quantity}</span>
                          <span className="text-vortex-neon font-bold text-sm">
                            R$ {((item.product.promocao || item.product.preco) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-vortex-neon/30 pt-4 space-y-2">
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
                  <div className="border-t border-vortex-neon/30 pt-2 flex justify-between text-white font-bold text-lg">
                    <span>Total:</span>
                    <span>R$ {totalComFrete.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Segurança */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-green-400" />
                  <h3 className="text-white font-medium">Compra Segura</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Seus dados estão protegidos e a transação é processada de forma segura.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
