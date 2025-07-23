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
  operation: '+' | '-' | '*' | '÷';
  answer: number;
  type?: 'basic' | 'advanced' | 'problems';
}

const MathGame = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameType, setGameType] = useState<'basic' | 'advanced' | 'problems' | 'mental'>('basic');

  const generateBasicQuestion = (): Question => {
    const operation = Math.random() > 0.5 ? '+' : '-';
    let num1, num2, answer;
    
    if (operation === '+') {
      num1 = Math.floor(Math.random() * 50) + 1;
      num2 = Math.floor(Math.random() * 50) + 1;
      answer = num1 + num2;
    } else {
      num1 = Math.floor(Math.random() * 50) + 20;
      num2 = Math.floor(Math.random() * num1) + 1;
      answer = num1 - num2;
    }
    
    return { num1, num2, operation, answer, type: 'basic' };
  };

  const generateAdvancedQuestion = (): Question => {
    const operations = ['+', '-', '*', '÷'] as const;
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2, answer;
    
    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * 100) + 1;
        num2 = Math.floor(Math.random() * 100) + 1;
        answer = num1 + num2;
        break;
      case '-':
        num1 = Math.floor(Math.random() * 100) + 50;
        num2 = Math.floor(Math.random() * 50) + 1;
        answer = num1 - num2;
        break;
      case '*':
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        answer = num1 * num2;
        break;
      case '÷':
        answer = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        num1 = answer * num2;
        break;
    }
    
    return { num1, num2, operation, answer, type: 'advanced' };
  };

  const generateProblemQuestion = (): Question => {
    const problems = [
      { text: "Marco ha 15 caramelle. Ne regala 8 ai suoi amici. Quante ne rimangono?", num1: 15, num2: 8, operation: '-' as const, answer: 7 },
      { text: "In classe ci sono 12 bambini e 14 bambine. Quanti bambini ci sono in totale?", num1: 12, num2: 14, operation: '+' as const, answer: 26 },
      { text: "Sara compra 3 pacchi di figurine. Ogni pacco contiene 8 figurine. Quante figurine ha in totale?", num1: 3, num2: 8, operation: '*' as const, answer: 24 },
      { text: "Un autobus trasporta 45 persone. Alla fermata scendono 18 persone. Quante persone rimangono?", num1: 45, num2: 18, operation: '-' as const, answer: 27 }
    ];
    
    const problem = problems[Math.floor(Math.random() * problems.length)];
    return { num1: problem.num1, num2: problem.num2, operation: problem.operation, answer: problem.answer, type: 'problems' };
  };

  const generateMentalQuestion = (): Question => {
    // Calcoli mentali più semplici
    const types = ['double', 'half', 'round'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    switch (type) {
      case 'double':
        const num = Math.floor(Math.random() * 25) + 1;
        return { num1: num, num2: 2, operation: '*', answer: num * 2, type: 'basic' };
      case 'half':
        const evenNum = (Math.floor(Math.random() * 25) + 1) * 2;
        return { num1: evenNum, num2: 2, operation: '÷', answer: evenNum / 2, type: 'basic' };
      default:
        return generateBasicQuestion();
    }
  };

  const generateQuestion = (): Question => {
    switch (gameType) {
      case 'advanced': return generateAdvancedQuestion();
      case 'problems': return generateProblemQuestion();
      case 'mental': return generateMentalQuestion();
      default: return generateBasicQuestion();
    }
  };

  useEffect(() => {
    setCurrentQuestion(generateQuestion());
  }, [gameType]); // Aggiungiamo gameType come dipendenza

  useEffect(() => {
    if (!currentQuestion) {
      setCurrentQuestion(generateQuestion());
    }
  }, []);

  const handleAnswerSubmit = () => {
    if (!currentQuestion || userAnswer === "") return;
    
    console.log("User answer:", userAnswer, "Correct answer:", currentQuestion.answer, "Type:", typeof userAnswer, typeof currentQuestion.answer);
    
    const numAnswer = parseInt(userAnswer);
    const correct = numAnswer === currentQuestion.answer;
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
      toast("🌟 Fantastico! È corretto!", {
        description: "Stai andando alla grande!",
      });
    } else {
      toast("🎯 Bravo! La risposta era " + currentQuestion.answer, {
        description: "Continua a praticare!",
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

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Progresso</span>
            <span className="text-sm text-muted-foreground">{questionsAnswered}/10</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Game Type Selector */}
        <div className="mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button
              variant={gameType === 'basic' ? 'fun' : 'outline'}
              onClick={() => setGameType('basic')}
              className="text-sm py-2"
            >
              🧮 Base
            </Button>
            <Button
              variant={gameType === 'advanced' ? 'fun' : 'outline'}
              onClick={() => setGameType('advanced')}
              className="text-sm py-2"
            >
              🚀 Avanzato
            </Button>
            <Button
              variant={gameType === 'problems' ? 'fun' : 'outline'}
              onClick={() => setGameType('problems')}
              className="text-sm py-2"
            >
              🧠 Problemi
            </Button>
            <Button
              variant={gameType === 'mental' ? 'fun' : 'outline'}
              onClick={() => setGameType('mental')}
              className="text-sm py-2"
            >
              ⚡ Calcolo Mentale
            </Button>
          </div>
        </div>

        {/* Question Card */}
        <Card className="p-8 text-center shadow-card border-4 border-primary/20">
          <h2 className="text-2xl font-bold mb-8 text-foreground">
            {gameType === 'basic' && '🧮 Matematica Base!'}
            {gameType === 'advanced' && '🚀 Matematica Avanzata!'}
            {gameType === 'problems' && '🧠 Risolvi il Problema!'}
            {gameType === 'mental' && '⚡ Calcolo Mentale!'}
          </h2>
          
          <div className="mb-8">
            {gameType === 'problems' ? (
              <div className="text-lg mb-6 p-4 bg-muted/30 rounded-xl">
                {currentQuestion.type === 'problems' && (
                  <p className="text-left">
                    Marco ha 15 caramelle. Ne regala 8 ai suoi amici. Quante ne rimangono?
                  </p>
                )}
              </div>
            ) : (
              <div className="text-6xl font-bold mb-6 text-primary animate-pulse-gentle">
                {currentQuestion.num1} {currentQuestion.operation} {currentQuestion.num2} = ?
              </div>
            )}
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
                  Controlla Risposta! ✓
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className={`text-4xl font-bold ${isCorrect ? 'text-fun-green' : 'text-fun-orange'}`}>
                {isCorrect ? '🎉 Corretto!' : '🎯 Bravo!'}
              </div>
              <div className="text-2xl text-muted-foreground">
                La risposta è: <span className="font-bold text-primary">{currentQuestion.answer}</span>
              </div>
              <Button 
                variant="game" 
                size="lg" 
                onClick={handleNextQuestion}
                className="text-xl py-4 px-8 flex items-center gap-2"
              >
                Prossima Domanda <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </Card>

        {/* Encouragement */}
        <div className="mt-8 text-center">
          <p className="text-lg text-muted-foreground">
            {score >= 8 ? "🏆 Sei una superstar della matematica!" : 
             score >= 5 ? "⭐ Ottimo lavoro! Continua così!" :
             "🌟 Stai imparando benissimo!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MathGame;