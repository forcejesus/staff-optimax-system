
import { AttendanceTracker } from "@/components/attendance/AttendanceTracker";

const AttendancePage = () => {
  return (
    <div className="flex flex-col space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Suivi des présences</h1>
        <p className="text-muted-foreground">
          Suivez le temps de travail et les présences de vos employés
        </p>
      </div>

      <AttendanceTracker />
    </div>
  );
};

export default AttendancePage;
