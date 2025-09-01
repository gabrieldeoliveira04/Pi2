import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Award,
  Upload,
  FileText,
  Video,
  ClipboardList,
  BarChart3,
  Calendar,
  Download
} from "lucide-react";

// Mock data for admin
const adminStats = {
  totalStudents: 1247,
  activeCourses: 12,
  completionRate: 73,
  avgScore: 85
};

const recentActivity = [
  {
    id: 1,
    student: "Ana Silva",
    action: "Concluiu o curso",
    course: "React Avançado",
    timestamp: "2 horas atrás",
    score: 92
  },
  {
    id: 2,
    student: "João Santos", 
    action: "Iniciou teste",
    course: "UI/UX Design",
    timestamp: "3 horas atrás",
    score: null
  },
  {
    id: 3,
    student: "Maria Costa",
    action: "Enviou pergunta",
    course: "Python Data Science", 
    timestamp: "5 horas atrás",
    score: null
  }
];

const courses = [
  {
    id: 1,
    title: "Desenvolvimento React Avançado",
    students: 342,
    completionRate: 68,
    avgPreTest: 45,
    avgPostTest: 78,
    status: "Ativo"
  },
  {
    id: 2,
    title: "UI/UX Design Fundamentals", 
    students: 289,
    completionRate: 82,
    avgPreTest: 52,
    avgPostTest: 85,
    status: "Ativo"
  },
  {
    id: 3,
    title: "Python para Data Science",
    students: 456,
    completionRate: 76,
    avgPreTest: 38,
    avgPostTest: 81,
    status: "Ativo"
  }
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header userType="admin" userName="Prof. Carlos Lima" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-slate-800 to-slate-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2">
                Dashboard Administrativo
              </h1>
              <p className="text-white/90 mb-6">
                Gerencie cursos, monitore progresso dos alunos e analise métricas de aprendizado.
              </p>
              <div className="flex gap-3">
                <Button variant="secondary" className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
                  <Upload className="h-4 w-4 mr-2" />
                  Novo Conteúdo
                </Button>
                <Button variant="secondary" className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
                  <Download className="h-4 w-4 mr-2" />
                  Relatório Completo
                </Button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mb-12" />
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 card-hover">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{adminStats.totalStudents.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total de Alunos</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 card-hover">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{adminStats.activeCourses}</p>
                <p className="text-sm text-muted-foreground">Cursos Ativos</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 card-hover">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{adminStats.completionRate}%</p>
                <p className="text-sm text-muted-foreground">Taxa de Conclusão</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 card-hover">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                <Award className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{adminStats.avgScore}%</p>
                <p className="text-sm text-muted-foreground">Nota Média</p>
              </div>
            </div>
          </Card>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-3" />
                  Upload de Vídeo
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-3" />
                  Adicionar PDF
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ClipboardList className="h-4 w-4 mr-3" />
                  Criar Teste
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-3" />
                  Ver Relatórios
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-3" />
                  Agenda de Aulas
                </Button>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Atividade Recente</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.student}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.action} - {activity.course}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.timestamp}
                      </p>
                      {activity.score && (
                        <Badge variant="secondary" className="mt-1">
                          {activity.score}% 
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Courses Overview */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Desempenho dos Cursos</h3>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Curso</th>
                      <th className="text-left py-3 px-2">Alunos</th>
                      <th className="text-left py-3 px-2">Taxa Conclusão</th>
                      <th className="text-left py-3 px-2">Pré-teste</th>
                      <th className="text-left py-3 px-2">Pós-teste</th>
                      <th className="text-left py-3 px-2">Melhoria</th>
                      <th className="text-left py-3 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => {
                      const improvement = course.avgPostTest - course.avgPreTest;
                      return (
                        <tr key={course.id} className="border-b hover:bg-muted/20">
                          <td className="py-3 px-2">
                            <div>
                              <p className="font-medium">{course.title}</p>
                            </div>
                          </td>
                          <td className="py-3 px-2">{course.students}</td>
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              <div className="w-12 h-2 bg-secondary rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-success"
                                  style={{ width: `${course.completionRate}%` }}
                                />
                              </div>
                              <span className="text-sm">{course.completionRate}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-2">{course.avgPreTest}%</td>
                          <td className="py-3 px-2">{course.avgPostTest}%</td>
                          <td className="py-3 px-2">
                            <Badge 
                              variant={improvement > 30 ? "default" : improvement > 15 ? "secondary" : "destructive"}
                            >
                              +{improvement}%
                            </Badge>
                          </td>
                          <td className="py-3 px-2">
                            <Badge variant="secondary">{course.status}</Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Performance Chart Placeholder */}
            <Card className="p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Evolução das Notas (Pré vs Pós-teste)</h3>
              <div className="h-64 bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="h-16 w-16 mx-auto mb-3 opacity-50" />
                  <p className="text-lg font-medium">Gráfico de Comparação</p>
                  <p className="text-sm">Integração com Google Planilhas</p>
                  <p className="text-sm">Visualização das métricas de aprendizado</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}