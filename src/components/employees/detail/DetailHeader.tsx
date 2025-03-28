
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Employee } from "@/types/employee";
import { ArrowLeft, Edit } from "lucide-react";
import { DeleteEmployeeDialog } from "./DeleteEmployeeDialog";

interface DetailHeaderProps {
  employee: Employee;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function DetailHeader({ employee, onBack, onEdit, onDelete }: DetailHeaderProps) {
  return (
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Modifier
          </Button>
          <DeleteEmployeeDialog onDelete={onDelete} />
        </div>
      </div>
      <CardTitle className="text-2xl">{employee.prenom} {employee.nom}</CardTitle>
      <div className="text-muted-foreground">{employee.email}</div>
    </CardHeader>
  );
}
