
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Search, MoreHorizontal, UserSearch, Filter } from "lucide-react";
import { Employee, Department } from "@/types/employee";
import { useAuth } from "@/contexts/AuthContext";
import { departmentService } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EmployeeListProps {
  employees: Employee[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function EmployeeList({ employees, onView, onEdit, onDelete }: EmployeeListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const { token } = useAuth();

  // Récupérer la liste des départements
  const { data: departments = [], isLoading: isLoadingDepartments } = useQuery({
    queryKey: ["departments"],
    queryFn: () => {
      if (!token) throw new Error("Token manquant");
      return departmentService.getAll(token);
    },
    enabled: !!token,
  });

  // Filtrer les employés en fonction de la recherche et du département sélectionné
  useEffect(() => {
    let result = [...employees];
    
    // Filtre par terme de recherche
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(emp => 
        emp.nom.toLowerCase().includes(search) || 
        emp.prenom.toLowerCase().includes(search) || 
        emp.email.toLowerCase().includes(search)
      );
    }
    
    // Filtre par département
    if (selectedDepartment && selectedDepartment !== "all") {
      const departmentId = parseInt(selectedDepartment);
      result = result.filter(emp => emp.departement_id === departmentId);
    }
    
    setFilteredEmployees(result);
  }, [employees, searchTerm, selectedDepartment]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Rechercher un employé..." 
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
        
        <div className="min-w-[200px]">
          {isLoadingDepartments ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Select value={selectedDepartment} onValueChange={handleDepartmentChange}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Département" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les départements</SelectItem>
                {departments.map((dept: Department) => (
                  <SelectItem key={dept.id} value={dept.id.toString()}>
                    {dept.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Département</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <div className="flex flex-col items-center gap-2">
                    <UserSearch className="h-10 w-10 text-muted-foreground" />
                    <p>Aucun employé trouvé</p>
                    {searchTerm && (
                      <Button 
                        variant="ghost" 
                        onClick={() => setSearchTerm("")}
                        className="h-8"
                      >
                        Effacer la recherche
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">
                    {employee.prenom} {employee.nom}
                  </TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.telephone}</TableCell>
                  <TableCell>{employee.nom_departement}</TableCell>
                  <TableCell>
                    <Badge variant={employee.statut === "Actif" ? "success" : "secondary"}>
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
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
