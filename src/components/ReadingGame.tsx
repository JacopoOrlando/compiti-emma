import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Star, Home, RotateCcw, Volume2 } from "lucide-react";
import { toast } from "sonner";

interface WordQuestion {
  word: string;
  image: string;
  options: string[];
  correctIndex: number;
}

const ReadingGame = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<WordQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const wordQuestions: WordQuestion[] = [
    {
      word: "GATTO",
      image: "🐱",
      options: ["CANE", "GATTO", "UCCELLO", "PESCE"],
      correctIndex: 1
    },
    {
      word: "SOLE",
      image: "☀️",
      options: ["LUNA", "STELLA", "SOLE", "NUVOLA"],
      correctIndex: 2
    },
    {
      word: "ALBERO",
      image: "🌳",
      options: ["ALBERO", "FIORE", "ERBA", "FOGLIA"],
      correctIndex: 0
    },
    {
      word: "LIBRO",
      image: "📚",
      options: ["PENNA", "CARTA", "LIBRO", "SCRIVANIA"],
      correctIndex: 2
    },
    {
      word: "MELA",
      image: "🍎",
      options: ["ARANCIA", "BANANA", "UVA", "MELA"],
      correctIndex: 3
    },
    {
      word: "CASA",
      image: "🏠",
      options: ["CASA", "AUTO", "BICI", "AEREO"],
      correctIndex: 0
    },
    {
      word: "PALLA",
      image: "⚽",
      options: ["GIOCO", "PALLA", "PARTITA", "GIOCARE"],
      correctIndex: 1
    },
    {
      word: "CUORE",
      image: "❤️",
      options: ["STELLA", "CERCHIO", "CUORE", "QUADRATO"],
      correctIndex: 2
    }
  ];

  const generateQuestion = (): WordQuestion => {
    return wordQuestions[Math.floor(Math.random() * wordQuestions.length)];
  };

  useEffect(() => {
    setCurrentQuestion(generateQuestion());
  }, []);

  const speakWord = (word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.7;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
    }
  };

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleAnswerSubmit = () => {
    if (!currentQuestion || selectedAnswer === null) return;
    
    const correct = selectedAnswer === currentQuestion.correctIndex;
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
      toast("🌟 Perfetto! Hai letto correttamente!", {
        description: "Ottime capacità di lettura!",
      });
    } else {
      toast("📖 Bravo! La parola era " + currentQuestion.word, {
        description: "Continua a praticare la lettura!",
      });
    }
    
    setQuestionsAnswered(questionsAnswered + 1);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(generateQuestion());
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  const handleRestart = () => {
    setScore(0);
    setQuestionsAnswered(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentQuestion(generateQuestion());
  };

  const progress = (questionsAnswered / 10) * 100;

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
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
            <div className="flex items-center gap-2 bg-fun-green/20 px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-fun-green" />
              <span className="font-bold">{score}</span>
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

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Progresso</span>
            <span className="text-sm text-muted-foreground">{questionsAnswered}/10</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="p-8 text-center shadow-card border-4 border-fun-green/20">
          <h2 className="text-2xl font-bold mb-8 text-foreground">
            Ora di Lettura! 📚
          </h2>
          
          <div className="mb-8">
            <div className="text-8xl mb-6 animate-bounce-gentle">
              {currentQuestion.image}
            </div>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-lg text-muted-foreground">Quale parola corrisponde a questa immagine?</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => speakWord(currentQuestion.word)}
                className="flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4" />
                Ascolta
              </Button>
            </div>
          </div>

          {!showResult ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === index ? "fun" : "outline"}
                    size="lg"
                    onClick={() => handleAnswerSelect(index)}
                    className="text-xl py-6 px-4 font-bold border-2"
                  >
                    {option}
                  </Button>
                ))}
              </div>
              <Button 
                variant="game" 
                size="lg" 
                onClick={handleAnswerSubmit}
                disabled={selectedAnswer === null}
                className="text-xl py-4 px-8"
              >
                Controlla Risposta! ✓
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className={`text-4xl font-bold ${isCorrect ? 'text-fun-green' : 'text-fun-orange'}`}>
                {isCorrect ? '🎉 Brava Lettura!' : '📖 Continua a Provare!'}
              </div>
              <div className="text-2xl text-muted-foreground">
                La parola è: <span className="font-bold text-fun-green">{currentQuestion.word}</span>
              </div>
              <Button 
                variant="success" 
                size="lg" 
                onClick={handleNextQuestion}
                className="text-xl py-4 px-8"
              >
                Prossima Parola! 📖
              </Button>
            </div>
          )}
        </Card>

        {/* Encouragement */}
        <div className="mt-8 text-center">
          <p className="text-lg text-muted-foreground">
            {score >= 8 ? "📚 Sei un lettore incredibile!" : 
             score >= 5 ? "⭐ Lettura meravigliosa! Continua!" :
             "🌟 Stai imparando a leggere benissimo!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReadingGame;