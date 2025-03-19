
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreHorizontal, Eye, Edit, Trash, UserCircle } from "lucide-react";

// Données fictives pour les employés avec des noms africains
const employees = [
  {
    id: 1,
    name: "Kofi Annan",
    email: "kofi.annan@example.com",
    department: "Ressources Humaines",
    position: "Responsable RH",
    status: "Actif",
  },
  {
    id: 2,
    name: "Fatou Diallo",
    email: "fatou.diallo@example.com",
    department: "Marketing",
    position: "Chef de Projet",
    status: "Actif",
  },
  {
    id: 3,
    name: "Amadou Diop",
    email: "amadou.diop@example.com",
    department: "Développement",
    position: "Développeur Front-end",
    status: "Actif",
  },
  {
    id: 4,
    name: "Aminata Touré",
    email: "aminata.toure@example.com",
    department: "Comptabilité",
    position: "Comptable",
    status: "En congé",
  },
  {
    id: 5,
    name: "Mamadou Sow",
    email: "mamadou.sow@example.com",
    department: "Commercial",
    position: "Responsable Commercial",
    status: "Actif",
  },
];

interface EmployeeListProps {
  onAddEmployee?: () => void;
}

export function EmployeeList({ onAddEmployee }: EmployeeListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Liste des employés</CardTitle>
        <Button className="ml-auto" size="sm" onClick={onAddEmployee}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un employé
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center py-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un employé..."
              className="w-full appearance-none pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employé</TableHead>
                <TableHead className="hidden md:table-cell">Département</TableHead>
                <TableHead className="hidden md:table-cell">Poste</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <UserCircle className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {employee.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {employee.department}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {employee.position}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={employee.status === "Actif" ? "default" : "outline"}
                    >
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Voir les détails
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
