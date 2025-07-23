import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Target, Brain, Timer, Puzzle, 
  Book, Gamepad2, Star, Play 
} from "lucide-react";

interface GameStyle {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  route: string;
  difficulty: 'Facile' | 'Medio' | 'Difficile';
  features: string[];
}

interface GameSelectorProps {
  subject?: string;
  topic?: string;
}

const GameSelector = ({ subject, topic }: GameSelectorProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get subject and topic from either props or location state
  const currentSubject = subject || location.state?.subject;
  const currentTopic = topic || location.state?.topic;

  const gameStyles: GameStyle[] = [
    {
      id: "matching",
      title: "Abbinamenti",
      description: "Trascina e collega gli elementi per creare le coppie corrette",
      icon: Target,
      color: "bg-fun-blue",
      route: "/games/matching",
      difficulty: "Facile",
      features: ["Drag & Drop", "Apprendimento visivo", "Feedback immediato"]
    },
    {
      id: "memory",
      title: "Memoria",
      description: "Trova le coppie nascoste e allena la tua memoria",
      icon: Brain,
      color: "bg-fun-purple",
      route: "/games/memory",
      difficulty: "Medio", 
      features: ["Carte da girare", "Allenamento memoria", "Punteggio basato su mosse"]
    },
    {
      id: "timed",
      title: "Sfida Veloce",
      description: "Rispondi rapidamente per ottenere punti bonus!",
      icon: Timer,
      color: "bg-fun-orange",
      route: "/games/timed",
      difficulty: "Difficile",
      features: ["Timer countdown", "Punti bonus velocità", "Pressione temporale"]
    },
    {
      id: "classic",
      title: "Classico",
      description: "Il formato tradizionale con domande a scelta multipla",
      icon: Book,
      color: "bg-fun-green",
      route: getClassicRoute(currentSubject, currentTopic),
      difficulty: "Medio",
      features: ["Domande tradizionali", "Spiegazioni dettagliate", "Progressione graduale"]
    }
  ];

  function getClassicRoute(subject?: string, topic?: string): string {
    if (subject === 'matematica' && topic === 'operazioni') return '/math';
    if (subject === 'italiano' && topic === 'lettura') return '/reading';
    if (subject === 'italiano' && topic === 'grammatica') return '/grammar';
    if (subject === 'italiano' && topic === 'arte') return '/colors';
    if (subject === 'english') return '/reading';
    return '/math'; // fallback
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile': return 'bg-fun-green text-white';
      case 'Medio': return 'bg-fun-orange text-white';
      case 'Difficile': return 'bg-fun-pink text-white';
      default: return 'bg-muted text-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-foreground">
            🦄 Scegli il Tuo Stile di Gioco! 🎮
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ogni stile di gioco offre un modo diverso e divertente di imparare. 
            Quale preferisci oggi?
          </p>
        </div>

        {/* Subject/Topic Info */}
        {currentSubject && currentTopic && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <Gamepad2 className="w-5 h-5 text-primary" />
              <span className="font-bold text-primary capitalize">
                {currentSubject} • {currentTopic}
              </span>
            </div>
          </div>
        )}

        {/* Game Styles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
          {gameStyles.map((game) => (
            <Card 
              key={game.id}
              className="p-6 text-center hover:shadow-hover transition-all duration-300 transform hover:scale-105 border-4 border-opacity-20 shadow-card cursor-pointer group"
              onClick={() => navigate(game.route)}
            >
              {/* Icon */}
              <div className={`w-20 h-20 ${game.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-fun group-hover:animate-wiggle`}>
                <game.icon className="w-10 h-10 text-white" />
              </div>

              {/* Title & Difficulty */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold mb-2 text-foreground">{game.title}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(game.difficulty)}`}>
                  {game.difficulty}
                </span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                {game.description}
              </p>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {game.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Star className="w-3 h-3 text-fun-yellow" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Play Button */}
              <Button variant="game" className="w-full group-hover:scale-105 transition-transform">
                <Play className="w-4 h-4 mr-2" />
                Gioca! 🌟
              </Button>
            </Card>
          ))}
        </div>

        {/* Fun Stats */}
        <Card className="p-8 text-center bg-muted/30 border-4 border-primary/10">
          <h3 className="text-2xl font-bold mb-6 text-foreground">
            🌈 Perché Variare lo Stile di Gioco?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-fun-blue rounded-full flex items-center justify-center mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold mb-2">Stimola Diverse Abilità</h4>
              <p className="text-sm text-muted-foreground">
                Memoria, velocità, ragionamento e creatività
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-fun-green rounded-full flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold mb-2">Mantiene l'Interesse</h4>
              <p className="text-sm text-muted-foreground">
                La varietà rende l'apprendimento sempre divertente
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-fun-purple rounded-full flex items-center justify-center mb-4">
                <Puzzle className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold mb-2">Adatta al Tuo Stile</h4>
              <p className="text-sm text-muted-foreground">
                Trova il metodo che funziona meglio per te
              </p>
            </div>
          </div>
        </Card>

        {/* Back Button */}
        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="text-lg px-8 py-4"
          >
            ← Torna alla Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameSelector;