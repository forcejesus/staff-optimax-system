
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Calendar, ArrowDownUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type AttendanceRecord = {
  id: number;
  employee: string;
  date: string;
  timeIn: string;
  timeOut: string;
  status: "Présent" | "Retard" | "Absent" | "Congé";
  workHours: number;
};

const attendanceData: AttendanceRecord[] = [
  {
    id: 1,
    employee: "Jean Dupont",
    date: "2023-10-16",
    timeIn: "09:00",
    timeOut: "18:00",
    status: "Présent",
    workHours: 8,
  },
  {
    id: 2,
    employee: "Marie Lambert",
    date: "2023-10-16",
    timeIn: "09:15",
    timeOut: "18:00",
    status: "Retard",
    workHours: 7.75,
  },
  {
    id: 3,
    employee: "Thomas Bernard",
    date: "2023-10-16",
    timeIn: "",
    timeOut: "",
    status: "Absent",
    workHours: 0,
  },
  {
    id: 4,
    employee: "Sophie Martin",
    date: "2023-10-16",
    timeIn: "",
    timeOut: "",
    status: "Congé",
    workHours: 0,
  },
  {
    id: 5,
    employee: "Pierre Martin",
    date: "2023-10-16",
    timeIn: "08:45",
    timeOut: "17:30",
    status: "Présent",
    workHours: 7.75,
  },
  {
    id: 6,
    employee: "Lucas Petit",
    date: "2023-10-16",
    timeIn: "09:30",
    timeOut: "18:30",
    status: "Retard",
    workHours: 8,
  },
];

export function AttendanceTracker() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("2023-10-16");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredData = attendanceData.filter((record) => {
    const matchesSearch = record.employee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Présent":
        return "default";
      case "Retard":
        return "outline";
      case "Absent":
        return "destructive";
      case "Congé":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suivi des présences</CardTitle>
        <CardDescription>
          Suivez les heures de travail et les présences de vos employés
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-end gap-4 mb-6">
          <div className="w-full sm:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher un employé..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full sm:w-auto flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full sm:w-auto"
            />
          </div>
          <div className="w-full sm:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Tous les statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="Présent">Présent</SelectItem>
                <SelectItem value="Retard">Retard</SelectItem>
                <SelectItem value="Absent">Absent</SelectItem>
                <SelectItem value="Congé">Congé</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full sm:w-auto">
            <ArrowDownUp className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employé</TableHead>
                <TableHead>Heure d'arrivée</TableHead>
                <TableHead>Heure de départ</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Heures travaillées</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.employee}</TableCell>
                  <TableCell>{record.timeIn || "-"}</TableCell>
                  <TableCell>{record.timeOut || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(record.status)}>
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{record.workHours}</TableCell>
                </TableRow>
              ))}
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                    Aucun résultat trouvé
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
