
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AttendanceStatusBadge } from "./AttendanceStatusBadge";
import { AttendanceRecord } from "./types";

interface AttendanceTableProps {
  data: AttendanceRecord[];
  showActions?: boolean;
}

export function AttendanceTable({ data, showActions = false }: AttendanceTableProps) {
  return (
    <div className="rounded-md border shadow-sm">
      <Table>
        <TableHeader className="bg-muted/20">
          <TableRow>
            <TableHead className="font-semibold">Employé</TableHead>
            {!showActions && <TableHead className="font-semibold">Heure d'arrivée</TableHead>}
            {!showActions && <TableHead className="font-semibold">Heure de départ</TableHead>}
            {showActions && <TableHead className="font-semibold">Motif</TableHead>}
            {showActions && <TableHead className="font-semibold">Date</TableHead>}
            <TableHead className="font-semibold">Statut</TableHead>
            {!showActions && <TableHead className="text-right font-semibold">Heures travaillées</TableHead>}
            {showActions && <TableHead className="text-right font-semibold">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((record) => (
            <TableRow key={record.id} className="hover:bg-muted/40">
              <TableCell className="font-medium">{record.employee}</TableCell>
              {!showActions && <TableCell>{record.timeIn || "-"}</TableCell>}
              {!showActions && <TableCell>{record.timeOut || "-"}</TableCell>}
              {showActions && <TableCell>{record.status === "Congé" ? "Congé payé" : "Non justifiée"}</TableCell>}
              {showActions && <TableCell>{record.date}</TableCell>}
              <TableCell>
                <AttendanceStatusBadge status={record.status} />
              </TableCell>
              {!showActions && <TableCell className="text-right">{record.workHours > 0 ? `${record.workHours}h` : '-'}</TableCell>}
              {showActions && (
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="h-8">Détails</Button>
                </TableCell>
              )}
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={showActions ? 5 : 5} className="text-center py-4 text-muted-foreground">
                Aucun résultat trouvé
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
