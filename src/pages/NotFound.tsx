import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import unicornCelebration from "@/assets/unicorn-celebration.jpg";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="max-w-md mx-auto text-center p-8 shadow-card border-4 border-fun-pink/20">
        <div className="mb-6">
          <img 
            src={unicornCelebration} 
            alt="Emma's unicorn" 
            className="w-24 h-24 mx-auto rounded-full mb-4 animate-bounce-gentle" 
          />
          <AlertTriangle className="w-16 h-16 mx-auto text-fun-orange mb-4" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          🦄 Oops! Pagina non trovata
        </h1>
        
        <p className="text-lg text-muted-foreground mb-6">
          Emma non riesce a trovare questa pagina magica! 🌈<br/>
          <span className="text-sm font-mono bg-muted p-2 rounded mt-2 block">
            {location.pathname}
          </span>
        </p>
        
        <div className="space-y-4">
          <Button 
            variant="fun" 
            size="lg"
            onClick={() => navigate('/')}
            className="w-full"
          >
            <Home className="w-5 h-5 mr-2" />
            🏠 Torna a Casa con Emma
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="w-full"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            ← Vai Indietro
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground mt-6">
          ✨ Suggerimento: Usa la sidebar per navigare! ✨
        </p>
      </Card>
    </div>
  );
};

export default NotFound;