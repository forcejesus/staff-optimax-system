
export type AttendanceRecord = {
  id: number;
  employee: string;
  date: string;
  timeIn: string;
  timeOut: string;
  status: "Présent" | "Retard" | "Absent" | "Congé";
  workHours: number;
};
