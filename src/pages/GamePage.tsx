import { useParams } from "react-router-dom";
import { gameContentMap } from "@/lib/gameContent";
import MatchingGame from "@/components/games/MatchingGame";
import MemoryGame from "@/components/games/MemoryGame";
import TimedChallengeGame from "@/components/games/TimedChallengeGame";
import NotFound from "@/pages/NotFound";
// Import other creative games here as they are built
// import StoryAdventureGame from "@/components/games/StoryAdventureGame";

const GamePage = () => {
  const { subject, topicId } = useParams<{ subject: string; topicId: string }>();

  if (!subject || !topicId) {
    return <NotFound />;
  }

  const subjectContent = gameContentMap[subject];
  const topicContent = subjectContent ? subjectContent[topicId] : null;

  if (!topicContent || !topicContent.gameType) {
    console.error(`No game content or gameType found for ${subject}, topic ${topicId}`);
    return <NotFound />;
  }

  // Render the correct game component based on the gameType defined for the topic
  switch (topicContent.gameType) {
    case 'matching':
      return <MatchingGame />;
    case 'memory':
      return <MemoryGame />;
    case 'timed':
      return <TimedChallengeGame />;
    // Add cases for new creative games here
    // case 'story':
    //   return <StoryAdventureGame />;
    default:
      return <NotFound />;
  }
};

export default GamePage;
