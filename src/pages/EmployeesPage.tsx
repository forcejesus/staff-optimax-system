
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UserPlus, FileText } from "lucide-react";
import { EmployeeList } from "@/components/employees/EmployeeList";
import { EmployeeForm } from "@/components/employees/EmployeeForm";
import { EmployeeDetail } from "@/components/employees/EmployeeDetail";
import { EmployeeEdit } from "@/components/employees/EmployeeEdit";
import { EmployeeDocuments } from "@/components/employees/EmployeeDocuments";
import { EmployeeAdvancements } from "@/components/employees/EmployeeAdvancements";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { Employee } from "@/types/employee";
import { Skeleton } from "@/components/ui/skeleton";

const EmployeesPage = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const { toast } = useToast();
  const { token, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  
  // Récupérer la liste des employés
  const { data: employees = [], isLoading: isLoadingEmployees } = useQuery({
    queryKey: ["employees"],
    queryFn: () => {
      if (!token) throw new Error("Token manquant");
      return employeeService.getAll(token);
    },
    enabled: !!token && isAuthenticated,
  });

  // Récupérer les détails d'un employé
  const fetchEmployeeDetails = async (employeeId: number) => {
    if (!token) return;
    try {
      const employee = await employeeService.getById(token, employeeId);
      setSelectedEmployee(employee);
      setActiveTab("details");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de récupérer les détails de l'employé",
        variant: "destructive",
      });
    }
  };

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
      setActiveTab("list");
      setSelectedEmployee(null);
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'employé",
        variant: "destructive",
      });
    },
  });

  const handleViewEmployee = (employeeId: number) => {
    fetchEmployeeDetails(employeeId);
  };

  const handleEditEmployee = (employeeId: number) => {
    fetchEmployeeDetails(employeeId);
    setActiveTab("edit");
  };

  const handleDeleteEmployee = (employeeId: number) => {
    deleteEmployeeMutation.mutate(employeeId);
  };

  const handleSaveEmployee = (updatedEmployee: Employee) => {
    setSelectedEmployee(updatedEmployee);
    setActiveTab("details");
    queryClient.invalidateQueries({ queryKey: ["employees"] });
  };

  const handleBackToList = () => {
    setSelectedEmployee(null);
    setActiveTab("list");
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col space-y-8">
        <h1 className="text-2xl font-bold text-primary">Accès non autorisé</h1>
        <p>Veuillez vous connecter pour accéder à cette page.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary">Gestion des employés</h1>
          <p className="text-muted-foreground">
            Gérez l'ensemble de vos employés et leurs informations
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setActiveTab("add")}>
            <UserPlus className="mr-2 h-4 w-4" />
            Ajouter un employé
          </Button>
          <Button variant="outline" onClick={() => setActiveTab("documents")}>
            <FileText className="mr-2 h-4 w-4" />
            Documents
          </Button>
        </div>
      </div>

      {isLoadingEmployees ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-full max-w-sm" />
          <Skeleton className="h-96 w-full" />
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="list">Liste des employés</TabsTrigger>
            <TabsTrigger value="add">Ajouter un employé</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="advancements">Avancements</TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <EmployeeList 
              employees={employees} 
              onView={handleViewEmployee} 
              onEdit={handleEditEmployee} 
              onDelete={handleDeleteEmployee} 
            />
          </TabsContent>
          <TabsContent value="details">
            {selectedEmployee ? (
              <EmployeeDetail 
                employee={selectedEmployee} 
                onEdit={() => handleEditEmployee(selectedEmployee.id)} 
                onDelete={() => handleDeleteEmployee(selectedEmployee.id)} 
                onBack={handleBackToList} 
              />
            ) : (
              <div className="text-center py-10">
                <p>Veuillez sélectionner un employé pour voir les détails.</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="edit">
            {selectedEmployee ? (
              <EmployeeEdit 
                employee={selectedEmployee} 
                onSave={handleSaveEmployee} 
                onCancel={handleBackToList} 
              />
            ) : (
              <div className="text-center py-10">
                <p>Veuillez sélectionner un employé pour modifier.</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="add">
            <EmployeeForm />
          </TabsContent>
          <TabsContent value="documents">
            <EmployeeDocuments />
          </TabsContent>
          <TabsContent value="advancements">
            <EmployeeAdvancements />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default EmployeesPage;
