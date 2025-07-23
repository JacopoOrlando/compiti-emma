import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calculator, History, Globe, PenTool, Shapes, Ruler, Volume2, FileText } from "lucide-react";

const subjects = {
  italiano: {
    title: "Italiano",
    description: "Impara la lingua italiana con storie, grammatica e cultura!",
    color: "bg-fun-green",
    topics: [
      { 
        id: "lettura", 
        title: "Lettura", 
        description: "Leggi storie e impara nuove parole",
        icon: BookOpen,
        color: "bg-fun-green"
      },
      { 
        id: "grammatica", 
        title: "Grammatica", 
        description: "Scopri le regole della lingua italiana",
        icon: PenTool,
        color: "bg-fun-blue"
      },
      { 
        id: "storia", 
        title: "Storia", 
        description: "Viaggia nel tempo e scopri il passato",
        icon: History,
        color: "bg-fun-orange"
      },
      { 
        id: "geografia", 
        title: "Geografia", 
        description: "Esplora il mondo e i suoi luoghi",
        icon: Globe,
        color: "bg-fun-blue"
      }
    ]
  },
  matematica: {
    title: "Matematica",
    description: "Scopri i numeri e le forme con Emma!",
    color: "bg-fun-blue",
    topics: [
      { 
        id: "operazioni", 
        title: "Operazioni", 
        description: "Addizioni, sottrazioni e molto altro",
        icon: Calculator,
        color: "bg-fun-blue"
      },
      { 
        id: "geometria", 
        title: "Geometria", 
        description: "Forme, figure e spazio",
        icon: Shapes,
        color: "bg-fun-purple"
      },
      { 
        id: "misure", 
        title: "Misure", 
        description: "Lunghezza, peso, tempo e capacità",
        icon: Ruler,
        color: "bg-fun-orange"
      }
    ]
  },
  english: {
    title: "English",
    description: "Learn English with Emma! Discover words, stories and fun activities! 🌍",
    color: "bg-fun-purple",
    topics: [
      { 
        id: "vocabulary", 
        title: "Vocabulary", 
        description: "Learn new English words and their meanings",
        icon: BookOpen,
        color: "bg-fun-purple"
      },
      { 
        id: "stories", 
        title: "Stories", 
        description: "Read fun English stories and tales",
        icon: FileText,
        color: "bg-fun-blue"
      },
      { 
        id: "conversation", 
        title: "Speaking", 
        description: "Practice speaking English with Emma",
        icon: Volume2,
        color: "bg-fun-green"
      }
    ]
  }
};

const Subject = () => {
  const { subject } = useParams<{ subject: string }>();
  const navigate = useNavigate();
  
  // Validazione parametri di sicurezza
  if (!subject || typeof subject !== 'string') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">🦄 Parametro non valido</h1>
          <p className="text-muted-foreground mb-4">Emma non capisce questo percorso!</p>
          <Button onClick={() => navigate('/')}>🏠 Torna a Casa</Button>
        </div>
      </div>
    );
  }
  
  const subjectData = subjects[subject as keyof typeof subjects];

  if (!subjectData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4">🦄 Materia non trovata</h1>
          <p className="text-muted-foreground mb-4">
            Emma non conosce ancora la materia "<span className="font-mono bg-muted px-2 py-1 rounded">{subject}</span>"
          </p>
          <div className="space-y-2">
            <Button onClick={() => navigate('/')} variant="fun">🏠 Torna a Casa</Button>
            <p className="text-sm text-muted-foreground">
              Materie disponibili: <strong>italiano</strong>, <strong>matematica</strong>, <strong>english</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-foreground">
            🦄 {subjectData.title} con Emma 🌈
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {subjectData.description} ✨
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjectData.topics.map((topic) => (
            <Card 
              key={topic.id}
              className="p-8 text-center hover:shadow-hover transition-all duration-300 transform hover:scale-105 border-4 border-opacity-20 shadow-card cursor-pointer"
              onClick={() => navigate(`/${subject}/${topic.id}`)}
            >
              <div className={`w-20 h-20 ${topic.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-fun animate-wiggle`}>
                <topic.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">{topic.title}</h3>
              <p className="text-muted-foreground mb-6 text-lg">{topic.description}</p>
              <Button variant="game" className="w-full">
                Iniziamo! 🌟🦄
              </Button>
            </Card>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="text-lg px-8 py-4"
          >
            ← Torna alla Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Subject;