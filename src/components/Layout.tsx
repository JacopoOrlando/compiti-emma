import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import Breadcrumbs from "./Breadcrumbs";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const showBreadcrumbs = location.pathname !== '/';
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center border-b bg-background px-4 md:px-6">
            <SidebarTrigger className="mr-2 md:mr-4" />
            <h1 className="text-lg md:text-2xl font-bold text-primary">🦄 Compiti di Emma 🌈</h1>
          </header>
          
          {showBreadcrumbs && <Breadcrumbs />}
          
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}