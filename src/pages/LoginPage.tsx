
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, User, Key, Eye, EyeOff, Shield, Clock, Check, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
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
    { icon: <Shield className="h-5 w-5 text-indigo-500" />, title: "Sécurité renforcée", desc: "Accès sécurisé à toutes vos données" },
    { icon: <Clock className="h-5 w-5 text-emerald-500" />, title: "Gestion efficace", desc: "Optimisez le temps de gestion RH" },
    { icon: <Check className="h-5 w-5 text-amber-500" />, title: "Conformité", desc: "Respect des normes légales" },
    { icon: <Calendar className="h-5 w-5 text-rose-500" />, title: "Organisation", desc: "Planifiez et gérez facilement" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8 items-center">
        <div className="w-full lg:w-1/2 space-y-6 p-4">
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">GRH++</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Portail d'administration des ressources humaines
            </p>
          </div>
          
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
                  <div className="flex items-center gap-3 mb-2">
                    {feature.icon}
                    <h3 className="font-medium">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="hidden lg:block w-full h-[300px] relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 z-10 rounded-2xl"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(60,110,240,0.2)_0%,transparent_70%)]"></div>
            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470')] bg-cover bg-center rounded-2xl transform transition-transform duration-10000 hover:scale-110"></div>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2">
          <Card className="w-full shadow-xl border-t-4 border-t-primary animate-in slide-in-from-bottom-4 duration-500 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <LogIn className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-primary">Connexion</CardTitle>
              <div className="bg-secondary inline-block px-3 py-1 rounded-full mb-2">
                <span className="text-secondary-foreground font-semibold text-sm">ADMIN PANEL</span>
              </div>
              <CardDescription className="text-lg">
                Connectez-vous à votre espace d'administration
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formError && (
                <div className="bg-destructive/10 text-destructive rounded-md p-3 mb-4 text-sm">
                  {formError}
                </div>
              )}
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">Adresse email</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="nom@entreprise.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base">Mot de passe</Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      autoComplete="current-password"
                      required
                    />
                    <button 
                      type="button"
                      onClick={togglePasswordVisibility} 
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Skeleton className="h-5 w-5 rounded-full animate-spin mr-2" />
                      <span>Connexion en cours...</span>
                    </div>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Se connecter
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col">
              <p className="text-xs text-center text-muted-foreground mt-4">
                © {new Date().getFullYear()} GRH++. Tous droits réservés.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
