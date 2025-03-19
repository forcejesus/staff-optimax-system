
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EmployeeList } from "@/components/employees/EmployeeList";
import { EmployeeForm } from "@/components/employees/EmployeeForm";
import { EmployeeDocuments } from "@/components/employees/EmployeeDocuments";
import { EmployeeAdvancements } from "@/components/employees/EmployeeAdvancements";

const EmployeesPage = () => {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary">Gestion des employés</h1>
          <p className="text-muted-foreground">
            Gérez l'ensemble de vos employés et leurs informations
          </p>
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
          <EmployeeList onAddEmployee={() => setActiveTab("add")} />
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
