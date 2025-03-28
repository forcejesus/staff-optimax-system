
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Employee } from "@/types/employee";
import { EmployeeTableRow } from "./EmployeeTableRow";
import { EmptyState } from "./EmptyState";

interface EmployeeTableProps {
  employees: Employee[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  searchTerm: string;
  onClearSearch: () => void;
}

export function EmployeeTable({ 
  employees, 
  onView, 
  onEdit, 
  onDelete, 
  searchTerm,
  onClearSearch
}: EmployeeTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Département</TableHead>
            <TableHead>Poste</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                <EmptyState 
                  hasSearchTerm={!!searchTerm} 
                  onClearSearch={onClearSearch} 
                />
              </TableCell>
            </TableRow>
          ) : (
            employees.map((employee) => (
              <EmployeeTableRow
                key={employee.id}
                employee={employee}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
