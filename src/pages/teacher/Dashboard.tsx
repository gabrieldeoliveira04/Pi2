import { useState } from "react";
import { Layout } from "@/components/common/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  DollarSign,
  Plus,
  Upload,
  FileText,
  Video,
  MessageSquare,
  Calendar,
  BarChart3
} from "lucide-react";

export default function TeacherDashboard() {
  const [stats] = useState({
    totalStudents: 2150,
    activeCourses: 8,
    completionRate: 87,
    monthlyRevenue: 15420
  });

  const [recentActivity] = useState([
    { id: 1, type: "enrollment", message: "João Silva se inscreveu em 'React Avançado'", time: "2 horas atrás" },
    { id: 2, type: "completion", message: "Maria Santos completou 'UI/UX Design'", time: "4 horas atrás" },
    { id: 3, type: "question", message: "Nova pergunta no curso 'Python Data Science'", time: "6 horas atrás" },
    { id: 4, type: "review", message: "Nova avaliação 5 estrelas recebida", time: "1 dia atrás" }
  ]);

  const [topCourses] = useState([
    { id: "1", title: "Desenvolvimento React Avançado", students: 1250, rating: 4.8, revenue: 6250 },
    { id: "2", title: "Python para Data Science", students: 2100, rating: 4.9, revenue: 10500 },
    { id: "3", title: "UI/UX Design Fundamentals", students: 890, rating: 4.6, revenue: 4450 }
  ]);

  return (
    <Layout userType="teacher">
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-primary via-primary-light to-purple-500 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2">
                Bem-vindo, Professor! 👨‍🏫
              </h1>
              <p className="text-white/90 mb-6">
                Gerencie seus cursos, acompanhe o progresso dos alunos e crie conteúdo incrível.
              </p>
              <div className="flex gap-4">
                <Button 
                  variant="secondary" 
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Curso
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Conteúdo
                </Button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mb-12" />
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">{stats.totalStudents.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total de Alunos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">{stats.activeCourses}</p>
                  <p className="text-sm text-muted-foreground">Cursos Ativos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">{stats.completionRate}%</p>
                  <p className="text-sm text-muted-foreground">Taxa de Conclusão</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">R$ {stats.monthlyRevenue.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Receita Mensal</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>
                Principais tarefas e funcionalidades
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Criar Novo Curso
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload de Vídeo
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Criar Teste
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Mensagens dos Alunos
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Ver Relatórios
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>
                Últimas interações e eventos dos seus cursos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs ${
                      activity.type === 'enrollment' ? 'bg-primary' :
                      activity.type === 'completion' ? 'bg-success' :
                      activity.type === 'question' ? 'bg-warning' :
                      'bg-purple-500'
                    }`}>
                      {activity.type === 'enrollment' ? <Users className="h-4 w-4" /> :
                       activity.type === 'completion' ? <BookOpen className="h-4 w-4" /> :
                       activity.type === 'question' ? <MessageSquare className="h-4 w-4" /> :
                       <TrendingUp className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Courses */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Desempenho dos Cursos</CardTitle>
            <CardDescription>
              Estatísticas detalhadas dos seus cursos mais populares
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Curso</th>
                    <th className="text-left py-3 px-4">Alunos</th>
                    <th className="text-left py-3 px-4">Avaliação</th>
                    <th className="text-left py-3 px-4">Receita</th>
                    <th className="text-left py-3 px-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {topCourses.map((course) => (
                    <tr key={course.id} className="border-b hover:bg-accent/50 transition-colors">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium">{course.title}</p>
                          <Badge variant="secondary" className="mt-1">
                            Ativo
                          </Badge>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-medium">{course.students.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">estudantes</p>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{course.rating}</span>
                          <span className="text-yellow-500">★</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-medium text-success">R$ {course.revenue.toLocaleString()}</p>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Editar
                          </Button>
                          <Button size="sm" variant="outline">
                            Relatório
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}