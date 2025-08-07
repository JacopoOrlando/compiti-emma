import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate, useParams } from "react-router-dom";
import { Star, Home, RotateCcw, Target } from "lucide-react";
import { toast } from "sonner";
import { TopicContent, getGameContent } from "@/lib/gameContent";
import GameCompletionModal from "@/components/GameCompletionModal";

interface DragItem {
  id: string;
  text: string;
  emoji: string;
  pairId: string;
  isMatched: boolean;
}

interface MatchingGameProps {
  topicContent: TopicContent;
}

const MatchingGame = ({ topicContent }: MatchingGameProps) => {
  const navigate = useNavigate();
  const { subject } = useParams<{ subject: string }>();
  
  const [leftItems, setLeftItems] = useState<DragItem[]>([]);
  const [rightItems, setRightItems] = useState<DragItem[]>([]);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [dragOverTarget, setDragOverTarget] = useState<string | null>(null);

  const initializeGame = () => {
    const pairs = topicContent.content.matching?.map((pair, index) => ({
      id: `pair-${index}`,
      left: { text: pair.left, emoji: pair.leftEmoji || "" },
      right: { text: pair.right, emoji: pair.emoji || "✨" },
    })) || [];

    if (pairs.length === 0) {
      console.error("No matching content found for this topic.");
      setLeftItems([]);
      return;
    }

    const leftSideItems = pairs.map((pair, index) => ({ ...pair.left, id: `left-${index}`, pairId: pair.id, isMatched: false }));
    const rightSideItems = pairs.map((pair, index) => ({ ...pair.right, id: `right-${index}`, pairId: pair.id, isMatched: false }));

    const shuffledRight = [...rightSideItems].sort(() => Math.random() - 0.5);
    
    setLeftItems(leftSideItems);
    setRightItems(shuffledRight);
    setMatches({});
    setScore(0);
    setGameCompleted(false);
    setDraggedItem(null);
    setDragOverTarget(null);
  };

  useEffect(() => {
    initializeGame();
  }, [topicContent]);

  const performMatch = (targetItem: DragItem) => {
    if (!draggedItem) return;

    if (draggedItem.pairId === targetItem.pairId) {
      setMatches(prev => ({ ...prev, [draggedItem.pairId]: targetItem.pairId }));
      setLeftItems(prev => prev.map(item => item.pairId === draggedItem.pairId ? { ...item, isMatched: true } : item));
      setRightItems(prev => prev.map(item => item.pairId === targetItem.pairId ? { ...item, isMatched: true } : item));
      setScore(prev => prev + 1);
      
      toast.success("Perfetto! Abbinamento corretto!");

      if (Object.keys(matches).length + 1 >= leftItems.length) {
        setGameCompleted(true);
        toast.success("Fantastico! Hai completato tutti gli abbinamenti!");
      }
    } else {
      toast.error("❌ Abbinamento sbagliato!", {
        description: `"${draggedItem.text}" non si abbina con "${targetItem.text}". Riprova!`,
        duration: 3000
      });
    }
    
    setDraggedItem(null);
  };

  const handleDragStart = (item: DragItem) => setDraggedItem(item);
  const handleDragOver = (e: React.DragEvent, targetId: string) => { e.preventDefault(); setDragOverTarget(targetId); };
  const handleDragLeave = () => setDragOverTarget(null);
  const handleDrop = (e: React.DragEvent, targetItem: DragItem) => { e.preventDefault(); setDragOverTarget(null); performMatch(targetItem); };
  const handleTouchStart = (item: DragItem) => { setDraggedItem(item); navigator.vibrate?.(50); };
  const handleTouchEnd = (e: React.TouchEvent, targetItem: DragItem) => { e.preventDefault(); if (draggedItem) performMatch(targetItem); };
  const handleRestart = () => initializeGame();
  
  const handleNewVariant = () => {
    // Force a new game by reinitializing
    initializeGame();
    setGameCompleted(false);
  };
  const progress = (score / (leftItems.length || 1)) * 100;

  if (leftItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="p-8 text-center">
          <div className="animate-spin text-4xl mb-4">🎮</div>
          <h2 className="text-2xl font-bold mb-4">Caricamento gioco...</h2>
          <p>Preparazione in corso...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <Button variant="outline" onClick={() => navigate(`/${subject}`)} className="flex items-center gap-2 w-full sm:w-auto">
            <Home className="w-4 h-4" /> Indietro
          </Button>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-fun-yellow/20 px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-fun-yellow" />
              <span className="font-bold">{score}/{leftItems.length}</span>
            </div>
            <Button variant="outline" onClick={handleRestart} className="flex items-center gap-2 w-full sm:w-auto">
              <RotateCcw className="w-4 h-4" /> Ricomincia
            </Button>
          </div>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-foreground">🦄 {topicContent.title} 🎯</h1>
          <p className="text-muted-foreground text-base sm:text-lg mb-4">{topicContent.description}</p>
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-sm text-muted-foreground">
            💡 <strong>Come giocare:</strong> Su mobile: tocca un elemento a sinistra, poi tocca quello corrispondente a destra. Su desktop: trascina e rilascia!
          </div>
        </div>
        <div className="mb-8">
          <Progress value={progress} className="h-4 border-2 border-primary/20" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-4 sm:p-6 border-4 border-fun-blue/30">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-center">Prendi da qui</h3>
            <div className="space-y-3">
              {leftItems.map((item) => (
                <div 
                  key={item.id} 
                  draggable={!item.isMatched} 
                  onDragStart={() => handleDragStart(item)} 
                  onTouchStart={() => handleTouchStart(item)} 
                  className={`p-4 border-4 rounded-xl cursor-pointer transition-all touch-manipulation ${item.isMatched ? 'bg-fun-green/30 border-fun-green opacity-60' : 'bg-muted border-dashed border-primary hover:bg-primary/10'}`}
                >
                  <div className="flex items-center gap-3 justify-center">
                    <span className="text-2xl sm:text-3xl">{item.emoji}</span>
                    <span className="font-bold text-base sm:text-lg text-center">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-4 sm:p-6 border-4 border-fun-green/30">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-center">Rilascia qui</h3>
            <div className="space-y-3">
              {rightItems.map((item) => (
                <div 
                  key={item.id} 
                  onDragOver={(e) => handleDragOver(e, item.id)} 
                  onDragLeave={handleDragLeave} 
                  onDrop={(e) => handleDrop(e, item)} 
                  onTouchEnd={(e) => handleTouchEnd(e, item)} 
                  className={`p-4 border-4 rounded-xl transition-all min-h-[120px] touch-manipulation ${item.isMatched ? 'bg-fun-green/30 border-fun-green' : dragOverTarget === item.id ? 'bg-fun-purple/30 border-fun-purple' : 'bg-muted border-dashed border-primary hover:bg-accent/10'}`}
                >
                  <div className="flex flex-col items-center gap-2 justify-center">
                    <span className="text-3xl sm:text-5xl leading-tight whitespace-pre-line text-center">{item.text}</span>
                    <span className="text-lg sm:text-xl">{item.emoji}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <GameCompletionModal
          isVisible={gameCompleted}
          score={score}
          onPlayAgain={handleRestart}
          onNewVariant={handleNewVariant}
        />
      </div>
    </div>
  );
};

export default MatchingGame;
