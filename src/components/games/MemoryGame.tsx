import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate, useParams } from "react-router-dom";
import { Star, Home, RotateCcw, Brain } from "lucide-react";
import { toast } from "sonner";
import { getGameContent, TopicContent } from "@/lib/gameContent";
import GameCompletionModal from "@/components/GameCompletionModal";

interface MemoryCard {
  id: string;
  content: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryGameProps {
  topicContent: TopicContent;
}

const MemoryGame = ({ topicContent }: MemoryGameProps) => {
  const navigate = useNavigate();
  const { subject } = useParams<{ subject: string }>();
  
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [totalPairs, setTotalPairs] = useState(0);

  const initializeGame = () => {
    const pairs = topicContent.content.memory || [];

    if (pairs.length === 0) {
      console.error("No memory content found for this topic.");
      return;
    }

    setTotalPairs(pairs.length);
    const gameCards: MemoryCard[] = [];
    
    pairs.forEach((pair, index) => {
      gameCards.push({ id: `${index}-a`, content: pair.content, emoji: pair.emoji, isFlipped: false, isMatched: false });
      gameCards.push({ id: `${index}-b`, content: pair.content, emoji: pair.emoji, isFlipped: false, isMatched: false });
    });

    const shuffledCards = [...gameCards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    setCards(shuffledCards);
    setFlippedCards([]);
    setScore(0);
    setMoves(0);
    setGameCompleted(false);
  };

  useEffect(() => {
    initializeGame();
  }, [topicContent]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);

      if (firstCard && secondCard && firstCard.content === secondCard.content) {
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.content === firstCard.content 
              ? { ...card, isMatched: true, isFlipped: true }
              : card
          ));
          setScore(prev => prev + 1);
          setFlippedCards([]);
          
          toast("🌟 Perfetto! Hai trovato una coppia!", { description: "Ottima memoria!" });

          if (score + 1 === totalPairs) {
            setGameCompleted(true);
            toast("🎉 Incredibile! Hai completato tutto!", { description: `Completato in ${moves + 1} mosse!` });
          }
        }, 1000);
      } else {
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
  }, [flippedCards, cards, moves, score, totalPairs]);

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

  const handleNewVariant = () => {
    // Force a new game by reinitializing
    initializeGame();
    setGameCompleted(false);
  };

  const progress = (score / totalPairs) * 100;

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <Button variant="outline" onClick={() => navigate(`/${subject}`)} className="flex items-center gap-2 w-full sm:w-auto">
            <Home className="w-4 h-4" />
            Indietro
          </Button>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-fun-yellow/20 px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-fun-yellow" />
              <span className="font-bold">{score}/{totalPairs}</span>
            </div>
            <div className="flex items-center gap-2 bg-fun-blue/20 px-4 py-2 rounded-full">
              <Brain className="w-5 h-5 text-fun-blue" />
              <span className="font-bold">{moves} mosse</span>
            </div>
            <Button variant="outline" onClick={handleRestart} className="flex items-center gap-2 w-full sm:w-auto">
              <RotateCcw className="w-4 h-4" />
              Ricomincia
            </Button>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-foreground">
            🦄 {topicContent.title} 🧠
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg mb-4">{topicContent.description}</p>
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-sm text-muted-foreground">
            💡 <strong>Come giocare:</strong> Clicca sulle carte per girarle e trova le coppie! Ricorda dove sono per abbinarle tutte.
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <Progress value={progress} className="h-3" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {cards.map((card) => (
            <Card
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square p-2 sm:p-4 cursor-pointer transition-all duration-300 border-4 touch-manipulation ${
                card.isFlipped || card.isMatched
                  ? card.isMatched
                    ? 'bg-fun-green/20 border-fun-green scale-105'
                    : 'bg-fun-blue/20 border-fun-blue'
                  : 'bg-fun-purple/20 border-fun-purple hover:scale-105'
              }`}
            >
              <div className="h-full flex flex-col items-center justify-center">
                <div className="text-2xl sm:text-3xl mb-1">
                  {card.isFlipped || card.isMatched ? card.emoji : "🎴"}
                </div>
                {(card.isFlipped || card.isMatched) && (
                  <div className="text-xs sm:text-sm font-bold text-center leading-tight">
                    {card.content}
                  </div>
                )}
              </div>
            </Card>
          ))}
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

export default MemoryGame;
