import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Upload } from "lucide-react";

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null as File | null
  });
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, avatar: file }));
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    // Registration logic will be implemented with Supabase
    console.log("Registration attempt:", { ...formData, userType });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-purple-500/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Criar Conta</CardTitle>
          <CardDescription>
            Comece sua jornada de aprendizado hoje!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={userType} onValueChange={(value) => setUserType(value as 'student' | 'teacher')}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="student">Aluno</TabsTrigger>
              <TabsTrigger value="teacher">Professor</TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={avatarPreview} />
                    <AvatarFallback className="text-2xl">
                      {formData.name ? formData.name[0].toUpperCase() : <Upload className="h-8 w-8" />}
                    </AvatarFallback>
                  </Avatar>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Crie uma senha"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirme sua senha"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                Criar Conta
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Fazer login
                </Link>
              </p>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};