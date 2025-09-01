import { useState } from "react";
import { Header } from "@/components/Header";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ProgressBar";
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp,
  Filter,
  Grid,
  List
} from "lucide-react";

// Mock data
const mockCourses = [
  {
    id: "1",
    title: "Desenvolvimento React Avançado",
    description: "Aprenda React com hooks, context API, performance e melhores práticas para criar aplicações modernas.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    progress: 68,
    duration: "8h 30min",
    lessons: 24,
    instructor: "Maria Silva"
  },
  {
    id: "2", 
    title: "UI/UX Design Fundamentals",
    description: "Domine os fundamentos do design de interface e experiência do usuário com ferramentas modernas.",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    progress: 23,
    duration: "12h 15min",
    lessons: 36,
    instructor: "João Santos"
  },
  {
    id: "3",
    title: "Python para Data Science",
    description: "Análise de dados com Python, pandas, numpy e visualização com matplotlib e seaborn.",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
    progress: 100,
    duration: "15h 45min", 
    lessons: 42,
    instructor: "Ana Costa"
  },
  {
    id: "4",
    title: "Marketing Digital Estratégico",
    description: "Estratégias completas de marketing digital, SEO, redes sociais e análise de métricas.",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    progress: 0,
    duration: "6h 20min",
    lessons: 18,
    instructor: "Carlos Lima"
  }
];

export default function StudentDashboard() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState<"all" | "in-progress" | "completed">("all");

  const handleStartCourse = (courseId: string) => {
    console.log("Starting course:", courseId);
    // Navigate to course page
  };

  const filteredCourses = mockCourses.filter(course => {
    if (filter === "in-progress") return course.progress > 0 && course.progress < 100;
    if (filter === "completed") return course.progress === 100;
    return true;
  });

  const completedCourses = mockCourses.filter(c => c.progress === 100).length;
  const inProgressCourses = mockCourses.filter(c => c.progress > 0 && c.progress < 100).length;
  const totalHours = mockCourses.reduce((acc, course) => {
    const hours = parseFloat(course.duration.split('h')[0]);
    return acc + hours;
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header userType="student" userName="Ana Silva" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-primary via-primary-light to-purple-500 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2">
                Bem-vinda de volta, Ana! 👋
              </h1>
              <p className="text-white/90 mb-6">
                Continue sua jornada de aprendizado. Você está progredindo muito bem!
              </p>
              <Button 
                variant="secondary" 
                className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
              >
                Ver Certificados
              </Button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mb-12" />
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-xl p-6 border card-hover">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Award className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">{completedCourses}</p>
                <p className="text-sm text-muted-foreground">Cursos Concluídos</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl p-6 border card-hover">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">{inProgressCourses}</p>
                <p className="text-sm text-muted-foreground">Em Andamento</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl p-6 border card-hover">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">{totalHours}h</p>
                <p className="text-sm text-muted-foreground">Total de Horas</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl p-6 border card-hover">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">87%</p>
                <p className="text-sm text-muted-foreground">Taxa de Conclusão</p>
              </div>
            </div>
          </div>
        </section>

        {/* Controls */}
        <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-card-foreground mb-1">Meus Cursos</h2>
            <p className="text-muted-foreground">
              {filteredCourses.length} curso{filteredCourses.length !== 1 ? 's' : ''} encontrado{filteredCourses.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="bg-background border border-border rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">Todos os cursos</option>
                <option value="in-progress">Em andamento</option>
                <option value="completed">Concluídos</option>
              </select>
            </div>
            
            {/* View Mode */}
            <div className="flex items-center bg-secondary rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1"
        }`}>
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              onStartCourse={handleStartCourse}
            />
          ))}
        </section>
        
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">
              Nenhum curso encontrado
            </h3>
            <p className="text-muted-foreground">
              Tente ajustar os filtros ou explore novos cursos.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}