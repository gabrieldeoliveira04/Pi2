import { Button } from "@/components/ui/button";
import { ProgressBar } from "./ProgressBar";
import { PlayCircle, Clock, BookOpen } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  progress: number;
  duration: string;
  lessons: number;
  instructor: string;
  onStartCourse: (id: string) => void;
}

export const CourseCard = ({
  id,
  title,
  description,
  thumbnail,
  progress,
  duration,
  lessons,
  instructor,
  onStartCourse
}: CourseCardProps) => {
  return (
    <div className="course-card">
      <div className="relative">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
          onClick={() => onStartCourse(id)}
        >
          <PlayCircle className="h-8 w-8" />
        </Button>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-card-foreground">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {duration}
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {lessons} aulas
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Progresso</span>
            <span className="text-sm font-medium text-success">
              {progress}% concluído
            </span>
          </div>
          <ProgressBar value={progress} showPercentage={false} />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Por {instructor}
          </span>
          <Button 
            className="btn-gradient"
            onClick={() => onStartCourse(id)}
          >
            {progress === 0 ? "Iniciar Curso" : "Continuar"}
          </Button>
        </div>
      </div>
    </div>
  );
};