import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Star, Home, RotateCcw, Target, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { getGameContent } from "@/lib/gameContent";

interface MatchingPair {
  id: string;
  left: { text: string; emoji: string };
  right: { text: string; emoji: string };
}

interface DragItem {
  id: string;
  text: string;
  emoji: string;
  pairId: string;
  isMatched: boolean;
}

const MatchingGame = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { subject, topic, level } = useParams<{ subject: string; topic: string; level: string }>();
  
  const [leftItems, setLeftItems] = useState<DragItem[]>([]);
  const [rightItems, setRightItems] = useState<DragItem[]>([]);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [dragOverTarget, setDragOverTarget] = useState<string | null>(null);

  const initializeGame = () => {
    const currentLevel = level?.replace('livello', '') || '1';
    const gameContent = getGameContent(subject || "", topic || "", currentLevel);
    
    const pairs = gameContent?.matching?.map((pair, index) => ({
      id: `pair-${index}`,
      left: { text: pair.left, emoji: pair.emoji || "🎯" },
      right: { text: pair.right, emoji: pair.emoji || "✨" },
    })) || [];

    if (pairs.length === 0) {
      // Handle case where no content is found
      // You might want to show a message or navigate away
      console.error("No matching content found for this level.");
      return;
    }

    const leftItems = pairs.map((pair, index) => ({
      ...pair.left,
      id: `left-${index}`,
      pairId: pair.id,
      isMatched: false
    }));

    const rightItems = pairs.map((pair, index) => ({
      ...pair.right,
      id: `right-${index}`,
      pairId: pair.id,
      isMatched: false
    }));

    const shuffledRight = [...rightItems];
    for (let i = shuffledRight.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledRight[i], shuffledRight[j]] = [shuffledRight[j], shuffledRight[i]];
    }
    
    setLeftItems(leftItems);
    setRightItems(shuffledRight);
    setMatches({});
    setScore(0);
    setGameCompleted(false);
    setDraggedItem(null);
    setDragOverTarget(null);
  };

  useEffect(() => {
    initializeGame();
  }, [subject, topic, level]);

  const playMatchSound = () => {
    if ('AudioContext' in window || 'webkitAudioContext' in window) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 523.25;
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      } catch (e) {
        console.error("Could not play sound", e);
      }
    }
  };

  const handleDragStart = (item: DragItem) => setDraggedItem(item);
  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    setDragOverTarget(targetId);
  };
  const handleDragLeave = () => setDragOverTarget(null);
  const handleDrop = (e: React.DragEvent, targetItem: DragItem) => {
    e.preventDefault();
    setDragOverTarget(null);
    performMatch(targetItem);
  };
  const handleTouchStart = (item: DragItem) => {
    setDraggedItem(item);
    navigator.vibrate?.(50);
  };
  const handleTouchEnd = (e: React.TouchEvent, targetItem: DragItem) => {
    e.preventDefault();
    if (draggedItem) performMatch(targetItem);
  };

  const performMatch = (targetItem: DragItem) => {
    if (!draggedItem) return;

    if (draggedItem.pairId === targetItem.pairId) {
      setMatches(prev => ({ ...prev, [draggedItem.pairId]: targetItem.pairId }));
      setLeftItems(prev => prev.map(item => item.pairId === draggedItem.pairId ? { ...item, isMatched: true } : item));
      setRightItems(prev => prev.map(item => item.pairId === targetItem.pairId ? { ...item, isMatched: true } : item));
      setScore(prev => prev + 1);
      
      playMatchSound();
      toast("🌟 Perfetto! Abbinamento corretto!", { description: "Ottimo lavoro! Continua così!", duration: 2000 });

      if (Object.keys(matches).length + 1 >= leftItems.length) {
        setGameCompleted(true);
        setTimeout(() => toast("🎉 Fantastico! Hai completato tutti gli abbinamenti!", { description: `Punteggio finale: ${score + 1}/${leftItems.length}`, duration: 4000 }), 500);
      }
    } else {
      toast("🤗 Quasi! Prova un altro abbinamento", { description: "Sei sulla strada giusta!", duration: 2000 });
    }
    
    setDraggedItem(null);
  };

  const handleRestart = () => {
    initializeGame();
    toast("🦄 Nuovo gioco iniziato!", { description: "Buona fortuna!" });
  };

  const progress = (score / (leftItems.length || 1)) * 100;

  const readInstructions = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("Trascina gli elementi dalla colonna di sinistra e rilasciali nella colonna di destra per creare gli abbinamenti corretti!");
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
  };

  if (leftItems.length === 0) {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
            <Card className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Caricamento...</h2>
                <p>Stiamo preparando gli esercizi per te!</p>
            </Card>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-3 md:p-4 lg:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 md:mb-6 gap-3 md:gap-4">
          <Button variant="outline" onClick={() => navigate(-1)} className="flex items-center gap-2 text-base md:text-lg px-4 md:px-6 py-2 md:py-3">
            <Home className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Indietro</span>
          </Button>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2 bg-fun-yellow/20 px-3 md:px-4 py-2 rounded-full border-2 border-fun-yellow/50">
              <Star className="w-5 h-5 md:w-6 md:h-6 text-fun-yellow" />
              <span className="font-bold text-lg md:text-xl">{score}/{leftItems.length}</span>
            </div>
            <Button variant="outline" onClick={readInstructions} className="flex items-center gap-2 text-sm" title="Ascolta le istruzioni">
              <Volume2 className="w-4 h-4" />
              <span className="hidden sm:inline">Aiuto</span>
            </Button>
            <Button variant="outline" onClick={handleRestart} className="flex items-center gap-2 text-lg px-4 py-2">
              <RotateCcw className="w-5 h-5" />
              <span className="hidden sm:inline">Riprova</span>
            </Button>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 text-foreground">
            🦄 Gioco degli Abbinamenti 🎯
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-3 md:mb-4 px-4">
            Trascina gli elementi per creare gli abbinamenti corretti!
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span className="font-bold">Abbinamenti completati: {score}</span>
            <span className="font-bold">{Math.round(progress)}% fatto!</span>
          </div>
          <Progress value={progress} className="h-4 border-2 border-primary/20" />
        </div>

        {/* Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 lg:gap-6 xl:gap-8 mb-6 md:mb-8">
          {/* Left Column */}
          <Card className="p-3 md:p-4 lg:p-6 border-4 border-fun-blue/30">
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 text-center text-foreground flex items-center justify-center gap-2">
              <span className="text-xl md:text-2xl">👆</span> Prendi da qui
            </h3>
            <div className="space-y-2 md:space-y-3">
              {leftItems.map((item) => (
                <div
                  key={item.id}
                  draggable={!item.isMatched}
                  onDragStart={() => handleDragStart(item)}
                  onTouchStart={() => handleTouchStart(item)}
                  className={`p-3 md:p-4 lg:p-6 border-4 rounded-xl cursor-pointer transition-all duration-300 touch-manipulation animate-fade-in ${
                    item.isMatched
                      ? 'bg-fun-green/30 border-fun-green scale-95 opacity-60'
                      : draggedItem?.id === item.id
                      ? 'bg-fun-blue/30 border-fun-blue scale-105 shadow-xl animate-bounce'
                      : 'bg-muted border-dashed border-primary hover:border-primary hover:bg-primary/5 hover:scale-105 active:scale-95'
                  }`}
                >
                  <div className="flex items-center gap-2 md:gap-3 justify-center">
                    <span className="text-2xl md:text-3xl lg:text-4xl">{item.emoji}</span>
                    <span className="font-bold text-base md:text-lg lg:text-xl">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Right Column */}
          <Card className="p-4 md:p-6 border-4 border-fun-green/30">
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-center text-foreground flex items-center justify-center gap-2">
              <span className="text-2xl">🎯</span> Rilascia qui
            </h3>
            <div className="space-y-3">
              {rightItems.map((item) => (
                <div
                  key={item.id}
                  onDragOver={(e) => handleDragOver(e, item.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, item)}
                  onTouchEnd={(e) => handleTouchEnd(e, item)}
                  className={`p-4 md:p-6 border-4 rounded-xl transition-all duration-300 min-h-[80px] touch-manipulation ${
                    item.isMatched
                      ? 'bg-fun-green/30 border-fun-green scale-95'
                      : dragOverTarget === item.id
                      ? 'bg-fun-purple/30 border-fun-purple scale-105 shadow-xl animate-pulse'
                      : 'bg-muted border-dashed border-primary hover:border-primary hover:bg-primary/5 hover:scale-105'
                  }`}
                >
                  <div className="flex items-center gap-3 justify-center">
                    <span className="text-3xl md:text-4xl">{item.emoji}</span>
                    <span className="font-bold text-lg md:text-xl">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Game Completed */}
        {gameCompleted && (
          <Card className="p-6 md:p-8 text-center border-4 border-fun-green shadow-2xl animate-bounce-gentle">
            <div className="w-24 h-24 bg-fun-green rounded-full flex items-center justify-center mx-auto mb-6 animate-spin-slow">
              <Target className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              🎉 Fantastico! Hai completato tutto! 🎉
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6">
              Punteggio perfetto: {score}/{leftItems.length} abbinamenti! 🌟
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <But
