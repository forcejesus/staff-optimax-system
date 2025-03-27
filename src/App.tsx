
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Index from "./pages/Index";
import EmployeesPage from "./pages/EmployeesPage";
import LeavePage from "./pages/LeavePage";
import AttendancePage from "./pages/AttendancePage";
import PayrollPage from "./pages/PayrollPage";
import PerformancePage from "./pages/PerformancePage";
import TrainingPage from "./pages/TrainingPage";
import RecruitmentPage from "./pages/RecruitmentPage";
import RetirementPage from "./pages/RetirementPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

// Configuration du client React Query avec des paramètres optimisés pour éviter les problèmes de rafraîchissement
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/connexion" element={<LoginPage />} />
            <Route element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route path="/" element={<Index />} />
              <Route path="/employes" element={<EmployeesPage />} />
              <Route path="/conges" element={<LeavePage />} />
              <Route path="/presences" element={<AttendancePage />} />
              <Route path="/paie" element={<PayrollPage />} />
              <Route path="/performances" element={<PerformancePage />} />
              <Route path="/formations" element={<TrainingPage />} />
              <Route path="/recrutement" element={<RecruitmentPage />} />
              <Route path="/retraite" element={<RetirementPage />} />
            </Route>
            {/* Cette route garantit que le rafraîchissement fonctionne même avec des sous-routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
