import { useParams } from "react-router-dom";
import MathGame from "@/components/MathGame";
import ReadingGame from "@/components/ReadingGame";
import GrammarGame from "@/components/GrammarGame";
import ColorsGame from "@/components/ColorsGame";
import NotFound from "@/pages/NotFound";

const ClassicGameLoader = () => {
  const { subject, topic } = useParams<{ subject: string, topic: string }>();

  switch (subject) {
    case 'matematica':
      return <MathGame />;
    case 'italiano':
      if (topic === 'riflessione-linguistica') {
        return <GrammarGame />;
      }
      return <ReadingGame />;
    case 'english':
        return <ReadingGame />;
    // Add cases for other subjects that have a "classic" game
    // For example, if you create a HistoryGame:
    // case 'storia':
    //   return <HistoryGame />;
    default:
      // Fallback to a relevant game or a "Not Found" page if no classic game exists
      // For now, we can default to MathGame as a safe fallback.
      return <MathGame />;
  }
};

export default ClassicGameLoader;
