
import { getDaysInMonth, getFirstDayOfMonth, days } from "./calendarUtils";
import { leaveData, Leave } from "./types";
import { CalendarDayCell } from "./CalendarDayCell";

interface CalendarBodyProps {
  currentMonth: number;
  currentYear: number;
}

export function CalendarBody({ currentMonth, currentYear }: CalendarBodyProps) {
  const today = new Date();

  // Generate the calendar
  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    
    // Adjust to start with Monday (1) instead of Sunday (0)
    const startingDay = firstDay === 0 ? 6 : firstDay - 1;
    
    const rows = [];
    let cells = [];

    // Add empty cells for the beginning of the month
    for (let i = 0; i < startingDay; i++) {
      cells.push(<CalendarDayCell key={`empty-${i}`} day={null} isToday={false} leavesForDay={[]} />);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateString = date.toISOString().split('T')[0]; // Format YYYY-MM-DD
      
      // Check if it's today
      const isToday = day === today.getDate() && 
                      currentMonth === today.getMonth() && 
                      currentYear === today.getFullYear();
      
      // Find leaves for this day
      const leavesForDay = leaveData.filter(leave => {
        const start = new Date(leave.startDate);
        const end = new Date(leave.endDate);
        return date >= start && date <= end;
      });

      cells.push(
        <CalendarDayCell 
          key={day} 
          day={day} 
          isToday={isToday} 
          leavesForDay={leavesForDay} 
        />
      );

      // New row after each week (7 days)
      if ((startingDay + day) % 7 === 0 || day === daysInMonth) {
        // If it's the last day and the row is not complete, add empty cells
        if (day === daysInMonth) {
          const remainingCells = 7 - cells.length;
          for (let i = 0; i < remainingCells; i++) {
            cells.push(
              <CalendarDayCell 
                key={`empty-end-${i}`} 
                day={null} 
                isToday={false} 
                leavesForDay={[]} 
              />
            );
          }
        }
        
        rows.push(<tr key={day}>{cells}</tr>);
        cells = [];
      }
    }

    return rows;
  };

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {days.map(day => (
            <th key={day} className="p-2 border text-center">{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>{generateCalendar()}</tbody>
    </table>
  );
}
