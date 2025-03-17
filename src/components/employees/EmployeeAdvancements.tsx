
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Award, PlusCircle, Calendar, TrendingUp } from "lucide-react";

// Données fictives pour les avancements de carrière avec des noms africains
const advancements = [
  {
    id: 1,
    employee: "Kofi Annan",
    previousPosition: "Développeur Junior",
    newPosition: "Développeur Senior",
    type: "Promotion",
    date: "15/06/2023",
    effectiveDate: "01/07/2023",
    status: "Approuvé"
  },
  {
    id: 2,
    employee: "Fatou Diallo",
    previousPosition: "Chef de Projet",
    newPosition: "Directrice de Projet",
    type: "Promotion",
    date: "22/08/2023",
    effectiveDate: "01/09/2023",
    status: "Approuvé"
  },
  {
    id: 3,
    employee: "Aminata Touré",
    previousPosition: "Comptable",
    newPosition: "Comptable Senior",
    type: "Augmentation",
    date: "10/09/2023",
    effectiveDate: "01/10/2023",
    status: "En attente"
  },
  {
    id: 4,
    employee: "Mamadou Sow",
    previousPosition: "Responsable Commercial",
    newPosition: "Directeur Commercial",
    type: "Promotion",
    date: "05/10/2023",
    effectiveDate: "01/11/2023",
    status: "En attente"
  },
  {
    id: 5,
    employee: "Amadou Diop",
    previousPosition: "Développeur Front-end",
    newPosition: "Lead Développeur Front-end",
    type: "Promotion",
    date: "30/09/2023",
    effectiveDate: "01/11/2023",
    status: "En cours de validation"
  }
];

export function EmployeeAdvancements() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleAddAdvancement = (e) => {
    e.preventDefault();
    setIsDialogOpen(false);
    // Ici on peut ajouter la logique pour traiter le formulaire
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Suivi des avancements de carrière</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouvel avancement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Ajouter un nouvel avancement</DialogTitle>
              <DialogDescription>
                Complétez les informations pour créer un nouvel avancement de carrière.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddAdvancement}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="employee" className="text-right">Employé</Label>
                  <div className="col-span-3">
                    <Select>
                      <SelectTrigger id="employee">
                        <SelectValue placeholder="Sélectionner un employé" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Kofi Annan</SelectItem>
                        <SelectItem value="2">Fatou Diallo</SelectItem>
                        <SelectItem value="3">Amadou Diop</SelectItem>
                        <SelectItem value="4">Aminata Touré</SelectItem>
                        <SelectItem value="5">Mamadou Sow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="prevPosition" className="text-right">Poste actuel</Label>
                  <Input id="prevPosition" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="newPosition" className="text-right">Nouveau poste</Label>
                  <Input id="newPosition" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">Type</Label>
                  <div className="col-span-3">
                    <Select>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Type d'avancement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="promotion">Promotion</SelectItem>
                        <SelectItem value="augmentation">Augmentation</SelectItem>
                        <SelectItem value="transfert">Transfert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="effectiveDate" className="text-right">Date d'effet</Label>
                  <Input id="effectiveDate" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="reason" className="text-right">Motif</Label>
                  <Textarea id="reason" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Enregistrer</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
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
