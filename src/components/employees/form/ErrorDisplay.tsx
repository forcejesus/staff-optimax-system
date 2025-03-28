
import { Button } from "@/components/ui/button";

interface ErrorDisplayProps {
  onCancel: () => void;
}

export function ErrorDisplay({ onCancel }: ErrorDisplayProps) {
  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold text-destructive mb-4">Erreur: Données de l'employé non disponibles</h2>
      <p className="mb-4">Les informations de l'employé n'ont pas pu être chargées correctement.</p>
      <Button onClick={onCancel} variant="default">
        Retour à la liste
      </Button>
    </div>
  );
}
