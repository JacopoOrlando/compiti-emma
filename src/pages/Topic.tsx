import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Play, Lock } from "lucide-react";

const Topic = () => {
  const { subject, topic } = useParams<{ subject: string; topic: string }>();
  const navigate = useNavigate();

  // Tutti i 10 livelli sono ora accessibili
  const levels = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Livello ${i + 1}`,
    description: getDescriptionForLevel(subject, topic, i + 1),
    difficulty: i < 3 ? 'Facile' : i < 7 ? 'Medio' : 'Difficile',
    unlocked: true, // Tutti i livelli sono sbloccati
    stars: Math.floor(Math.random() * 4), // Stelle simulate
  }));

  function getDescriptionForLevel(subject: string | undefined, topic: string | undefined, level: number): string {
    if (subject === 'matematica' && topic === 'operazioni') {
      if (level <= 3) return 'Addizioni semplici con numeri piccoli';
      if (level <= 6) return 'Sottrazioni e addizioni con numeri più grandi';
      return 'Problemi complessi con tutte le operazioni';
    }
    
    if (subject === 'italiano' && topic === 'lettura') {
      if (level <= 3) return 'Parole semplici e sillabe';
      if (level <= 6) return 'Frasi complete e racconti brevi';
      return 'Storie lunghe e comprensione del testo';
    }
    
    // Descrizioni generiche per altri argomenti
    if (level <= 3) return 'Concetti base e primi esercizi';
    if (level <= 6) return 'Esercizi intermedi e approfondimenti';
    return 'Esercizi avanzati e sfide complesse';
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile': return 'bg-fun-green';
      case 'Medio': return 'bg-fun-orange'; 
      case 'Difficile': return 'bg-fun-pink';
      default: return 'bg-muted';
    }
  };

  const handleStartLevel = (levelId: number) => {
    // Reindirizza ai giochi esistenti per casi specifici
    if (subject === 'matematica' && topic === 'operazioni') {
      navigate('/math');
    } else if (subject === 'italiano' && topic === 'lettura') {
      navigate('/reading');
    } else if (subject === 'italiano' && topic === 'arte') {
      navigate('/colors');
    } else if (subject === 'italiano' && topic === 'grammatica') {
      // Crea un contenuto specifico per grammatica
      navigate('/reading'); // Per ora usa reading, ma possiamo espandere
    } else {
      // Per tutte le altre sezioni, ora hanno contenuto
      navigate('/math'); // Default fallback per ora
    }
  };

  const topicTitle = topic?.charAt(0).toUpperCase() + topic?.slice(1) || '';
  const subjectTitle = subject?.charAt(0).toUpperCase() + subject?.slice(1) || '';

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-4">
            <Badge variant="outline" className="text-lg px-4 py-2">
              {subjectTitle}
            </Badge>
          </div>
          <h1 className="text-5xl font-bold mb-4 text-foreground">
            🦄 {topicTitle} con Emma 🌈
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Scegli il tuo livello magico e inizia a imparare con gli arcobaleni! ✨
          </p>
        </div>

        {/* Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {levels.map((level) => (
            <Card 
              key={level.id}
              className={`p-6 text-center transition-all duration-300 border-4 ${
                level.unlocked 
                  ? 'hover:shadow-hover transform hover:scale-105 cursor-pointer border-primary/20' 
                  : 'opacity-50 border-muted cursor-not-allowed'
              }`}
              onClick={() => level.unlocked && handleStartLevel(level.id)}
            >
              {/* Level Number & Lock */}
              <div className="relative mb-4">
                <div className={`w-16 h-16 ${getDifficultyColor(level.difficulty)} rounded-full flex items-center justify-center mx-auto shadow-fun`}>
                  {level.unlocked ? (
                    <Play className="w-8 h-8 text-white" />
                  ) : (
                    <Lock className="w-8 h-8 text-white" />
                  )}
                </div>
                <div className="absolute -top-2 -right-2">
                  <Badge variant="secondary" className="text-xs font-bold">
                    {level.id}
                  </Badge>
                </div>
              </div>

              {/* Level Info */}
              <h3 className="text-xl font-bold mb-2 text-foreground">{level.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{level.description}</p>
              
              {/* Difficulty Badge */}
              <Badge 
                variant="outline" 
                className={`mb-4 ${getDifficultyColor(level.difficulty)} text-white border-transparent`}
              >
                {level.difficulty}
              </Badge>

              {/* Stars (if completed) */}
              {level.unlocked && level.stars > 0 && (
                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({ length: 3 }, (_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${
                        i < level.stars ? 'text-fun-yellow fill-fun-yellow' : 'text-muted'
                      }`} 
                    />
                  ))}
                </div>
              )}

              {/* Action Button */}
              <Button 
                variant={level.unlocked ? "fun" : "outline"} 
                className="w-full"
                disabled={!level.unlocked}
              >
                {level.unlocked ? (level.stars > 0 ? 'Riprova! 🌟' : 'Inizia! 🦄') : 'Bloccato 🔒'}
              </Button>
            </Card>
          ))}
        </div>

        {/* Progress Summary */}
        <div className="mt-12 text-center">
          <Card className="p-6 max-w-md mx-auto bg-muted/30">
            <h3 className="text-xl font-bold mb-4">I tuoi Progressi</h3>
            <div className="flex justify-around">
              <div>
                <div className="text-2xl font-bold text-fun-green">10</div>
                <div className="text-sm text-muted-foreground">Livelli Disponibili</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-fun-yellow">★ 12</div>
                <div className="text-sm text-muted-foreground">Stelle Totali</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-fun-purple">🎯</div>
                <div className="text-sm text-muted-foreground">Scegli il Tuo Livello!</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/${subject}`)}
            className="text-lg px-8 py-4"
          >
            ← Torna a {subjectTitle}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Topic;