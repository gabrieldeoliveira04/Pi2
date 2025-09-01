import { Course, Enrollment } from "@/types";
import { CourseCard } from "./CourseCard";

interface CourseGridProps {
  courses: Course[];
  enrollments?: Enrollment[];
  viewMode: 'grid' | 'list';
  onCourseClick: (courseId: string) => void;
}

export const CourseGrid = ({ courses, enrollments, viewMode, onCourseClick }: CourseGridProps) => {
  const getEnrollmentProgress = (courseId: string) => {
    return enrollments?.find(e => e.courseId === courseId)?.progress || 0;
  };

  return (
    <div className={`grid gap-6 ${
      viewMode === 'grid' 
        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
        : "grid-cols-1"
    }`}>
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          progress={getEnrollmentProgress(course.id)}
          viewMode={viewMode}
          onClick={() => onCourseClick(course.id)}
        />
      ))}
    </div>
  );
};