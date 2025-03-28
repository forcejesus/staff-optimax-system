
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Employee } from "@/types/employee";

interface EmployeeTableRowProps {
  employee: Employee;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function EmployeeTableRow({ employee, onView, onEdit, onDelete }: EmployeeTableRowProps) {
  const handleRowClick = () => {
    onView(employee.id);
  };

  return (
    <TableRow 
      key={employee.id} 
      onClick={handleRowClick}
      className="cursor-pointer hover:bg-muted/80"
    >
      <TableCell className="font-medium">
        {employee.prenom} {employee.nom}
      </TableCell>
      <TableCell>{employee.email}</TableCell>
      <TableCell>{employee.telephone}</TableCell>
      <TableCell>{employee.nom_departement}</TableCell>
      <TableCell>{employee.titre_poste || "Non défini"}</TableCell>
      <TableCell>
        <Badge variant={employee.statut === "Actif" ? "default" : "secondary"}>
          {employee.statut}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={(e) => {
            e.stopPropagation();
            onView(employee.id);
          }}
          title="Voir les détails"
        >
          <Eye className="h-4 w-4" />
          <span className="sr-only">Voir les détails</span>
        </Button>
      </TableCell>
    </TableRow>
  );
}
