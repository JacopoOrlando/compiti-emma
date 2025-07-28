import { useParams } from "react-router-dom";
import { getGameContent } from "@/lib/gameContent";
import MatchingGame from "@/components/games/MatchingGame";
import MemoryGame from "@/components/games/MemoryGame";
import TimedChallengeGame from "@/components/games/TimedChallengeGame";
import NotFound from "@/pages/NotFound";
import { TopicContent } from "@/lib/gameContent";

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

  // Pass the entire topicContent object as a prop
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

export default GamePage;
