import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Star, Home, RotateCcw, Timer } from "lucide-react";
import { toast } from "sonner";

interface ChallengeQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  points: number;
  timeLimit: number;
}

const TimedChallengeGame = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<ChallengeQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [gameType, setGameType] = useState<'math' | 'quick' | 'logic'>('math');

  const mathQuestions: ChallengeQuestion[] = [
    {
      question: "15 + 7 = ?",
      options: ["20", "22", "23", "25"],
      correctIndex: 1,
      points: 10,
      timeLimit: 8
    },
    {
      question: "8 × 6 = ?",
      options: ["42", "46", "48", "52"],
      correctIndex: 2,
      points: 15,
      timeLimit: 6
    },
    {
      question: "64 ÷ 8 = ?",
      options: ["6", "7", "8", "9"],
      correctIndex: 2,
      points: 20,
      timeLimit: 5
    },
    {
      question: "25 - 17 = ?",
      options: ["6", "7", "8", "9"],
      correctIndex: 2,
      points: 10,
      timeLimit: 6
    },
    {
      question: "12 × 5 = ?",
      options: ["50", "55", "60", "65"],
      correctIndex: 2,
      points: 15,
      timeLimit: 4
    }
  ];

  const quickQuestions: ChallengeQuestion[] = [
    {
      question: "Che colore si ottiene mescolando blu e giallo?",
      options: ["Viola", "Verde", "Arancione", "Rosa"],
      correctIndex: 1,
      points: 10,
      timeLimit: 5
    },
    {
      question: "Quante zampe ha un gatto?",
      options: ["2", "4", "6", "8"],
      correctIndex: 1,
      points: 5,
      timeLimit: 3
    },
    {
      question: "In che stagione cadono le foglie?",
      options: ["Primavera", "Estate", "Autunno", "Inverno"],
      correctIndex: 2,
      points: 10,
      timeLimit: 4
    },
    {
      question: "Che animale fa 'muu'?",
      options: ["Pecora", "Mucca", "Cavallo", "Maiale"],
      correctIndex: 1,
      points: 5,
      timeLimit: 2
    }
  ];

  const logicQuestions: ChallengeQuestion[] = [
    {
      question: "Se oggi è lunedì, che giorno sarà tra 3 giorni?",
      options: ["Mercoledì", "Giovedì", "Venerdì", "Sabato"],
      correctIndex: 1,
      points: 20,
      timeLimit: 8
    },
    {
      question: "Continua la sequenza: 2, 4, 6, 8, ?",
      options: ["9", "10", "11", "12"],
      correctIndex: 1,
      points: 15,
      timeLimit: 6
    },
    {
      question: "Ho 5 mele. Ne mangio 2. Quante ne restano?",
      options: ["2", "3", "4", "5"],
      correctIndex: 1,
      points: 10,
      timeLimit: 5
    }
  ];

  const getCurrentQuestions = () => {
    switch (gameType) {
      case 'math': return mathQuestions;
      case 'quick': return quickQuestions;
      case 'logic': return logicQuestions;
      default: return mathQuestions;
    }
  };

  const generateQuestion = (): ChallengeQuestion => {
    const questions = getCurrentQuestions();
    return questions[Math.floor(Math.random() * questions.length)];
  };

  const startNewQuestion = () => {
    const question = generateQuestion();
    setCurrentQuestion(question);
    setTimeLeft(question.timeLimit);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameActive(true);
  };

  useEffect(() => {
    startNewQuestion();
  }, [gameType]);

  useEffect(() => {
    if (timeLeft > 0 && gameActive && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameActive) {
      handleTimeUp();
    }
  }, [timeLeft, gameActive, showResult]);

  const handleTimeUp = () => {
    setGameActive(false);
    setShowResult(true);
    toast("⏰ Tempo scaduto!", {
      description: "Riprova più velocemente!",
    });
    
    setTimeout(() => {
      setQuestionsAnswered(prev => prev + 1);
      if (questionsAnswered + 1 < 10) {
        startNewQuestion();
      }
    }, 2000);
  };

  const handleAnswerSelect = (index: number) => {
    if (!gameActive || showResult) return;
    setSelectedAnswer(index);
  };

  const handleAnswerSubmit = () => {
    if (!currentQuestion || selectedAnswer === null || !gameActive) return;
    
    setGameActive(false);
    setShowResult(true);
    
    const correct = selectedAnswer === currentQuestion.correctIndex;
    
    if (correct) {
      const bonusPoints = Math.ceil(timeLeft * 2); // Bonus for speed
      const totalPoints = currentQuestion.points + bonusPoints;
      setScore(prev => prev + totalPoints);
      
      toast("🌟 Fantastico! Risposta corretta!", {
        description: `+${totalPoints} punti (bonus velocità: +${bonusPoints})`,
      });
    } else {
      toast("❌ Ops! Risposta sbagliata", {
        description: "Prova la prossima!",
      });
    }
    
    setTimeout(() => {
      setQuestionsAnswered(prev => prev + 1);
      if (questionsAnswered + 1 < 10) {
        startNewQuestion();
      }
    }, 2000);
  };

  const handleRestart = () => {
    setScore(0);
    setQuestionsAnswered(0);
    startNewQuestion();
  };

  const progress = (questionsAnswered / 10) * 100;
  const timeProgress = currentQuestion ? (timeLeft / currentQuestion.timeLimit) * 100 : 0;

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
            <div className="flex items-center gap-2 bg-fun-yellow/20 px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-fun-yellow" />
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

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">
            🦄 Sfida Veloce ⚡
          </h1>
          <p className="text-muted-foreground">
            Rispondi il più velocemente possibile per ottenere più punti!
          </p>
        </div>

        {/* Game Type Selector */}
        <div className="flex justify-center gap-4 mb-8">
          {(['math', 'quick', 'logic'] as const).map((type) => (
            <Button
              key={type}
              variant={gameType === type ? "fun" : "outline"}
              onClick={() => setGameType(type)}
              className="capitalize"
            >
              {type === 'math' && '🔢 Matematica'}
              {type === 'quick' && '⚡ Veloce'}
              {type === 'logic' && '🧠 Logica'}
            </Button>
          ))}
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Domanda {questionsAnswered + 1} di 10</span>
            <span>{Math.round(progress)}% Completato</span>
          </div>
          <Progress value={progress} className="h-3 mb-4" />
          
          {/* Timer */}
          <div className="flex items-center gap-2 mb-2">
            <Timer className="w-4 h-4 text-fun-orange" />
            <span className="font-bold text-fun-orange">{timeLeft}s</span>
          </div>
          <Progress 
            value={timeProgress} 
            className={`h-2 ${timeLeft <= 2 ? 'animate-pulse' : ''}`}
          />
        </div>

        {/* Question Card */}
        <Card className={`p-8 text-center border-4 shadow-card mb-8 ${
          timeLeft <= 2 ? 'border-fun-orange animate-pulse' : 'border-primary/20'
        }`}>
          <div className="w-16 h-16 bg-fun-orange rounded-full flex items-center justify-center mx-auto mb-6 shadow-fun">
            <Timer className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            {currentQuestion.question}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? "fun" : "outline"}
                onClick={() => handleAnswerSelect(index)}
                disabled={!gameActive || showResult}
                className="p-4 text-lg h-auto"
              >
                {option}
              </Button>
            ))}
          </div>

          {!showResult && gameActive ? (
            <Button 
              onClick={handleAnswerSubmit}
              disabled={selectedAnswer === null}
              variant="game"
              size="lg"
              className="w-full"
            >
              Conferma Risposta ⚡
            </Button>
          ) : questionsAnswered >= 10 ? (
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                🎉 Sfida completata!
              </h3>
              <p className="text-xl text-muted-foreground">
                Punteggio finale: {score} punti
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={handleRestart} variant="fun">
                  Altra Sfida 🌟
                </Button>
                <Button onClick={() => navigate('/')} variant="outline">
                  Torna alla Home
                </Button>
              </div>
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
};

export default TimedChallengeGame;