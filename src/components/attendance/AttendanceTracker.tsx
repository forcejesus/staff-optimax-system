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
import { Search, Calendar, ArrowDownUp, UserCheck, UserX, Clock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [activeTab, setActiveTab] = useState("all");

  const filteredData = attendanceData.filter((record) => {
    const matchesSearch = record.employee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    const matchesTab = activeTab === "all" || 
                      (activeTab === "present" && (record.status === "Présent" || record.status === "Retard")) ||
                      (activeTab === "absent" && (record.status === "Absent" || record.status === "Congé"));
    return matchesSearch && matchesStatus && matchesTab;
  });

  // Modify getStatusColor to return only valid Badge variant values
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Présent":
        return "default"; // Instead of "success"
      case "Retard":
        return "secondary"; // Instead of "warning"
      case "Absent":
        return "destructive";
      case "Congé":
        return "outline"; // Instead of "secondary"
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Présent":
        return <UserCheck className="h-3 w-3 mr-1" />;
      case "Retard":
        return <Clock className="h-3 w-3 mr-1" />;
      case "Absent":
      case "Congé":
        return <UserX className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-muted/30 border-b">
        <CardTitle>Suivi des présences</CardTitle>
        <CardDescription>
          Suivez les heures de travail et les présences de vos employés
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full md:w-auto grid-cols-3 mb-4">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="present">Présents</TabsTrigger>
            <TabsTrigger value="absent">Absents</TabsTrigger>
          </TabsList>

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
            <Button className="w-full sm:w-auto ml-auto">
              <ArrowDownUp className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="rounded-md border shadow-sm">
              <Table>
                <TableHeader className="bg-muted/20">
                  <TableRow>
                    <TableHead className="font-semibold">Employé</TableHead>
                    <TableHead className="font-semibold">Heure d'arrivée</TableHead>
                    <TableHead className="font-semibold">Heure de départ</TableHead>
                    <TableHead className="font-semibold">Statut</TableHead>
                    <TableHead className="text-right font-semibold">Heures travaillées</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((record) => (
                    <TableRow key={record.id} className="hover:bg-muted/40">
                      <TableCell className="font-medium">{record.employee}</TableCell>
                      <TableCell>{record.timeIn || "-"}</TableCell>
                      <TableCell>{record.timeOut || "-"}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(record.status)} className="flex items-center w-fit">
                          {getStatusIcon(record.status)}
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{record.workHours > 0 ? `${record.workHours}h` : '-'}</TableCell>
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
          </TabsContent>

          <TabsContent value="present" className="mt-0">
            <div className="rounded-md border shadow-sm">
              <Table>
                <TableHeader className="bg-muted/20">
                  <TableRow>
                    <TableHead className="font-semibold">Employé</TableHead>
                    <TableHead className="font-semibold">Heure d'arrivée</TableHead>
                    <TableHead className="font-semibold">Heure de départ</TableHead>
                    <TableHead className="font-semibold">Statut</TableHead>
                    <TableHead className="text-right font-semibold">Heures travaillées</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((record) => (
                    <TableRow key={record.id} className="hover:bg-muted/40">
                      <TableCell className="font-medium">{record.employee}</TableCell>
                      <TableCell>{record.timeIn || "-"}</TableCell>
                      <TableCell>{record.timeOut || "-"}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(record.status)} className="flex items-center w-fit">
                          {getStatusIcon(record.status)}
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{record.workHours > 0 ? `${record.workHours}h` : '-'}</TableCell>
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
          </TabsContent>

          <TabsContent value="absent" className="mt-0">
            <div className="rounded-md border shadow-sm">
              <Table>
                <TableHeader className="bg-muted/20">
                  <TableRow>
                    <TableHead className="font-semibold">Employé</TableHead>
                    <TableHead className="font-semibold">Motif</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Statut</TableHead>
                    <TableHead className="text-right font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((record) => (
                    <TableRow key={record.id} className="hover:bg-muted/40">
                      <TableCell className="font-medium">{record.employee}</TableCell>
                      <TableCell>{record.status === "Congé" ? "Congé payé" : "Non justifiée"}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(record.status)} className="flex items-center w-fit">
                          {getStatusIcon(record.status)}
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="h-8">Détails</Button>
                      </TableCell>
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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
