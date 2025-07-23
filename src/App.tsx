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
            
            {/* Legacy routes - mantengo per compatibilità */}
            <Route path="/math" element={<MathGame />} />
            <Route path="/reading" element={<ReadingGame />} />
            <Route path="/colors" element={<ColorsGame />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
