import { NavLink } from "react-router-dom";
import { 
  BookOpen, 
  User, 
  MessageSquare, 
  Award, 
  PlusCircle,
  BarChart3,
  Users,
  Home,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarProps {
  userType: 'student' | 'teacher';
}

export const Sidebar = ({ userType }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
    <>
      {/* Botão mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-card border rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-card border-r border-border overflow-y-auto z-50 transform transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:relative md:top-0 md:h-screen"
        )}
      >
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
              onClick={() => setIsOpen(false)} // fecha ao clicar no mobile
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};
