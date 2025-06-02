
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! 👋 Sou a IA da Vortex Energy! Como posso te ajudar hoje? Posso falar sobre nossos produtos, criadores ou qualquer dúvida sobre o site!',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { products } = useProducts();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Perguntas sobre criadores
    if (message.includes('criador') || message.includes('programador') || message.includes('gabriel') || message.includes('quem criou')) {
      return '👨‍💻 O site foi criado por Gabriel Mendes (@schjneiderr), que é o programador principal responsável por todo o desenvolvimento! A equipe também conta com Allan (co-fundador) e Maria Oliveira (diretora de criação). É um projeto escolar do SenacHub! 🚀';
    }

    // Perguntas sobre produtos
    if (message.includes('produto') || message.includes('energético') || message.includes('preço') || message.includes('vortex nova') || message.includes('vortex pulse')) {
      const availableProducts = products.filter(p => p.emEstoque);
      const promoProducts = products.filter(p => p.promocao);
      
      return `🥤 Temos ${products.length} energéticos incríveis! ${availableProducts.length} estão em estoque e ${promoProducts.length} em promoção! Alguns destaques:\n\n• Vortex Nova - R$ 8,99 (promoção R$ 6,49) ✨\n• Vortex Pulse - R$ 9,49 (promoção R$ 7,99) 🌊\n• Vortex Blackhole - R$ 10,99 (Premium) 🌌\n\nQuer saber sobre algum específico? 😊`;
    }

    // Perguntas sobre promoções
    if (message.includes('promoção') || message.includes('desconto') || message.includes('oferta')) {
      const promoProducts = products.filter(p => p.promocao);
      if (promoProducts.length > 0) {
        return `🔥 Temos ${promoProducts.length} produtos em promoção agora! Confira na página de Promoções ou navegue pelos produtos para ver os descontos. Algumas ofertas têm até 40% de desconto! 💰`;
      }
      return '😅 No momento não temos promoções ativas, mas fique ligado! Novas ofertas estelares chegam em breve! ⭐';
    }

    // Perguntas sobre o propósito/missão
    if (message.includes('propósito') || message.includes('missão') || message.includes('vortex energy') || message.includes('marca')) {
      return '🌌 A Vortex Energy foi criada para despertar a energia que existe no cosmos e dentro de cada um de nós! Nossa missão é ser energética e intensa como o espaço infinito, conectando pessoas através de experiências que transcendem os limites terrestres. Energia que colapsa estrelas, move sua rotina! ⚡';
    }

    // Ajuda com navegação
    if (message.includes('navegar') || message.includes('site') || message.includes('como usar') || message.includes('ajuda')) {
      return '🧭 É super fácil navegar no site!\n\n• 🏠 Home - página inicial com destaques\n• 🥤 Produtos - catálogo completo com filtros\n• 🔥 Promoções - ofertas especiais\n• 👥 Sobre Nós - conheça a equipe\n• 🚀 Foguete - experiência interativa\n\nPrecisa de ajuda com algo específico?';
    }

    // Perguntas sobre estoque
    if (message.includes('estoque') || message.includes('disponível') || message.includes('tem em estoque')) {
      const inStock = products.filter(p => p.emEstoque).length;
      const outOfStock = products.filter(p => !p.emEstoque).length;
      return `📦 Temos ${inStock} produtos em estoque e ${outOfStock} temporariamente indisponíveis. Você pode ver a disponibilidade na página de Produtos - os indisponíveis ficam marcados! 📋`;
    }

    // Cumprimentos
    if (message.includes('oi') || message.includes('olá') || message.includes('hey') || message.includes('eai')) {
      return '👋 Olá! Seja bem-vindo à Vortex Energy! Como posso te ajudar hoje? Posso falar sobre nossos energéticos, criadores ou qualquer coisa sobre o site! 😊';
    }

    // Agradecimentos
    if (message.includes('obrigad') || message.includes('valeu') || message.includes('thanks')) {
      return '😊 Por nada! Fico feliz em ajudar! Se tiver mais dúvidas sobre nossos energéticos cósmicos ou qualquer coisa do site, é só chamar! 🚀✨';
    }

    // Resposta padrão
    return '🤖 Hmm, não tenho certeza sobre isso! Mas posso te ajudar com:\n\n• 👥 Informações sobre os criadores\n• 🥤 Detalhes dos energéticos\n• 🔥 Promoções ativas\n• 🧭 Navegação no site\n• 🌌 Propósito da Vortex Energy\n\nO que você gostaria de saber? 😊';
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simular delay de digitação
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-vortex-purple to-vortex-neon hover:from-vortex-neon hover:to-vortex-purple shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-80 sm:w-96 h-96 bg-vortex-dark border border-vortex-neon/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-vortex-purple to-vortex-neon p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-white" />
              <span className="font-orbitron font-bold text-white">Vortex AI</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-vortex-neon text-vortex-dark'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === 'bot' && (
                        <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      )}
                      {message.sender === 'user' && (
                        <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="text-sm whitespace-pre-line">
                        {message.text}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-white p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-vortex-neon rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-vortex-neon rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-vortex-neon rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-vortex-neon text-vortex-dark hover:bg-vortex-neon/80 px-3"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
