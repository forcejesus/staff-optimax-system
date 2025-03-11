
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { LeaveRequestForm } from "@/components/leave/LeaveRequestForm";
import { LeaveCalendar } from "@/components/leave/LeaveCalendar";

const LeavePage = () => {
  const [activeTab, setActiveTab] = useState("calendar");

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des congés</h1>
          <p className="text-muted-foreground">
            Gérez et planifiez les congés et absences
          </p>
        </div>
        <Button onClick={() => setActiveTab("request")}>
          <Plus className="mr-2 h-4 w-4" />
          Demander un congé
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="calendar">Calendrier des congés</TabsTrigger>
          <TabsTrigger value="request">Demande de congé</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar">
          <LeaveCalendar />
        </TabsContent>
        <TabsContent value="request">
          <div className="max-w-2xl mx-auto">
            <LeaveRequestForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeavePage;
