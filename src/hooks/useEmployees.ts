
import { useState } from "react";
import { Employee } from "@/types/employee";
import { employeeService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export function useEmployees() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const { toast } = useToast();
  const { token, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  
  // Récupérer la liste des employés
  const { 
    data: employees = [], 
    isLoading: isLoadingEmployees 
  } = useQuery({
    queryKey: ["employees"],
    queryFn: () => {
      if (!token) throw new Error("Token manquant");
      return employeeService.getAll(token);
    },
    enabled: !!token && isAuthenticated,
  });

  // Mutation pour supprimer un employé
  const deleteEmployeeMutation = useMutation({
    mutationFn: (employeeId: number) => {
      if (!token) throw new Error("Token manquant");
      return employeeService.delete(token, employeeId);
    },
    onSuccess: () => {
      toast({
        title: "Employé supprimé",
        description: "L'employé a été supprimé avec succès",
      });
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      setSelectedEmployee(null);
    },
    onError: (error) => {
      console.error("Error deleting employee:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'employé",
        variant: "destructive",
      });
    },
  });

  // Mutation pour mettre à jour un employé
  const updateEmployeeMutation = useMutation({
    mutationFn: (data: { id: number, updateData: any }) => {
      if (!token) throw new Error("Token manquant");
      return employeeService.update(token, data.id, data.updateData);
    },
    onSuccess: (data) => {
      toast({
        title: "Employé mis à jour",
        description: `La fiche de ${data.prenom} ${data.nom} a été mise à jour avec succès.`,
      });
      // Invalider la requête des employés pour rafraîchir automatiquement la liste
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      setSelectedEmployee(data);
    },
    onError: (error) => {
      console.error("Error updating employee:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'employé. Veuillez réessayer.",
        variant: "destructive",
      });
    },
  });

  // Récupérer les détails d'un employé
  const fetchEmployeeDetails = async (employeeId: number) => {
    if (!token) return;
    try {
      console.log("Fetching employee details for ID:", employeeId);
      const employee = await employeeService.getById(token, employeeId);
      console.log("Employee details received:", employee);
      
      if (!employee || !employee.id) {
        throw new Error("Données d'employé invalides");
      }
      
      setSelectedEmployee(employee);
      return employee;
    } catch (error) {
      console.error("Error fetching employee details:", error);
      toast({
        title: "Erreur",
        description: "Impossible de récupérer les détails de l'employé",
        variant: "destructive",
      });
      return null;
    }
  };

  const refreshEmployeesList = () => {
    queryClient.invalidateQueries({ queryKey: ["employees"] });
  };

  return {
    employees,
    isLoadingEmployees,
    selectedEmployee,
    setSelectedEmployee,
    deleteEmployeeMutation,
    updateEmployeeMutation,
    fetchEmployeeDetails,
    refreshEmployeesList
  };
}
