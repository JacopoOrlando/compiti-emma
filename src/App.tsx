import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessibilityEnhancer } from "@/components/AccessibilityEnhancer";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Subject from "./pages/Subject";
import Topic from "./pages/Topic";
import Level from "./pages/Level";
import Exercise from "./pages/Exercise";
import NotFound from "./pages/NotFound";
import MatchingGame from "./components/games/MatchingGame";
import MemoryGame from "./components/games/MemoryGame";
import TimedChallengeGame from "./components/games/TimedChallengeGame";
import GameSelector from "./components/games/GameSelector";
import ClassicGameLoader from "./components/games/ClassicGameLoader";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <AccessibilityEnhancer>
        <TooltipProvider>
        <BrowserRouter>
          <a href="#main-content" className="skip-link">Vai al contenuto principale</a>
          <Layout>
            <main id="main-content" role="main">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/:subject" element={<Subject />} />
                <Route path="/:subject/:topic" element={<Topic />} />
                <Route path="/:subject/:topic/:level" element={<Level />} />
                <Route path="/:subject/:topic/:level/:exercise" element={<Exercise />} />
                
                {/* Structured learning routes */}
                <Route path="/:subject/:topic/pratica" element={<Exercise />} />
                <Route path="/:subject/:topic/abbinamenti" element={<MatchingGame />} />
                <Route path="/:subject/:topic/memoria" element={<MemoryGame />} />
                <Route path="/:subject/:topic/sfida-veloce" element={<TimedChallengeGame />} />
                
                {/* Game routes with context */}
                <Route path="/:subject/:topic/games" element={<GameSelector />} />
                <Route path="/:subject/:topic/games/matching" element={<MatchingGame />} />
                <Route path="/:subject/:topic/games/memory" element={<MemoryGame />} />
                <Route path="/:subject/:topic/games/timed" element={<TimedChallengeGame />} />
                <Route path="/:subject/:topic/games/classic" element={<ClassicGameLoader />} />

                {/* Legacy game routes (fallback) */}
                <Route path="/games" element={<GameSelector />} />
                <Route path="/games/matching" element={<MatchingGame />} />
                <Route path="/games/memory" element={<MemoryGame />} />
                <Route path="/games/timed" element={<TimedChallengeGame />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </Layout>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </AccessibilityEnhancer>
    </ErrorBoundary>
  </QueryClientProvider>
);

export default App;
