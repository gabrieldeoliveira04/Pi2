import { Course } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ProgressBar";
import { PlayCircle, Clock, BookOpen, Star, Users } from "lucide-react";

interface CourseCardProps {
  course: Course;
  progress?: number;
  viewMode: 'grid' | 'list';
  onClick: () => void;
}

export const CourseCard = ({ course, progress = 0, viewMode, onClick }: CourseCardProps) => {
  if (viewMode === 'list') {
    return (
      <div className="course-card flex gap-4 p-4">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-32 h-20 object-cover rounded-lg flex-shrink-0"
        />
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-card-foreground">
              {course.title}
            </h3>
            <Badge variant="secondary">
              {course.level}
            </Badge>
          </div>
          
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {course.description}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {course.duration}
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {course.lessons} aulas
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {course.rating}
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {course.studentsCount}
            </div>
          </div>
          
          {progress > 0 && (
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-muted-foreground">Progresso</span>
                <span className="text-sm font-medium text-success">
                  {progress}% concluído
                </span>
              </div>
              <ProgressBar value={progress} showPercentage={false} size="sm" />
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Por {course.instructor}
            </span>
            <Button onClick={onClick}>
              {progress === 0 ? "Iniciar Curso" : "Continuar"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="course-card">
      <div className="relative">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
          onClick={onClick}
        >
          <PlayCircle className="h-8 w-8" />
        </Button>
        <Badge 
          variant="secondary" 
          className="absolute top-4 right-4 bg-white/90 text-foreground"
        >
          {course.level}
        </Badge>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-card-foreground">
          {course.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {course.lessons} aulas
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{course.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            {course.studentsCount} alunos
          </div>
        </div>
        
        {progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Progresso</span>
              <span className="text-sm font-medium text-success">
                {progress}% concluído
              </span>
            </div>
            <ProgressBar value={progress} showPercentage={false} />
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Por {course.instructor}
          </span>
          <Button 
            className="btn-gradient"
            onClick={onClick}
          >
            {progress === 0 ? "Iniciar Curso" : "Continuar"}
          </Button>
        </div>
      </div>
    </div>
  );
};