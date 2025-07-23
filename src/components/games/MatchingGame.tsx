import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate, useLocation } from "react-router-dom";
import { Star, Home, RotateCcw, Target, Volume2 } from "lucide-react";
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
  const location = useLocation();
  
  // Get context from location state - FIXED FALLBACKS
  const subject = location.state?.subject || 'italiano';
  const topic = location.state?.topic || 'lettura-associazione';
  
  // DEBUG: Log the current context
  console.log('🔍 MatchingGame Context:', { 
    subject, 
    topic, 
    locationState: location.state,
    pathname: location.pathname 
  });
  
  const [leftItems, setLeftItems] = useState<DragItem[]>([]);
  const [rightItems, setRightItems] = useState<DragItem[]>([]);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [gameType, setGameType] = useState<'math' | 'words' | 'colors'>('math');
  const [dragOverTarget, setDragOverTarget] = useState<string | null>(null);

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

  // PURE ENGLISH PAIRS for English vocabulary
  const englishVocabPairs: MatchingPair[] = [
    { id: "1", left: { text: "Cat", emoji: "🐱" }, right: { text: "Animal", emoji: "🎯" }, subject: "english" },
    { id: "2", left: { text: "Sun", emoji: "☀️" }, right: { text: "Hot", emoji: "🔥" }, subject: "english" },
    { id: "3", left: { text: "Water", emoji: "💧" }, right: { text: "Drink", emoji: "🥤" }, subject: "english" },
    { id: "4", left: { text: "House", emoji: "🏠" }, right: { text: "Home", emoji: "🏡" }, subject: "english" },
    { id: "5", left: { text: "Book", emoji: "📚" }, right: { text: "Read", emoji: "👀" }, subject: "english" },
  ];

  // ENGLISH STORIES PAIRS
  const englishStoryPairs: MatchingPair[] = [
    { id: "1", left: { text: "Once upon", emoji: "📖" }, right: { text: "a time", emoji: "⏰" }, subject: "english" },
    { id: "2", left: { text: "Happy", emoji: "😊" }, right: { text: "Ending", emoji: "🎬" }, subject: "english" },
    { id: "3", left: { text: "Prince", emoji: "🤴" }, right: { text: "Princess", emoji: "👸" }, subject: "english" },
    { id: "4", left: { text: "Magic", emoji: "✨" }, right: { text: "Wand", emoji: "🪄" }, subject: "english" },
    { id: "5", left: { text: "Dragon", emoji: "🐉" }, right: { text: "Castle", emoji: "🏰" }, subject: "english" },
  ];

  const colorPairs: MatchingPair[] = [
    { id: "1", left: { text: "Rosso", emoji: "🔴" }, right: { text: "Red", emoji: "🇬🇧" }, subject: "colors" },
    { id: "2", left: { text: "Blu", emoji: "🔵" }, right: { text: "Blue", emoji: "🇬🇧" }, subject: "colors" },
    { id: "3", left: { text: "Verde", emoji: "🟢" }, right: { text: "Green", emoji: "🇬🇧" }, subject: "colors" },
    { id: "4", left: { text: "Giallo", emoji: "🟡" }, right: { text: "Yellow", emoji: "🇬🇧" }, subject: "colors" },
    { id: "5", left: { text: "Viola", emoji: "🟣" }, right: { text: "Purple", emoji: "🇬🇧" }, subject: "colors" },
  ];

  const getCurrentPairs = () => {
    // Context-aware content selection - FIXED FOR NEW TOPIC IDS
    console.log('📋 getCurrentPairs called with:', { subject, topic });
    
    if (subject === 'english') {
      if (topic === 'colors-instructions') return colorPairs;
      if (topic === 'descriptive-texts') return englishVocabPairs;
      if (topic === 'vocabulary-preferences') return englishStoryPairs;
      return englishVocabPairs; // default for English
    } else if (subject === 'italiano') {
      if (topic === 'lettura-associazione') return wordPairs; // Italian-English word association
      if (topic === 'ascolto-comprensione') return colorPairs; // Listening comprehension with colors
      if (topic === 'lettura-comprensione') return englishVocabPairs; // Reading comprehension
      if (topic === 'riflessione-linguistica') return wordPairs; // Grammar reflection
      return wordPairs;
    } else if (subject === 'storia') {
      return englishStoryPairs; // Historical story elements
    } else if (subject === 'geografia') {
      return colorPairs; // Geographic elements and colors
    } else if (subject === 'matematica') {
      return mathPairs;
    } else {
      // Default based on gameType for legacy support
      switch (gameType) {
        case 'math': return mathPairs;
        case 'words': return wordPairs;
        case 'colors': return colorPairs;
        default: return wordPairs; // Changed default to wordPairs for Italian content
      }
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
    setDraggedItem(null);
    setDragOverTarget(null);
  };

  useEffect(() => {
    // Set appropriate game type based on subject context - UPDATED
    if (subject === 'english') {
      setGameType('words');
    } else if (subject === 'matematica') {
      setGameType('math');
    } else if (subject === 'italiano') {
      setGameType('words');
    } else if (subject === 'storia' || subject === 'geografia') {
      setGameType('colors');
    }
    initializeGame();
  }, [gameType, subject, topic]);

  // Enhanced feedback with audio
  const playMatchSound = () => {
    // Create audio context for positive feedback
    if ('AudioContext' in window || 'webkitAudioContext' in window) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 523.25; // C note
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      } catch (e) {
        // Fallback for browsers that don't support Web Audio API
      }
    }
  };

  // Desktop drag handlers
  const handleDragStart = (item: DragItem) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    setDragOverTarget(targetId);
  };

  const handleDragLeave = () => {
    setDragOverTarget(null);
  };

  const handleDrop = (e: React.DragEvent, targetItem: DragItem) => {
    e.preventDefault();
    setDragOverTarget(null);
    performMatch(targetItem);
  };

  // Touch handlers for mobile
  const handleTouchStart = (item: DragItem) => {
    setDraggedItem(item);
    // Add visual feedback
    navigator.vibrate?.(50); // Haptic feedback if supported
  };

  const handleTouchEnd = (e: React.TouchEvent, targetItem: DragItem) => {
    e.preventDefault();
    if (draggedItem) {
      performMatch(targetItem);
    }
  };

  const performMatch = (targetItem: DragItem) => {
    if (!draggedItem) return;

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
      
      // Enhanced positive feedback
      playMatchSound();
      toast("🌟 Perfetto! Abbinamento corretto!", {
        description: "Ottimo lavoro! Continua così!",
        duration: 2000,
      });

      // Check if game is completed
      if (Object.keys(matches).length + 1 >= getCurrentPairs().length) {
        setGameCompleted(true);
        setTimeout(() => {
          toast("🎉 Fantastico! Hai completato tutti gli abbinamenti!", {
            description: `Punteggio finale: ${score + 1}/${getCurrentPairs().length}`,
            duration: 4000,
          });
        }, 500);
      }
    } else {
      // Gentler negative feedback for children
      toast("🤗 Quasi! Prova un altro abbinamento", {
        description: "Sei sulla strada giusta!",
        duration: 2000,
      });
    }
    
    setDraggedItem(null);
  };

  const handleRestart = () => {
    initializeGame();
    toast("🦄 Nuovo gioco iniziato!", {
      description: "Buona fortuna!",
    });
  };

  const progress = (score / getCurrentPairs().length) * 100;

  // Accessibility: read instructions aloud
  const readInstructions = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        "Trascina gli elementi dalla colonna di sinistra e rilasciali nella colonna di destra per creare gli abbinamenti corretti!"
      );
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-lg px-6 py-3"
          >
            <Home className="w-5 h-5" />
            <span className="hidden sm:inline">Casa</span>
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-fun-yellow/20 px-4 py-2 rounded-full border-2 border-fun-yellow/50">
              <Star className="w-6 h-6 text-fun-yellow" />
              <span className="font-bold text-xl">{score}/{getCurrentPairs().length}</span>
            </div>
            
            <Button 
              variant="outline" 
              onClick={readInstructions}
              className="flex items-center gap-2 text-sm"
              title="Ascolta le istruzioni"
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden sm:inline">Aiuto</span>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleRestart}
              className="flex items-center gap-2 text-lg px-4 py-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span className="hidden sm:inline">Riprova</span>
            </Button>
          </div>
        </div>

        {/* Title - Debug Context for English */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
            🦄 {subject === 'english' ? 'English Matching Game' : 'Gioco degli Abbinamenti'} 🎯
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-4">
            {subject === 'english' 
              ? 'Drag and match the correct pairs!' 
              : 'Trascina gli elementi per creare gli abbinamenti corretti!'}
          </p>
          <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
            💡 <strong>Come giocare:</strong> Prendi un elemento dalla colonna di sinistra e trascinalo verso l'elemento corrispondente nella colonna di destra!
          </p>
        </div>

        {/* Game Type Selector - Simplified for children */}
        <div className="flex justify-center gap-2 md:gap-4 mb-8">
          {(['math', 'words', 'colors'] as const).map((type) => (
            <Button
              key={type}
              variant={gameType === type ? "fun" : "outline"}
              onClick={() => setGameType(type)}
              className="px-4 py-3 text-base md:text-lg font-bold"
            >
              {type === 'math' && '🔢 Calcoli'}
              {type === 'words' && '📚 Parole'}
              {type === 'colors' && '🎨 Colori'}
            </Button>
          ))}
        </div>

        {/* Progress - More visual for children */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span className="font-bold">Abbinamenti completati: {score}</span>
            <span className="font-bold">{Math.round(progress)}% fatto!</span>
          </div>
          <Progress value={progress} className="h-4 border-2 border-primary/20" />
          <div className="flex justify-center mt-2">
            {Array.from({ length: getCurrentPairs().length }, (_, i) => (
              <span key={i} className={`text-2xl mx-1 ${i < score ? 'animate-bounce' : ''}`}>
                {i < score ? '⭐' : '⚪'}
              </span>
            ))}
          </div>
        </div>

        {/* Game Area - Enhanced for touch */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
          {/* Left Column */}
          <Card className="p-4 md:p-6 border-4 border-fun-blue/30">
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-center text-foreground flex items-center justify-center gap-2">
              <span className="text-2xl">👆</span> Prendi da qui
            </h3>
            <div className="space-y-3">
              {leftItems.map((item) => (
                <div
                  key={item.id}
                  draggable={!item.isMatched}
                  onDragStart={() => handleDragStart(item)}
                  onTouchStart={() => handleTouchStart(item)}
                  className={`p-4 md:p-6 border-4 rounded-xl cursor-pointer transition-all duration-300 touch-manipulation ${
                    item.isMatched
                      ? 'bg-fun-green/30 border-fun-green scale-95 opacity-60'
                      : draggedItem?.id === item.id
                      ? 'bg-fun-blue/30 border-fun-blue scale-105 shadow-xl'
                      : 'bg-muted border-dashed border-primary hover:border-primary hover:bg-primary/5 hover:scale-105 active:scale-95'
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
              Punteggio perfetto: {score}/{getCurrentPairs().length} abbinamenti! 🌟
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleRestart} variant="fun" size="lg" className="text-xl px-8 py-4">
                Gioca Ancora 🌟
              </Button>
              <Button onClick={() => navigate('/games', { state: { subject, topic } })} variant="outline" size="lg" className="text-xl px-8 py-4">
                Altri Giochi 🎮
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MatchingGame;