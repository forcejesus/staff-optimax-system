
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Upload, Download, Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Types de documents
const documentTypes = [
  "Demande de permission",
  "Demande de congé",
  "Certificat médical",
  "Attestation de travail",
  "Contrat de travail",
  "Fiche de paie",
  "Document administratif",
  "Autre"
];

// Documents fictifs pour la démonstration
const documents = [
  {
    id: 1,
    name: "Demande de congé - Jean Dupont",
    type: "Demande de congé",
    employee: "Jean Dupont",
    date: "15/09/2023",
    status: "Approuvé"
  },
  {
    id: 2,
    name: "Certificat médical - Sophie Dubois",
    type: "Certificat médical",
    employee: "Sophie Dubois",
    date: "22/09/2023",
    status: "Traité"
  },
  {
    id: 3,
    name: "Permission exceptionnelle - Marie Lambert",
    type: "Demande de permission",
    employee: "Marie Lambert",
    date: "05/10/2023",
    status: "En attente"
  },
  {
    id: 4,
    name: "Contrat de travail - Thomas Bernard",
    type: "Contrat de travail",
    employee: "Thomas Bernard",
    date: "01/08/2023",
    status: "Signé"
  },
  {
    id: 5,
    name: "Fiche de paie - Pierre Martin",
    type: "Fiche de paie",
    employee: "Pierre Martin",
    date: "30/09/2023",
    status: "Généré"
  }
];

export function EmployeeDocuments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [documentType, setDocumentType] = useState("all");

  // Filtrer les documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.employee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = documentType === "all" || doc.type === documentType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Téléverser un document</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Select onValueChange={(value) => setDocumentType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Type de document" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Employé concerné" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jean">Jean Dupont</SelectItem>
                  <SelectItem value="sophie">Sophie Dubois</SelectItem>
                  <SelectItem value="marie">Marie Lambert</SelectItem>
                  <SelectItem value="thomas">Thomas Bernard</SelectItem>
                  <SelectItem value="pierre">Pierre Martin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Input type="file" />
            </div>
          </div>
          <Button className="mt-4">
            <Upload className="mr-2 h-4 w-4" />
            Téléverser le document
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal">Documents des employés</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher un document..."
                className="w-full appearance-none pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={documentType} onValueChange={setDocumentType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type de document" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                {documentTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead className="hidden md:table-cell">Employé</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-xs text-muted-foreground">{doc.type}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{doc.employee}</TableCell>
                    <TableCell className="hidden md:table-cell">{doc.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          doc.status === "Approuvé" || doc.status === "Signé" || doc.status === "Généré" 
                            ? "default" 
                            : doc.status === "En attente" 
                              ? "outline" 
                              : "secondary"
                        }
                      >
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Télécharger</span>
                      </Button>
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
