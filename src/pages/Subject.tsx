import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Play, Lock } from "lucide-react";
import { gameContentMap } from "@/lib/gameContent"; // Import the content map

const Subject = () => {
  const { subject } = useParams<{ subject: string }>();
  const navigate = useNavigate();

  if (!subject || !gameContentMap[subject]) {
    // Handle invalid subject
    return <div>Materia non trovata!</div>;
  }
  
  const subjectData = gameContentMap[subject];
  const subjectInfo = {
      matematica: { title: "Matematica", description: "Scopri i numeri, le operazioni e la geometria con Emma!", color: "bg-fun-blue" },
      italiano: { title: "Italiano", description: "Impara a leggere, scrivere e la grammatica!", color: "bg-fun-green" },
      english: { title: "English", description: "Learn English with words, stories, and fun!", color: "bg-fun-purple" },
  }[subject];


  const levels = Array.from({ length: 10 }, (_, i) => {
    const levelNum = i + 1;
    const levelContent = subjectData[levelNum];
    return {
      id: levelNum,
      title: `Livello ${levelNum}`,
      description: levelContent?.description || `Esercizi del livello ${levelNum}`,
      unlocked: true, // All levels are unlocked for simplicity
    };
  });

  const handleStartLevel = (levelId: number) => {
    navigate(`/${subject}/${levelId}`);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-foreground">
            🦄 {subjectInfo?.title} con Emma 🌈
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {subjectInfo?.description} ✨
          </p>
        </div>

        {/* Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {levels.map((level) => (
            <Card 
              key={level.id}
              className="p-6 text-center transition-all duration-300 border-4 hover:shadow-hover transform hover:scale-105 cursor-pointer border-primary/20"
              onClick={() => handleStartLevel(level.id)}
            >
              <div className="relative mb-4">
                <div className={`w-16 h-16 ${subjectInfo?.color} rounded-full flex items-center justify-center mx-auto shadow-fun`}>
                  <Play className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Badge variant="secondary" className="text-xs font-bold">
                    {level.id}
                  </Badge>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{level.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 h-16">{level.description}</p>
              <Button 
                variant="fun" 
                className="w-full"
              >
                Inizia! 🦄
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
