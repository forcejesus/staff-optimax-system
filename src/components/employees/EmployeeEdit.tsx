
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Employee, Department } from "@/types/employee";
import { departmentService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { BasicInfoSection } from "./form/BasicInfoSection";
import { WorkInfoSection } from "./form/WorkInfoSection";
import { AdditionalInfoSection } from "./form/AdditionalInfoSection";
import { FormActions } from "./form/FormActions";
import { ErrorDisplay } from "./form/ErrorDisplay";
import { prepareEmployeeUpdateData } from "./form/EmployeeFormUtils";
import { useEmployees } from "@/hooks/useEmployees";

interface EmployeeEditProps {
  employee: Employee;
  onSave: (employee: Employee) => void;
  onCancel: () => void;
}

export function EmployeeEdit({ employee, onSave, onCancel }: EmployeeEditProps) {
  const [formData, setFormData] = useState({
    ...employee,
  });
  const { toast } = useToast();
  const { token } = useAuth();
  const { updateEmployeeMutation } = useEmployees();
  
  // Log employee data for debugging
  useEffect(() => {
    console.log("Employee data received:", employee);
  }, [employee]);
  
  // Récupérer la liste des départements
  const { data: departments = [], isLoading: isLoadingDepartments } = useQuery({
    queryKey: ["departments"],
    queryFn: () => {
      if (!token) throw new Error("Token manquant");
      return departmentService.getAll(token);
    },
    enabled: !!token,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData = prepareEmployeeUpdateData(formData);
    
    updateEmployeeMutation.mutate(
      { id: employee.id, updateData },
      {
        onSuccess: (data) => {
          onSave(data);
        }
      }
    );
  };

  // Si employee est undefined ou null, afficher un message d'erreur
  if (!employee || !employee.id) {
    return <ErrorDisplay onCancel={onCancel} />;
  }

  if (isLoadingDepartments) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-8 w-64" />
        </div>
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">
          Modifier la fiche de {employee.prenom} {employee.nom}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Informations de base */}
              <BasicInfoSection 
                formData={formData} 
                handleChange={handleChange} 
                handleSelectChange={handleSelectChange} 
              />
              
              {/* Informations professionnelles */}
              <WorkInfoSection 
                formData={formData} 
                departments={departments} 
                handleChange={handleChange} 
                handleSelectChange={handleSelectChange} 
              />
              
              {/* Informations additionnelles */}
              <AdditionalInfoSection 
                formData={formData} 
                handleChange={handleChange} 
              />
            </div>
          </CardContent>
        </Card>

        <FormActions 
          isPending={updateEmployeeMutation.isPending} 
          onCancel={onCancel} 
        />
      </form>
    </div>
  );
}
