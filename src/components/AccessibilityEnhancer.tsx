import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Volume2, Pause, Settings, Eye, Zap } from "lucide-react";

interface AccessibilityEnhancerProps {
  children: React.ReactNode;
}

export const AccessibilityEnhancer = ({ children }: AccessibilityEnhancerProps) => {
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Load accessibility preferences
    const stored = localStorage.getItem('accessibility-preferences');
    if (stored) {
      const prefs = JSON.parse(stored);
      setSpeechEnabled(prefs.speechEnabled || false);
      setHighContrast(prefs.highContrast || false);
      setLargeText(prefs.largeText || false);
      setReducedMotion(prefs.reducedMotion || false);
    }
  }, []);

  useEffect(() => {
    // Save preferences
    const prefs = { speechEnabled, highContrast, largeText, reducedMotion };
    localStorage.setItem('accessibility-preferences', JSON.stringify(prefs));

    // Apply accessibility settings
    const root = document.documentElement;
    
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }

    if (reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
  }, [speechEnabled, highContrast, largeText, reducedMotion]);

  const speak = (text: string) => {
    if (!speechEnabled || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    utterance.lang = 'it-IT';
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Keyboard navigation enhancement
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Press S to toggle speech
      if (e.key === 's' && e.ctrlKey) {
        e.preventDefault();
        setSpeechEnabled(!speechEnabled);
      }
      
      // Press H for help
      if (e.key === 'h' && e.ctrlKey) {
        e.preventDefault();
        speak("Ecco le scorciatoie disponibili: Control S per attivare la sintesi vocale, Control H per questo aiuto, Tab per navigare tra gli elementi, Invio per attivare i pulsanti");
      }

      // ESC to stop speech
      if (e.key === 'Escape') {
        stopSpeech();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [speechEnabled]);

  // Auto-read important content
  useEffect(() => {
    if (!speechEnabled) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            // Read new headings
            const headings = node.querySelectorAll('h1, h2, h3');
            headings.forEach((heading) => {
              if (heading.textContent) {
                speak(heading.textContent);
              }
            });

            // Read success messages
            const successElements = node.querySelectorAll('[data-success="true"]');
            successElements.forEach((element) => {
              if (element.textContent) {
                speak(`Successo: ${element.textContent}`);
              }
            });
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [speechEnabled]);

  return (
    <div className="relative">
      {/* Accessibility Toolbar */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSettings(!showSettings)}
          className="bg-background/90 backdrop-blur-sm"
          aria-label="Impostazioni accessibilità"
        >
          <Settings className="w-4 h-4" />
        </Button>

        {showSettings && (
          <Card className="p-4 w-64 bg-background/95 backdrop-blur-sm animate-fade-in">
            <h3 className="font-bold mb-3 text-sm">Accessibilità</h3>
            
            <div className="space-y-3">
              <Button
                variant={speechEnabled ? "default" : "outline"}
                size="sm"
                onClick={() => setSpeechEnabled(!speechEnabled)}
                className="w-full justify-start text-xs"
              >
                <Volume2 className="w-3 h-3 mr-2" />
                Sintesi Vocale
              </Button>

              <Button
                variant={highContrast ? "default" : "outline"}
                size="sm"
                onClick={() => setHighContrast(!highContrast)}
                className="w-full justify-start text-xs"
              >
                <Eye className="w-3 h-3 mr-2" />
                Alto Contrasto
              </Button>

              <Button
                variant={largeText ? "default" : "outline"}
                size="sm"
                onClick={() => setLargeText(!largeText)}
                className="w-full justify-start text-xs"
              >
                <span className="w-3 h-3 mr-2 flex items-center justify-center text-lg">A</span>
                Testo Grande
              </Button>

              <Button
                variant={reducedMotion ? "default" : "outline"}
                size="sm"
                onClick={() => setReducedMotion(!reducedMotion)}
                className="w-full justify-start text-xs"
              >
                <Zap className="w-3 h-3 mr-2" />
                Meno Animazioni
              </Button>
            </div>

            <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
              <p>Scorciatoie:</p>
              <p>Ctrl+S: Sintesi vocale</p>
              <p>Ctrl+H: Aiuto</p>
              <p>ESC: Stop audio</p>
            </div>
          </Card>
        )}

        {speechEnabled && (
          <Button
            variant="outline"
            size="sm"
            onClick={stopSpeech}
            className="bg-background/90 backdrop-blur-sm"
            aria-label="Ferma audio"
          >
            <Pause className="w-4 h-4" />
          </Button>
        )}
      </div>

      {children}
    </div>
  );
};

export default AccessibilityEnhancer;