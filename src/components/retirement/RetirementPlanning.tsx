
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, FileText, Eye } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Données fictives pour les départs à la retraite
const upcomingRetirements = [
  {
    id: 1,
    employee: "Robert Lefèvre",
    position: "Responsable RH",
    age: 61,
    retirementDate: "30/06/2024",
    remainingDays: 240,
    status: "Planifié",
    completionPercentage: 75
  },
  {
    id: 2,
    employee: "Jeanne Moreau",
    position: "Directrice Financière",
    age: 63,
    retirementDate: "15/03/2024",
    remainingDays: 135,
    status: "En préparation",
    completionPercentage: 60
  },
  {
    id: 3,
    employee: "Michel Durand",
    position: "Ingénieur Senior",
    age: 60,
    retirementDate: "01/09/2024",
    remainingDays: 305,
    status: "Planifié",
    completionPercentage: 45
  },
  {
    id: 4,
    employee: "Françoise Blanc",
    position: "Comptable Principal",
    age: 62,
    retirementDate: "31/12/2023",
    remainingDays: 60,
    status: "Urgent",
    completionPercentage: 90
  },
  {
    id: 5,
    employee: "Philippe Martin",
    position: "Technicien",
    age: 64,
    retirementDate: "28/02/2024",
    remainingDays: 120,
    status: "En préparation",
    completionPercentage: 50
  }
];

export function RetirementPlanning() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Employés approchant de la retraite</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employé</TableHead>
                  <TableHead className="hidden md:table-cell">Poste</TableHead>
                  <TableHead className="hidden md:table-cell">Âge</TableHead>
                  <TableHead>Date de départ</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Progression</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingRetirements.map((retirement) => (
                  <TableRow key={retirement.id}>
                    <TableCell className="font-medium">{retirement.employee}</TableCell>
                    <TableCell className="hidden md:table-cell">{retirement.position}</TableCell>
                    <TableCell className="hidden md:table-cell">{retirement.age} ans</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{retirement.retirementDate}</span>
                        <span className="text-xs text-muted-foreground">
                          {retirement.remainingDays} jours restants
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          retirement.status === "Urgent" 
                            ? "destructive" 
                            : retirement.status === "En préparation" 
                              ? "outline" 
                              : "default"
                        }
                      >
                        {retirement.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={retirement.completionPercentage} className="h-2" />
                        <span className="text-xs whitespace-nowrap">{retirement.completionPercentage}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Voir le dossier
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-normal">Planning des départs</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { month: "Décembre 2023", count: 1 },
                { month: "Février 2024", count: 1 },
                { month: "Mars 2024", count: 1 },
                { month: "Juin 2024", count: 1 },
                { month: "Septembre 2024", count: 1 }
              ].map((period) => (
                <div key={period.month} className="flex items-center justify-between">
                  <div className="font-medium">{period.month}</div>
                  <Badge variant="outline">{period.count} départ{period.count > 1 ? 's' : ''}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-normal">Documents à préparer</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { document: "Attestation de fin de carrière", count: 3 },
                { document: "Certificat de travail", count: 5 },
                { document: "Solde de tout compte", count: 2 },
                { document: "Attestation Pôle Emploi", count: 5 },
                { document: "Relevé de situation individuelle", count: 4 }
              ].map((doc) => (
                <div key={doc.document} className="flex items-center justify-between">
                  <div className="font-medium">{doc.document}</div>
                  <Badge variant="outline">{doc.count} à préparer</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
