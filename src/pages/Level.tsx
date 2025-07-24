import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Play, BookOpen, Headphones, Brain } from "lucide-react";

const Level = () => {
  const { subject, topic, level } = useParams<{ subject: string; topic: string; level: string }>();
  const navigate = useNavigate();

  // Validazione parametri di sicurezza
  if (!subject || !topic || !level || typeof subject !== 'string' || typeof topic !== 'string' || typeof level !== 'string') {
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

  // Consistent exercise types for all topics
  const getExerciseTypes = () => {
    return [
      { 
        id: 'pratica', 
        title: 'Pratica', 
        description: 'Esercizi di apprendimento guidati', 
        icon: BookOpen, 
        color: 'bg-fun-green',
        difficulty: 'Facile',
        estimatedTime: '10-15 min'
      },
      { 
        id: 'abbinamenti', 
        title: 'Abbinamenti', 
        description: 'Trascina e collega per imparare divertendoti', 
        icon: Star, 
        color: 'bg-fun-blue',
        difficulty: 'Facile',
        estimatedTime: '5-10 min'
      },
      { 
        id: 'memoria', 
        title: 'Memoria', 
        description: 'Trova le coppie e allena la memoria', 
        icon: Brain, 
        color: 'bg-fun-purple',
        difficulty: 'Medio',
        estimatedTime: '5-15 min'
      },
      { 
        id: 'sfida-veloce', 
        title: 'Sfida Veloce', 
        description: 'Rispondi velocemente per più punti!', 
        icon: Headphones, 
        color: 'bg-fun-orange',
        difficulty: 'Difficile',
        estimatedTime: '3-8 min'
      }
    ];
  };

  const exerciseTypes = getExerciseTypes();
  const levelNumber = level.replace('livello', '');
  const topicTitle = topic?.replace('-', ' ')?.split(' ')?.map(word => word.charAt(0).toUpperCase() + word.slice(1))?.join(' ') || '';
  const subjectTitle = subject?.charAt(0).toUpperCase() + subject?.slice(1) || '';

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-4">
            <Badge variant="outline" className="text-lg px-4 py-2 mr-2">
              {subjectTitle}
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2 mr-2">
              {topicTitle}
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Livello {levelNumber}
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            🦄 Scegli il Tipo di Esercizio 🌈
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Quale tipo di attività vuoi fare oggi? Ogni esercizio ti aiuterà a imparare meglio! ✨
          </p>
        </div>

        {/* Exercise Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {exerciseTypes.map((exercise) => (
            <Card 
              key={exercise.id}
              className="p-8 text-center hover:shadow-hover transition-all duration-300 transform hover:scale-105 border-4 border-opacity-20 shadow-card cursor-pointer"
              onClick={() => navigate(`/${subject}/${topic}/${exercise.id}`)}
            >
              <div className={`w-20 h-20 ${exercise.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-fun animate-wiggle`}>
                <exercise.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">{exercise.title}</h3>
              <p className="text-muted-foreground mb-6 text-lg">{exercise.description}</p>
              <div className="flex justify-between items-center mb-4 text-sm text-muted-foreground">
                <span>🎯 {exercise.difficulty}</span>
                <span>⏱️ {exercise.estimatedTime}</span>
              </div>
              <Button variant="game" className="w-full">
                <Play className="w-5 h-5 mr-2" />
                Inizia Esercizio! 🌟
              </Button>
            </Card>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/${subject}/${topic}`)}
            className="text-lg px-8 py-4"
          >
            ← Torna ai Livelli
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Level;