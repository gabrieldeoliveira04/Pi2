// Common types for the platform
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  type: 'student' | 'teacher';
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  lessons: number;
  instructor: string;
  instructorId: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  rating: number;
  studentsCount: number;
  createdAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl?: string;
  pdfUrl?: string;
  type: 'video' | 'pdf' | 'quiz';
  completed: boolean;
  locked: boolean;
  order: number;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  completed: boolean;
  order: number;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  startedAt: string;
  completedAt?: string;
  lastAccessedAt: string;
}

export interface Test {
  id: string;
  title: string;
  courseId: string;
  type: 'pre' | 'post' | 'quiz';
  questions: Question[];
  timeLimit?: number;
  passingScore: number;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'essay' | 'true-false';
  options?: string[];
  correctAnswer?: string | number;
  points: number;
}

export interface TestResult {
  id: string;
  testId: string;
  userId: string;
  answers: Record<string, any>;
  score: number;
  passed: boolean;
  completedAt: string;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  studentName: string;
  instructorName: string;
  completedAt: string;
  certificateUrl: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
}

export interface UserBadge {
  id: string;
  userId: string;
  badgeId: string;
  earnedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}