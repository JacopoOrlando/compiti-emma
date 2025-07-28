import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";

interface GameCompletionModalProps {
  isVisible: boolean;
  score: number;
  onPlayAgain: () => void;
  onNewVariant: () => void;
}

const GameCompletionModal = ({ isVisible, score, onPlayAgain, onNewVariant }: GameCompletionModalProps) => {
  const navigate = useNavigate();
  const { subject } = useParams<{ subject: string }>();

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="p-8 text-center border-4 border-fun-green shadow-2xl max-w-md w-full">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold mb-4 text-foreground">
          Fantastico! Hai vinto!
        </h2>
        <p className="text-xl text-muted-foreground mb-6">
          Punteggio: {score} punti
        </p>
        <div className="flex flex-col gap-3">
          <Button 
            onClick={onNewVariant} 
            variant="fun" 
            size="lg" 
            className="w-full"
          >
            🎲 Nuova Variante
          </Button>
          <Button 
            onClick={onPlayAgain} 
            variant="outline" 
            size="lg" 
            className="w-full"
          >
            🔄 Stesso Gioco
          </Button>
          <Button 
            onClick={() => navigate(`/${subject}`)} 
            variant="outline" 
            size="lg"
            className="w-full"
          >
            🏠 Torna agli Argomenti
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default GameCompletionModal;