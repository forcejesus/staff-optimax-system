
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CalendarLegendProps {
  departmentFilter: string;
  setDepartmentFilter: (value: string) => void;
}

export function CalendarLegend({ departmentFilter, setDepartmentFilter }: CalendarLegendProps) {
  return (
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
  );
}
