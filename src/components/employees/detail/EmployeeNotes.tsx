
import { Employee } from "@/types/employee";

interface EmployeeNotesProps {
  notes: string | undefined;
}

export function EmployeeNotes({ notes }: EmployeeNotesProps) {
  if (!notes) return null;
  
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-2">Notes</h3>
      <div className="p-4 bg-muted/40 rounded-md">
        {notes}
      </div>
    </div>
  );
}
