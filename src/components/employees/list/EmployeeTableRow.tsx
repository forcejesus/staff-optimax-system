
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Employee } from "@/types/employee";

interface EmployeeTableRowProps {
  employee: Employee;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function EmployeeTableRow({ employee, onView, onEdit, onDelete }: EmployeeTableRowProps) {
  return (
    <TableRow key={employee.id}>
      <TableCell className="font-medium">
        {employee.prenom} {employee.nom}
      </TableCell>
      <TableCell>{employee.email}</TableCell>
      <TableCell>{employee.telephone}</TableCell>
      <TableCell>{employee.nom_departement}</TableCell>
      <TableCell>
        <Badge variant={employee.statut === "Actif" ? "default" : "secondary"}>
          {employee.statut}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView(employee.id)}>
              Voir les détails
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(employee.id)}>
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(employee.id)}
              className="text-destructive focus:text-destructive"
            >
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
