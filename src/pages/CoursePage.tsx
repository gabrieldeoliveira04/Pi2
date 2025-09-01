import { useState } from "react";
import { Header } from "@/components/Header";
import { VideoPlayer } from "@/components/VideoPlayer";
import { CourseSidebar } from "@/components/CourseSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  MessageCircle,
  ThumbsUp,
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  type: "video" | "pdf" | "quiz";
}

interface Module {
  id: string;
  title: string;
  completed: boolean;
  lessons: Lesson[];
}

interface CourseData {
  id: string;
  title: string;
  description: string;
  instructor: string;
  rating: number;
  students: number;
  modules: Module[];
}

// Mock data with proper typing
const mockCourse: CourseData = {
  id: "1",
  title: "Desenvolvimento React Avançado",
  description: "Aprenda React com hooks, context API, performance e melhores práticas para criar aplicações modernas e escaláveis.",
  instructor: "Maria Silva",
  rating: 4.8,
  students: 2847,
  modules: [
    {
      id: "m1",
      title: "Introdução ao React Avançado",
      completed: true,
      lessons: [
        {
          id: "l1",
          title: "Bem-vindos ao curso",
          duration: "5:30",
          completed: true,
          locked: false,
          type: "video"
        },
        {
          id: "l2",
          title: "Configuração do ambiente",
          duration: "12:45",
          completed: true,
          locked: false,
          type: "video"
        },
        {
          id: "l3",
          title: "Material de apoio - PDF",
          duration: "Leitura",
          completed: true,
          locked: false,
          type: "pdf"
        }
      ]
    },
    {
      id: "m2",
      title: "Hooks Avançados",
      completed: false,
      lessons: [
        {
          id: "l4",
          title: "useState e useEffect na prática",
          duration: "18:22",
          completed: true,
          locked: false,
          type: "video"
        },
        {
          id: "l5",
          title: "useContext e Provider Pattern",
          duration: "25:10",
          completed: false,
          locked: false,
          type: "video"
        },
        {
          id: "l6",
          title: "Custom Hooks",
          duration: "20:33",
          completed: false,
          locked: false,
          type: "video"
        },
        {
          id: "l7",
          title: "Quiz: Hooks Avançados",
          duration: "10 min",
          completed: false,
          locked: false,
          type: "quiz"
        }
      ]
    },
    {
      id: "m3",
      title: "Performance e Otimização",
      completed: false,
      lessons: [
        {
          id: "l8",
          title: "React.memo e useMemo",
          duration: "22:15",
          completed: false,
          locked: true,
          type: "video"
        },
        {
          id: "l9",
          title: "useCallback na prática",
          duration: "16:40",
          completed: false,
          locked: true,
          type: "video"
        }
      ]
    }
  ]
};

export default function CoursePage() {
  const [currentLessonId, setCurrentLessonId] = useState("l5");
  const [courseData, setCourseData] = useState<CourseData>(mockCourse);
  const { toast } = useToast();

  const currentLesson: Lesson | undefined = courseData.modules
    .flatMap(m => m.lessons)
    .find(l => l.id === currentLessonId);

  const handleLessonSelect = (lessonId: string) => {
    setCurrentLessonId(lessonId);
  };

  const handleMarkComplete = (lessonId: string) => {
    setCourseData(prev => ({
      ...prev,
      modules: prev.modules.map(module => ({
        ...module,
        lessons: module.lessons.map(lesson =>
          lesson.id === lessonId
            ? { ...lesson, completed: true }
            : lesson
        )
      }))
    }));

    toast({
      title: "Aula concluída! 🎉",
      description: "Parabéns por completar mais uma etapa do curso.",
    });
  };

  const handleBackToDashboard = () => {
    // Navigate back to dashboard
    console.log("Back to dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header userType="student" userName="Ana Silva" />
      
      {/* Course Header */}
      <div className="border-b bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBackToDashboard}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              <div>
                <h1 className="text-xl font-bold text-card-foreground">
                  {courseData.title}
                </h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-muted-foreground">
                    Por {courseData.instructor}
                  </span>
                  <Badge variant="secondary">
                    ⭐ {courseData.rating}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {courseData.students.toLocaleString()} alunos
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bookmark className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Video Section */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Video Player */}
            <div className="mb-6">
              <VideoPlayer
                title={currentLesson?.title || "Selecione uma aula"}
                onProgress={(progress) => {
                  // Handle video progress
                }}
              />
            </div>

            {/* Lesson Info */}
            {currentLesson && (
              <div className="bg-card rounded-lg p-6 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{currentLesson.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Duração: {currentLesson.duration}</span>
                      <span>•</span>
                      <span>Tipo: {currentLesson.type === "video" ? "Vídeo" : currentLesson.type === "pdf" ? "Material" : "Quiz"}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {currentLesson.type === "pdf" && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    )}
                    
                    {!currentLesson.completed && (
                      <Button 
                        className="btn-gradient"
                        onClick={() => handleMarkComplete(currentLesson.id)}
                      >
                        Marcar como Concluído
                      </Button>
                    )}
                  </div>
                </div>
                
                <p className="text-muted-foreground">
                  {courseData.description}
                </p>
              </div>
            )}

            {/* Interaction Section */}
            <div className="bg-card rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Discussão da Aula</h3>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Útil (42)
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Comentários (8)
                  </Button>
                </div>
              </div>
              
              <div className="text-center py-8 text-muted-foreground">
                <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Seja o primeiro a comentar sobre esta aula!</p>
                <Button variant="outline" className="mt-3">
                  Fazer Pergunta
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <CourseSidebar
          modules={courseData.modules}
          currentLessonId={currentLessonId}
          onLessonSelect={handleLessonSelect}
          onMarkComplete={handleMarkComplete}
        />
      </div>
    </div>
  );
}