import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate, useParams } from "react-router-dom";
import { Star, Home, RotateCcw, Target, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { getGameContent } from "@/lib/gameContent";

// Interface for a pair of items to be matched
interface MatchingPair {
  id: string;
  left: { text: string; emoji: string };
  right: { text: string; emoji: string };
}

// Interface for a draggable item in the game
interface DragItem {
  id: string;
  text: string;
  emoji: string;
  pairId: string; // To link back to the original pair
  isMatched: boolean;
}

const MatchingGame = () => {
  const navigate = useNavigate();
  // Get subject, topic, and level from the URL
  const { subject, topic, level } = useParams<{ subject: string; topic: string; level: string }>();
  
  // State for the game's items and progress
  const [leftItems, setLeftItems] = useState<DragItem[]>([]);
  const [rightItems, setRightItems] = useState<DragItem[]>([]);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [dragOverTarget, setDragOverTarget] = useState<string | null>(null);

  /**
   * Initializes or resets the game.
   * Fetches content based on URL parameters and sets up the game board.
   */
  const initializeGame = () => {
    // Determine the current level from the URL, defaulting to '1'
    const currentLevel = level?.replace('livello', '') || '1';
    // Fetch the specific game content for the current context
    const gameContent = getGameContent(subject || "", topic || "", currentLevel);
    
    // Create pairs from the fetched content
    const pairs = gameContent?.matching?.map((pair, index) => ({
      id: `pair-${index}`,
      left: { text: pair.left, emoji: pair.emoji || "🎯" },
      right: { text: pair.right, emoji: pair.emoji || "✨" },
    })) || [];

    // Handle cases where no content is found for the level
    if (pairs.length === 0) {
      console.error("No matching content found for this level.");
      // Optionally, navigate back or show an error message
      // For now, we'll just show a loading/error state in the render.
      setLeftItems([]); // Clear items to trigger the loading state
      return;
    }

    // Create the items for the left column
    const leftSideItems = pairs.map((pair, index) => ({
      ...pair.left,
      id: `left-${index}`,
      pairId: pair.id,
      isMatched: false
    }));

    // Create the items for the right column
    const rightSideItems = pairs.map((pair, index) => ({
      ...pair.right,
      id: `right-${index}`,
      pairId: pair.id,
      isMatched: false
    }));

    // Shuffle the right column items for randomness
    const shuffledRight = [...rightSideItems];
    for (let i = shuffledRight.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledRight[i], shuffledRight[j]] = [shuffledRight[j], shuffledRight[i]];
    }
    
    // Set the initial state for the game
    setLeftItems(leftSideItems);
    setRightItems(shuffledRight);
    setMatches({});
    setScore(0);
    setGameCompleted(false);
    setDraggedItem(null);
    setDragOverTarget(null);
  };

  // Initialize the game when the component mounts or the context changes
  useEffect(() => {
    initializeGame();
  }, [subject, topic, level]);

  /**
   * Plays a sound effect for a correct match.
   */
  const playMatchSound = () => {
    if ('AudioContext' in window || 'webkitAudioContext' in window) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 523.25; // C5 note for a pleasant sound
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      } catch (e) {
        console.error("Could not play sound", e);
      }
    }
  };

  // Drag and Drop Event Handlers
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
    navigator.vibrate?.(50); // Haptic feedback on touch devices
  };
  const handleTouchEnd = (e: React.TouchEvent, targetItem: DragItem) => {
    e.preventDefault();
    if (draggedItem) performMatch(targetItem);
  };

  /**
   * Logic to check if a dragged item matches a target item.
   * @param targetItem The item being dropped onto.
   */
  const performMatch = (targetItem: DragItem) => {
    if (!draggedItem) return;

    if (draggedItem.pairId === targetItem.pairId) {
      // Correct match
      setMatches(prev => ({ ...prev, [draggedItem.pairId]: targetItem.pairId }));
      setLeftItems(prev => prev.map(item => item.pairId === draggedItem.pairId ? { ...item, isMatched: true } : item));
      setRightItems(prev => prev.map(item => item.pairId === targetItem.pairId ? { ...item, isMatched: true } : item));
      setScore(prev => prev + 1);
      
      playMatchSound();
      toast("🌟 Perfetto! Abbinamento corretto!", { description: "Ottimo lavoro! Continua così!", duration: 2000 });

      // Check for game completion
      if (Object.keys(matches).length + 1 >= leftItems.length) {
        setGameCompleted(true);
        setTimeout(() => toast("🎉 Fantastico! Hai completato tutti gli abbinamenti!", { description: `Punteggio finale: ${score + 1}/${leftItems.length}`, duration: 4000 }), 500);
      }
    } else {
      // Incorrect match
      toast("🤗 Quasi! Prova un altro abbinamento", { description: "Sei sulla strada giusta!", duration: 2000 });
    }
    
    setDraggedItem(null);
  };

  // Restart the game
  const handleRestart = () => {
    initializeGame();
    toast("🦄 Nuovo gioco iniziato!", { description: "Buona fortuna!" });
  };

  const progress = (score / (leftItems.length || 1)) * 100;

  // Accessibility function to read instructions aloud
  const readInstructions = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("Trascina gli elementi dalla colonna di sinistra e rilasciali nella colonna di destra per creare gli abbinamenti corretti!");
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
  };

  // Loading state while content is being prepared
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
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 text-foreground capitalize">
            🦄 {topic?.replace(/-/g, ' ')} 🎯
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-3 md:mb-4 px-4">
            Trascina gli elementi per creare gli abbinamenti corretti!
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span className="font-bold">Abbinamenti completati: {score}</span>
            <span className="font-bold">{Math.round(progress)}% fatto!</span>
          </div>
          <Progress value={progress} className="h-4 border-2 border-primary/20" />
        </div>

        {/* Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 lg:gap-6 xl:gap-8 mb-6 md:mb-8">
          {/* Left Column (Draggable Items) */}
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

          {/* Right Column (Drop Targets) */}
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

        {/* Game Completed Message */}
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
              <Button onClick={handleRestart} variant="fun" size="lg" className="text-xl px-8 py-4">
                Gioca Ancora 🌟
              </Button>
              <Button onClick={() => navigate(`/${subject}/${topic}`)} variant="outline" size="lg" className="text-xl px-8 py-4">
                Cambia Livello
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MatchingGame;
