
import { useState } from "react";
import { Clock, FileText, UserX, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RetirementPlanning } from "@/components/retirement/RetirementPlanning";
import { RetirementProcess } from "@/components/retirement/RetirementProcess";

const RetirementPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="flex flex-col space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gestion des retraites</h1>
        <p className="text-muted-foreground">
          Planifiez et gérez les départs à la retraite des employés
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Départs à la retraite"
          value="3"
          description="Prévus cette année"
          icon={<Clock className="h-6 w-6" />}
          color="blue"
        />
        <StatCard 
          title="Âge moyen de départ"
          value="62"
          description="Années"
          icon={<UserX className="h-6 w-6" />}
          color="yellow"
        />
        <StatCard 
          title="Dossiers en traitement"
          value="5"
          description="En cours"
          icon={<FileText className="h-6 w-6" />}
          color="green"
        />
        <StatCard 
          title="Départs anticipés"
          value="2"
          description="Demandes"
          icon={<Calendar className="h-6 w-6" />}
          color="red"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="upcoming">Départs à venir</TabsTrigger>
          <TabsTrigger value="process">Processus de retraite</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <RetirementPlanning />
        </TabsContent>
        <TabsContent value="process">
          <RetirementProcess />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RetirementPage;
