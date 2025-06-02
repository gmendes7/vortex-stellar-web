
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    username: '',
    age: '',
    password: '',
    confirmPassword: ''
  });
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!loginData.email || !loginData.password) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive"
      });
      return;
    }

    // Simulação de login (aqui seria integrado com Supabase)
    toast({
      title: "Login realizado!",
      description: "Bem-vindo de volta à Vortex Energy!",
    });
    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    if (!registerData.name || !registerData.email || !registerData.username || !registerData.age || !registerData.password) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive"
      });
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive"
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerData.email)) {
      toast({
        title: "Erro",
        description: "E-mail inválido",
        variant: "destructive"
      });
      return;
    }

    if (parseInt(registerData.age) < 13) {
      toast({
        title: "Erro",
        description: "Idade mínima: 13 anos",
        variant: "destructive"
      });
      return;
    }

    // Simulação de cadastro (aqui seria integrado com Supabase)
    toast({
      title: "Cadastro realizado!",
      description: "Bem-vindo à família Vortex Energy!",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-vortex-dark border border-vortex-neon/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-orbitron text-center bg-gradient-to-r from-vortex-purple to-vortex-neon bg-clip-text text-transparent">
            Vortex Energy
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-vortex-dark border border-vortex-neon/30">
            <TabsTrigger 
              value="login" 
              className="data-[state=active]:bg-vortex-purple data-[state=active]:text-white"
            >
              Entrar
            </TabsTrigger>
            <TabsTrigger 
              value="register"
              className="data-[state=active]:bg-vortex-purple data-[state=active]:text-white"
            >
              Cadastrar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">E-mail</Label>
                <Input
                  id="login-email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="bg-vortex-dark border-vortex-neon/30 text-white placeholder:text-gray-400"
                  placeholder="seu@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Senha</Label>
                <Input
                  id="login-password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="bg-vortex-dark border-vortex-neon/30 text-white"
                  placeholder="••••••••"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-vortex-purple to-vortex-neon hover:from-vortex-neon hover:to-vortex-purple"
              >
                Entrar
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register" className="space-y-4 mt-6">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Nome</Label>
                  <Input
                    id="register-name"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    className="bg-vortex-dark border-vortex-neon/30 text-white placeholder:text-gray-400"
                    placeholder="João Silva"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-username">Username</Label>
                  <Input
                    id="register-username"
                    value={registerData.username}
                    onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                    className="bg-vortex-dark border-vortex-neon/30 text-white placeholder:text-gray-400"
                    placeholder="joaosilva"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">E-mail</Label>
                <Input
                  id="register-email"
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  className="bg-vortex-dark border-vortex-neon/30 text-white placeholder:text-gray-400"
                  placeholder="seu@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-age">Idade</Label>
                <Input
                  id="register-age"
                  type="number"
                  min="13"
                  max="120"
                  value={registerData.age}
                  onChange={(e) => setRegisterData({ ...registerData, age: e.target.value })}
                  className="bg-vortex-dark border-vortex-neon/30 text-white placeholder:text-gray-400"
                  placeholder="18"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Senha</Label>
                <Input
                  id="register-password"
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  className="bg-vortex-dark border-vortex-neon/30 text-white"
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-confirm">Confirmar Senha</Label>
                <Input
                  id="register-confirm"
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  className="bg-vortex-dark border-vortex-neon/30 text-white"
                  placeholder="••••••••"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-vortex-purple to-vortex-neon hover:from-vortex-neon hover:to-vortex-purple"
              >
                Cadastrar
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
