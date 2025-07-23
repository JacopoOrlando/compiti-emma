import { NavLink, useLocation } from "react-router-dom";
import { Palette } from "lucide-react"; // Aggiunta per l'icona nella sezione inglese
import { 
  Home, BookOpen, Calculator, History, Globe, Languages, 
  Ruler, Shapes, Microscope, PenTool, Star 
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const subjects = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Italiano",
    icon: BookOpen,
    topics: [
      { title: "Lettura", url: "/italiano/lettura", icon: BookOpen },
      { title: "Grammatica", url: "/italiano/grammatica", icon: PenTool },
      { title: "Storia", url: "/italiano/storia", icon: History },
      { title: "Geografia", url: "/italiano/geografia", icon: Globe },
    ]
  },
  {
    title: "Matematica", 
    icon: Calculator,
    topics: [
      { title: "Operazioni", url: "/matematica/operazioni", icon: Calculator },
      { title: "Geometria", url: "/matematica/geometria", icon: Shapes },
      { title: "Misure", url: "/matematica/misure", icon: Ruler },
      { title: "Scienze", url: "/matematica/scienze", icon: Microscope },
    ]
  },
  {
    title: "Inglese",
    icon: Languages,
    topics: [
      { title: "Parole", url: "/inglese/parole", icon: BookOpen },
      { title: "Colori", url: "/inglese/colori", icon: Palette },
      { title: "Numeri", url: "/inglese/numeri", icon: Calculator },
      { title: "Famiglia", url: "/inglese/famiglia", icon: Home },
    ]
  }
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isSubjectActive = (topics: any[]) => 
    topics.some(topic => currentPath.startsWith(topic.url));

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-primary/10 text-foreground";

  return (
    <Sidebar className={`${open ? "w-60" : "w-14"} border-r-4 border-primary/20 shadow-2xl`}>
      <SidebarContent className="bg-background/95 backdrop-blur-sm border-r-4 border-primary/10">
        
        {/* Home */}
        <SidebarGroup className="px-3 py-4">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/" className="bg-primary/20 hover:bg-primary/30 text-primary font-bold border-2 border-primary/50 rounded-xl py-3 px-4 shadow-lg">
                    <Home className="h-6 w-6" />
                    {open && <span className="text-lg">🏠 Home</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Subjects */}
        {subjects.slice(1).map((subject) => (
        <SidebarGroup key={subject.title} className="px-3 py-2">
          <SidebarGroupLabel className="flex items-center gap-3 text-xl font-bold text-primary bg-primary/10 rounded-xl p-4 border-2 border-primary/30 mb-4 shadow-lg">
            <subject.icon className="h-7 w-7" />
            {open && <span>{subject.title}</span>}
            </SidebarGroupLabel>
            
            {subject.topics && (
              <SidebarGroupContent className="space-y-2">
                <SidebarMenu>
                  {subject.topics.map((topic) => (
                    <SidebarMenuItem key={topic.title}>
                      <SidebarMenuButton asChild>
                        <NavLink to={topic.url} className="hover:bg-primary/15 text-foreground font-semibold border-2 border-transparent hover:border-primary/30 rounded-lg py-2 px-3 mx-2 transition-all duration-200 shadow-sm hover:shadow-md text-base">
                          <topic.icon className="h-5 w-5" />
                          {open && <span>{topic.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            )}
          </SidebarGroup>
        ))}

        {/* Footer */}
        {open && (
          <div className="mt-auto p-6 text-center bg-primary/5 mx-3 rounded-xl border-2 border-primary/20">
            <div className="flex items-center justify-center gap-2 text-lg font-bold text-primary">
              <Star className="h-6 w-6 text-fun-yellow animate-pulse" />
              <span>Buono studio!</span>
              <Star className="h-6 w-6 text-fun-yellow animate-pulse" />
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}