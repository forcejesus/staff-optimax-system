
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

// Données fictives pour les employés avec des noms africains
const employees = [
  {
    id: 1,
    name: "Kofi Annan",
    email: "kofi.annan@example.com",
    department: "Ressources Humaines",
    position: "Responsable RH",
    status: "Actif",
  },
  {
    id: 2,
    name: "Fatou Diallo",
    email: "fatou.diallo@example.com",
    department: "Marketing",
    position: "Chef de Projet",
    status: "Actif",
  },
  {
    id: 3,
    name: "Amadou Diop",
    email: "amadou.diop@example.com",
    department: "Développement",
    position: "Développeur Front-end",
    status: "Actif",
  },
  {
    id: 4,
    name: "Aminata Touré",
    email: "aminata.toure@example.com",
    department: "Comptabilité",
    position: "Comptable",
    status: "En congé",
  },
  {
    id: 5,
    name: "Mamadou Sow",
    email: "mamadou.sow@example.com",
    department: "Commercial",
    position: "Responsable Commercial",
    status: "Actif",
  },
];

const EmployeesPage = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [employeesList, setEmployeesList] = useState(employees);
  const { toast } = useToast();

  const handleViewEmployee = (employeeId: number) => {
    const employee = employeesList.find(emp => emp.id === employeeId);
    if (employee) {
      setSelectedEmployee(employee);
      setActiveTab("details");
    }
  };

  const handleEditEmployee = (employeeId: number) => {
    const employee = employeesList.find(emp => emp.id === employeeId);
    if (employee) {
      setSelectedEmployee(employee);
      setActiveTab("edit");
    }
  };

  const handleDeleteEmployee = (employeeId: number) => {
    setEmployeesList(prevEmployees => prevEmployees.filter(emp => emp.id !== employeeId));
    toast({
      title: "Employé supprimé",
      description: "L'employé a été supprimé avec succès",
    });
    setActiveTab("list");
  };

  const handleSaveEmployee = (updatedEmployee: any) => {
    setEmployeesList(prevEmployees => 
      prevEmployees.map(emp => 
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
    setSelectedEmployee(updatedEmployee);
    setActiveTab("details");
  };

  const handleBackToList = () => {
    setSelectedEmployee(null);
    setActiveTab("list");
  };

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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="list">Liste des employés</TabsTrigger>
          <TabsTrigger value="add">Ajouter un employé</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="advancements">Avancements</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <EmployeeList 
            employees={employeesList} 
            onView={handleViewEmployee} 
            onEdit={handleEditEmployee} 
            onDelete={handleDeleteEmployee} 
          />
        </TabsContent>
        <TabsContent value="details">
          {selectedEmployee && (
            <EmployeeDetail 
              employee={selectedEmployee} 
              onEdit={handleEditEmployee} 
              onDelete={handleDeleteEmployee} 
              onBack={handleBackToList} 
            />
          )}
        </TabsContent>
        <TabsContent value="edit">
          {selectedEmployee && (
            <EmployeeEdit 
              employee={selectedEmployee} 
              onSave={handleSaveEmployee} 
              onCancel={handleBackToList} 
            />
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
    </div>
  );
};

export default EmployeesPage;
