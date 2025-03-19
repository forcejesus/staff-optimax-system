
import { Construction } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function UnderDevelopmentBanner() {
  return (
    <Alert variant="destructive" className="mb-6">
      <Construction className="h-4 w-4" />
      <AlertTitle className="text-lg font-admin font-medium">Page en cours de développement</AlertTitle>
      <AlertDescription className="text-base">
        Cette fonctionnalité est actuellement en cours de développement et sera disponible prochainement.
      </AlertDescription>
    </Alert>
  );
}
