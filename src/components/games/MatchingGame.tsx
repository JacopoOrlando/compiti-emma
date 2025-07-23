import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Star, Home, RotateCcw, Target } from "lucide-react";
import { toast } from "sonner";

interface MatchingPair {
  id: string;
  left: { text: string; emoji: string };
  right: { text: string; emoji: string };
  subject: string;
}

interface DragItem {
  id: string;
  text: string;
  emoji: string;
  isMatched: boolean;
}

const MatchingGame = () => {
  const navigate = useNavigate();
  const [leftItems, setLeftItems] = useState<DragItem[]>([]);
  const [rightItems, setRightItems] = useState<DragItem[]>([]);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [gameType, setGameType] = useState<'math' | 'words' | 'colors'>('math');

  const mathPairs: MatchingPair[] = [
    { id: "1", left: { text: "5 + 3", emoji: "🔢" }, right: { text: "8", emoji: "🎯" }, subject: "math" },
    { id: "2", left: { text: "10 - 4", emoji: "🔢" }, right: { text: "6", emoji: "🎯" }, subject: "math" },
    { id: "3", left: { text: "3 × 2", emoji: "🔢" }, right: { text: "6", emoji: "🎯" }, subject: "math" },
    { id: "4", left: { text: "12 ÷ 3", emoji: "🔢" }, right: { text: "4", emoji: "🎯" }, subject: "math" },
    { id: "5", left: { text: "7 + 2", emoji: "🔢" }, right: { text: "9", emoji: "🎯" }, subject: "math" },
  ];

  const wordPairs: MatchingPair[] = [
    { id: "1", left: { text: "Gatto", emoji: "🐱" }, right: { text: "Cat", emoji: "🇬🇧" }, subject: "words" },
    { id: "2", left: { text: "Cane", emoji: "🐶" }, right: { text: "Dog", emoji: "🇬🇧" }, subject: "words" },
    { id: "3", left: { text: "Casa", emoji: "🏠" }, right: { text: "House", emoji: "🇬🇧" }, subject: "words" },
    { id: "4", left: { text: "Sole", emoji: "☀️" }, right: { text: "Sun", emoji: "🇬🇧" }, subject: "words" },
    { id: "5", left: { text: "Acqua", emoji: "💧" }, right: { text: "Water", emoji: "🇬🇧" }, subject: "words" },
  ];

  const colorPairs: MatchingPair[] = [
    { id: "1", left: { text: "Rosso", emoji: "🔴" }, right: { text: "Red", emoji: "🇬🇧" }, subject: "colors" },
    { id: "2", left: { text: "Blu", emoji: "🔵" }, right: { text: "Blue", emoji: "🇬🇧" }, subject: "colors" },
    { id: "3", left: { text: "Verde", emoji: "🟢" }, right: { text: "Green", emoji: "🇬🇧" }, subject: "colors" },
    { id: "4", left: { text: "Giallo", emoji: "🟡" }, right: { text: "Yellow", emoji: "🇬🇧" }, subject: "colors" },
    { id: "5", left: { text: "Viola", emoji: "🟣" }, right: { text: "Purple", emoji: "🇬🇧" }, subject: "colors" },
  ];

  const getCurrentPairs = () => {
    switch (gameType) {
      case 'math': return mathPairs;
      case 'words': return wordPairs;
      case 'colors': return colorPairs;
      default: return mathPairs;
    }
  };

  const initializeGame = () => {
    const pairs = getCurrentPairs();
    const shuffledRight = [...pairs.map(p => ({ ...p.right, id: p.id, isMatched: false }))].sort(() => Math.random() - 0.5);
    
    setLeftItems(pairs.map(p => ({ ...p.left, id: p.id, isMatched: false })));
    setRightItems(shuffledRight);
    setMatches({});
    setScore(0);
    setGameCompleted(false);
  };

  useEffect(() => {
    initializeGame();
  }, [gameType]);

  const handleDragStart = (item: DragItem) => {
    setDraggedItem(item);
  };

  const handleDrop = (targetItem: DragItem) => {
    if (!draggedItem) return;

    // Check if it's a correct match
    const isCorrectMatch = draggedItem.id === targetItem.id;
    
    if (isCorrectMatch) {
      setMatches(prev => ({ ...prev, [draggedItem.id]: targetItem.id }));
      setLeftItems(prev => prev.map(item => 
        item.id === draggedItem.id ? { ...item, isMatched: true } : item
      ));
      setRightItems(prev => prev.map(item => 
        item.id === targetItem.id ? { ...item, isMatched: true } : item
      ));
      setScore(prev => prev + 1);
      
      toast("🌟 Perfetto! Abbinamento corretto!", {
        description: "Ottimo lavoro!",
      });

      // Check if game is completed
      if (Object.keys(matches).length + 1 >= getCurrentPairs().length) {
        setGameCompleted(true);
        toast("🎉 Complimenti! Hai completato tutti gli abbinamenti!", {
          description: `Punteggio finale: ${score + 1}/${getCurrentPairs().length}`,
        });
      }
    } else {
      toast("🔄 Riprova! Questo abbinamento non è corretto", {
        description: "Continua così!",
      });
    }
    
    setDraggedItem(null);
  };

  const handleRestart = () => {
    initializeGame();
  };

  const progress = (score / getCurrentPairs().length) * 100;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Casa
          </Button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-fun-yellow/20 px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-fun-yellow" />
              <span className="font-bold">{score}/{getCurrentPairs().length}</span>
            </div>
            <Button 
              variant="outline" 
              onClick={handleRestart}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Ricomincia
            </Button>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">
            🦄 Gioco degli Abbinamenti 🎯
          </h1>
          <p className="text-muted-foreground">
            Trascina gli elementi per creare gli abbinamenti corretti!
          </p>
        </div>

        {/* Game Type Selector */}
        <div className="flex justify-center gap-4 mb-8">
          {(['math', 'words', 'colors'] as const).map((type) => (
            <Button
              key={type}
              variant={gameType === type ? "fun" : "outline"}
              onClick={() => setGameType(type)}
              className="capitalize"
            >
              {type === 'math' && '🔢 Matematica'}
              {type === 'words' && '📚 Parole'}
              {type === 'colors' && '🎨 Colori'}
            </Button>
          ))}
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Abbinamenti completati</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Game Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left Column */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 text-center text-foreground">
              🎯 Trascina da qui
            </h3>
            <div className="space-y-3">
              {leftItems.map((item) => (
                <div
                  key={item.id}
                  draggable={!item.isMatched}
                  onDragStart={() => handleDragStart(item)}
                  className={`p-4 border-2 rounded-lg cursor-move transition-all ${
                    item.isMatched
                      ? 'bg-fun-green/20 border-fun-green opacity-50'
                      : 'bg-muted border-dashed border-primary hover:border-primary hover:bg-primary/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="font-bold text-lg">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Right Column */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 text-center text-foreground">
              🎯 Rilascia qui
            </h3>
            <div className="space-y-3">
              {rightItems.map((item) => (
                <div
                  key={item.id}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(item)}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    item.isMatched
                      ? 'bg-fun-green/20 border-fun-green'
                      : 'bg-muted border-dashed border-primary hover:border-primary hover:bg-primary/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="font-bold text-lg">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Game Completed */}
        {gameCompleted && (
          <Card className="p-8 text-center border-4 border-fun-green shadow-card">
            <div className="w-20 h-20 bg-fun-green rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              🎉 Fantastico! Hai completato tutto!
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              Punteggio: {score}/{getCurrentPairs().length} abbinamenti
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleRestart} variant="fun" size="lg">
                Gioca Ancora 🌟
              </Button>
              <Button onClick={() => navigate('/')} variant="outline" size="lg">
                Torna alla Home
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MatchingGame;