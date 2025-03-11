import { BarChart, Award, TrendingUp, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PerformancePage = () => {
  return (
    <div className="flex flex-col space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Performances</h1>
        <p className="text-muted-foreground">
          Suivez et gérez les évaluations et performances des employés
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Évaluations en cours"
          value="18"
          description="Ce trimestre"
          icon={<Activity className="h-6 w-6" />}
          color="blue"
        />
        <StatCard 
          title="Objectifs complétés"
          value="76%"
          description="Moyenne équipe"
          icon={<Award className="h-6 w-6" />}
          color="green"
        />
        <StatCard 
          title="Employés à évaluer"
          value="7"
          description="À réaliser ce mois"
          icon={<BarChart className="h-6 w-6" />}
          color="yellow"
        />
        <StatCard 
          title="Performance globale"
          value="4.2/5"
          description="Note moyenne"
          icon={<TrendingUp className="h-6 w-6" />}
          color="red"
        />
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Évaluations récentes</h2>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Département" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les départements</SelectItem>
              <SelectItem value="tech">Technique</SelectItem>
              <SelectItem value="sales">Commercial</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="hr">RH</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Filtrer</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal">Dernières évaluations</CardTitle>
          <Button size="sm">Créer une évaluation</Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium">Employé</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Date d'évaluation</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Performance</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Évaluateur</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-background">
                {Array.from({length: 5}).map((_, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">Employé {index + 1}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">01/10/2023</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          index % 3 === 0 
                            ? "bg-green-100 text-green-800" 
                            : index % 3 === 1 
                              ? "bg-yellow-100 text-yellow-800" 
                              : "bg-blue-100 text-blue-800"
                        }`}>
                          {index % 3 === 0 ? "Excellent" : index % 3 === 1 ? "Bon" : "Satisfaisant"}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">Manager {Math.floor(Math.random() * 3) + 1}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-right text-sm">
                      <Button variant="ghost" size="sm">
                        Voir
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformancePage;
