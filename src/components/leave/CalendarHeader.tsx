
import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { months } from "./calendarUtils";

interface CalendarHeaderProps {
  currentMonth: number;
  currentYear: number;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
}

export function CalendarHeader({ 
  currentMonth, 
  currentYear, 
  goToPreviousMonth, 
  goToNextMonth 
}: CalendarHeaderProps) {
  return (
    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
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
    </div>
  );
}
