import { useState } from "react";
import { Layout } from "@/components/common/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { BadgeDisplay } from "@/components/gamification/BadgeDisplay";
import { ProgressBar } from "@/components/ProgressBar";
import { Upload, Camera, Award, Clock, BookOpen, Download } from "lucide-react";
import { Badge as BadgeType, UserBadge, Course, Certificate } from "@/types";

// Mock data
const mockUser = {
  id: "student1",
  name: "Ana Silva",
  email: "ana.silva@email.com",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b72a3e83?w=150&h=150&fit=crop&crop=face",
  type: 'student' as const,
  createdAt: "2024-01-15"
};

const mockBadges: BadgeType[] = [
  { id: "1", name: "Primeiro Curso", description: "Complete seu primeiro curso", icon: "star", requirement: "Completar 1 curso" },
  { id: "2", name: "Dedicado", description: "Complete 5 cursos", icon: "award", requirement: "Completar 5 cursos" },
  { id: "3", name: "Maratonista", description: "Estude por 50 horas", icon: "clock", requirement: "50 horas de estudo" },
  { id: "4", name: "Expert", description: "Complete um curso avançado", icon: "trophy", requirement: "Completar curso avançado" }
];

const mockUserBadges: UserBadge[] = [
  { id: "1", userId: "student1", badgeId: "1", earnedAt: "2024-02-20" },
  { id: "2", userId: "student1", badgeId: "3", earnedAt: "2024-03-01" }
];

const mockCertificates: Certificate[] = [
  {
    id: "1",
    userId: "student1",
    courseId: "3",
    courseName: "Python para Data Science",
    studentName: "Ana Silva",
    instructorName: "Ana Costa",
    completedAt: "2024-02-25",
    certificateUrl: "/certificates/cert-1.pdf"
  }
];

export default function StudentProfile() {
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [notifications, setNotifications] = useState({
    courseUpdates: true,
    assignments: true,
    messages: false,
    promotions: true
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Profile update logic will be implemented with Supabase
    console.log("Profile update:", formData);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    // Password change logic will be implemented with Supabase
    console.log("Password change request");
  };

  const earnedBadgeIds = mockUserBadges.map(ub => ub.badgeId);

  return (
    <Layout userType="student">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-card-foreground mb-2">Meu Perfil</h1>
          <p className="text-muted-foreground">
            Gerencie suas informações pessoais e configurações
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="achievements">Conquistas</TabsTrigger>
            <TabsTrigger value="certificates">Certificados</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>
                    Atualize suas informações básicas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={mockUser.avatar} />
                          <AvatarFallback>{mockUser.name[0]}</AvatarFallback>
                        </Avatar>
                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{mockUser.name}</h3>
                        <p className="text-muted-foreground">Aluno desde {new Date(mockUser.createdAt).getFullYear()}</p>
                        <Badge variant="secondary" className="mt-1">
                          Nível Intermediário
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      </div>
                    </div>

                    <Button type="submit">
                      Salvar Alterações
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alterar Senha</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Senha Atual</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nova Senha</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) => handleInputChange('newPassword', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Alterar Senha
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Suas Conquistas
                </CardTitle>
                <CardDescription>
                  Acompanhe seu progresso e conquistas na plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-primary">3</p>
                    <p className="text-sm text-muted-foreground">Cursos Iniciados</p>
                  </div>
                  <div className="text-center p-4 bg-success/5 rounded-lg">
                    <Award className="h-8 w-8 text-success mx-auto mb-2" />
                    <p className="text-2xl font-bold text-success">1</p>
                    <p className="text-sm text-muted-foreground">Curso Concluído</p>
                  </div>
                  <div className="text-center p-4 bg-warning/5 rounded-lg">
                    <Clock className="h-8 w-8 text-warning mx-auto mb-2" />
                    <p className="text-2xl font-bold text-warning">36h</p>
                    <p className="text-sm text-muted-foreground">Horas de Estudo</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Badges Conquistadas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockBadges.map((badge) => {
                      const userBadge = mockUserBadges.find(ub => ub.badgeId === badge.id);
                      return (
                        <BadgeDisplay
                          key={badge.id}
                          badge={badge}
                          earned={!!userBadge}
                          earnedAt={userBadge?.earnedAt}
                        />
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates">
            <Card>
              <CardHeader>
                <CardTitle>Meus Certificados</CardTitle>
                <CardDescription>
                  Visualize e baixe seus certificados de conclusão
                </CardDescription>
              </CardHeader>
              <CardContent>
                {mockCertificates.length > 0 ? (
                  <div className="space-y-4">
                    {mockCertificates.map((certificate) => (
                      <div 
                        key={certificate.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                            <Award className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{certificate.courseName}</h4>
                            <p className="text-sm text-muted-foreground">
                              Concluído em {new Date(certificate.completedAt).toLocaleDateString('pt-BR')}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Instrutor: {certificate.instructorName}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Baixar PDF
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Nenhum certificado ainda</h3>
                    <p className="text-muted-foreground">
                      Complete seus cursos para ganhar certificados!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Notificação</CardTitle>
                <CardDescription>
                  Escolha como e quando você quer receber notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="courseUpdates">Atualizações de Curso</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações sobre novos conteúdos e atualizações
                    </p>
                  </div>
                  <Switch
                    id="courseUpdates"
                    checked={notifications.courseUpdates}
                    onCheckedChange={(value) => handleNotificationChange('courseUpdates', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="assignments">Tarefas e Testes</Label>
                    <p className="text-sm text-muted-foreground">
                      Lembretes sobre testes e atividades pendentes
                    </p>
                  </div>
                  <Switch
                    id="assignments"
                    checked={notifications.assignments}
                    onCheckedChange={(value) => handleNotificationChange('assignments', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="messages">Mensagens</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificações de novas mensagens de professores
                    </p>
                  </div>
                  <Switch
                    id="messages"
                    checked={notifications.messages}
                    onCheckedChange={(value) => handleNotificationChange('messages', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="promotions">Promoções e Novidades</Label>
                    <p className="text-sm text-muted-foreground">
                      Informações sobre novos cursos e ofertas especiais
                    </p>
                  </div>
                  <Switch
                    id="promotions"
                    checked={notifications.promotions}
                    onCheckedChange={(value) => handleNotificationChange('promotions', value)}
                  />
                </div>

                <Button>
                  Salvar Configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}