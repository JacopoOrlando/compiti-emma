import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate, useLocation } from "react-router-dom";
import { Star, Home, RotateCcw, Brain } from "lucide-react";
import { toast } from "sonner";

interface MemoryCard {
  id: string;
  content: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get context from location state
  const subject = location.state?.subject || 'matematica';
  const topic = location.state?.topic || 'operazioni';
  
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameType, setGameType] = useState<'numbers' | 'words' | 'colors'>('numbers');

  const numberPairs = [
    { content: "1", emoji: "1️⃣" },
    { content: "2", emoji: "2️⃣" },
    { content: "3", emoji: "3️⃣" },
    { content: "4", emoji: "4️⃣" },
    { content: "5", emoji: "5️⃣" },
    { content: "6", emoji: "6️⃣" },
  ];

  const wordPairs = [
    { content: "GATTO", emoji: "🐱" },
    { content: "CANE", emoji: "🐶" },
    { content: "CASA", emoji: "🏠" },
    { content: "SOLE", emoji: "☀️" },
    { content: "LUNA", emoji: "🌙" },
    { content: "MARE", emoji: "🌊" },
  ];

  const colorPairs = [
    { content: "ROSSO", emoji: "🔴" },
    { content: "BLU", emoji: "🔵" },
    { content: "VERDE", emoji: "🟢" },
    { content: "GIALLO", emoji: "🟡" },
    { content: "VIOLA", emoji: "🟣" },
    { content: "ARANCIONE", emoji: "🟠" },
  ];

  // ENGLISH PAIRS - CRITICAL FIX
  const englishPairs = [
    { content: "CAT", emoji: "🐱" },
    { content: "DOG", emoji: "🐶" },
    { content: "HOUSE", emoji: "🏠" },
    { content: "SUN", emoji: "☀️" },
    { content: "MOON", emoji: "🌙" },
    { content: "WATER", emoji: "💧" },
  ];

  const getCurrentPairs = () => {
    // Context-aware content selection
    if (subject === 'english') {
      return topic === 'vocabulary' ? englishPairs : colorPairs;
    } else if (subject === 'matematica') {
      return numberPairs;
    } else {
      // Default based on gameType
      switch (gameType) {
        case 'numbers': return numberPairs;
        case 'words': return wordPairs;
        case 'colors': return colorPairs;
        default: return numberPairs;
      }
    }
  };

  const initializeGame = () => {
    const pairs = getCurrentPairs();
    const gameCards: MemoryCard[] = [];
    
    pairs.forEach((pair, index) => {
      // Add content card
      gameCards.push({
        id: `${index}-content`,
        content: pair.content,
        emoji: pair.content,
        isFlipped: false,
        isMatched: false,
      });
      
      // Add emoji card
      gameCards.push({
        id: `${index}-emoji`,
        content: pair.content,
        emoji: pair.emoji,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle cards
    const shuffledCards = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setScore(0);
    setMoves(0);
    setGameCompleted(false);
  };

  useEffect(() => {
    // Set appropriate game type based on subject context
    if (subject === 'english') {
      setGameType('words');
    } else if (subject === 'matematica') {
      setGameType('numbers');
    }
    initializeGame();
  }, [gameType, subject, topic]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);

      if (firstCard && secondCard && firstCard.content === secondCard.content) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.content === firstCard.content 
              ? { ...card, isMatched: true, isFlipped: true }
              : card
          ));
          setScore(prev => prev + 1);
          setFlippedCards([]);
          
          toast("🌟 Perfetto! Hai trovato una coppia!", {
            description: "Ottima memoria!",
          });

          // Check if game is completed
          const matchedCards = cards.filter(card => card.isMatched).length + 2;
          if (matchedCards >= cards.length) {
            setGameCompleted(true);
            toast("🎉 Incredibile! Hai completato tutto!", {
              description: `Completato in ${moves + 1} mosse!`,
            });
          }
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            flippedCards.includes(card.id) 
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards, moves]);

  const handleCardClick = (cardId: string) => {
    if (flippedCards.length >= 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));
    setFlippedCards(prev => [...prev, cardId]);
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
            <div className="flex items-center gap-2 bg-fun-blue/20 px-4 py-2 rounded-full">
              <Brain className="w-5 h-5 text-fun-blue" />
              <span className="font-bold">{moves} mosse</span>
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
            🦄 {subject === 'english' ? 'English Memory Game' : 'Gioco della Memoria'} 🧠
          </h1>
          <p className="text-muted-foreground">
            {subject === 'english' 
              ? 'Find pairs by flipping cards! Train your memory!' 
              : 'Trova le coppie girando le carte! Allena la tua memoria!'}
          </p>
        </div>

        {/* Game Type Selector - Context Aware */}
        <div className="flex justify-center gap-4 mb-8">
          {subject === 'english' ? (
            <div className="text-center">
              <span className="inline-block px-6 py-3 bg-fun-purple/20 rounded-full border-2 border-fun-purple text-fun-purple font-bold">
                🇬🇧 English Memory
              </span>
            </div>
          ) : (
            (['numbers', 'words', 'colors'] as const).map((type) => (
            <Button
              key={type}
              variant={gameType === type ? "fun" : "outline"}
              onClick={() => setGameType(type)}
              className="capitalize"
            >
              {type === 'numbers' && '🔢 Numeri'}
              {type === 'words' && '📚 Parole'}
              {type === 'colors' && '🎨 Colori'}
            </Button>
          )))}
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Coppie trovate</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {cards.map((card) => (
            <Card
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square p-4 cursor-pointer transition-all duration-300 border-4 ${
                card.isFlipped || card.isMatched
                  ? card.isMatched
                    ? 'bg-fun-green/20 border-fun-green scale-105'
                    : 'bg-fun-blue/20 border-fun-blue'
                  : 'bg-fun-purple/20 border-fun-purple hover:scale-105'
              }`}
            >
              <div className="h-full flex items-center justify-center">
                {card.isFlipped || card.isMatched ? (
                  <div className="text-center">
                    <div className="text-3xl mb-2">{card.emoji}</div>
                    <div className="text-sm font-bold">{card.content}</div>
                  </div>
                ) : (
                  <div className="text-4xl">🎴</div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Game Completed */}
        {gameCompleted && (
          <Card className="p-8 text-center border-4 border-fun-green shadow-card">
            <div className="w-20 h-20 bg-fun-green rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              🎉 Incredibile memoria! Hai vinto!
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              Completato in {moves} mosse con {score}/{getCurrentPairs().length} coppie!
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

export default MemoryGame;