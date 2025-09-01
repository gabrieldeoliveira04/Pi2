import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CoursePage from "./pages/CoursePage";
import TestPage from "./pages/TestPage";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

// Auth pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

// Student pages
import StudentDashboard from "./pages/student/Dashboard";
import StudentProfile from "./pages/student/Profile";

// Teacher pages
import TeacherDashboard from "./pages/teacher/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Student routes */}
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/courses" element={<StudentDashboard />} />
          <Route path="/course/:id" element={<CoursePage />} />
          <Route path="/test/:id" element={<TestPage />} />
          <Route path="/profile" element={<StudentProfile />} />
          <Route path="/messages" element={<div>Messages - Em desenvolvimento</div>} />
          <Route path="/certificates" element={<div>Certificates - Em desenvolvimento</div>} />
          
          {/* Teacher routes */}
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/courses" element={<div>Teacher Courses - Em desenvolvimento</div>} />
          <Route path="/teacher/create-course" element={<div>Create Course - Em desenvolvimento</div>} />
          <Route path="/teacher/students" element={<div>Students Management - Em desenvolvimento</div>} />
          <Route path="/teacher/reports" element={<div>Reports - Em desenvolvimento</div>} />
          <Route path="/teacher/messages" element={<div>Teacher Messages - Em desenvolvimento</div>} />
          <Route path="/teacher/profile" element={<div>Teacher Profile - Em desenvolvimento</div>} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
