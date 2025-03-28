
import { Department } from "@/types/employee";
import { Filter } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DepartmentFilterProps {
  departments: Department[];
  selectedDepartment: string;
  onDepartmentChange: (value: string) => void;
  isLoading: boolean;
}

export function DepartmentFilter({ 
  departments, 
  selectedDepartment, 
  onDepartmentChange, 
  isLoading 
}: DepartmentFilterProps) {
  if (isLoading) {
    return <Skeleton className="h-10 w-full" />;
  }

  return (
    <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
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
  );
}
