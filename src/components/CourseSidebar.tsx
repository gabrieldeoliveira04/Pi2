import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "./ProgressBar";
import { 
  PlayCircle, 
  CheckCircle, 
  Lock, 
  FileText, 
  Download,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  lessons: Lesson[];
  completed: boolean;
}

interface CourseSidebarProps {
  modules: Module[];
  currentLessonId?: string;
  onLessonSelect: (lessonId: string) => void;
  onMarkComplete: (lessonId: string) => void;
}

export const CourseSidebar = ({ 
  modules, 
  currentLessonId, 
  onLessonSelect, 
  onMarkComplete 
}: CourseSidebarProps) => {
  const [expandedModules, setExpandedModules] = useState<string[]>(
    modules.map(m => m.id) // All modules expanded by default
  );

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getLessonIcon = (lesson: Lesson) => {
    if (lesson.locked) return <Lock className="h-4 w-4 text-muted-foreground" />;
    if (lesson.completed) return <CheckCircle className="h-4 w-4 text-success" />;
    
    switch (lesson.type) {
      case "video":
        return <PlayCircle className="h-4 w-4 text-primary" />;
      case "pdf":
        return <FileText className="h-4 w-4 text-warning" />;
      case "quiz":
        return <CheckCircle className="h-4 w-4 text-purple-500" />;
      default:
        return <PlayCircle className="h-4 w-4 text-primary" />;
    }
  };

  const totalLessons = modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = modules.reduce((acc, module) => 
    acc + module.lessons.filter(lesson => lesson.completed).length, 0
  );
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="w-80 bg-card border-l h-full overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold mb-4">Conteúdo do Curso</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progresso Geral</span>
            <span className="font-medium">{completedLessons}/{totalLessons} aulas</span>
          </div>
          <ProgressBar value={overallProgress} showPercentage={false} />
        </div>
      </div>

      {/* Modules */}
      <div className="p-4 space-y-2">
        {modules.map((module) => (
          <div key={module.id} className="border rounded-lg">
            {/* Module Header */}
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full p-4 flex items-center justify-between hover:bg-accent/50 transition-colors rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs",
                  module.completed 
                    ? "bg-success text-success-foreground" 
                    : "bg-muted text-muted-foreground"
                )}>
                  {module.completed ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <span>{module.lessons.filter(l => l.completed).length}</span>
                  )}
                </div>
                <span className="font-medium text-left">{module.title}</span>
              </div>
              {expandedModules.includes(module.id) ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>

            {/* Module Lessons */}
            {expandedModules.includes(module.id) && (
              <div className="border-t bg-muted/20">
                {module.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={cn(
                      "flex items-center gap-3 p-3 border-b last:border-b-0 cursor-pointer hover:bg-accent/30 transition-colors",
                      currentLessonId === lesson.id && "bg-primary/10 border-l-4 border-l-primary",
                      lesson.locked && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => !lesson.locked && onLessonSelect(lesson.id)}
                  >
                    {getLessonIcon(lesson)}
                    
                    <div className="flex-1 min-w-0">
                      <h4 className={cn(
                        "text-sm font-medium truncate",
                        lesson.completed && "text-success"
                      )}>
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {lesson.duration}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      {lesson.type === "pdf" && !lesson.locked && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle PDF download
                          }}
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                      )}
                      
                      {currentLessonId === lesson.id && !lesson.completed && !lesson.locked && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-6 px-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            onMarkComplete(lesson.id);
                          }}
                        >
                          Concluir
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};