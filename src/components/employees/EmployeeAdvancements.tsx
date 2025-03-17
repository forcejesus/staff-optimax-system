
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Award, PlusCircle, Calendar, TrendingUp } from "lucide-react";

// Données fictives pour les avancements de carrière
const advancements = [
  {
    id: 1,
    employee: "Jean Dupont",
    previousPosition: "Développeur Junior",
    newPosition: "Développeur Senior",
    type: "Promotion",
    date: "15/06/2023",
    effectiveDate: "01/07/2023",
    status: "Approuvé"
  },
  {
    id: 2,
    employee: "Marie Lambert",
    previousPosition: "Chef de Projet",
    newPosition: "Directrice de Projet",
    type: "Promotion",
    date: "22/08/2023",
    effectiveDate: "01/09/2023",
    status: "Approuvé"
  },
  {
    id: 3,
    employee: "Sophie Dubois",
    previousPosition: "Comptable",
    newPosition: "Comptable Senior",
    type: "Augmentation",
    date: "10/09/2023",
    effectiveDate: "01/10/2023",
    status: "En attente"
  },
  {
    id: 4,
    employee: "Thomas Bernard",
    previousPosition: "Responsable Commercial",
    newPosition: "Directeur Commercial",
    type: "Promotion",
    date: "05/10/2023",
    effectiveDate: "01/11/2023",
    status: "En attente"
  },
  {
    id: 5,
    employee: "Pierre Martin",
    previousPosition: "Développeur Front-end",
    newPosition: "Lead Développeur Front-end",
    type: "Promotion",
    date: "30/09/2023",
    effectiveDate: "01/11/2023",
    status: "En cours de validation"
  }
];

export function EmployeeAdvancements() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Suivi des avancements de carrière</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nouvel avancement
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promotions en attente</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Demandes à approuver ce mois-ci
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Évaluations prévues</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Évaluations planifiées pour le trimestre
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de promotion</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,5%</div>
            <p className="text-xs text-muted-foreground">
              Augmentation par rapport à l'année précédente
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal">Avancements récents</CardTitle>
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="approved">Approuvés</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="validation">En cours de validation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employé</TableHead>
                  <TableHead className="hidden md:table-cell">Changement de poste</TableHead>
                  <TableHead className="hidden md:table-cell">Date d'effet</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {advancements.map((advancement) => (
                  <TableRow key={advancement.id}>
                    <TableCell className="font-medium">{advancement.employee}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="text-muted-foreground">{advancement.previousPosition}</span>
                      {" → "}
                      <span>{advancement.newPosition}</span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{advancement.effectiveDate}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {advancement.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          advancement.status === "Approuvé" 
                            ? "default" 
                            : advancement.status === "En attente" 
                              ? "outline" 
                              : "secondary"
                        }
                      >
                        {advancement.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
