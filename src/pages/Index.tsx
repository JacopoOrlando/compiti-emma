import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Calculator, Star, Trophy, Heart, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/rainbow-unicorns-hero.jpg";
import unicornCelebration from "@/assets/unicorn-celebration.jpg";

export default function Index() {
  const navigate = useNavigate();

  const subjects = [
    {
      title: "Italiano",
      description: "Storia, Geografia, Lettura, Grammatica e Arte",
      icon: BookOpen,
      color: "bg-fun-green",
      path: "/italiano"
    },
    {
      title: "Matematica", 
      description: "Operazioni, Geometria, Misure e Scienze",
      icon: Calculator,
      color: "bg-fun-blue",
      path: "/matematica"
    },
    {
      title: "English",
      description: "Learn English with Emma! Words, Stories & Fun",
      icon: Globe,
      color: "bg-fun-purple",
      path: "/english"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 px-6 text-center bg-gradient-fun overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroImage} 
            alt="Bambini che imparano" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-bounce-gentle">
            🦄 Compiti di Emma 🌈
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Benvenuti nel mondo magico di Emma! Impara con arcobaleni, unicorni e tanta magia! ✨
          </p>
          <Button 
            variant="fun" 
            size="lg" 
            className="text-2xl py-6 px-12 animate-pulse-gentle"
            onClick={() => document.getElementById('subjects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Inizia l'Avventura Magica! 🦄✨
          </Button>
        </div>
      </section>

      {/* Subjects */}
      <section id="subjects" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            🌈 Scegli la tua Materia Magica! 🦄
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {subjects.map((subject) => (
              <Card 
                key={subject.title}
                className="p-8 text-center hover:shadow-hover transition-all duration-300 transform hover:scale-105 border-4 border-opacity-20 shadow-card cursor-pointer"
                onClick={() => navigate(subject.path)}
              >
                <div className={`w-24 h-24 ${subject.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-fun animate-wiggle`}>
                  <subject.icon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-foreground">{subject.title}</h3>
                <p className="text-muted-foreground mb-6 text-lg">{subject.description}</p>
                <Button variant="game" className="w-full text-xl py-4">
                  Iniziamo! 🌟🦄
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Journey */}
      <section className="py-16 px-6 bg-muted">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-foreground">Il tuo Viaggio di Apprendimento</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-fun-yellow rounded-full flex items-center justify-center mb-4 shadow-fun">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Completa i Livelli</h3>
              <p className="text-muted-foreground">Progredisci attraverso livelli sempre più difficili!</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-fun-orange rounded-full flex items-center justify-center mb-4 shadow-fun">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Guadagna Stelle</h3>
              <p className="text-muted-foreground">Ottieni stelle per ogni livello completato!</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-fun-pink rounded-full flex items-center justify-center mb-4 shadow-fun">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Diventa un Esperto</h3>
              <p className="text-muted-foreground">Padroneggia ogni materia e diventa il migliore!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}