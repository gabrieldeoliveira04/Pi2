import { NavLink } from "react-router-dom";
import { 
  BookOpen, 
  User, 
  MessageSquare, 
  Award, 
  FileText, 
  PlusCircle,
  BarChart3,
  Users,
  Settings,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  userType: 'student' | 'teacher';
}

export const Sidebar = ({ userType }: SidebarProps) => {
  const studentLinks = [
    { to: "/dashboard", label: "Dashboard", icon: Home },
    { to: "/courses", label: "Meus Cursos", icon: BookOpen },
    { to: "/messages", label: "Mensagens", icon: MessageSquare },
    { to: "/certificates", label: "Certificados", icon: Award },
    { to: "/profile", label: "Perfil", icon: User },
  ];

  const teacherLinks = [
    { to: "/teacher/dashboard", label: "Dashboard", icon: Home },
    { to: "/teacher/courses", label: "Meus Cursos", icon: BookOpen },
    { to: "/teacher/create-course", label: "Criar Curso", icon: PlusCircle },
    { to: "/teacher/students", label: "Alunos", icon: Users },
    { to: "/teacher/reports", label: "Relatórios", icon: BarChart3 },
    { to: "/teacher/messages", label: "Mensagens", icon: MessageSquare },
    { to: "/teacher/profile", label: "Perfil", icon: User },
  ];

  const links = userType === 'student' ? studentLinks : teacherLinks;

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-card border-r border-border overflow-y-auto">
      <nav className="p-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
                isActive && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
              )
            }
          >
            <link.icon className="h-5 w-5" />
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};