
import { CardFooter } from "@/components/ui/card";

export function DocumentsSection() {
  return (
    <CardFooter className="border-t pt-6 flex flex-col items-start">
      <h3 className="text-lg font-medium mb-4">Documents</h3>
      <div className="text-sm text-muted-foreground">
        Aucun document disponible
      </div>
    </CardFooter>
  );
}
