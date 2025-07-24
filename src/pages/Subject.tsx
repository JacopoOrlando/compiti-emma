import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calculator, History, Globe, PenTool, Shapes, Ruler, Volume2, FileText, Palette } from "lucide-react";

const subjects = {
  matematica: {
    title: "Matematica",
    description: "Scopri i numeri, le operazioni e la geometria con Emma!",
    color: "bg-fun-blue",
    topics: [
      { 
        id: "numeri-fino-20", 
        title: "Numeri fino a 20", 
        description: "Conta, confronta e ordina i numeri fino a 20",
        icon: Calculator,
        color: "bg-fun-blue"
      },
      { 
        id: "addizioni-fino-20", 
        title: "Addizioni fino a 20", 
        description: "Impara le addizioni con numeri fino a 20",
        icon: PenTool,
        color: "bg-fun-green"
      },
      { 
        id: "sottrazioni-fino-20", 
        title: "Sottrazioni fino a 20", 
        description: "Impara le sottrazioni con numeri fino a 20",
        icon: Shapes,
        color: "bg-fun-orange"
      },
      { 
        id: "problemi-fino-20", 
        title: "Problemi fino a 20", 
        description: "Risolvi problemi con addizioni e sottrazioni",
        icon: BookOpen,
        color: "bg-fun-purple"
      },
      { 
        id: "spazio-figure-20", 
        title: "Spazio e Figure", 
        description: "Forme, linee e orientamento nello spazio",
        icon: Shapes,
        color: "bg-fun-pink"
      },
      { 
        id: "numeri-fino-100", 
        title: "Numeri fino a 100", 
        description: "Leggi, scrivi e confronta numeri fino a 100",
        icon: Calculator,
        color: "bg-fun-blue"
      },
      { 
        id: "operazioni-fino-100", 
        title: "Operazioni fino a 100", 
        description: "Addizioni, sottrazioni, moltiplicazioni e divisioni",
        icon: PenTool,
        color: "bg-fun-green"
      },
      { 
        id: "problemi-fino-100", 
        title: "Problemi fino a 100", 
        description: "Risolvi problemi più complessi",
        icon: BookOpen,
        color: "bg-fun-purple"
      },
      { 
        id: "misure-generali", 
        title: "Misure", 
        description: "Monete, lunghezza, peso e capacità",
        icon: Ruler,
        color: "bg-fun-orange"
      },
      { 
        id: "numeri-oltre-1000", 
        title: "Numeri oltre 1000", 
        description: "Grandi numeri: migliaia, centinaia, decine e unità",
        icon: Calculator,
        color: "bg-fun-blue"
      },
      { 
        id: "frazioni", 
        title: "Frazioni", 
        description: "Frazioni proprie, improprie e apparenti",
        icon: Shapes,
        color: "bg-fun-pink"
      },
      { 
        id: "numeri-decimali", 
        title: "Numeri Decimali", 
        description: "Numeri con la virgola e frazioni decimali",
        icon: PenTool,
        color: "bg-fun-green"
      },
      { 
        id: "geometria-avanzata", 
        title: "Geometria Avanzata", 
        description: "Angoli, poligoni, perimetri e aree",
        icon: Shapes,
        color: "bg-fun-purple"
      }
    ]
  },
  scienze: {
    title: "Scienze",
    description: "Esplora il mondo della natura e della tecnologia!",
    color: "bg-fun-green",
    topics: [
      { 
        id: "esseri-viventi-non-viventi", 
        title: "Esseri Viventi e Non Viventi", 
        description: "Scopri la differenza tra esseri viventi e non viventi",
        icon: Globe,
        color: "bg-fun-green"
      },
      { 
        id: "cicli-vitali", 
        title: "Cicli Vitali e Classificazione", 
        description: "Cicli di vita delle piante e classificazione animali",
        icon: BookOpen,
        color: "bg-fun-blue"
      },
      { 
        id: "caratteristiche-viventi", 
        title: "Caratteristiche degli Esseri Viventi", 
        description: "Vertebrati, invertebrati e ecosistemi",
        icon: Shapes,
        color: "bg-fun-purple"
      },
      { 
        id: "classificazione-piante-animali", 
        title: "Classificazione Piante e Animali", 
        description: "Alghe, muschi, felci e classificazione animale",
        icon: Globe,
        color: "bg-fun-orange"
      }
    ]
  },
  tecnologia: {
    title: "Tecnologia",
    description: "Scopri materiali, strumenti e il ciclo di vita dei prodotti!",
    color: "bg-fun-orange",
    topics: [
      { 
        id: "materiali-oggetti", 
        title: "Materiali e Oggetti", 
        description: "Riconosci materiali e le loro caratteristiche",
        icon: Shapes,
        color: "bg-fun-orange"
      },
      { 
        id: "strumenti-misura", 
        title: "Strumenti di Misura", 
        description: "Bilancia, metro, termometro e altri strumenti",
        icon: Ruler,
        color: "bg-fun-blue"
      },
      { 
        id: "ciclo-vita-prodotti", 
        title: "Ciclo di Vita dei Prodotti", 
        description: "Dalla materia prima al riciclo",
        icon: Globe,
        color: "bg-fun-green"
      }
    ]
  },
  italiano: {
    title: "Italiano",
    description: "Impara la lingua italiana con lettura, ascolto e riflessione linguistica!",
    color: "bg-fun-green",
    topics: [
      { 
        id: "lettura-associazione", 
        title: "Lettura e Associazione", 
        description: "Associa parole e frasi con le immagini corrispondenti",
        icon: BookOpen,
        color: "bg-fun-green"
      },
      { 
        id: "ascolto-comprensione", 
        title: "Ascolto e Comprensione", 
        description: "Ascolta testi narrativi e rispondi alle domande",
        icon: Volume2,
        color: "bg-fun-blue"
      },
      { 
        id: "lettura-comprensione", 
        title: "Lettura e Comprensione", 
        description: "Leggi testi narrativi e informativi",
        icon: FileText,
        color: "bg-fun-purple"
      },
      { 
        id: "riflessione-linguistica", 
        title: "Grammatica e Ortografia", 
        description: "Impara nomi, verbi, aggettivi e regole grammaticali",
        icon: PenTool,
        color: "bg-fun-orange"
      }
    ]
  },
  storia: {
    title: "Storia",
    description: "Viaggia nel tempo e scopri le civiltà antiche!",
    color: "bg-fun-orange",
    topics: [
      { 
        id: "relazioni-temporali", 
        title: "Relazioni Temporali", 
        description: "Prima, dopo, infine - ordina eventi nel tempo",
        icon: History,
        color: "bg-fun-orange"
      },
      { 
        id: "fonti-storiche", 
        title: "Fonti Storiche", 
        description: "Scopri i diversi tipi di fonti storiche",
        icon: BookOpen,
        color: "bg-fun-green"
      },
      { 
        id: "preistoria", 
        title: "Preistoria", 
        description: "Homo Erectus, Sapiens - Paleolitico e Neolitico",
        icon: Shapes,
        color: "bg-fun-blue"
      },
      { 
        id: "civilta-antiche", 
        title: "Civiltà Antiche", 
        description: "Sumeri, Egizi, Greci e altre civiltà",
        icon: Globe,
        color: "bg-fun-purple"
      }
    ]
  },
  geografia: {
    title: "Geografia",
    description: "Esplora il mondo, i paesaggi e l'Italia!",
    color: "bg-fun-blue",
    topics: [
      { 
        id: "indicatori-topografici", 
        title: "Indicatori Topografici", 
        description: "Sopra, sotto, davanti, dietro - orientati nello spazio",
        icon: Globe,
        color: "bg-fun-blue"
      },
      { 
        id: "mappe-geografiche", 
        title: "Mappe Geografiche", 
        description: "Mappe fisiche e politiche d'Italia",
        icon: Ruler,
        color: "bg-fun-green"
      },
      { 
        id: "tipi-paesaggio", 
        title: "Tipi di Paesaggio", 
        description: "Montagne, colline, pianure, laghi e fiumi",
        icon: Shapes,
        color: "bg-fun-purple"
      },
      { 
        id: "settori-economici", 
        title: "Settori Economici", 
        description: "Primario, secondario e terziario",
        icon: Calculator,
        color: "bg-fun-orange"
      }
    ]
  },
  english: {
    title: "English",
    description: "Learn English with colors, descriptions and vocabulary! 🌍",
    color: "bg-fun-purple",
    topics: [
      { 
        id: "colors-instructions", 
        title: "Colors & Instructions", 
        description: "Listen and understand simple English instructions",
        icon: Palette,
        color: "bg-fun-purple"
      },
      { 
        id: "descriptive-texts", 
        title: "Descriptive Texts", 
        description: "Read descriptions and talk about yourself",
        icon: FileText,
        color: "bg-fun-blue"
      },
      { 
        id: "vocabulary-preferences", 
        title: "Vocabulary & Preferences", 
        description: "School supplies, food, drinks - I like/don't like",
        icon: BookOpen,
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
              Materie disponibili: <strong>matematica</strong>, <strong>scienze</strong>, <strong>tecnologia</strong>, <strong>italiano</strong>, <strong>storia</strong>, <strong>geografia</strong>, <strong>english</strong>
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