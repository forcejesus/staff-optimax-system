
import { AttendanceTracker } from "@/components/attendance/AttendanceTracker";
import { Clock, Calendar, Users, AlertTriangle } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";

const AttendancePage = () => {
  return (
    <div className="flex flex-col space-y-8">
      <div className="pb-2 border-b border-indigo-100 dark:border-indigo-900/30">
        <h1 className="text-2xl font-bold tracking-tight mb-1 text-black dark:text-white flex items-center gap-2">
          <Users className="h-6 w-6" />
          Suivi des présences
        </h1>
        <p className="text-muted-foreground">
          Suivez le temps de travail et les présences de vos employés
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Présences aujourd'hui"
          value="42/48"
          description="Employés présents"
          icon={<Users className="h-6 w-6" />}
          color="green"
        />
        <StatCard 
          title="Heures travaillées"
          value="182h"
          description="Cette semaine"
          icon={<Clock className="h-6 w-6" />}
          color="blue"
        />
        <StatCard 
          title="Absences"
          value="6"
          description="Aujourd'hui"
          icon={<Calendar className="h-6 w-6" />}
          color="yellow"
        />
        <StatCard 
          title="Retards"
          value="3"
          description="Cette semaine"
          icon={<AlertTriangle className="h-6 w-6" />}
          color="red"
        />
      </div>

      <AttendanceTracker />
    </div>
  );
};

export default AttendancePage;
