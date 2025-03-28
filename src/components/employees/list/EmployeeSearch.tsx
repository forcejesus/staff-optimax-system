
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface EmployeeSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function EmployeeSearch({ searchTerm, onSearchChange }: EmployeeSearchProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input 
        placeholder="Rechercher un employé..." 
        value={searchTerm}
        onChange={handleSearch}
        className="pl-10"
      />
    </div>
  );
}
