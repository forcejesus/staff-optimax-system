
import { AttendanceRecord } from "./types";

export const attendanceData: AttendanceRecord[] = [
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
