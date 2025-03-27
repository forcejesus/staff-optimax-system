
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary/5 to-secondary/5 p-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <div className="text-center max-w-md w-full p-8 bg-white rounded-lg shadow-lg border border-muted">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-6">
          <span className="text-2xl font-bold text-destructive">404</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Page non trouvée</h1>
        <p className="text-muted-foreground mb-6">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Button asChild>
          <Link to="/" className="inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
