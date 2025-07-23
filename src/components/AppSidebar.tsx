import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, BookOpen, Calculator, History, Globe, Palette, 
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
      { title: "Arte", url: "/italiano/arte", icon: Palette },
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
    isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted/50";

  return (
    <Sidebar className={open ? "w-60" : "w-14"}>
      <SidebarContent className="bg-muted/30">
        
        {/* Home */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/" className={getNavCls}>
                    <Home className="h-5 w-5" />
                    {open && <span>Home</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Subjects */}
        {subjects.slice(1).map((subject) => (
        <SidebarGroup key={subject.title}>
          <SidebarGroupLabel className="flex items-center gap-2 text-lg font-bold">
            <subject.icon className="h-5 w-5" />
            {open && subject.title}
            </SidebarGroupLabel>
            
            {subject.topics && (
              <SidebarGroupContent>
                <SidebarMenu>
                  {subject.topics.map((topic) => (
                    <SidebarMenuItem key={topic.title}>
                      <SidebarMenuButton asChild>
                        <NavLink to={topic.url} className={getNavCls}>
                          <topic.icon className="h-4 w-4" />
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
          <div className="mt-auto p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Star className="h-4 w-4 text-fun-yellow" />
              <span>Buono studio!</span>
              <Star className="h-4 w-4 text-fun-yellow" />
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}