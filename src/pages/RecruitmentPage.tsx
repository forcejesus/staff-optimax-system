
import { UserPlus, Users, Briefcase, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";
import { Badge } from "@/components/ui/badge";

const RecruitmentPage = () => {
  return (
    <div className="flex flex-col space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Recrutement</h1>
        <p className="text-muted-foreground">
          Gérez les offres d'emploi et le processus de recrutement
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Postes ouverts"
          value="12"
          description="En cours"
          icon={<Briefcase className="h-6 w-6" />}
          color="blue"
        />
        <StatCard 
          title="Candidatures"
          value="87"
          description="Ce mois-ci"
          icon={<Users className="h-6 w-6" />}
          color="yellow"
        />
        <StatCard 
          title="Entretiens"
          value="24"
          description="Planifiés"
          icon={<UserPlus className="h-6 w-6" />}
          color="green"
        />
        <StatCard 
          title="Taux de conversion"
          value="8,2%"
          description="Candidatures → Embauches"
          icon={<FileText className="h-6 w-6" />}
          color="red"
        />
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Offres d'emploi actives</h2>
        <Button>Créer une offre</Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal">Liste des offres</CardTitle>
          <Button variant="outline" size="sm">Voir toutes les offres</Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium">Poste</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Département</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Date de publication</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Candidatures</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-background">
                {[
                  "Développeur Frontend", 
                  "Responsable RH", 
                  "Commercial", 
                  "Chef de projet", 
                  "Designer UX"
                ].map((position, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium">{position}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">
                      {["Technique", "RH", "Ventes", "Opérations", "Technique"][index]}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">
                      {["01/10/2023", "15/09/2023", "22/09/2023", "10/10/2023", "05/10/2023"][index]}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">
                      {[24, 12, 18, 9, 15][index]}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right text-sm">
                      <Badge variant={index % 3 === 0 ? "default" : index % 3 === 1 ? "secondary" : "outline"}>
                        {index % 3 === 0 ? "En cours" : index % 3 === 1 ? "Entretiens" : "Nouveau"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Candidats récents</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({length: 3}).map((_, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Candidat {index + 1}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {["Développeur Frontend", "Responsable RH", "Commercial"][index]}
                  </p>
                </div>
                <Badge variant={index === 0 ? "default" : index === 1 ? "secondary" : "outline"}>
                  {index === 0 ? "Nouveau" : index === 1 ? "En attente" : "Entretien"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm text-muted-foreground">CV reçu le {["10/10/2023", "05/10/2023", "01/10/2023"][index]}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">Voir le profil</Button>
                <Button size="sm" className="flex-1">Contacter</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecruitmentPage;
