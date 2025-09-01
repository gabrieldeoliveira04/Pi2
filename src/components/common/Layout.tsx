import { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
  userType: 'student' | 'teacher';
  showSidebar?: boolean;
}

export const Layout = ({ children, userType, showSidebar = true }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header userType={userType} />
      <div className="flex">
        {showSidebar && <Sidebar userType={userType} />}
        <main className={`flex-1 ${showSidebar ? 'pl-64' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};