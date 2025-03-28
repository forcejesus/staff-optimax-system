
import { useState, useEffect } from "react";
import { Employee, Department } from "@/types/employee";
import { useAuth } from "@/contexts/AuthContext";
import { departmentService } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { EmployeeSearch } from "./list/EmployeeSearch";
import { DepartmentFilter } from "./list/DepartmentFilter";
import { EmployeeTable } from "./list/EmployeeTable";
import { EmployeeStats } from "./list/EmployeeStats";

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

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="space-y-4">
      {/* Statistiques des employés */}
      <EmployeeStats 
        employees={employees} 
        departments={departments} 
      />
      
      <div className="flex flex-col sm:flex-row gap-4">
        <EmployeeSearch 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
        
        <div className="min-w-[200px]">
          <DepartmentFilter 
            departments={departments} 
            selectedDepartment={selectedDepartment}
            onDepartmentChange={handleDepartmentChange}
            isLoading={isLoadingDepartments}
          />
        </div>
      </div>

      <EmployeeTable 
        employees={filteredEmployees}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        searchTerm={searchTerm}
        onClearSearch={handleClearSearch}
      />
    </div>
  );
}
