import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Target, Brain, Clock, Shuffle } from "lucide-react";

const Exercise = () => {
  const { subject, topic, level, exercise } = useParams<{ 
    subject: string; 
    topic: string; 
    level: string; 
    exercise: string; 
  }>();
  const navigate = useNavigate();

  // Validazione parametri di sicurezza
  if (!subject || !topic || !level || !exercise) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">🦄 Parametri non validi</h1>
          <p className="text-muted-foreground mb-4">Emma non capisce questo percorso!</p>
          <Button onClick={() => navigate('/')} variant="fun">🏠 Torna a Casa</Button>
        </div>
      </div>
    );
  }

  const gameTypes = [
    {
      id: "matching",
      title: "Abbinamenti",
      description: "Trascina e collega gli elementi correlati",
      icon: Target,
      color: "bg-fun-blue",
      route: "/games/matching",
      difficulty: "Facile",
      estimatedTime: "5-10 min"
    },
    {
      id: "memory",
      title: "Memoria",
      description: "Trova le coppie nascoste girando le carte",
      icon: Brain,
      color: "bg-fun-green",
      route: "/games/memory",
      difficulty: "Medio",
      estimatedTime: "10-15 min"
    },
    {
      id: "timed",
      title: "Sfida Veloce",
      description: "Rispondi il più velocemente possibile",
      icon: Clock,
      color: "bg-fun-orange",
      route: "/games/timed",
      difficulty: "Difficile",
      estimatedTime: "5-8 min"
    }
  ];

  const levelNumber = level.replace('livello', '');
  const topicTitle = topic?.replace('-', ' ')?.split(' ')?.map(word => word.charAt(0).toUpperCase() + word.slice(1))?.join(' ') || '';
  const subjectTitle = subject?.charAt(0).toUpperCase() + subject?.slice(1) || '';
  const exerciseTitle = exercise?.replace('-', ' ')?.split(' ')?.map(word => word.charAt(0).toUpperCase() + word.slice(1))?.join(' ') || '';

  const handleGameStart = (gameRoute: string) => {
    navigate(gameRoute, { 
      state: { 
        subject, 
        topic, 
        level, 
        exercise,
        fullContext: { subject, topic, level, exercise }
      } 
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-4 flex flex-wrap justify-center gap-2">
            <Badge variant="outline" className="text-sm px-3 py-1">
              {subjectTitle}
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              {topicTitle}
            </Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Livello {levelNumber}
            </Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              {exerciseTitle}
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            🦄 Scegli il Tuo Gioco 🎮
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Quale tipo di gioco preferisci? Ogni gioco è un'avventura diversa! ✨
          </p>
        </div>

        {/* Game Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {gameTypes.map((game) => (
            <Card 
              key={game.id}
              className="p-6 text-center hover:shadow-hover transition-all duration-300 transform hover:scale-105 border-4 border-opacity-20 shadow-card cursor-pointer group"
              onClick={() => handleGameStart(game.route)}
            >
              <div className={`w-16 h-16 ${game.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-fun group-hover:animate-wiggle`}>
                <game.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{game.title}</h3>
              <p className="text-muted-foreground mb-4 text-sm">{game.description}</p>
              
              <div className="space-y-2 mb-4">
                <Badge variant="outline" className="text-xs">
                  {game.difficulty}
                </Badge>
                <div className="text-xs text-muted-foreground">
                  ⏱️ {game.estimatedTime}
                </div>
              </div>
              
              <Button variant="game" size="sm" className="w-full">
                <Play className="w-4 h-4 mr-2" />
                Gioca! 🌟
              </Button>
            </Card>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/${subject}/${topic}/${level}`)}
            className="text-lg px-8 py-4"
          >
            ← Torna agli Esercizi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Exercise;