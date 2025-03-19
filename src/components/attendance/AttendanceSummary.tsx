
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, UserCheck, AlertTriangle, Calendar } from "lucide-react";
import { AttendanceRecord } from "./types";

interface AttendanceSummaryProps {
  data: AttendanceRecord[];
}

export function AttendanceSummary({ data }: AttendanceSummaryProps) {
  // Calculate statistics
  const totalEmployees = new Set(data.map(record => record.employee)).size;
  const presentCount = data.filter(record => record.status === "Présent").length;
  const lateCount = data.filter(record => record.status === "Retard").length;
  const absentCount = data.filter(record => record.status === "Absent").length;
  const leaveCount = data.filter(record => record.status === "Congé").length;
  
  const attendancePercentage = Math.round((presentCount + lateCount) / totalEmployees * 100) || 0;
  
  const totalWorkHours = data.reduce((sum, record) => sum + record.workHours, 0);
  const averageWorkHours = totalWorkHours / (presentCount + lateCount) || 0;

  const statCards = [
    {
      title: "Taux de présence",
      value: `${attendancePercentage}%`,
      icon: <UserCheck className="h-5 w-5" />,
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      iconBg: "bg-green-200 dark:bg-green-800",
      description: `${presentCount + lateCount}/${totalEmployees} employés`,
      progress: attendancePercentage,
      progressColor: "bg-green-500 dark:bg-green-600",
    },
    {
      title: "Moyenne d'heures",
      value: `${averageWorkHours.toFixed(1)}h`,
      icon: <Clock className="h-5 w-5" />,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      iconBg: "bg-blue-200 dark:bg-blue-800",
      description: `${totalWorkHours.toFixed(1)}h au total`,
      progress: (averageWorkHours / 8) * 100, // Assuming 8 hours is the target
      progressColor: "bg-blue-500 dark:bg-blue-600",
    },
    {
      title: "Retards",
      value: lateCount.toString(),
      icon: <AlertTriangle className="h-5 w-5" />,
      color: "text-amber-500",
      bgColor: "bg-amber-100 dark:bg-amber-900/20",
      iconBg: "bg-amber-200 dark:bg-amber-800",
      description: `${Math.round((lateCount / totalEmployees) * 100)}% des employés`,
      progress: (lateCount / totalEmployees) * 100,
      progressColor: "bg-amber-500 dark:bg-amber-600",
    },
    {
      title: "Absences",
      value: (absentCount + leaveCount).toString(),
      icon: <Calendar className="h-5 w-5" />,
      color: "text-red-500",
      bgColor: "bg-red-100 dark:bg-red-900/20",
      iconBg: "bg-red-200 dark:bg-red-800",
      description: `${absentCount} absences, ${leaveCount} congés`,
      progress: ((absentCount + leaveCount) / totalEmployees) * 100,
      progressColor: "bg-red-500 dark:bg-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => (
        <Card key={index} className={`shadow-sm border overflow-hidden ${stat.bgColor}`}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                <h3 className={`text-2xl font-bold ${stat.color}`}>{stat.value}</h3>
              </div>
              <div className={`rounded-full p-2 ${stat.color} ${stat.iconBg}`}>
                {stat.icon}
              </div>
            </div>
            <div className="space-y-1">
              <Progress 
                value={stat.progress} 
                className={`h-1.5 ${stat.progressColor}`}
              />
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
