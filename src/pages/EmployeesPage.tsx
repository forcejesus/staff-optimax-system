
import { useState } from "react";
import { Employee } from "@/types/employee";
import { useEmployees } from "@/hooks/useEmployees";
import { useAuth } from "@/contexts/AuthContext";
import { EmployeesHeader } from "@/components/employees/EmployeesHeader";
import { EmployeesTabs } from "@/components/employees/EmployeesTabs";

const EmployeesPage = () => {
  const [activeTab, setActiveTab] = useState("list");
  const { isAuthenticated } = useAuth();
  const { 
    employees, 
    isLoadingEmployees, 
    selectedEmployee, 
    setSelectedEmployee,
    deleteEmployeeMutation, 
    fetchEmployeeDetails 
  } = useEmployees();
  
  const handleViewEmployee = (employeeId: number) => {
    fetchEmployeeDetails(employeeId).then(() => {
      setActiveTab("details");
    });
  };

  const handleEditEmployee = (employeeId: number) => {
    fetchEmployeeDetails(employeeId).then(() => {
      // Ajout d'un délai pour s'assurer que les données sont chargées
      setTimeout(() => {
        if (selectedEmployee && selectedEmployee.id === employeeId) {
          setActiveTab("edit");
        } else {
          console.warn("Impossible de passer à l'édition: données employé non disponibles");
        }
      }, 300);
    });
  };

  const handleDeleteEmployee = (employeeId: number) => {
    // La confirmation est déjà gérée dans le composant EmployeeDetail avec AlertDialog
    deleteEmployeeMutation.mutate(employeeId);
  };

  const handleSaveEmployee = (updatedEmployee: Employee) => {
    setSelectedEmployee(updatedEmployee);
    setActiveTab("details");
  };

  const handleBackToList = () => {
    setSelectedEmployee(null);
    setActiveTab("list");
  };

  const handleAddEmployee = () => {
    setActiveTab("add");
  };

  const handleViewDocuments = () => {
    setActiveTab("documents");
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
      <EmployeesHeader 
        onAddEmployee={handleAddEmployee} 
        onViewDocuments={handleViewDocuments} 
      />

      <EmployeesTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        employees={employees}
        selectedEmployee={selectedEmployee}
        isLoadingEmployees={isLoadingEmployees}
        onView={handleViewEmployee}
        onEdit={handleEditEmployee}
        onDelete={handleDeleteEmployee}
        onSaveEdit={handleSaveEmployee}
        onBack={handleBackToList}
      />
    </div>
  );
};

export default EmployeesPage;
