
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { authService } from "@/services/api";

// Define the employee type based on JWT payload
interface Employee {
  employe_id: number;
  employe_nom: string;
  employe_prenom: string;
  employe_email: string;
  employe_poste_id: number;
  employe_departement_id: number;
}

// Define JWT payload structure
interface JwtPayload {
  sub: string;
  id: number;
  exp: number;
  is_staff: boolean;
  is_superuser: boolean;
  employe: Employee;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: JwtPayload | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check for token on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      
      if (!token) {
        setIsLoading(false);
        return;
      }
      
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("authToken");
          setIsAuthenticated(false);
          setUser(null);
          setIsLoading(false);
          return;
        }
        
        // Verify the user is an admin
        if (!decoded.is_staff || !decoded.is_superuser) {
          localStorage.removeItem("authToken");
          setIsAuthenticated(false);
          setUser(null);
          setIsLoading(false);
          return;
        }
        
        setUser(decoded);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
        setUser(null);
        console.error("Invalid token:", error);
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const data = await authService.login(email, password);
      console.log("Réponse d'authentification:", data);
      
      // Vérifiez la structure exacte renvoyée par votre API Django
      const token = data.access_token || data.token;
      
      if (!token) {
        console.error("Token introuvable dans la réponse:", data);
        toast.error("Format de réponse invalide. Contactez l'administrateur.");
        setIsLoading(false);
        return false;
      }
      
      // Store token in localStorage
      localStorage.setItem("authToken", token);
      
      // Decode token
      const decoded = jwtDecode<JwtPayload>(token);
      console.log("Données décodées:", decoded);
      
      // Check if user is admin
      if (!decoded.is_staff || !decoded.is_superuser) {
        localStorage.removeItem("authToken");
        toast.error("Accès non autorisé. Cette interface est réservée au personnel administratif. Votre tentative d'accès a été enregistrée.");
        setIsLoading(false);
        return false;
      }
      
      setUser(decoded);
      setIsAuthenticated(true);
      
      // Ajouter un léger délai pour éviter un rendu trop brusque du dashboard
      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 500);
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Échec de connexion. Veuillez vérifier vos identifiants.");
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/connexion");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
