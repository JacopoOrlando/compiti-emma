import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, BookOpen, Calculator, History, Globe, Languages, 
  Ruler, Shapes, PenTool, Star, Palette
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
    title: "Matematica",
    icon: Calculator,
    topics: [
      { title: "Numeri fino a 20", url: "/matematica/numeri-fino-20", icon: Calculator },
      { title: "Addizioni fino a 20", url: "/matematica/addizioni-fino-20", icon: PenTool },
      { title: "Sottrazioni fino a 20", url: "/matematica/sottrazioni-fino-20", icon: Shapes },
      { title: "Problemi fino a 20", url: "/matematica/problemi-fino-20", icon: BookOpen },
      { title: "Spazio e Figure", url: "/matematica/spazio-figure-20", icon: Shapes },
      { title: "Numeri fino a 100", url: "/matematica/numeri-fino-100", icon: Calculator },
      { title: "Operazioni fino a 100", url: "/matematica/operazioni-fino-100", icon: PenTool },
      { title: "Frazioni", url: "/matematica/frazioni", icon: Shapes },
      { title: "Numeri Decimali", url: "/matematica/numeri-decimali", icon: PenTool },
      { title: "Geometria Avanzata", url: "/matematica/geometria-avanzata", icon: Shapes },
    ]
  },
  {
    title: "Scienze",
    icon: Globe,
    topics: [
      { title: "Esseri Viventi e Non Viventi", url: "/scienze/esseri-viventi-non-viventi", icon: Globe },
      { title: "Cicli Vitali", url: "/scienze/cicli-vitali", icon: BookOpen },
      { title: "Caratteristiche Viventi", url: "/scienze/caratteristiche-viventi", icon: Shapes },
      { title: "Classificazione", url: "/scienze/classificazione-piante-animali", icon: Globe },
    ]
  },
  {
    title: "Tecnologia",
    icon: Shapes,
    topics: [
      { title: "Materiali e Oggetti", url: "/tecnologia/materiali-oggetti", icon: Shapes },
      { title: "Strumenti di Misura", url: "/tecnologia/strumenti-misura", icon: Ruler },
      { title: "Ciclo Vita Prodotti", url: "/tecnologia/ciclo-vita-prodotti", icon: Globe },
    ]
  },
  {
    title: "Italiano",
    icon: BookOpen,
    topics: [
      { title: "Lettura e Associazione", url: "/italiano/lettura-associazione", icon: BookOpen },
      { title: "Ascolto e Comprensione", url: "/italiano/ascolto-comprensione", icon: Languages },
      { title: "Lettura e Comprensione", url: "/italiano/lettura-comprensione", icon: PenTool },
      { title: "Riflessione Linguistica", url: "/italiano/riflessione-linguistica", icon: Star },
    ]
  },
  {
    title: "Storia", 
    icon: History,
    topics: [
      { title: "Relazioni Temporali", url: "/storia/relazioni-temporali", icon: History },
      { title: "Fonti Storiche", url: "/storia/fonti-storiche", icon: BookOpen },
      { title: "Preistoria", url: "/storia/preistoria", icon: Shapes },
      { title: "Civiltà Antiche", url: "/storia/civilta-antiche", icon: Globe },
    ]
  },
  {
    title: "Geografia", 
    icon: Globe,
    topics: [
      { title: "Indicatori Topografici", url: "/geografia/indicatori-topografici", icon: Globe },
      { title: "Mappe Geografiche", url: "/geografia/mappe-geografiche", icon: Ruler },
      { title: "Tipi di Paesaggio", url: "/geografia/tipi-paesaggio", icon: Shapes },
      { title: "Settori Economici", url: "/geografia/settori-economici", icon: Calculator },
    ]
  },
  {
    title: "English", 
    icon: Languages,
    topics: [
      { title: "Colors & Instructions", url: "/english/colors-instructions", icon: Palette },
      { title: "Descriptive Texts", url: "/english/descriptive-texts", icon: BookOpen },
      { title: "Vocabulary & Preferences", url: "/english/vocabulary-preferences", icon: Star },
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
        {subjects.slice(1).map((subject) => (
        <SidebarGroup key={subject.title} className="px-3 py-2">
          <SidebarGroupLabel className="flex items-center gap-3 text-xl font-bold text-fun-purple bg-fun-purple/10 rounded-xl p-4 border-2 border-fun-purple/30 mb-4 shadow-lg animate-pulse-gentle">
            <subject.icon className="h-7 w-7" />
            {open && <span>🌈 {subject.title}</span>}
            </SidebarGroupLabel>
            
            {subject.topics && (
              <SidebarGroupContent className="space-y-2">
                <SidebarMenu>
                  {subject.topics.map((topic) => (
                    <SidebarMenuItem key={topic.title}>
                      <SidebarMenuButton asChild>
                        <NavLink to={topic.url} className="hover:bg-fun-pink/15 text-foreground font-semibold border-2 border-transparent hover:border-fun-pink/30 rounded-lg py-2 px-3 mx-2 transition-all duration-200 shadow-sm hover:shadow-md text-base">
                          <topic.icon className="h-5 w-5" />
                          {open && <span>✨ {topic.title}</span>}
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
          <div className="mt-auto p-6 text-center bg-fun-purple/5 mx-3 rounded-xl border-2 border-fun-purple/20">
            <div className="flex items-center justify-center gap-2 text-lg font-bold text-fun-purple">
              <Star className="h-6 w-6 text-fun-yellow animate-pulse" />
              <span>🦄 Studia con Emma! 🌈</span>
              <Star className="h-6 w-6 text-fun-yellow animate-pulse" />
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}