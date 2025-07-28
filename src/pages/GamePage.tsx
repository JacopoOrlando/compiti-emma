import { useParams } from "react-router-dom";
import { getGameContent } from "@/lib/gameContent";
import { lazy, Suspense } from "react";
import NotFound from "@/pages/NotFound";
import { TopicContent } from "@/lib/gameContent";
import { Card } from "@/components/ui/card";

// Lazy load game components for better performance
const MatchingGame = lazy(() => import("@/components/games/MatchingGame"));
const MemoryGame = lazy(() => import("@/components/games/MemoryGame"));
const TimedChallengeGame = lazy(() => import("@/components/games/TimedChallengeGame"));

const GamePage = () => {
  const { subject, topicId } = useParams<{ subject: string; topicId: string }>();

  if (!subject || !topicId) {
    return <NotFound />;
  }

  const topicContent = getGameContent(subject, topicId);

  if (!topicContent) {
    console.error(`No game content found for ${subject}, topic ${topicId}`);
    return <NotFound />;
  }

  const LoadingSpinner = () => (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="p-8 text-center">
        <div className="animate-spin text-4xl mb-4">🎮</div>
        <h2 className="text-2xl font-bold mb-4">Caricamento...</h2>
        <p>Stiamo preparando il gioco per te!</p>
      </Card>
    </div>
  );

  // Pass the entire topicContent object as a prop with lazy loading
  const renderGame = () => {
    switch (topicContent.gameType) {
      case 'matching':
        return <MatchingGame topicContent={topicContent} />;
      case 'memory':
        return <MemoryGame topicContent={topicContent} />;
      case 'timed':
        return <TimedChallengeGame topicContent={topicContent} />;
      default:
        return <NotFound />;
    }
  };

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {renderGame()}
    </Suspense>
  );
};

export default GamePage;
