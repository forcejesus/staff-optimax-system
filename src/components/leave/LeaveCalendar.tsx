
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

// Types pour les congés
type LeaveType = "Congés payés" | "RTT" | "Congé maladie" | "Congé sans solde";

type Leave = {
  id: number;
  employee: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  status: "Approuvé" | "En attente" | "Refusé";
};

// Données fictives pour les congés
const leaveData: Leave[] = [
  {
    id: 1,
    employee: "Sophie Martin",
    type: "Congés payés",
    startDate: "2023-10-14",
    endDate: "2023-10-21",
    status: "Approuvé",
  },
  {
    id: 2,
    employee: "Jean Dupont",
    type: "RTT",
    startDate: "2023-10-18",
    endDate: "2023-10-19",
    status: "Approuvé",
  },
  {
    id: 3,
    employee: "Marie Lambert",
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

// Noms des mois en français
const months = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

// Noms des jours en français en format court
const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

// Fonction pour obtenir le nombre de jours dans un mois
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// Fonction pour obtenir le premier jour du mois (0 = Dimanche, 1 = Lundi, etc.)
const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export function LeaveCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [departmentFilter, setDepartmentFilter] = useState("all");

  // Navigation dans le calendrier
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Génération du calendrier
  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    
    // Ajuster pour commencer par lundi (1) au lieu de dimanche (0)
    const startingDay = firstDay === 0 ? 6 : firstDay - 1;
    
    const rows = [];
    let cells = [];

    // Ajouter les cases vides pour le début du mois
    for (let i = 0; i < startingDay; i++) {
      cells.push(<td key={`empty-${i}`} className="p-2 border text-center text-gray-400"></td>);
    }

    // Ajouter les jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateString = date.toISOString().split('T')[0]; // Format YYYY-MM-DD
      
      // Vérifier si c'est aujourd'hui
      const isToday = day === today.getDate() && 
                      currentMonth === today.getMonth() && 
                      currentYear === today.getFullYear();
      
      // Trouver les congés pour cette date
      const leavesForDay = leaveData.filter(leave => {
        const start = new Date(leave.startDate);
        const end = new Date(leave.endDate);
        return date >= start && date <= end;
      });

      cells.push(
        <td key={day} className={`p-1 border ${isToday ? 'bg-primary/10' : ''}`}>
          <div className="flex flex-col h-full min-h-[80px]">
            <div className={`text-right mb-1 ${isToday ? 'font-bold' : ''}`}>{day}</div>
            <div className="flex flex-col gap-1">
              {leavesForDay.map(leave => (
                <div 
                  key={`${day}-${leave.id}`} 
                  className="text-xs p-1 rounded overflow-hidden text-ellipsis whitespace-nowrap"
                  style={{
                    backgroundColor: 
                      leave.type === "Congés payés" ? "rgba(59, 130, 246, 0.2)" : 
                      leave.type === "RTT" ? "rgba(16, 185, 129, 0.2)" : 
                      leave.type === "Congé maladie" ? "rgba(239, 68, 68, 0.2)" : 
                      "rgba(245, 158, 11, 0.2)"
                  }}
                >
                  {leave.employee}
                </div>
              ))}
            </div>
          </div>
        </td>
      );

      // Nouvelle ligne après chaque semaine (7 jours)
      if ((startingDay + day) % 7 === 0 || day === daysInMonth) {
        // Si c'est le dernier jour et que la ligne n'est pas complète, ajouter des cases vides
        if (day === daysInMonth) {
          const remainingCells = 7 - cells.length;
          for (let i = 0; i < remainingCells; i++) {
            cells.push(<td key={`empty-end-${i}`} className="p-2 border text-center text-gray-400"></td>);
          }
        }
        
        rows.push(<tr key={day}>{cells}</tr>);
        cells = [];
      }
    }

    return (
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {days.map(day => (
              <th key={day} className="p-2 border text-center">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Calendrier des congés</CardTitle>
          <CardDescription>
            Visualisez les congés de l'équipe
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            {months[currentMonth]} {currentYear}
          </span>
          <Button variant="outline" size="icon" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-200"></div>
              <span className="text-xs">Congés payés</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-200"></div>
              <span className="text-xs">RTT</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-200"></div>
              <span className="text-xs">Maladie</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-200"></div>
              <span className="text-xs">Sans solde</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Département:</span>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tous les départements" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les départements</SelectItem>
                <SelectItem value="hr">Ressources Humaines</SelectItem>
                <SelectItem value="it">Informatique</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="overflow-x-auto">
          {generateCalendar()}
        </div>
      </CardContent>
    </Card>
  );
}
