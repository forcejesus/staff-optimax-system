
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarLegend } from "./CalendarLegend";
import { CalendarBody } from "./CalendarBody";

export function LeaveCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [departmentFilter, setDepartmentFilter] = useState("all");

  // Calendar navigation
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

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CalendarHeader 
          currentMonth={currentMonth}
          currentYear={currentYear}
          goToPreviousMonth={goToPreviousMonth}
          goToNextMonth={goToNextMonth}
        />
      </CardHeader>
      <CardContent>
        <CalendarLegend 
          departmentFilter={departmentFilter}
          setDepartmentFilter={setDepartmentFilter}
        />
        <div className="overflow-x-auto">
          <CalendarBody 
            currentMonth={currentMonth}
            currentYear={currentYear}
          />
        </div>
      </CardContent>
    </Card>
  );
}
