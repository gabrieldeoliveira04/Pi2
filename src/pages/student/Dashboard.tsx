import { useState } from "react";
import { Layout } from "@/components/common/Layout";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp,
  Filter,
  Grid,
  List,
  Search,
  Bell
} from "lucide-react";
import { Course, Enrollment } from "@/types";

// Mock data
const mockCourses: Course[] = [
  {
    id: "1",
    title: "Desenvolvimento React Avançado",
    description: "Aprenda React com hooks, context API, performance e melhores práticas para criar aplicações modernas.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    duration: "8h 30min",
    lessons: 24,
    instructor: "Maria Silva",
    instructorId: "teacher1",
    category: "Programação",
    level: "advanced",
    price: 199.90,
    rating: 4.8,
    studentsCount: 1250,
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    title: "UI/UX Design Fundamentals", 
    description: "Domine os fundamentos do design de interface e experiência do usuário com ferramentas modernas.",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    duration: "12h 15min",
    lessons: 36,
    instructor: "João Santos",
    instructorId: "teacher2",
    category: "Design",
    level: "beginner",
    price: 149.90,
    rating: 4.6,
    studentsCount: 890,
    createdAt: "2024-02-01"
  },
  {
    id: "3",
    title: "Python para Data Science",
    description: "Análise de dados com Python, pandas, numpy e visualização com matplotlib e seaborn.",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop", 
    duration: "15h 45min",
    lessons: 42,
    instructor: "Ana Costa",
    instructorId: "teacher3",
    category: "Data Science",
    level: "intermediate",
    price: 249.90,
    rating: 4.9,
    studentsCount: 2100,
    createdAt: "2024-01-08"
  }
];

const mockEnrollments: Enrollment[] = [
  {
    id: "1",
    userId: "student1",
    courseId: "1",
    progress: 68,
    startedAt: "2024-02-15",
    lastAccessedAt: "2024-03-01"
  },
  {
    id: "2", 
    userId: "student1",
    courseId: "2",
    progress: 23,
    startedAt: "2024-02-20",
    lastAccessedAt: "2024-02-28"
  },
  {
    id: "3",
    userId: "student1", 
    courseId: "3",
    progress: 100,
    startedAt: "2024-01-10",
    completedAt: "2024-02-25",
    lastAccessedAt: "2024-02-25"
  }
];

export default function StudentDashboard() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState<"all" | "in-progress" | "completed">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCourseClick = (courseId: string) => {
    console.log("Navigating to course:", courseId);
    // Navigate to course page
  };

  const filteredCourses = mockCourses.filter(course => {
    const enrollment = mockEnrollments.find(e => e.courseId === course.id);
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (filter === "in-progress") {
      return enrollment && enrollment.progress > 0 && enrollment.progress < 100;
    }
    if (filter === "completed") {
      return enrollment && enrollment.progress === 100;
    }
    return enrollment; // Show only enrolled courses
  });

  const stats = {
    completedCourses: mockEnrollments.filter(e => e.progress === 100).length,
    inProgressCourses: mockEnrollments.filter(e => e.progress > 0 && e.progress < 100).length,
    totalHours: mockCourses
      .filter(c => mockEnrollments.some(e => e.courseId === c.id))
      .reduce((acc, course) => {
        const hours = parseFloat(course.duration.split('h')[0]);
        return acc + hours;
      }, 0),
    avgProgress: Math.round(
      mockEnrollments.reduce((acc, e) => acc + e.progress, 0) / mockEnrollments.length
    )
  };

  return (
    <Layout userType="student">
      <div className="container mx-auto px-6 py-8">
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
              <div className="flex gap-4">
                <Button 
                  variant="secondary" 
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                >
                  Ver Certificados
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notificações
                </Button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mb-12" />
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-xl p-6 border card-hover">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Award className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">{stats.completedCourses}</p>
                <p className="text-sm text-muted-foreground">Cursos Concluídos</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl p-6 border card-hover">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">{stats.inProgressCourses}</p>
                <p className="text-sm text-muted-foreground">Em Andamento</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl p-6 border card-hover">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">{stats.totalHours}h</p>
                <p className="text-sm text-muted-foreground">Total de Horas</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl p-6 border card-hover">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">{stats.avgProgress}%</p>
                <p className="text-sm text-muted-foreground">Progresso Médio</p>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Controls */}
        <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-card-foreground mb-1">Meus Cursos</h2>
            <p className="text-muted-foreground">
              {filteredCourses.length} curso{filteredCourses.length !== 1 ? 's' : ''} encontrado{filteredCourses.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar cursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="bg-background border border-border rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">Todos</option>
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
        <CourseGrid
          courses={filteredCourses}
          enrollments={mockEnrollments}
          viewMode={viewMode}
          onCourseClick={handleCourseClick}
        />
        
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
      </div>
    </Layout>
  );
}