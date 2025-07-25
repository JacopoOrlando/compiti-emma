import { useParams } from "react-router-dom";
import { getGameContent } from "@/lib/gameContent";
import MatchingGame from "@/components/games/MatchingGame";
import MemoryGame from "@/components/games/MemoryGame";
import TimedChallengeGame from "@/components/games/TimedChallengeGame";
import NotFound from "@/pages/NotFound";

const GamePage = () => {
  const { subject, level } = useParams<{ subject: string; level: string }>();

  if (!subject || !level) {
    return <NotFound />;
  }

  const gameContent = getGameContent(subject, "", level); // Topic is no longer needed here

  if (!gameContent || !gameContent.gameType) {
    console.error(`No game content or gameType found for ${subject}, level ${level}`);
    return <NotFound />;
  }

  // Render the correct game component based on the gameType defined for the level
  switch (gameContent.gameType) {
    case 'matching':
      return <MatchingGame />;
    case 'memory':
      return <MemoryGame />;
    case 'timed':
      return <TimedChallengeGame />;
    default:
      return <NotFound />;
  }
};

export default GamePage;
