import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Play, Lock } from "lucide-react";

const Topic = () => {
  const { subject, topic } = useParams<{ subject: string; topic: string }>();
  const navigate = useNavigate();

  // Validazione parametri di sicurezza
  if (!subject || !topic || typeof subject !== 'string' || typeof topic !== 'string') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">🦄 Parametri non validi</h1>
          <p className="text-muted-foreground mb-4">Emma non capisce questo percorso!</p>
          <Button onClick={() => navigate('/')} variant="fun">🏠 Torna a Casa</Button>
        </div>
      </div>
    );
  }

  // Tutti i 10 livelli sono ora accessibili
  const levels = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Livello ${i + 1}`,
    description: getDescriptionForLevel(subject, topic, i + 1),
    difficulty: i < 3 ? 'Facile' : i < 7 ? 'Medio' : 'Difficile',
    unlocked: true, // Tutti i livelli sono sbloccati
    stars: Math.floor(Math.random() * 4), // Stelle simulate
  }));

  function getDescriptionForLevel(subject: string, topic: string, level: number): string {
    // ITALIANO - Detailed curriculum descriptions
    if (subject === 'italiano') {
      if (topic === 'lettura-associazione') {
        if (level <= 3) return 'Associa parole semplici con immagini corrispondenti';
        if (level <= 6) return 'Collega frasi brevi alle immagini giuste';
        return 'Associa testi complessi con le immagini appropriate';
      }
      if (topic === 'ascolto-comprensione') {
        if (level <= 3) return 'Ascolta brevi racconti e comprendi il significato';
        if (level <= 6) return 'Rispondi a domande su testi ascoltati';
        return 'Comprendi testi narrativi complessi ascoltati';
      }
      if (topic === 'lettura-comprensione') {
        if (level <= 3) return 'Leggi testi narrativi brevi e comprendi';
        if (level <= 6) return 'Identifica informazioni in testi informativi';
        return 'Analizza personaggi e distingui vero/falso';
      }
      if (topic === 'riflessione-linguistica') {
        if (level <= 3) return 'Riconosci forme corrette e ordina sillabe';
        if (level <= 6) return 'Grammatica: articoli, nomi, verbi e aggettivi';
        return 'Analisi grammaticale completa e discorso diretto/indiretto';
      }
    }
    
    // STORIA - Historical curriculum
    if (subject === 'storia') {
      if (topic === 'relazioni-temporali') {
        if (level <= 3) return 'Prima, dopo, infine - ordina eventi semplici';
        if (level <= 6) return 'Intanto, mentre - parole di contemporaneità';
        return 'Giorni, mesi, stagioni - tempo ciclico';
      }
      if (topic === 'fonti-storiche') {
        if (level <= 3) return 'Riconosci diversi tipi di fonti storiche';
        if (level <= 6) return 'Fonti visive, materiali, orali e scritte';
        return 'Analizza e classifica fonti storiche complesse';
      }
      if (topic === 'preistoria') {
        if (level <= 3) return 'Homo Erectus - caratteristiche e vita';
        if (level <= 6) return 'Homo Sapiens Sapiens - Paleolitico';
        return 'Neolitico - trasformazioni e innovazioni';
      }
      if (topic === 'civilta-antiche') {
        if (level <= 3) return 'Sumeri e Babilonesi - prime civiltà';
        if (level <= 6) return 'Egizi e Fenici - invenzioni e culture';
        return 'Greci, Assiri ed Ebrei - civiltà avanzate';
      }
    }
    
    // GEOGRAFIA - Geographic curriculum
    if (subject === 'geografia') {
      if (topic === 'indicatori-topografici') {
        if (level <= 3) return 'Sopra, sotto, davanti, dietro - orientamento base';
        if (level <= 6) return 'Destra, sinistra, vicino, lontano - spazio relativo';
        return 'Orientamento complesso e descrizione di posizioni';
      }
      if (topic === 'mappe-geografiche') {
        if (level <= 3) return 'Differenza tra mappe fisiche e politiche';
        if (level <= 6) return 'Mari, regioni, capoluoghi d\'Italia';
        return 'Laghi, fiumi, vulcani e caratteristiche geografiche';
      }
      if (topic === 'tipi-paesaggio') {
        if (level <= 3) return 'Lago, fiume, collina - riconosci paesaggi';
        if (level <= 6) return 'Montagna, pianura - caratteristiche principali';
        return 'Elementi naturali e antropici del paesaggio';
      }
      if (topic === 'settori-economici') {
        if (level <= 3) return 'Settore primario - agricoltura e allevamento';
        if (level <= 6) return 'Settore secondario - industria e artigianato';
        return 'Settore terziario - servizi e commercio';
      }
    }
    
    // ENGLISH - English curriculum
    if (subject === 'english') {
      if (topic === 'colors-instructions') {
        if (level <= 3) return 'Listen and color - basic instructions';
        if (level <= 6) return 'Common colors and simple commands';
        return 'Complex instructions and color combinations';
      }
      if (topic === 'descriptive-texts') {
        if (level <= 3) return 'Read descriptions and match pictures';
        if (level <= 6) return 'Personal information: name, age, likes';
        return 'Complex descriptions and comprehension questions';
      }
      if (topic === 'vocabulary-preferences') {
        if (level <= 3) return 'School supplies - true or false';
        if (level <= 6) return 'Food and drinks - I like/don\'t like';
        return 'Express preferences and explain choices';
      }
    }
    
    // MATEMATICA - Keep existing math content
    if (subject === 'matematica' && topic === 'operazioni') {
      if (level <= 3) return 'Addizioni semplici con numeri piccoli (1-10)';
      if (level <= 6) return 'Sottrazioni e addizioni con numeri più grandi (1-50)';
      return 'Problemi complessi con tutte le operazioni (1-100)';
    }
    
    if (subject === 'matematica' && topic === 'geometria') {
      if (level <= 3) return 'Forme base: cerchio, quadrato, triangolo';
      if (level <= 6) return 'Figure complesse e spazi';
      return 'Perimetri, aree e misure avanzate';
    }
    
    if (subject === 'matematica' && topic === 'misure') {
      if (level <= 3) return 'Centimetri, metri e ore';
      if (level <= 6) return 'Peso, capacità e tempo';
      return 'Conversioni e misure complesse';
    }
    
    // Fallback descriptions
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
    // Navigate to level page instead of directly to games
    navigate(`/${subject}/${topic}/livello${levelId}`);
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