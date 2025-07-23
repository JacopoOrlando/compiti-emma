import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Subject from "./pages/Subject";
import Topic from "./pages/Topic";
import NotFound from "./pages/NotFound";
import MathGame from "./components/MathGame";
import ReadingGame from "./components/ReadingGame";
import ColorsGame from "./components/ColorsGame";
import GrammarGame from "./components/GrammarGame";
import MatchingGame from "./components/games/MatchingGame";
import MemoryGame from "./components/games/MemoryGame";
import TimedChallengeGame from "./components/games/TimedChallengeGame";
import GameSelector from "./components/games/GameSelector";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/:subject" element={<Subject />} />
            <Route path="/:subject/:topic" element={<Topic />} />
            
            {/* Game routes */}
            <Route path="/games" element={<GameSelector />} />
            <Route path="/games/matching" element={<MatchingGame />} />
            <Route path="/games/memory" element={<MemoryGame />} />
            <Route path="/games/timed" element={<TimedChallengeGame />} />
            
            {/* Legacy routes - mantengo per compatibilità */}
            <Route path="/math" element={<MathGame />} />
            <Route path="/reading" element={<ReadingGame />} />
            <Route path="/colors" element={<ColorsGame />} />
            <Route path="/grammar" element={<GrammarGame />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
