import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Calculator, Globe, Star, Trophy, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/rainbow-unicorns-hero.jpg";

export default function Index() {
  const navigate = useNavigate();

  const subjects = [
    {
      title: "Italiano",
      description: "Ortografia, Lettura, Grammatica e Scrittura!",
      icon: BookOpen,
      color: "bg-fun-green",
      path: "/italiano"
    },
    {
      title: "Matematica", 
      description: "Problemi, Geometria, Numeri e Tabelline!",
      icon: Calculator,
      color: "bg-fun-blue",
      path: "/matematica"
    },
    {
      title: "English",
      description: "Learn English with Words, Stories & Fun!",
      icon: Globe,
      color: "bg-fun-purple",
      path: "/english"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-8 md:py-16 px-4 md:px-6 text-center bg-gradient-fun overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroImage} 
            alt="Unicorni magici che imparano" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 animate-bounce-gentle px-2">
            🦄 Compiti di Emma 🌈
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Benvenuti nel mondo magico di Emma! Impara con arcobaleni, unicorni e tanta magia! ✨
          </p>
          <Button 
            variant="fun" 
            size="lg" 
            className="text-lg sm:text-xl md:text-2xl py-4 sm:py-5 md:py-6 px-6 sm:px-8 md:px-12 animate-pulse-gentle mx-4"
            onClick={() => document.getElementById('subjects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Inizia l'Avventura Magica! 🦄✨
          </Button>
        </div>
      </section>

      {/* Subjects */}
      <section id="subjects" className="py-8 md:py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-foreground px-4">
            🌈 Scegli la tua Materia Magica! 🦄
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {subjects.map((subject) => (
                <Card 
                  key={subject.title}
                  className="p-4 sm:p-6 md:p-8 text-center hover:shadow-hover transition-all duration-300 transform hover:scale-105 border-4 border-opacity-20 shadow-card cursor-pointer"
                  onClick={() => navigate(subject.path)}
                >
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 ${subject.color} rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-fun animate-wiggle`}>
                    <subject.icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-foreground">{subject.title}</h3>
                  <p className="text-muted-foreground mb-4 md:mb-6 text-sm sm:text-base md:text-lg px-2">{subject.description}</p>
                  <Button variant="game" className="w-full text-base sm:text-lg md:text-xl py-3 md:py-4">
                  Iniziamo! 🌟🦄
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Journey */}
      <section className="py-8 md:py-16 px-4 md:px-6 bg-muted">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-foreground">Il tuo Viaggio di Apprendimento</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-fun-yellow rounded-full flex items-center justify-center mb-4 shadow-fun">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Scegli un Argomento</h3>
              <p className="text-muted-foreground">Scegli cosa vuoi imparare oggi.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-fun-orange rounded-full flex items-center justify-center mb-4 shadow-fun">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Gioca e Impara</h3>
              <p className="text-muted-foreground">Ogni argomento ha un gioco divertente.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-fun-pink rounded-full flex items-center justify-center mb-4 shadow-fun">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Diventa un Esperto</h3>
              <p className="text-muted-foreground">Padroneggia ogni materia e divertiti!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
