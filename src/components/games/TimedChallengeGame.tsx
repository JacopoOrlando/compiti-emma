import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate, useParams } from "react-router-dom";
import { Star, Home, RotateCcw, Timer } from "lucide-react";
import { toast } from "sonner";
import { getGameContent } from "@/lib/gameContent";

interface ChallengeQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  points: number;
  timeLimit: number;
}

const TimedChallengeGame = () => {
  const navigate = useNavigate();
  const { subject, topicId } = useParams<{ subject: string; topicId: string }>();
  
  const [questions, setQuestions] = useState<ChallengeQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<ChallengeQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [showResult, setShowResult] = useState(false);

  const initializeGame = () => {
    const gameContent = getGameContent(subject || "", topicId || "", "");
    const gameQuestions = gameContent?.content.timed || [];
    
    if (gameQuestions.length > 0) {
      setQuestions(gameQuestions);
      startNewQuestion(gameQuestions);
    } else {
      console.error("No timed challenge content found for this topic.");
    }

    setScore(0);
    setQuestionsAnswered(0);
  };

  const startNewQuestion = (questionSet: ChallengeQuestion[]) => {
    const question = questionSet[Math.floor(Math.random() * questionSet.length)];
    setCurrentQuestion(question);
    setTimeLeft(question.timeLimit);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameActive(true);
  };

  useEffect(() => {
    initializeGame();
  }, [subject, topicId]);

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
        startNewQuestion(questions);
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
      const bonusPoints = Math.ceil(timeLeft * 2);
      const totalPoints = currentQuestion.points + bonusPoints;
      setScore(prev => prev + totalPoints);
      
      toast("🌟 Fantastico! Risposta corretta!", {
        description: `+${totalPoints} punti (bonus velocità: +${bonusPoints})`,
      });
    } else {
      toast("❌ Ops! Risposta sbagliata", {
        description: `La risposta corretta era: ${currentQuestion.options[currentQuestion.correctIndex]}`,
      });
    }
    
    setTimeout(() => {
      setQuestionsAnswered(prev => prev + 1);
      if (questionsAnswered + 1 < 10) {
        startNewQuestion(questions);
      }
    }, 2000);
  };

  const handleRestart = () => {
    initializeGame();
  };

  const progress = (questionsAnswered / 10) * 100;
  const timeProgress = currentQuestion ? (timeLeft / currentQuestion.timeLimit) * 100 : 0;
  const topicTitle = gameContentMap[subject!]?.[topicId!]?.title || "Sfida Veloce";


  if (!currentQuestion) return <div>Caricamento...</div>;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button variant="outline" onClick={() => navigate(`/${subject}`)} className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Indietro
          </Button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-fun-yellow/20 px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-fun-yellow" />
              <span className="font-bold">{score}</span>
            </div>
            <Button variant="outline" onClick={handleRestart} className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Ricomincia
            </Button>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">
             🦄 {topicTitle} ⚡
          </h1>
          <p className="text-muted-foreground">
            Rispondi il più velocemente possibile per ottenere più punti!
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Domanda {questionsAnswered + 1} di 10</span>
            <span>{Math.round(progress)}% Completato</span>
          </div>
          <Progress value={progress} className="h-3 mb-4" />
          
          <div className="flex items-center gap-2 mb-2">
            <Timer className="w-4 h-4 text-fun-orange" />
            <span className="font-bold text-fun-orange">{timeLeft}s</span>
          </div>
          <Progress value={timeProgress} className={`h-2 ${timeLeft <= 3 ? 'animate-pulse' : ''}`} />
        </div>

        {/* Question Card */}
        <Card className={`p-8 text-center border-4 shadow-card mb-8 ${ timeLeft <= 3 ? 'border-fun-orange animate-pulse' : 'border-primary/20' }`}>
          <div className="w-16 h-16 bg-fun-orange rounded-full flex items-center justify-center mx-auto mb-6 shadow-fun">
            <Timer className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            {currentQuestion.question}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={`${option}-${index}`}
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
            <Button onClick={handleAnswerSubmit} disabled={selectedAnswer === null} variant="game" size="lg" className="w-full">
              Conferma Risposta ⚡
            </Button>
          ) : questionsAnswered >= 10 ? (
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-foreground">🎉 Sfida completata!</h3>
              <p className="text-xl text-muted-foreground">Punteggio finale: {score} punti</p>
              <div className="flex gap-4 justify-center">
                <Button onClick={handleRestart} variant="fun">Altra Sfida 🌟</Button>
                <Button onClick={() => navigate(`/${subject}`)} variant="outline">Torna agli Argomenti</Button>
              </div>
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
};

export default TimedChallengeGame;
