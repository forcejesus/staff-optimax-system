
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Calendar, FileText } from "lucide-react";
import { LeaveRequestForm } from "@/components/leave/LeaveRequestForm";
import { LeaveCalendar } from "@/components/leave/LeaveCalendar";
import { PermissionRequestForm } from "@/components/leave/PermissionRequestForm";

const LeavePage = () => {
  const [activeTab, setActiveTab] = useState("calendar");

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary">Gestion des congés et permissions</h1>
          <p className="text-muted-foreground">
            Gérez et planifiez les congés, absences et permissions exceptionnelles
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setActiveTab("request")}>
            <Plus className="mr-2 h-4 w-4" />
            Demander un congé
          </Button>
          <Button variant="outline" onClick={() => setActiveTab("permission")}>
            <FileText className="mr-2 h-4 w-4" />
            Demander une permission
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="calendar">Calendrier des congés</TabsTrigger>
          <TabsTrigger value="request">Demande de congé</TabsTrigger>
          <TabsTrigger value="permission">Demande de permission</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar">
          <LeaveCalendar />
        </TabsContent>
        <TabsContent value="request">
          <div className="max-w-2xl mx-auto">
            <LeaveRequestForm />
          </div>
        </TabsContent>
        <TabsContent value="permission">
          <div className="max-w-2xl mx-auto">
            <PermissionRequestForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeavePage;
