
import { Button } from "@/components/ui/button";
import { UserPlus, FileText } from "lucide-react";

interface EmployeesHeaderProps {
  onAddEmployee: () => void;
  onViewDocuments: () => void;
}

export function EmployeesHeader({ onAddEmployee, onViewDocuments }: EmployeesHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-primary">Gestion des employés</h1>
        <p className="text-muted-foreground">
          Gérez l'ensemble de vos employés et leurs informations
        </p>
      </div>
      <div className="flex gap-2">
        <Button onClick={onAddEmployee}>
          <UserPlus className="mr-2 h-4 w-4" />
          Ajouter un employé
        </Button>
        <Button variant="outline" onClick={onViewDocuments}>
          <FileText className="mr-2 h-4 w-4" />
          Documents
        </Button>
      </div>
    </div>
  );
}
