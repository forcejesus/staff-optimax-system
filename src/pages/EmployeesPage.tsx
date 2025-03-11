
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UserPlus } from "lucide-react";
import { EmployeeList } from "@/components/employees/EmployeeList";
import { EmployeeForm } from "@/components/employees/EmployeeForm";

const EmployeesPage = () => {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des employés</h1>
          <p className="text-muted-foreground">
            Gérez l'ensemble de vos employés et leurs informations
          </p>
        </div>
        <Button onClick={() => setActiveTab("add")}>
          <UserPlus className="mr-2 h-4 w-4" />
          Ajouter un employé
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="list">Liste des employés</TabsTrigger>
          <TabsTrigger value="add">Ajouter un employé</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <EmployeeList />
        </TabsContent>
        <TabsContent value="add">
          <EmployeeForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeesPage;
