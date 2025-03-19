
import { UserCheck, UserX, Clock, Plane } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AttendanceStatusBadgeProps {
  status: string;
}

export function AttendanceStatusBadge({ status }: AttendanceStatusBadgeProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Présent":
        return "bg-green-100 text-green-700 hover:bg-green-200 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 dark:border-green-900";
      case "Retard":
        return "bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/50 dark:border-amber-900";
      case "Absent":
        return "bg-red-100 text-red-700 hover:bg-red-200 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 dark:border-red-900";
      case "Congé":
        return "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 dark:border-blue-900";
      default:
        return "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Présent":
        return <UserCheck className="h-3.5 w-3.5 mr-1" />;
      case "Retard":
        return <Clock className="h-3.5 w-3.5 mr-1" />;
      case "Absent":
        return <UserX className="h-3.5 w-3.5 mr-1" />;
      case "Congé":
        return <Plane className="h-3.5 w-3.5 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <Badge variant="outline" className={`flex items-center w-fit px-2 py-0.5 text-xs font-medium ${getStatusColor(status)}`}>
      {getStatusIcon(status)}
      {status}
    </Badge>
  );
}
