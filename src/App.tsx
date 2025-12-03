import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { AdPopup } from "./components/AdPopup";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Calculator from "./pages/Calculator";
import Workouts from "./pages/Workouts";
import SupportGroups from "./pages/SupportGroups";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    const hasSeenAd = sessionStorage.getItem('hasSeenAd');
    if (!hasSeenAd) {
      const timer = setTimeout(() => {
        setShowAd(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseAd = () => {
    setShowAd(false);
    sessionStorage.setItem('hasSeenAd', 'true');
  };

  return (
    <>
      {showAd && <AdPopup onClose={handleCloseAd} />}
      <Navigation />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/events" element={<Events />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/support" element={<SupportGroups />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
