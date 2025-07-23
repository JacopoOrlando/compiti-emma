import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Star, Home, RotateCcw, Palette } from "lucide-react";
import { toast } from "sonner";

interface ColorQuestion {
  color: string;
  colorName: string;
  options: string[];
  correctIndex: number;
}

const ColorsGame = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<ColorQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const colorQuestions: ColorQuestion[] = [
    {
      color: "#FF0000",
      colorName: "ROSSO",
      options: ["BLU", "ROSSO", "VERDE", "GIALLO"],
      correctIndex: 1
    },
    {
      color: "#0000FF",
      colorName: "BLU",
      options: ["BLU", "VIOLA", "ROSSO", "ROSA"],
      correctIndex: 0
    },
    {
      color: "#00FF00",
      colorName: "VERDE",
      options: ["GIALLO", "ARANCIONE", "VERDE", "BLU"],
      correctIndex: 2
    },
    {
      color: "#FFFF00",
      colorName: "GIALLO",
      options: ["VERDE", "ARANCIONE", "ROSSO", "GIALLO"],
      correctIndex: 3
    },
    {
      color: "#800080",
      colorName: "VIOLA",
      options: ["VIOLA", "ROSA", "BLU", "ROSSO"],
      correctIndex: 0
    },
    {
      color: "#FFA500",
      colorName: "ARANCIONE",
      options: ["ROSSO", "GIALLO", "ARANCIONE", "ROSA"],
      correctIndex: 2
    },
    {
      color: "#FFC0CB",
      colorName: "ROSA",
      options: ["VIOLA", "ROSSO", "ROSA", "BIANCO"],
      correctIndex: 2
    },
    {
      color: "#000000",
      colorName: "NERO",
      options: ["GRIGIO", "NERO", "MARRONE", "BIANCO"],
      correctIndex: 1
    }
  ];

  const generateQuestion = (): ColorQuestion => {
    return colorQuestions[Math.floor(Math.random() * colorQuestions.length)];
  };

  useEffect(() => {
    setCurrentQuestion(generateQuestion());
  }, []);

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
      toast("🌈 Incredibile! Conosci i tuoi colori!", {
        description: "Sei un esperto di colori!",
      });
    } else {
      toast("🎨 Bravo! Questo colore è " + currentQuestion.colorName, {
        description: "Continua a imparare i colori!",
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
            <div className="flex items-center gap-2 bg-fun-purple/20 px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-fun-purple" />
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
        <Card className="p-8 text-center shadow-card border-4 border-fun-purple/20">
          <h2 className="text-2xl font-bold mb-8 text-foreground flex items-center justify-center gap-2">
            <Palette className="w-8 h-8" />
            Colori e Forme! 🌈
          </h2>
          
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div 
                className="w-32 h-32 rounded-2xl shadow-fun border-4 border-white animate-pulse-gentle"
                style={{ backgroundColor: currentQuestion.color }}
              ></div>
            </div>
            <div className="text-lg text-muted-foreground mb-6">
              Che colore è questo?
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
              <div className={`text-4xl font-bold ${isCorrect ? 'text-fun-purple' : 'text-fun-orange'}`}>
                {isCorrect ? '🎨 Perfetto!' : '🌈 Bravo!'}
              </div>
              <div className="text-2xl text-muted-foreground">
                Questo colore è: <span className="font-bold text-fun-purple">{currentQuestion.colorName}</span>
              </div>
              <div className="flex justify-center">
                <div 
                  className="w-20 h-20 rounded-xl shadow-fun border-2 border-white"
                  style={{ backgroundColor: currentQuestion.color }}
                ></div>
              </div>
              <Button 
                variant="success" 
                size="lg" 
                onClick={handleNextQuestion}
                className="text-xl py-4 px-8"
              >
                Prossimo Colore! 🎨
              </Button>
            </div>
          )}
        </Card>

        {/* Encouragement */}
        <div className="mt-8 text-center">
          <p className="text-lg text-muted-foreground">
            {score >= 8 ? "🎨 Sei un maestro dei colori!" : 
             score >= 5 ? "⭐ Ottimo lavoro con i colori!" :
             "🌈 Stai imparando i colori magnificamente!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColorsGame;