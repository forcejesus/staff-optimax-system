
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BuildingIcon, Briefcase } from "lucide-react";
import { Employee, Department } from "@/types/employee";

interface EmployeeStatsProps {
  employees: Employee[];
  departments: Department[];
}

export function EmployeeStats({ employees, departments }: EmployeeStatsProps) {
  // Calculer le nombre de postes uniques
  const uniquePositions = new Set(
    employees
      .map(emp => emp.titre_poste)
      .filter(Boolean) // Filtrer les valeurs null/undefined/vides
  );
  
  const totalEmployees = employees.length;
  const totalDepartments = departments.length;
  const totalPositions = uniquePositions.size;
  
  // Calculer le nombre d'employés actifs
  const activeEmployees = employees.filter(emp => emp.statut === "Actif").length;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Employés</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalEmployees}</div>
          <p className="text-xs text-muted-foreground">
            {activeEmployees} employés actifs ({Math.round((activeEmployees / totalEmployees) * 100) || 0}%)
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Départements</CardTitle>
          <BuildingIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalDepartments}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round(totalEmployees / (totalDepartments || 1))} employés par département en moyenne
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Postes</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPositions}</div>
          <p className="text-xs text-muted-foreground">
            {totalPositions} postes différents dans l'entreprise
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
