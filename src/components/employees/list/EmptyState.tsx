
import { Button } from "@/components/ui/button";
import { UserSearch } from "lucide-react";

interface EmptyStateProps {
  hasSearchTerm: boolean;
  onClearSearch: () => void;
}

export function EmptyState({ hasSearchTerm, onClearSearch }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 py-10">
      <UserSearch className="h-10 w-10 text-muted-foreground" />
      <p>Aucun employé trouvé</p>
      {hasSearchTerm && (
        <Button 
          variant="ghost" 
          onClick={onClearSearch}
          className="h-8"
        >
          Effacer la recherche
        </Button>
      )}
    </div>
  );
}
