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
        // Main subjects
        'matematica': '🧮 Matematica',
        'scienze': '🧬 Scienze',
        'tecnologia': '🔧 Tecnologia',
        'italiano': '📚 Italiano',
        'storia': '🏛️ Storia', 
        'geografia': '🌍 Geografia',
        'english': '🇬🇧 English',
        
        // Mathematics topics
        'numeri-fino-20': '🔢 Numeri fino a 20',
        'addizioni-fino-20': '➕ Addizioni fino a 20',
        'sottrazioni-fino-20': '➖ Sottrazioni fino a 20',
        'problemi-fino-20': '🧩 Problemi fino a 20',
        'spazio-figure-20': '📐 Spazio e Figure',
        'numeri-fino-100': '💯 Numeri fino a 100',
        'operazioni-fino-100': '🔢 Operazioni fino a 100',
        'problemi-fino-100': '🧩 Problemi fino a 100',
        'misure-generali': '📏 Misure',
        'numeri-oltre-1000': '🔢 Numeri oltre 1000',
        'frazioni': '🧩 Frazioni',
        'numeri-decimali': '🔢 Numeri Decimali',
        'geometria-avanzata': '📐 Geometria Avanzata',
        
        // Sciences topics
        'esseri-viventi-non-viventi': '🌱 Esseri Viventi e Non Viventi',
        'cicli-vitali': '🔄 Cicli Vitali',
        'caratteristiche-viventi': '🧬 Caratteristiche Viventi',
        'classificazione-piante-animali': '📊 Classificazione',
        
        // Technology topics
        'materiali-oggetti': '🧱 Materiali e Oggetti',
        'strumenti-misura': '⚖️ Strumenti di Misura',
        'ciclo-vita-prodotti': '♻️ Ciclo Vita Prodotti',
        
        // Italian topics
        'lettura-associazione': '📖 Lettura e Associazione',
        'ascolto-comprensione': '👂 Ascolto e Comprensione',
        'lettura-comprensione': '📚 Lettura e Comprensione',
        'riflessione-linguistica': '✏️ Grammatica e Ortografia',
        
        // History topics
        'relazioni-temporali': '⏰ Relazioni Temporali',
        'fonti-storiche': '📜 Fonti Storiche',
        'preistoria': '🦕 Preistoria',
        'civilta-antiche': '🏛️ Civiltà Antiche',
        
        // Geography topics
        'indicatori-topografici': '🧭 Indicatori Topografici',
        'mappe-geografiche': '🗺️ Mappe Geografiche',
        'tipi-paesaggio': '🏔️ Tipi di Paesaggio',
        'settori-economici': '💼 Settori Economici',
        
        // English topics
        'colors-instructions': '🎨 Colors & Instructions',
        'descriptive-texts': '📝 Descriptive Texts',
        'vocabulary-preferences': '⭐ Vocabulary & Preferences',
        
        // Levels
        'livello1': '🎯 Livello 1',
        'livello2': '🎯 Livello 2',
        'livello3': '🎯 Livello 3',
        'livello4': '🎯 Livello 4',
        'livello5': '🎯 Livello 5',
        'livello6': '🎯 Livello 6',
        'livello7': '🎯 Livello 7',
        'livello8': '🎯 Livello 8',
        'livello9': '🎯 Livello 9',
        'livello10': '🎯 Livello 10',
        
        // Exercise types
        'comprensione': '🧠 Comprensione',
        'associazione-parole': '🔗 Associazione Parole',
        'narrativa': '📖 Narrativa',
        'grammatica': '✏️ Grammatica',
        'ortografia': '📝 Ortografia',
        'descrizioni': '📝 Descrizioni',
        'ascolto-colori': '🎨 Ascolto e Colori',
        'istruzioni': '📋 Istruzioni',
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