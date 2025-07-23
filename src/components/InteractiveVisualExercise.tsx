import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle, Star, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import unicornCelebration from '@/assets/unicorn-celebration.jpg';
import rainbowPattern from '@/assets/rainbow-pattern.jpg';

interface VisualItem {
  id: string;
  value: number;
  color: string;
  emoji: string;
  position: { x: number; y: number };
}

interface InteractiveVisualExerciseProps {
  exerciseType: 'counting' | 'matching' | 'sorting';
  targetValue?: number;
  onComplete: (correct: boolean) => void;
}

const InteractiveVisualExercise: React.FC<InteractiveVisualExerciseProps> = ({
  exerciseType,
  targetValue = 5,
  onComplete
}) => {
  const [visualItems, setVisualItems] = useState<VisualItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const emojis = ['🌟', '🦄', '🌈', '✨', '💎', '🎈', '🎀', '🌸', '🦋', '🍀'];
  const colors = ['bg-pink-400', 'bg-purple-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-red-400'];

  useEffect(() => {
    generateExercise();
  }, [exerciseType, targetValue]);

  const generateExercise = () => {
    const items: VisualItem[] = [];
    
    switch (exerciseType) {
      case 'counting':
        // Genera oggetti sparsi da contare
        const totalItems = Math.floor(Math.random() * 8) + 3; // 3-10 oggetti
        for (let i = 0; i < totalItems; i++) {
          items.push({
            id: `item-${i}`,
            value: 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            position: {
              x: Math.random() * 80 + 10, // 10-90% della larghezza
              y: Math.random() * 60 + 20  // 20-80% dell'altezza
            }
          });
        }
        break;
        
      case 'matching':
        // Genera coppie da abbinare
        const pairs = Math.floor(Math.random() * 3) + 2; // 2-4 coppie
        for (let i = 0; i < pairs; i++) {
          const emoji = emojis[i];
          const color = colors[i];
          // Prima del paio
          items.push({
            id: `pair-${i}-a`,
            value: i,
            color,
            emoji,
            position: {
              x: Math.random() * 40 + 10,
              y: Math.random() * 80 + 10
            }
          });
          // Seconda del paio
          items.push({
            id: `pair-${i}-b`,
            value: i,
            color,
            emoji,
            position: {
              x: Math.random() * 40 + 50,
              y: Math.random() * 80 + 10
            }
          });
        }
        break;
        
      case 'sorting':
        // Genera oggetti di colori/forme diverse da ordinare
        const sortItems = Math.floor(Math.random() * 6) + 4; // 4-9 oggetti
        for (let i = 0; i < sortItems; i++) {
          items.push({
            id: `sort-${i}`,
            value: Math.floor(i / 2), // Gruppi di 2
            color: colors[Math.floor(i / 2) % colors.length],
            emoji: emojis[Math.floor(i / 2) % emojis.length],
            position: {
              x: Math.random() * 80 + 10,
              y: Math.random() * 60 + 20
            }
          });
        }
        break;
    }
    
    setVisualItems(items);
    setSelectedItems([]);
    setIsCompleted(false);
    setShowCelebration(false);
  };

  const handleItemClick = (itemId: string) => {
    if (isCompleted) return;

    const newSelected = selectedItems.includes(itemId)
      ? selectedItems.filter(id => id !== itemId)
      : [...selectedItems, itemId];
    
    setSelectedItems(newSelected);
    
    // Controlla se l'esercizio è completato
    checkCompletion(newSelected);
  };

  const checkCompletion = (selected: string[]) => {
    let isCorrect = false;
    
    switch (exerciseType) {
      case 'counting':
        isCorrect = selected.length === targetValue;
        break;
        
      case 'matching':
        // Controlla se tutti gli elementi selezionati formano coppie
        const selectedValues = selected.map(id => 
          visualItems.find(item => item.id === id)?.value
        );
        const valueCounts = selectedValues.reduce((acc, val) => {
          acc[val!] = (acc[val!] || 0) + 1;
          return acc;
        }, {} as Record<number, number>);
        
        isCorrect = Object.values(valueCounts).every(count => count === 2) && 
                   selected.length >= 4;
        break;
        
      case 'sorting':
        // Controlla se gli elementi sono raggruppati correttamente
        const selectedSortItems = selected.map(id => 
          visualItems.find(item => item.id === id)
        ).filter(Boolean);
        
        const groups = selectedSortItems.reduce((acc, item) => {
          if (!acc[item!.value]) acc[item!.value] = [];
          acc[item!.value].push(item);
          return acc;
        }, {} as Record<number, VisualItem[]>);
        
        isCorrect = Object.keys(groups).length >= 2 && 
                   Object.values(groups).every(group => group.length >= 2);
        break;
    }
    
    if (isCorrect && selected.length > 0) {
      setIsCompleted(true);
      setShowCelebration(true);
      onComplete(true);
      
      toast("🦄 Fantastico! Hai completato l'esercizio!", {
        description: "Emma è orgogliosa di te! ✨",
      });
      
      // Nascondi la celebrazione dopo 3 secondi
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  const getExerciseTitle = () => {
    switch (exerciseType) {
      case 'counting':
        return `🔢 Conta ${targetValue} oggetti magici!`;
      case 'matching':
        return `🎯 Trova le coppie di oggetti uguali!`;
      case 'sorting':
        return `🌈 Raggruppa gli oggetti dello stesso tipo!`;
      default:
        return '✨ Esercizio Magico!';
    }
  };

  return (
    <div className="relative w-full h-96 rounded-xl overflow-hidden"
         style={{ 
           backgroundImage: `url(${rainbowPattern})`,
           backgroundSize: 'cover',
           backgroundPosition: 'center'
         }}>
      
      {/* Overlay per maggiore leggibilità */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
      
      {/* Titolo dell'esercizio */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <Card className="px-4 py-2 bg-white/90 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-center">{getExerciseTitle()}</h3>
        </Card>
      </div>

      {/* Oggetti interattivi */}
      <div className="relative w-full h-full">
        {visualItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 
                       w-12 h-12 ${item.color} rounded-full flex items-center justify-center
                       transition-all duration-300 hover:scale-110 active:scale-95
                       ${selectedItems.includes(item.id) 
                         ? 'ring-4 ring-white ring-opacity-80 shadow-xl' 
                         : 'shadow-lg hover:shadow-xl'
                       }
                       ${isCompleted ? 'animate-bounce' : ''}
                     `}
            style={{
              left: `${item.position.x}%`,
              top: `${item.position.y}%`,
            }}
            disabled={isCompleted}
          >
            <span className="text-2xl">{item.emoji}</span>
          </button>
        ))}
      </div>

      {/* Celebrazione */}
      {showCelebration && (
        <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/20 backdrop-blur-sm">
          <Card className="p-8 text-center bg-white/95 backdrop-blur-sm animate-scale-in">
            <img 
              src={unicornCelebration} 
              alt="Unicorn celebration" 
              className="w-24 h-24 mx-auto mb-4 rounded-full animate-bounce"
            />
            <h2 className="text-3xl font-bold text-primary mb-2">
              🎉 Perfetto! 🎉
            </h2>
            <p className="text-lg text-muted-foreground">
              Emma è così orgogliosa di te! ✨
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
              <Star className="w-6 h-6 text-yellow-500 animate-pulse" />
              <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
            </div>
          </Card>
        </div>
      )}

      {/* Contatore degli oggetti selezionati */}
      <div className="absolute bottom-4 right-4 z-20">
        <Card className="px-3 py-2 bg-white/90 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Selezionati:</span>
            <span className="text-lg font-bold text-primary">{selectedItems.length}</span>
          </div>
        </Card>
      </div>

      {/* Pulsante per ricominciare */}
      <div className="absolute bottom-4 left-4 z-20">
        <Button 
          variant="outline" 
          size="sm"
          onClick={generateExercise}
          className="bg-white/90 backdrop-blur-sm"
        >
          🔄 Nuovo Esercizio
        </Button>
      </div>
    </div>
  );
};

export default InteractiveVisualExercise;