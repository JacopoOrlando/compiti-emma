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
      word: "CAT",
      image: "🐱",
      options: ["DOG", "CAT", "BIRD", "FISH"],
      correctIndex: 1
    },
    {
      word: "SUN",
      image: "☀️",
      options: ["MOON", "STAR", "SUN", "CLOUD"],
      correctIndex: 2
    },
    {
      word: "TREE",
      image: "🌳",
      options: ["TREE", "FLOWER", "GRASS", "LEAF"],
      correctIndex: 0
    },
    {
      word: "BOOK",
      image: "📚",
      options: ["PEN", "PAPER", "BOOK", "DESK"],
      correctIndex: 2
    },
    {
      word: "APPLE",
      image: "🍎",
      options: ["ORANGE", "BANANA", "GRAPE", "APPLE"],
      correctIndex: 3
    },
    {
      word: "HOUSE",
      image: "🏠",
      options: ["HOUSE", "CAR", "BIKE", "PLANE"],
      correctIndex: 0
    },
    {
      word: "BALL",
      image: "⚽",
      options: ["TOY", "BALL", "GAME", "PLAY"],
      correctIndex: 1
    },
    {
      word: "HEART",
      image: "❤️",
      options: ["STAR", "CIRCLE", "HEART", "SQUARE"],
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
      toast("🌟 Perfect! You read it correctly!", {
        description: "Great reading skills!",
      });
    } else {
      toast("📖 Good try! The word was " + currentQuestion.word, {
        description: "Keep practicing reading!",
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
            Home
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
        <Card className="p-8 text-center shadow-card border-4 border-fun-green/20">
          <h2 className="text-2xl font-bold mb-8 text-foreground">
            Reading Time! 📚
          </h2>
          
          <div className="mb-8">
            <div className="text-8xl mb-6 animate-bounce-gentle">
              {currentQuestion.image}
            </div>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-lg text-muted-foreground">What word matches this picture?</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => speakWord(currentQuestion.word)}
                className="flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4" />
                Listen
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
                Check Answer! ✓
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className={`text-4xl font-bold ${isCorrect ? 'text-fun-green' : 'text-fun-orange'}`}>
                {isCorrect ? '🎉 Great Reading!' : '📖 Keep Trying!'}
              </div>
              <div className="text-2xl text-muted-foreground">
                The word is: <span className="font-bold text-fun-green">{currentQuestion.word}</span>
              </div>
              <Button 
                variant="success" 
                size="lg" 
                onClick={handleNextQuestion}
                className="text-xl py-4 px-8"
              >
                Next Word! 📖
              </Button>
            </div>
          )}
        </Card>

        {/* Encouragement */}
        <div className="mt-8 text-center">
          <p className="text-lg text-muted-foreground">
            {score >= 8 ? "📚 You're an amazing reader!" : 
             score >= 5 ? "⭐ Wonderful reading! Keep going!" :
             "🌟 You're learning to read so well!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReadingGame;