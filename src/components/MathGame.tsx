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
  operation: '+' | '-' | '×' | '÷';
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
    const operations = ['+', '-', '×'] as const;
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2, answer;
    
    // Aggiungiamo varietà con diversi pattern di difficoltà
    const pattern = Math.floor(Math.random() * 3);
    
    switch (operation) {
      case '+':
        if (pattern === 0) {
          // Somme semplici
          num1 = Math.floor(Math.random() * 20) + 1; // 1-20
          num2 = Math.floor(Math.random() * 20) + 1; // 1-20
        } else if (pattern === 1) {
          // Somme con decine
          num1 = Math.floor(Math.random() * 5) * 10 + Math.floor(Math.random() * 10); // 0-49
          num2 = Math.floor(Math.random() * 5) * 10 + Math.floor(Math.random() * 10); // 0-49
        } else {
          // Somme più complesse
          num1 = Math.floor(Math.random() * 80) + 20; // 20-99
          num2 = Math.floor(Math.random() * 80) + 20; // 20-99
        }
        answer = num1 + num2;
        break;
      case '-':
        if (pattern === 0) {
          // Sottrazioni semplici
          num1 = Math.floor(Math.random() * 20) + 10; // 10-29
          num2 = Math.floor(Math.random() * 10) + 1; // 1-10
        } else if (pattern === 1) {
          // Sottrazioni con decine
          num1 = Math.floor(Math.random() * 8) * 10 + Math.floor(Math.random() * 10) + 20; // 20-99
          num2 = Math.floor(Math.random() * 3) * 10 + Math.floor(Math.random() * 10); // 0-39
        } else {
          // Sottrazioni complesse
          num1 = Math.floor(Math.random() * 80) + 50; // 50-129
          num2 = Math.floor(Math.random() * 40) + 10; // 10-49
        }
        answer = num1 - num2;
        break;
      case '×':
        if (pattern === 0) {
          // Tabelline base (2-5)
          num1 = Math.floor(Math.random() * 4) + 2; // 2-5
          num2 = Math.floor(Math.random() * 10) + 1; // 1-10
        } else if (pattern === 1) {
          // Moltiplicazioni per 10
          num1 = Math.floor(Math.random() * 10) + 1; // 1-10
          num2 = 10;
        } else {
          // Tabelline medie (6-10)
          num1 = Math.floor(Math.random() * 5) + 6; // 6-10
          num2 = Math.floor(Math.random() * 10) + 1; // 1-10
        }
        answer = num1 * num2;
        break;
    }
    
    return { num1, num2, operation, answer, type: 'basic' };
  };

  const generateAdvancedQuestion = (): Question => {
    const operations = ['+', '-', '×', '÷'] as const;
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
      case '×':
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
      { text: "Sara compra 3 pacchi di figurine. Ogni pacco contiene 8 figurine. Quante figurine ha in totale?", num1: 3, num2: 8, operation: '×' as const, answer: 24 },
      { text: "Un autobus trasporta 45 persone. Alla fermata scendono 18 persone. Quante persone rimangono?", num1: 45, num2: 18, operation: '-' as const, answer: 27 },
      { text: "Lucia ha 6 gruppi di amici. Ogni gruppo ha 4 persone. Quante persone ci sono in totale?", num1: 6, num2: 4, operation: '×' as const, answer: 24 },
      { text: "Al mercato mamma compra 25 mele e 17 pere. Quanta frutta ha comprato?", num1: 25, num2: 17, operation: '+' as const, answer: 42 },
      { text: "Papà aveva 50 euro. Ha speso 23 euro per la spesa. Quanti euro gli rimangono?", num1: 50, num2: 23, operation: '-' as const, answer: 27 },
      { text: "In giardino ci sono 7 aiuole. In ogni aiuola ci sono 9 fiori. Quanti fiori ci sono in totale?", num1: 7, num2: 9, operation: '×' as const, answer: 63 },
      { text: "Anna legge 18 pagine al mattino e 14 pagine al pomeriggio. Quante pagine ha letto in totale?", num1: 18, num2: 14, operation: '+' as const, answer: 32 },
      { text: "In biblioteca ci sono 80 libri. Ne prestano 35. Quanti libri rimangono?", num1: 80, num2: 35, operation: '-' as const, answer: 45 },
      { text: "Il nonno raccoglie 9 cestini di fragole. Ogni cestino contiene 6 fragole. Quante fragole ha raccolto?", num1: 9, num2: 6, operation: '×' as const, answer: 54 },
      { text: "In palestra ci sono 28 bambini e 19 bambine. Quanti bambini ci sono in totale?", num1: 28, num2: 19, operation: '+' as const, answer: 47 }
    ];
    
    const problem = problems[Math.floor(Math.random() * problems.length)];
    return { num1: problem.num1, num2: problem.num2, operation: problem.operation, answer: problem.answer, type: 'problems' };
  };

  const generateMentalQuestion = (): Question => {
    const types = ['double', 'half', 'add10', 'subtract10', 'multiply5', 'count_by'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    switch (type) {
      case 'double':
        const num = Math.floor(Math.random() * 25) + 1;
        return { num1: num, num2: 2, operation: '×', answer: num * 2, type: 'basic' };
      case 'half':
        const evenNum = (Math.floor(Math.random() * 25) + 1) * 2;
        return { num1: evenNum, num2: 2, operation: '÷', answer: evenNum / 2, type: 'basic' };
      case 'add10':
        const baseNum = Math.floor(Math.random() * 90) + 1;
        return { num1: baseNum, num2: 10, operation: '+', answer: baseNum + 10, type: 'basic' };
      case 'subtract10':
        const startNum = Math.floor(Math.random() * 80) + 20;
        return { num1: startNum, num2: 10, operation: '-', answer: startNum - 10, type: 'basic' };
      case 'multiply5':
        const factor = Math.floor(Math.random() * 12) + 1;
        return { num1: factor, num2: 5, operation: '×', answer: factor * 5, type: 'basic' };
      default: // count_by
        const step = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
        const times = Math.floor(Math.random() * 8) + 2;
        return { num1: step, num2: times, operation: '×', answer: step * times, type: 'basic' };
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
    console.log("Game type changed to:", gameType);
    const newQuestion = generateQuestion();
    console.log("Generated question for new game type:", newQuestion);
    setCurrentQuestion(newQuestion);
    setUserAnswer("");
    setShowResult(false);
    setIsCorrect(false);
  }, [gameType]); // Rigenerare quando cambia il tipo di gioco

  useEffect(() => {
    if (!currentQuestion) {
      console.log("No current question, generating initial question");
      const initialQuestion = generateQuestion();
      console.log("Initial question generated:", initialQuestion);
      setCurrentQuestion(initialQuestion);
    }
  }, []);

  const handleAnswerSubmit = () => {
    if (!currentQuestion || userAnswer === "") return;
    
    console.log("=== ANSWER SUBMISSION ===");
    console.log("Current question:", currentQuestion);
    console.log("User answer:", userAnswer, "Type:", typeof userAnswer);
    console.log("Correct answer:", currentQuestion.answer, "Type:", typeof currentQuestion.answer);
    console.log("Question: ", currentQuestion.num1, currentQuestion.operation, currentQuestion.num2, "=", currentQuestion.answer);
    
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
      toast("❌ Ops! La risposta era " + currentQuestion.answer, {
        description: "Riprova con la prossima!",
      });
    }
    
    setQuestionsAnswered(questionsAnswered + 1);
  };

  const handleNextQuestion = () => {
    console.log("=== GENERATING NEXT QUESTION ===");
    console.log("Current game type:", gameType);
    const newQuestion = generateQuestion();
    console.log("New question generated:", newQuestion);
    console.log("Calculation check:", newQuestion.num1, newQuestion.operation, newQuestion.num2, "should equal", newQuestion.answer);
    setCurrentQuestion(newQuestion);
    setUserAnswer("");
    setShowResult(false);
    setIsCorrect(false);
  };

  const handleRestart = () => {
    setScore(0);
    setQuestionsAnswered(0);
    setUserAnswer("");
    setShowResult(false);
    const newQuestion = generateQuestion();
    console.log("Restart - new question:", newQuestion);
    setCurrentQuestion(newQuestion);
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
              <div className={`text-4xl font-bold ${isCorrect ? 'text-fun-green' : 'text-red-500'}`}>
                {isCorrect ? '🎉 Corretto!' : '❌ Sbagliato!'}
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