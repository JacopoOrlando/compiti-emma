import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Star, Home, RotateCcw, BookOpen } from "lucide-react";
import { toast } from "sonner";

interface GrammarQuestion {
  question: string;
  sentence: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  type: 'articoli' | 'nomi' | 'verbi' | 'aggettivi';
}

const GrammarGame = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<GrammarQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameType, setGameType] = useState<'articoli' | 'nomi' | 'verbi' | 'aggettivi'>('articoli');

  // Domande sugli articoli determinativi e indeterminativi
  const articoliQuestions: GrammarQuestion[] = [
    {
      question: "Quale articolo va prima di 'casa'?",
      sentence: "... casa è molto bella",
      options: ["Il", "La", "Lo", "Gli"],
      correctIndex: 1,
      explanation: "'Casa' è femminile singolare, quindi si usa 'LA'",
      type: 'articoli'
    },
    {
      question: "Quale articolo va prima di 'bambino'?", 
      sentence: "... bambino gioca nel parco",
      options: ["La", "Il", "Lo", "Le"],
      correctIndex: 1,
      explanation: "'Bambino' è maschile singolare, quindi si usa 'IL'",
      type: 'articoli'
    },
    {
      question: "Quale articolo va prima di 'alberi'?",
      sentence: "... alberi sono verdi",
      options: ["Il", "La", "Gli", "Le"],
      correctIndex: 2,
      explanation: "'Alberi' è maschile plurale, quindi si usa 'GLI'",
      type: 'articoli'
    },
    {
      question: "Quale articolo va prima di 'maestra'?",
      sentence: "... maestra spiega la lezione",
      options: ["Il", "La", "Lo", "Un"],
      correctIndex: 1,
      explanation: "'Maestra' è femminile singolare, quindi si usa 'LA'",
      type: 'articoli'
    },
    {
      question: "Quale articolo va prima di 'zaino'?",
      sentence: "... zaino è pesante",
      options: ["Il", "La", "Lo", "Gli"],
      correctIndex: 2,
      explanation: "'Zaino' inizia per Z, quindi si usa 'LO'",
      type: 'articoli'
    }
  ];

  // Domande sui nomi (singolare/plurale, maschile/femminile)
  const nomiQuestions: GrammarQuestion[] = [
    {
      question: "Qual è il plurale di 'gatto'?",
      sentence: "Ho visto molti ... nel giardino",
      options: ["gatte", "gatti", "gatto", "gattini"],
      correctIndex: 1,
      explanation: "Il plurale di 'gatto' è 'gatti'",
      type: 'nomi'
    },
    {
      question: "Qual è il femminile di 'maestro'?",
      sentence: "La ... insegna matematica",
      options: ["maestra", "maestri", "maestro", "maestressa"],
      correctIndex: 0,
      explanation: "Il femminile di 'maestro' è 'maestra'",
      type: 'nomi'
    },
    {
      question: "Qual è il plurale di 'bambina'?",
      sentence: "Le ... giocano insieme",
      options: ["bambini", "bambina", "bambine", "bambino"],
      correctIndex: 2,
      explanation: "Il plurale di 'bambina' è 'bambine'",
      type: 'nomi'
    },
    {
      question: "Qual è il singolare di 'cani'?",
      sentence: "Il ... abbaia forte",
      options: ["cane", "cani", "cana", "cano"],
      correctIndex: 0,
      explanation: "Il singolare di 'cani' è 'cane'",
      type: 'nomi'
    }
  ];

  // Domande sui verbi (essere/avere, presente)
  const verbiQuestions: GrammarQuestion[] = [
    {
      question: "Quale forma del verbo 'essere' va con 'io'?",
      sentence: "Io ... molto felice",
      options: ["sei", "sono", "è", "siamo"],
      correctIndex: 1,
      explanation: "Con 'io' si usa 'sono' (io sono)",
      type: 'verbi'
    },
    {
      question: "Quale forma del verbo 'avere' va con 'tu'?",
      sentence: "Tu ... un bel cane",
      options: ["ho", "hai", "ha", "hanno"],
      correctIndex: 1,
      explanation: "Con 'tu' si usa 'hai' (tu hai)",
      type: 'verbi'
    },
    {
      question: "Quale forma del verbo 'essere' va con 'loro'?",
      sentence: "Loro ... a scuola",
      options: ["sono", "sei", "è", "siamo"],
      correctIndex: 0,
      explanation: "Con 'loro' si usa 'sono' (loro sono)",
      type: 'verbi'
    },
    {
      question: "Quale forma del verbo 'mangiare' va con 'noi'?",
      sentence: "Noi ... la pizza",
      options: ["mangio", "mangi", "mangia", "mangiamo"],
      correctIndex: 3,
      explanation: "Con 'noi' si usa 'mangiamo' (noi mangiamo)",
      type: 'verbi'
    }
  ];

  // Domande sugli aggettivi
  const aggettiviQuestions: GrammarQuestion[] = [
    {
      question: "Quale aggettivo concorda con 'casa grande'?",
      sentence: "La casa è molto ...",
      options: ["grandi", "grande", "grando", "granda"],
      correctIndex: 1,
      explanation: "'Casa' è femminile singolare, l'aggettivo 'grande' non cambia",
      type: 'aggettivi'
    },
    {
      question: "Quale aggettivo concorda con 'bambini piccoli'?",
      sentence: "I bambini sono ...",
      options: ["piccolo", "piccola", "piccoli", "piccole"],
      correctIndex: 2,
      explanation: "'Bambini' è maschile plurale, quindi 'piccoli'",
      type: 'aggettivi'
    },
    {
      question: "Quale aggettivo concorda con 'bambina bella'?",
      sentence: "La bambina è molto ...",
      options: ["bello", "bella", "belli", "belle"],
      correctIndex: 1,
      explanation: "'Bambina' è femminile singolare, quindi 'bella'",
      type: 'aggettivi'
    }
  ];

  const getAllQuestions = (): GrammarQuestion[] => {
    switch (gameType) {
      case 'articoli':
        return articoliQuestions;
      case 'nomi':
        return nomiQuestions;
      case 'verbi':
        return verbiQuestions;
      case 'aggettivi':
        return aggettiviQuestions;
      default:
        return articoliQuestions;
    }
  };

  const generateQuestion = (): GrammarQuestion => {
    const questions = getAllQuestions();
    return questions[Math.floor(Math.random() * questions.length)];
  };

  useEffect(() => {
    setCurrentQuestion(generateQuestion());
  }, [gameType]);

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
      toast("🌟 Perfetto! Conosci bene la grammatica!", {
        description: currentQuestion.explanation,
      });
    } else {
      toast("📚 Quasi giusto! " + currentQuestion.explanation, {
        description: "Continua a studiare!",
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

  const handleGameTypeChange = (type: 'articoli' | 'nomi' | 'verbi' | 'aggettivi') => {
    setGameType(type);
    setScore(0);
    setQuestionsAnswered(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const progress = (questionsAnswered / 10) * 100;

  if (!currentQuestion) return null;

  const getGameTypeColor = (type: string) => {
    switch (type) {
      case 'articoli': return 'bg-fun-blue';
      case 'nomi': return 'bg-fun-green';
      case 'verbi': return 'bg-fun-orange';
      case 'aggettivi': return 'bg-fun-purple';
      default: return 'bg-fun-blue';
    }
  };

  const getGameTypeEmoji = (type: string) => {
    switch (type) {
      case 'articoli': return '📘';
      case 'nomi': return '📗';
      case 'verbi': return '📙';
      case 'aggettivi': return '📕';
      default: return '📘';
    }
  };

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
            🦄 Grammatica con Emma 📚
          </h1>
          <p className="text-muted-foreground">
            Impara la grammatica italiana con esercizi magici!
          </p>
        </div>

        {/* Game Type Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {(['articoli', 'nomi', 'verbi', 'aggettivi'] as const).map((type) => (
            <Button
              key={type}
              variant={gameType === type ? "fun" : "outline"}
              onClick={() => handleGameTypeChange(type)}
              className={`p-4 text-center ${gameType === type ? 'ring-4 ring-primary/20' : ''}`}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">{getGameTypeEmoji(type)}</span>
                <span className="text-sm font-bold capitalize">{type}</span>
              </div>
            </Button>
          ))}
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Domanda {questionsAnswered + 1} di 10</span>
            <span>{Math.round(progress)}% Completato</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="p-8 text-center border-4 border-primary/20 shadow-card mb-8">
          <div className={`w-16 h-16 ${getGameTypeColor(gameType)} rounded-full flex items-center justify-center mx-auto mb-6 shadow-fun`}>
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            {currentQuestion.question}
          </h2>
          
          <div className="bg-muted/50 p-4 rounded-lg mb-6">
            <p className="text-xl font-mono text-foreground">
              {currentQuestion.sentence}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={`grammar-option-${index}-${option}`}
                variant={selectedAnswer === index ? "fun" : "outline"}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className="p-4 text-lg h-auto"
              >
                {option}
              </Button>
            ))}
          </div>

          {!showResult ? (
            <Button 
              onClick={handleAnswerSubmit}
              disabled={selectedAnswer === null}
              variant="game"
              size="lg"
              className="w-full"
            >
              Conferma Risposta 🌟
            </Button>
          ) : (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${isCorrect ? 'bg-fun-green/20' : 'bg-fun-orange/20'}`}>
                <p className={`font-bold text-lg ${isCorrect ? 'text-fun-green' : 'text-fun-orange'}`}>
                  {isCorrect ? '🌟 Corretto!' : '📚 Non proprio...'}
                </p>
                <p className="text-muted-foreground mt-2">
                  {currentQuestion.explanation}
                </p>
              </div>
              
              {questionsAnswered < 10 ? (
                <Button onClick={handleNextQuestion} variant="game" size="lg" className="w-full">
                  Prossima Domanda 🦄
                </Button>
              ) : (
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">
                    🎉 Hai completato il quiz!
                  </h3>
                  <p className="text-xl text-muted-foreground">
                    Punteggio finale: {score}/10
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button onClick={handleRestart} variant="game">
                      Gioca Ancora 🌟
                    </Button>
                    <Button onClick={() => navigate('/italiano')} variant="outline">
                      Torna a Italiano
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default GrammarGame;