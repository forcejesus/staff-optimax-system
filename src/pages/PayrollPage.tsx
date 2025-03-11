
import { FileText, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatCard } from "@/components/dashboard/StatCard";

const PayrollPage = () => {
  return (
    <div className="flex flex-col space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gestion de la Paie</h1>
        <p className="text-muted-foreground">
          Gérez les salaires, fiches de paie et déclarations fiscales
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Masse salariale"
          value="125 400 €"
          description="Ce mois-ci"
          icon={<FileText className="h-6 w-6" />}
          color="blue"
        />
        <StatCard 
          title="Paie à traiter"
          value="42"
          description="Employés en attente"
          icon={<FileText className="h-6 w-6" />}
          color="yellow"
        />
        <StatCard 
          title="Coût moyen"
          value="2 986 €"
          description="Par employé"
          icon={<FileText className="h-6 w-6" />}
          color="green"
        />
        <StatCard 
          title="Charges sociales"
          value="37 620 €"
          description="Ce mois-ci"
          icon={<FileText className="h-6 w-6" />}
          color="red"
        />
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Bulletins de paie récents</h2>
        <div className="flex gap-2">
          <Select defaultValue="current">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Mois courant</SelectItem>
              <SelectItem value="previous">Mois précédent</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal">Liste des bulletins de paie</CardTitle>
          <Button size="sm" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Tout exporter
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium">Employé</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Période</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Brut</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Net</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-background">
                {Array.from({length: 5}).map((_, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">Employé {index + 1}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">Octobre 2023</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">{(Math.random() * 4000 + 2000).toFixed(2)} €</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">{(Math.random() * 3000 + 1500).toFixed(2)} €</td>
                    <td className="whitespace-nowrap px-4 py-3 text-right text-sm">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Télécharger</span>
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

export default PayrollPage;
