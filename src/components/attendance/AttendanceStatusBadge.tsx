
import { UserCheck, UserX, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AttendanceStatusBadgeProps {
  status: string;
}

export function AttendanceStatusBadge({ status }: AttendanceStatusBadgeProps) {
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
    <Badge variant={getStatusColor(status)} className="flex items-center w-fit">
      {getStatusIcon(status)}
      {status}
    </Badge>
  );
}
