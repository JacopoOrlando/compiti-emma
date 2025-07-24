import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { 
  Target, Brain, Timer, 
  Book, Gamepad2, Star, Play, Volume2, Home
} from "lucide-react";

interface GameStyle {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  route: string;
  difficulty: 'Facile' | 'Medio' | 'Difficile';
  ageGroup: string;
  estimatedTime: string;
}

interface GameSelectorProps {
  subject?: string;
  topic?: string;
}

const GameSelector = ({ subject, topic }: GameSelectorProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { subject: urlSubject, topic: urlTopic } = useParams<{ subject: string; topic: string }>();
  
  // Get subject and topic from URL params (preferred), props, or location state
  const currentSubject = urlSubject || subject || location.state?.subject;
  const currentTopic = urlTopic || topic || location.state?.topic;

  const gameStyles: GameStyle[] = [
    {
      id: "matching",
      title: "Abbinamenti",
      description: "Trascina e collega per imparare divertendoti",
      icon: Target,
      color: "bg-fun-blue",
      route: currentSubject && currentTopic ? `/${currentSubject}/${currentTopic}/games/matching` : "/games/matching",
      difficulty: "Facile",
      ageGroup: "6+ anni",
      estimatedTime: "5-10 min"
    },
    {
      id: "memory",
      title: "Memoria",
      description: "Trova le coppie e allena la memoria",
      icon: Brain,
      color: "bg-fun-purple",
      route: currentSubject && currentTopic ? `/${currentSubject}/${currentTopic}/games/memory` : "/games/memory",
      difficulty: "Medio", 
      ageGroup: "7+ anni",
      estimatedTime: "5-15 min"
    },
    {
      id: "timed",
      title: "Sfida Veloce",
      description: "Rispondi velocemente per più punti!",
      icon: Timer,
      color: "bg-fun-orange",
      route: currentSubject && currentTopic ? `/${currentSubject}/${currentTopic}/games/timed` : "/games/timed",
      difficulty: "Difficile",
      ageGroup: "8+ anni",
      estimatedTime: "3-8 min"
    },
    {
      id: "classic",
      title: "Classico",
      description: "Domande tradizionali con spiegazioni",
      icon: Book,
      color: "bg-fun-green",
      route: currentSubject && currentTopic ? `/${currentSubject}/${currentTopic}/games/classic` : "/games/classic",
      difficulty: "Medio",
      ageGroup: "6+ anni",
      estimatedTime: "10-20 min"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile': return 'bg-fun-green text-white';
      case 'Medio': return 'bg-fun-orange text-white';
      case 'Difficile': return 'bg-fun-pink text-white';
      default: return 'bg-muted text-foreground';
    }
  };

  // Accessibility: read game descriptions aloud
  const readGameDescription = (game: GameStyle) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `${game.title}. ${game.description}. Difficoltà: ${game.difficulty}. Tempo stimato: ${game.estimatedTime}.`
      );
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
  };

  const readInstructions = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        "Scegli il tuo stile di gioco preferito. Ogni gioco ha un modo diverso e divertente di imparare. Premi su un gioco per iniziare!"
      );
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with better navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-lg px-6 py-3"
          >
            <Home className="w-5 h-5" />
            <span>Casa</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={readInstructions}
            className="flex items-center gap-2"
            title="Ascolta le istruzioni"
          >
            <Volume2 className="w-4 h-4" />
            <span>Ascolta Istruzioni</span>
          </Button>
        </div>

        {/* Title - More engaging for children */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            🦄 Quale Gioco Vuoi Fare? 🎮
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            Ogni gioco è un'avventura diversa! Scegli quello che ti piace di più oggi! ✨
          </p>
          
          {/* Subject/Topic Info - More prominent */}
          {currentSubject && currentTopic && (
            <div className="inline-flex items-center gap-3 bg-primary/10 px-6 py-3 rounded-full border-2 border-primary/20 mb-4">
              <Gamepad2 className="w-6 h-6 text-primary" />
              <span className="font-bold text-primary text-lg capitalize">
                {currentSubject} • {currentTopic}
              </span>
            </div>
          )}
        </div>

        {/* Simplified Game Selection - Better for children */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 max-w-4xl mx-auto">
          {gameStyles.map((game) => (
            <Card 
              key={game.id}
              className="p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-4 border-opacity-20 shadow-card cursor-pointer group bg-gradient-to-br from-background to-muted/30"
              onClick={() => navigate(game.route, { state: { subject: currentSubject, topic: currentTopic } })}
            >
              {/* Icon - Larger and more prominent */}
              <div className={`w-20 h-20 md:w-24 md:h-24 ${game.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-fun group-hover:animate-wiggle`}>
                <game.icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>

              {/* Title & Tags */}
              <div className="mb-4">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">{game.title}</h3>
                <div className="flex flex-wrap justify-center gap-2 mb-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(game.difficulty)}`}>
                    {game.difficulty}
                  </span>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-muted text-foreground">
                    {game.ageGroup}
                  </span>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-fun-blue/20 text-fun-blue">
                    {game.estimatedTime}
                  </span>
                </div>
              </div>

              {/* Description - Simplified for children */}
              <p className="text-muted-foreground mb-6 text-base md:text-lg leading-relaxed">
                {game.description}
              </p>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  variant="game" 
                  className="w-full group-hover:scale-105 transition-transform text-lg md:text-xl py-3 md:py-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(game.route, { state: { subject: currentSubject, topic: currentTopic } });
                  }}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Inizia! 🌟
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    readGameDescription(game);
                  }}
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  Ascolta
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Educational Benefits - Simplified */}
        <Card className="p-6 md:p-8 text-center bg-muted/30 border-4 border-primary/10 mb-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
            🌈 Perché Giocare in Modi Diversi?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-fun-blue rounded-full flex items-center justify-center mb-4">
                <Brain className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h4 className="font-bold text-lg md:text-xl mb-2">Allena la Mente</h4>
              <p className="text-sm md:text-base text-muted-foreground">
                Ogni gioco stimola parti diverse del cervello
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-fun-green rounded-full flex items-center justify-center mb-4">
                <Target className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h4 className="font-bold text-lg md:text-xl mb-2">Sempre Divertente</h4>
              <p className="text-sm md:text-base text-muted-foreground">
                Non ti annoi mai quando cambi stile di gioco!
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-fun-purple rounded-full flex items-center justify-center mb-4">
                <Star className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h4 className="font-bold text-lg md:text-xl mb-2">Impari Meglio</h4>
              <p className="text-sm md:text-base text-muted-foreground">
                Trova il modo che funziona meglio per te!
              </p>
            </div>
          </div>
        </Card>

        {/* Quick Access to Popular Games */}
        <div className="text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground">
            🔥 Giochi Più Popolari
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Button 
              variant="fun" 
              onClick={() => navigate(currentSubject && currentTopic ? `/${currentSubject}/${currentTopic}/games/memory` : '/games/memory')}
              className="text-base md:text-lg px-4 md:px-6 py-2 md:py-3"
            >
              🧠 Memoria
            </Button>
            <Button 
              variant="fun" 
              onClick={() => navigate(currentSubject && currentTopic ? `/${currentSubject}/${currentTopic}/games/matching` : '/games/matching')}
              className="text-base md:text-lg px-4 md:px-6 py-2 md:py-3"
            >
              🎯 Abbinamenti
            </Button>
            <Button 
              variant="fun" 
              onClick={() => navigate(currentSubject && currentTopic ? `/${currentSubject}/${currentTopic}/games/classic` : '/games/classic', { state: { subject: currentSubject, topic: currentTopic } })}
              className="text-base md:text-lg px-4 md:px-6 py-2 md:py-3"
            >
              🔢 Matematica
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSelector;
