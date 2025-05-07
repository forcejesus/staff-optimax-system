
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ForgotPasswordDialog } from "@/components/auth/ForgotPasswordDialog";
import { LoginForm } from "@/components/login/LoginForm";
import { FeatureShowcase } from "@/components/login/FeatureShowcase";
import { BrandLogo } from "@/components/login/BrandLogo";

const LoginPage = () => {
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/");
    return null;
  }

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
          <BrandLogo />
          
          {/* Features */}
          <FeatureShowcase />
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
              <LoginForm setForgotPasswordOpen={setForgotPasswordOpen} />
            </CardContent>
            
            <div className="h-1 w-full bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-indigo-500/0"></div>
            
            <CardFooter className="flex flex-col text-center pt-4 pb-6 relative z-10">
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                © {new Date().getFullYear()} GRH++. Tous droits réservés.
              </p>
            </CardFooter>
          </Card>
          
          {/* Mobile features */}
          <FeatureShowcase />
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
