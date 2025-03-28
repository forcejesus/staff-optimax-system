
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EmployeeList } from "@/components/employees/EmployeeList";
import { EmployeeForm } from "@/components/employees/EmployeeForm";
import { EmployeeDetail } from "@/components/employees/EmployeeDetail";
import { EmployeeEdit } from "@/components/employees/EmployeeEdit";
import { EmployeeDocuments } from "@/components/employees/EmployeeDocuments";
import { EmployeeAdvancements } from "@/components/employees/EmployeeAdvancements";
import { Skeleton } from "@/components/ui/skeleton";
import { Employee } from "@/types/employee";

interface EmployeesTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  employees: Employee[];
  selectedEmployee: Employee | null;
  isLoadingEmployees: boolean;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onSaveEdit: (employee: Employee) => void;
  onBack: () => void;
}

export function EmployeesTabs({
  activeTab,
  setActiveTab,
  employees,
  selectedEmployee,
  isLoadingEmployees,
  onView,
  onEdit,
  onDelete,
  onSaveEdit,
  onBack
}: EmployeesTabsProps) {
  if (isLoadingEmployees) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-full max-w-sm" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
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
          onView={onView} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      </TabsContent>
      <TabsContent value="details">
        {selectedEmployee ? (
          <EmployeeDetail 
            employee={selectedEmployee} 
            onEdit={() => onEdit(selectedEmployee.id)} 
            onDelete={() => onDelete(selectedEmployee.id)} 
            onBack={onBack} 
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
            onSave={onSaveEdit} 
            onCancel={onBack} 
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
  );
}
