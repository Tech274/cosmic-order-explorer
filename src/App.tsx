import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Readings from "./pages/Readings";
import Journal from "./pages/Journal";
import BirthChart from "./pages/BirthChart";
import CosmicCalendar from "./pages/Calendar";
import Pricing from "./pages/Pricing";
import Billing from "./pages/Billing";
import Shop from "./pages/Shop";
import Sessions from "./pages/Sessions";
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
          <Route path="/readings"   element={<Readings />} />
          <Route path="/journal"    element={<Journal />} />
          <Route path="/chart"      element={<BirthChart />} />
          <Route path="/calendar"   element={<CosmicCalendar />} />
          <Route path="/pricing"    element={<Pricing />} />
          <Route path="/billing"    element={<Billing />} />
          <Route path="/shop"       element={<Shop />} />
          <Route path="/sessions"   element={<Sessions />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*"           element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
