import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ThemeBootstrap() {
  useEffect(() => {
    // Respect saved preference, default to dark (cosmic experience)
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "light") {
      document.documentElement.classList.remove("dark");
    } else if (saved === "dark" || prefersDark || !saved) {
      document.documentElement.classList.add("dark");
    }
  }, []);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeBootstrap />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/"           element={<Index />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard"  element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*"           element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
