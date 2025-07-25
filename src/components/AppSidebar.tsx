import { NavLink } from "react-router-dom";
import { Home, BookOpen, Calculator, Languages } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

const subjects = [
  { title: "Italiano", url: "/italiano", icon: BookOpen },
  { title: "Matematica", url: "/matematica", icon: Calculator },
  { title: "English", url: "/english", icon: Languages },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar className={`${open ? "w-60" : "w-14"} border-r-4 border-primary/20 shadow-2xl`}>
      <SidebarContent className="bg-background/95 backdrop-blur-sm border-r-4 border-primary/10">
        
        {/* Home Button */}
        <SidebarGroup className="px-3 py-4">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/" className="bg-fun-purple/20 hover:bg-fun-purple/30 text-fun-purple font-bold border-2 border-fun-purple/50 rounded-xl py-3 px-4 shadow-lg">
                    <Home className="h-6 w-6" />
                    {open && <span className="text-lg">🦄 Home Emma</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Subjects */}
        <SidebarGroup className="px-3 py-2">
            <SidebarGroupContent className="space-y-2">
              <SidebarMenu>
                {subjects.map((subject) => (
                  <SidebarMenuItem key={subject.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={subject.url} className="hover:bg-fun-pink/15 text-foreground font-semibold border-2 border-transparent hover:border-fun-pink/30 rounded-lg py-2 px-3 mx-2 transition-all duration-200 shadow-sm hover:shadow-md text-base">
                        <subject.icon className="h-5 w-5" />
                        {open && <span>✨ {subject.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
