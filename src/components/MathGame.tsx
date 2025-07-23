import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Star, Home, RotateCcw, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface Question {
  num1: number;
  num2: number;
  operation: '+' | '-';
  answer: number;
}

const MathGame = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const generateQuestion = (): Question => {
    const operation = Math.random() > 0.5 ? '+' : '-';
    let num1, num2, answer;
    
    if (operation === '+') {
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      answer = num1 + num2;
    } else {
      num1 = Math.floor(Math.random() * 10) + 5; // Ensure positive result
      num2 = Math.floor(Math.random() * num1) + 1;
      answer = num1 - num2;
    }
    
    return { num1, num2, operation, answer };
  };

  useEffect(() => {
    setCurrentQuestion(generateQuestion());
  }, []);

  const handleAnswerSubmit = () => {
    if (!currentQuestion || userAnswer === "") return;
    
    const numAnswer = parseInt(userAnswer);
    const correct = numAnswer === currentQuestion.answer;
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
      toast("🌟 Awesome! That's correct!", {
        description: "You're doing great!",
      });
    } else {
      toast("🎯 Good try! The answer was " + currentQuestion.answer, {
        description: "Keep practicing!",
      });
    }
    
    setQuestionsAnswered(questionsAnswered + 1);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(generateQuestion());
    setUserAnswer("");
    setShowResult(false);
    setIsCorrect(false);
  };

  const handleRestart = () => {
    setScore(0);
    setQuestionsAnswered(0);
    setUserAnswer("");
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
            Home
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
              Restart
            </Button>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">{questionsAnswered}/10</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="p-8 text-center shadow-card border-4 border-primary/20">
          <h2 className="text-2xl font-bold mb-8 text-foreground">
            Math Time! 🧮
          </h2>
          
          <div className="mb-8">
            <div className="text-6xl font-bold mb-6 text-primary animate-pulse-gentle">
              {currentQuestion.num1} {currentQuestion.operation} {currentQuestion.num2} = ?
            </div>
          </div>

          {!showResult ? (
            <div className="space-y-6">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-32 h-16 text-3xl text-center border-4 border-primary/30 rounded-xl focus:border-primary focus:outline-none"
                placeholder="?"
                autoFocus
              />
              <div>
                <Button 
                  variant="fun" 
                  size="lg" 
                  onClick={handleAnswerSubmit}
                  disabled={userAnswer === ""}
                  className="text-xl py-4 px-8"
                >
                  Check Answer! ✓
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className={`text-4xl font-bold ${isCorrect ? 'text-fun-green' : 'text-fun-orange'}`}>
                {isCorrect ? '🎉 Correct!' : '🎯 Good Try!'}
              </div>
              <div className="text-2xl text-muted-foreground">
                The answer is: <span className="font-bold text-primary">{currentQuestion.answer}</span>
              </div>
              <Button 
                variant="game" 
                size="lg" 
                onClick={handleNextQuestion}
                className="text-xl py-4 px-8 flex items-center gap-2"
              >
                Next Question <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </Card>

        {/* Encouragement */}
        <div className="mt-8 text-center">
          <p className="text-lg text-muted-foreground">
            {score >= 8 ? "🏆 You're a math superstar!" : 
             score >= 5 ? "⭐ Great job! Keep going!" :
             "🌟 You're learning so well!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MathGame;