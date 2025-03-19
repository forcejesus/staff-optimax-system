
import { Search, Calendar, ArrowDownUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AttendanceFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  dateFilter: string;
  setDateFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

export function AttendanceFilter({
  searchTerm,
  setSearchTerm,
  dateFilter,
  setDateFilter,
  statusFilter,
  setStatusFilter
}: AttendanceFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row items-end gap-4 mb-6">
      <div className="w-full sm:w-auto">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un employé..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full sm:w-auto flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full sm:w-auto"
        />
      </div>
      <div className="w-full sm:w-auto">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Tous les statuts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="Présent">Présent</SelectItem>
            <SelectItem value="Retard">Retard</SelectItem>
            <SelectItem value="Absent">Absent</SelectItem>
            <SelectItem value="Congé">Congé</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="w-full sm:w-auto ml-auto">
        <ArrowDownUp className="mr-2 h-4 w-4" />
        Exporter
      </Button>
    </div>
  );
}
