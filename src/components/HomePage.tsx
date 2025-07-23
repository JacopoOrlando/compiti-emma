import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Calculator, Palette, Star, Trophy, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/rainbow-unicorns-hero.jpg";
import unicornCelebration from "@/assets/unicorn-celebration.jpg";
import rainbowPattern from "@/assets/rainbow-pattern.jpg";

const HomePage = () => {
  const navigate = useNavigate();

  const learningAreas = [
    {
      title: "Matematica Divertente",
      description: "Impara i numeri, addizioni e sottrazioni con giochi!",
      icon: Calculator,
      color: "bg-fun-blue",
      path: "/math"
    },
    {
      title: "Lettura",
      description: "Pratica lettere, parole e abilità di lettura",
      icon: BookOpen,
      color: "bg-fun-green", 
      path: "/reading"
    },
    {
      title: "Colori e Forme",
      description: "Scopri colori, forme e modelli",
      icon: Palette,
      color: "bg-fun-purple",
      path: "/colors"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 px-6 text-center bg-gradient-fun overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroImage} 
            alt="Kids learning" 
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
            onClick={() => navigate('/math')}
          >
            Inizia l'Avventura Magica! 🦄✨
          </Button>
        </div>
      </section>

      {/* Learning Areas */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            🌈 Scegli la tua Avventura Magica! 🦄
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learningAreas.map((area, index) => (
              <Card 
                key={area.title}
                className="p-8 text-center hover:shadow-hover transition-all duration-300 transform hover:scale-105 border-4 border-opacity-20 shadow-card cursor-pointer"
                onClick={() => navigate(area.path)}
              >
                <div className={`w-20 h-20 ${area.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-fun animate-wiggle`}>
                  <area.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">{area.title}</h3>
                <p className="text-muted-foreground mb-6 text-lg">{area.description}</p>
                <Button variant="game" className="w-full">
                  Iniziamo! 🌟🦄
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-16 px-6 bg-muted">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-foreground">Il tuo Viaggio di Apprendimento</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-fun-yellow rounded-full flex items-center justify-center mb-4 shadow-fun">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Guadagna Stelle</h3>
              <p className="text-muted-foreground">Completa gli esercizi per guadagnare stelle brillanti!</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-fun-orange rounded-full flex items-center justify-center mb-4 shadow-fun">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Ottieni Trofei</h3>
              <p className="text-muted-foreground">Vinci trofei per essere fantastico!</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-fun-pink rounded-full flex items-center justify-center mb-4 shadow-fun">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Divertiti</h3>
              <p className="text-muted-foreground">Imparare dovrebbe sempre essere divertente!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;