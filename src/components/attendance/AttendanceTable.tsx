
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
import { Eye } from "lucide-react";

interface AttendanceTableProps {
  data: AttendanceRecord[];
  showActions?: boolean;
}

export function AttendanceTable({ data, showActions = false }: AttendanceTableProps) {
  return (
    <div className="rounded-md border shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-indigo-50 dark:bg-indigo-950/30">
          <TableRow>
            <TableHead className="font-semibold text-indigo-700 dark:text-indigo-300">Employé</TableHead>
            {!showActions && <TableHead className="font-semibold text-indigo-700 dark:text-indigo-300">Heure d'arrivée</TableHead>}
            {!showActions && <TableHead className="font-semibold text-indigo-700 dark:text-indigo-300">Heure de départ</TableHead>}
            {showActions && <TableHead className="font-semibold text-indigo-700 dark:text-indigo-300">Motif</TableHead>}
            {showActions && <TableHead className="font-semibold text-indigo-700 dark:text-indigo-300">Date</TableHead>}
            <TableHead className="font-semibold text-indigo-700 dark:text-indigo-300">Statut</TableHead>
            {!showActions && <TableHead className="text-right font-semibold text-indigo-700 dark:text-indigo-300">Heures travaillées</TableHead>}
            {showActions && <TableHead className="text-right font-semibold text-indigo-700 dark:text-indigo-300">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((record) => (
            <TableRow key={record.id} className="hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20">
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
                  <Button variant="outline" size="sm" className="h-8 border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:hover:border-indigo-700 dark:hover:bg-indigo-900/30 dark:text-indigo-300">
                    <Eye className="h-4 w-4 mr-1" />
                    Détails
                  </Button>
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
