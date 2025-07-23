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

  // Frasi più complesse per seconda elementare
  const sentenceQuestions: WordQuestion[] = [
    {
      word: "IL GATTO BIANCO DORME COMODAMENTE SUL DIVANO ROSSO",
      image: "🐱💤🛋️",
      options: ["Il gatto mangia sul tavolo", "Il gatto bianco dorme comodamente sul divano rosso", "Il cane corre nel giardino", "Il gatto gioca con la palla"],
      correctIndex: 1
    },
    {
      word: "LA BAMBINA CURIOSA LEGGE ATTENTAMENTE UN LIBRO INTERESSANTE",
      image: "👧📖✨",
      options: ["La bambina canta una canzone", "La bambina disegna un fiore", "La bambina curiosa legge attentamente un libro interessante", "La bambina balla nella stanza"],
      correctIndex: 2
    },
    {
      word: "IL SOLE SPLENDE BRILLANTEMENTE NEL CIELO AZZURRO",
      image: "☀️🌤️💙",
      options: ["Il sole splende brillantemente nel cielo azzurro", "La luna brilla di notte", "Le stelle cadono velocemente", "La neve cade silenziosamente"],
      correctIndex: 0
    },
    {
      word: "I BAMBINI ALLEGRI GIOCANO FELICEMENTE NEL GRANDE PARCO VERDE",
      image: "👦👧🌳🎮",
      options: ["I bambini studiano in biblioteca", "I bambini dormono nel letto", "I bambini mangiano la merenda", "I bambini allegri giocano felicemente nel grande parco verde"],
      correctIndex: 3
    },
    {
      word: "LA MAESTRA GENTILE SPIEGA CHIARAMENTE LA LEZIONE INTERESSANTE",
      image: "👩‍🏫📚✨",
      options: ["La maestra gentile spiega chiaramente la lezione interessante", "Il dottore visita il paziente", "La nonna cucina la torta", "Il nonno legge il giornale"],
      correctIndex: 0
    }
  ];

  // Domande di comprensione più avanzate
  const comprehensionQuestions: WordQuestion[] = [
    {
      word: "COSA FA L'UCCELLO?",
      image: "🐦🌳",
      options: ["Nuota", "Vola tra gli alberi", "Cammina", "Dorme"],
      correctIndex: 1
    },
    {
      word: "DOVE VIVONO I PESCI?",
      image: "🐠🌊",
      options: ["Nel cielo", "Sulla terra", "Nell'acqua", "Sugli alberi"],
      correctIndex: 2
    },
    {
      word: "CHE COLORE HA L'ERBA?",
      image: "🌱",
      options: ["Blu", "Rosso", "Verde", "Giallo"],
      correctIndex: 2
    },
    {
      word: "QUANDO USIAMO L'OMBRELLO?",
      image: "☔☂️",
      options: ["Quando piove", "Quando splende il sole", "Di notte", "In inverno"],
      correctIndex: 0
    }
  ];

  // Sillabe e suoni per secondo livello
  const syllableQuestions: WordQuestion[] = [
    {
      word: "CA-SA",
      image: "🏠",
      options: ["CA-NE", "CA-SA", "GA-TO", "SO-LE"],
      correctIndex: 1
    },
    {
      word: "MA-ESTRA",
      image: "👩‍🏫",
      options: ["MA-ESTRA", "BA-MBINA", "SCU-OLA", "LI-BRO"],
      correctIndex: 0
    },
    {
      word: "BIC-CLETTA",
      image: "🚲",
      options: ["AU-TO", "TRENO", "BIC-CLETTA", "AEREO"],
      correctIndex: 2
    }
  ];

  const [gameType, setGameType] = useState<'words' | 'sentences' | 'comprehension' | 'syllables'>('words');
  
  const getAllQuestions = () => {
    switch (gameType) {
      case 'sentences': return sentenceQuestions;
      case 'comprehension': return comprehensionQuestions;
      case 'syllables': return syllableQuestions;
      default: return [
        {
          word: "DINOSAURO",
          image: "🦕",
          options: ["COCCODRILLO", "DINOSAURO", "ELEFANTE", "RINOCERONTE"],
          correctIndex: 1
        },
        {
          word: "AUTOMOBILE", 
          image: "🚗",
          options: ["MOTOCICLETTA", "AUTOMOBILE", "AUTOBUS", "CAMION"],
          correctIndex: 1
        },
        {
          word: "FARFALLA",
          image: "🦋", 
          options: ["FARFALLA", "LIBELLULA", "UCCELLINO", "PIPISTRELLO"],
          correctIndex: 0
        },
        {
          word: "ASTRONAUTA",
          image: "👨‍🚀",
          options: ["PILOTA", "DOTTORE", "ASTRONAUTA", "POMPIERE"],
          correctIndex: 2
        },
        {
          word: "GIRASOLE",
          image: "🌻",
          options: ["MARGHERITA", "TULIPANO", "ROSA", "GIRASOLE"],
          correctIndex: 3
        },
        {
          word: "PRINCIPESSA",
          image: "👸",
          options: ["PRINCIPESSA", "REGINA", "BALLERINA", "MAESTRA"],
          correctIndex: 0
        }
      ];
    }
  };

  const generateQuestion = (): WordQuestion => {
    const questions = getAllQuestions();
    return questions[Math.floor(Math.random() * questions.length)];
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

        {/* Game Type Selector */}
        <div className="mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button
              variant={gameType === 'words' ? 'fun' : 'outline'}
              onClick={() => setGameType('words')}
              className="text-sm py-2"
            >
              📝 Parole
            </Button>
            <Button
              variant={gameType === 'sentences' ? 'fun' : 'outline'}
              onClick={() => setGameType('sentences')}
              className="text-sm py-2"
            >
              📖 Frasi
            </Button>
            <Button
              variant={gameType === 'comprehension' ? 'fun' : 'outline'}
              onClick={() => setGameType('comprehension')}
              className="text-sm py-2"
            >
              🧠 Comprensione
            </Button>
            <Button
              variant={gameType === 'syllables' ? 'fun' : 'outline'}
              onClick={() => setGameType('syllables')}
              className="text-sm py-2"
            >
              🔤 Sillabe
            </Button>
          </div>
        </div>

        {/* Question Card */}
        <Card className="p-8 text-center shadow-card border-4 border-fun-green/20">
          <h2 className="text-2xl font-bold mb-8 text-foreground">
            {gameType === 'words' && '📝 Lettura Parole!'}
            {gameType === 'sentences' && '📖 Leggiamo le Frasi!'}
            {gameType === 'comprehension' && '🧠 Comprensione!'}
            {gameType === 'syllables' && '🔤 Dividiamo in Sillabe!'}
          </h2>
          
          <div className="mb-8">
            <div className="text-8xl mb-6 animate-bounce-gentle">
              {currentQuestion.image}
            </div>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-lg text-muted-foreground">
                {gameType === 'words' && 'Quale parola corrisponde a questa immagine?'}
                {gameType === 'sentences' && 'Qual è la frase corretta?'}
                {gameType === 'comprehension' && 'Scegli la risposta giusta!'}
                {gameType === 'syllables' && 'Come si divide questa parola?'}
              </span>
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
                    className={`${gameType === 'sentences' ? 'text-lg py-4 px-3' : 'text-xl py-6 px-4'} font-bold border-2`}
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