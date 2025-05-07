
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, User, Key, Eye, EyeOff, Shield, Clock, Check, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ForgotPasswordDialog } from "@/components/auth/ForgotPasswordDialog";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const { login, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/");
    return null;
  }

  const validateForm = () => {
    if (!email.trim()) {
      setFormError("L'email est requis");
      return false;
    }
    
    if (!password) {
      setFormError("Le mot de passe est requis");
      return false;
    }
    
    // Reset any previous errors
    setFormError("");
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    await login(email, password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const features = [
    { icon: <Shield className="h-5 w-5 text-blue-500" />, title: "Sécurité renforcée", desc: "Accès sécurisé à toutes vos données" },
    { icon: <Clock className="h-5 w-5 text-green-500" />, title: "Gestion efficace", desc: "Optimisez le temps de gestion RH" },
    { icon: <Check className="h-5 w-5 text-amber-500" />, title: "Conformité", desc: "Respect des normes légales" },
    { icon: <Calendar className="h-5 w-5 text-purple-500" />, title: "Organisation", desc: "Planifiez et gérez facilement" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-950 dark:to-blue-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-indigo-400/5"></div>
      </div>
      
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left column: Features */}
        <div className="space-y-8 p-6 hidden lg:block">
          {/* Brand */}
          <div className="space-y-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg mb-6">
              <span className="font-bold text-3xl text-white">GRH</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">GRH++</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md">
              La plateforme de gestion RH moderne pour les entreprises qui valorisent leurs talents.
            </p>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-2 gap-5 mt-8">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 
                           hover:shadow-md hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                    {feature.icon}
                  </div>
                  <h3 className="font-medium">{feature.title}</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right column: Login form */}
        <div>
          <Card className="w-full overflow-hidden backdrop-blur-sm bg-white/90 dark:bg-gray-800/80 border-0 shadow-xl relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 pointer-events-none"></div>
            
            <CardHeader className="space-y-1 text-center relative z-10 pb-2">
              <div className="mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 w-12 h-1 rounded-full mb-6"></div>
              <CardTitle className="text-2xl md:text-3xl font-bold">Connexion</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">
                Accédez à votre espace d'administration
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative z-10">
              {formError && (
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg p-3 mb-6 text-sm animate-in fade-in duration-300 slide-in-from-top-2">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {formError}
                  </div>
                </div>
              )}
              
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Adresse email
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="nom@entreprise.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-11 pr-4 py-2 bg-white/60 dark:bg-gray-900/60 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Mot de passe
                    </Label>
                    <button 
                      type="button"
                      onClick={() => setForgotPasswordOpen(true)} 
                      className="text-xs text-blue-600 hover:underline dark:text-blue-400"
                    >
                      Mot de passe oublié?
                    </button>
                  </div>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-11 pr-12 py-2 bg-white/60 dark:bg-gray-900/60 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                      autoComplete="current-password"
                      required
                    />
                    <button 
                      type="button"
                      onClick={togglePasswordVisibility} 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
                      tabIndex={-1}
                      aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-5 w-5 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                      <span>Connexion en cours...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <LogIn className="h-5 w-5" />
                      <span>Se connecter</span>
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
            
            <div className="h-1 w-full bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-indigo-500/0"></div>
            
            <CardFooter className="flex flex-col text-center pt-4 pb-6 relative z-10">
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                © {new Date().getFullYear()} GRH++. Tous droits réservés.
              </p>
            </CardFooter>
          </Card>
          
          <div className="mt-8 text-center lg:hidden">
            <h3 className="font-medium text-gray-800 dark:text-white mb-4">Pourquoi choisir GRH++</h3>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, i) => (
                <div 
                  key={i} 
                  className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex flex-col items-center gap-2 mb-1">
                    <div className="p-1 rounded-md bg-gray-50 dark:bg-gray-700">
                      {feature.icon}
                    </div>
                    <h4 className="text-sm font-medium">{feature.title}</h4>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Dialog */}
      <ForgotPasswordDialog 
        isOpen={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
      />
    </div>
  );
};

export default LoginPage;
