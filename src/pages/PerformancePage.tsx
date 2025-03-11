
import { BarChart, Award, TrendingUp, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PerformancePage = () => {
  return (
    <div className="flex flex-col space-y-8">
      <div className="ms-header rounded-xl">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Performances</h1>
          <p className="text-white/80">
            Suivez et gérez les évaluations et performances des employés
          </p>
        </div>
        <div className="absolute inset-0 ms-grid-bg opacity-10" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold tracking-tight ms-text-gradient">Évaluations récentes</h2>
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

        <Card className="ms-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
            <CardTitle className="text-lg font-medium">Dernières évaluations</CardTitle>
            <Button className="bg-primary/10 text-primary hover:bg-primary/20">
              Créer une évaluation
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-border">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Employé</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date d'évaluation</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Performance</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Évaluateur</th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-border">
                  {Array.from({length: 5}).map((_, index) => (
                    <tr key={index} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Employé {index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">01/10/2023</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          index % 3 === 0 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                            : index % 3 === 1 
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" 
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        }`}>
                          {index % 3 === 0 ? "Excellent" : index % 3 === 1 ? "Bon" : "Satisfaisant"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Manager {Math.floor(Math.random() * 3) + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
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
    </div>
  );
};

export default PerformancePage;
