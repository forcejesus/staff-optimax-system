
// Types for leave management
export type LeaveType = "Congés payés" | "RTT" | "Congé maladie" | "Congé sans solde";

export type LeaveStatus = "Approuvé" | "En attente" | "Refusé";

export interface Leave {
  id: number;
  employee: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  status: LeaveStatus;
}

// Mock data for leaves
export const leaveData: Leave[] = [
  {
    id: 1,
    employee: "Kamwanya Wembo",
    type: "Congés payés",
    startDate: "2023-10-14",
    endDate: "2023-10-21",
    status: "Approuvé",
  },
  {
    id: 2,
    employee: "Lubaki Mabele",
    type: "RTT",
    startDate: "2023-10-18",
    endDate: "2023-10-19",
    status: "Approuvé",
  },
  {
    id: 3,
    employee: "Kiese Tumba",
    type: "Congés payés",
    startDate: "2023-10-23",
    endDate: "2023-10-27",
    status: "En attente",
  },
  {
    id: 4,
    employee: "Thomas Bernard",
    type: "Congé maladie",
    startDate: "2023-10-10",
    endDate: "2023-10-13",
    status: "Approuvé",
  },
  {
    id: 5,
    employee: "Lucas Petit",
    type: "Congé sans solde",
    startDate: "2023-10-30",
    endDate: "2023-11-03",
    status: "En attente",
  },
];
