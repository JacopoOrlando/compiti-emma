import { useParams } from "react-router-dom";
import { getGameContent } from "@/lib/gameContent";
import MatchingGame from "@/components/games/MatchingGame";
import MemoryGame from "@/components/games/MemoryGame";
import TimedChallengeGame from "@/components/games/TimedChallengeGame";
import NotFound from "@/pages/NotFound";

const GamePage = () => {
  const { subject, topicId } = useParams<{ subject: string; topicId: string }>();

  if (!subject || !topicId) {
    return <NotFound />;
  }

  // Fetch content using subject and the new topicId
  const gameContent = getGameContent(subject, topicId, ""); // Level is no longer needed

  if (!gameContent || !gameContent.gameType) {
    console.error(`No game content or gameType found for ${subject}, topic ${topicId}`);
    return <NotFound />;
  }

  // Render the correct game component based on the gameType defined for the topic
  switch (gameContent.gameType) {
    case 'matching':
      return <MatchingGame />;
    case 'memory':
      return <MemoryGame />;
    case 'timed':
      return <TimedChallengeGame />;
    // Add cases for other creative games here as they are built
    // case 'story':
    //   return <StoryAdventureGame />;
    default:
      return <NotFound />;
  }
};

export default GamePage;
