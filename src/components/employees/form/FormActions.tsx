
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Save } from "lucide-react";

interface FormActionsProps {
  isPending: boolean;
  onCancel: () => void;
}

export function FormActions({ isPending, onCancel }: FormActionsProps) {
  return (
    <div className="flex justify-end gap-4">
      <Button type="button" variant="outline" onClick={onCancel}>
        Annuler
      </Button>
      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <span className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full animate-spin" />
            Enregistrement...
          </span>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Enregistrer
          </>
        )}
      </Button>
    </div>
  );
}
