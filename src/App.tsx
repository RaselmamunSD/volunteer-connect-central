
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import VolunteerPage from "./pages/VolunteerPage";
import TeamPage from "./pages/TeamPage";
import ConcertPage from "./pages/ConcertPage";
import AdminPage from "./pages/AdminPage";
import AdminLogin from "./pages/AdminLogin";
import VolunteerLogin from "./pages/VolunteerLogin";
import NotFound from "./pages/NotFound";
import NoticePage from "./pages/NoticePage";
import FinancePage from "./pages/FinancePage";
import BkashPaymentPage from "./pages/BkashPaymentPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/volunteer" element={<Layout><VolunteerPage /></Layout>} />
          <Route path="/volunteer/login" element={<Layout><VolunteerLogin /></Layout>} />
          <Route path="/team" element={<Layout><TeamPage /></Layout>} />
          <Route path="/concert" element={<Layout><ConcertPage /></Layout>} />
          <Route path="/admin" element={<Layout><AdminPage /></Layout>} />
          <Route path="/admin/login" element={<Layout><AdminLogin /></Layout>} />
          <Route path="/notice" element={<Layout><NoticePage /></Layout>} />
          <Route path="/finance" element={<Layout><FinancePage /></Layout>} />
          <Route path="/bkash-payment" element={<BkashPaymentPage />} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
