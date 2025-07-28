import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { gameContentMap } from "@/lib/gameContent";
import { Play } from "lucide-react";

const Subject = () => {
  const { subject } = useParams<{ subject: string }>();
  const navigate = useNavigate();

  if (!subject || !gameContentMap[subject]) {
    return <div>Materia non trovata!</div>;
  }
  
  const subjectTopics = gameContentMap[subject];
  const subjectInfo = {
      matematica: { title: "Matematica", description: "Scopri i numeri, le operazioni e la geometria con Emma!", color: "bg-fun-blue" },
      italiano: { title: "Italiano", description: "Impara a leggere, scrivere e la grammatica!", color: "bg-fun-green" },
      english: { title: "English", description: "Learn English with words, stories, and fun!", color: "bg-fun-purple" },
  }[subject];

  const handleStartTopic = (topicId: string) => {
    navigate(`/${subject}/${topicId}`);
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

        {/* Sub-topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(subjectTopics).map(([topicId, topicData]) => (
            <Card 
              key={topicId}
              className="p-6 text-center transition-all duration-300 border-4 hover:shadow-hover transform hover:scale-105 cursor-pointer border-primary/20 flex flex-col justify-between"
              onClick={() => handleStartTopic(topicId)}
            >
              <div>
                <div className={`w-16 h-16 ${subjectInfo?.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-fun`}>
                  <Play className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{topicData.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 h-12">{topicData.description}</p>
              </div>
              <Button 
                variant="fun" 
                className="w-full mt-auto"
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
