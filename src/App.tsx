
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OrganizationLogin from "./pages/OrganizationLogin";
import OrganizationSignup from "./pages/OrganizationSignup";
import OrganizationDashboard from "./pages/OrganizationDashboard";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Support from "./pages/Support";
import Donation from "./pages/Donation";
import AnimatedCursor from "./components/AnimatedCursor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AnimatedCursor />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/organization/login" element={<OrganizationLogin />} />
          <Route path="/organization/signup" element={<OrganizationSignup />} />
          <Route path="/organization/dashboard" element={<OrganizationDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} />
          <Route path="/donation" element={<Donation />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
