import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Breadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  if (pathnames.length === 0) return null;
  
  const breadcrumbItems = [
    { name: '🦄 Home Emma', path: '/', isHome: true },
    ...pathnames.map((pathname, index) => {
      const path = `/${pathnames.slice(0, index + 1).join('/')}`;
      const name = pathname.charAt(0).toUpperCase() + pathname.slice(1);
      
      // Traduzioni specifiche
      const translations: Record<string, string> = {
        'matematica': '🧮 Matematica',
        'italiano': '📚 Italiano', 
        'english': '🌍 English',
        'operazioni': '➕ Operazioni',
        'lettura': '📖 Lettura',
        'vocabulary': '📝 Vocabulary',
        'stories': '📚 Stories',
        'conversation': '🗣️ Speaking',
        'grammatica': '✏️ Grammatica',
        'storia': '🏛️ Storia',
        'geografia': '🌍 Geografia',
        'geometria': '📐 Geometria',
        'misure': '📏 Misure',
      };
      
      return {
        name: translations[pathname] || `✨ ${name}`,
        path,
        isHome: false
      };
    })
  ];
  
  return (
    <nav className="flex items-center space-x-2 p-4 bg-background/50 backdrop-blur-sm border-b border-fun-purple/20">
      {breadcrumbItems.map((item, index) => (
        <div key={item.path} className="flex items-center">
          {index > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground mx-2" />}
          <Button
            variant={index === breadcrumbItems.length - 1 ? "outline" : "ghost"}
            size="sm"
            onClick={() => navigate(item.path)}
            className={`text-sm ${index === breadcrumbItems.length - 1 
              ? 'font-bold text-fun-purple border-fun-purple/30' 
              : 'text-muted-foreground hover:text-fun-purple'
            }`}
          >
            {item.isHome && <Home className="w-4 h-4 mr-1" />}
            {item.name}
          </Button>
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;