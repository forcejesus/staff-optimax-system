
import { Leave } from "./types";

interface CalendarDayCellProps {
  day: number | null;
  isToday: boolean;
  leavesForDay: Leave[];
}

export function CalendarDayCell({ day, isToday, leavesForDay }: CalendarDayCellProps) {
  if (day === null) {
    return <td className="p-2 border text-center text-gray-400"></td>;
  }

  return (
    <td className={`p-1 border ${isToday ? 'bg-primary/10' : ''}`}>
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
}
