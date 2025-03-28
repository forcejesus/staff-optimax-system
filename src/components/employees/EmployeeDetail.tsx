
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Employee } from "@/types/employee";
import { DetailHeader } from "./detail/DetailHeader";
import { BasicInfo } from "./detail/BasicInfo";
import { ContactInfo } from "./detail/ContactInfo";
import { PersonalInfo } from "./detail/PersonalInfo";
import { AdditionalInfo } from "./detail/AdditionalInfo";
import { EmployeeNotes } from "./detail/EmployeeNotes";
import { DocumentsSection } from "./detail/DocumentsSection";

interface EmployeeDetailProps {
  employee: Employee;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}

export function EmployeeDetail({ employee, onEdit, onDelete, onBack }: EmployeeDetailProps) {
  const { toast } = useToast();

  const handleDelete = () => {
    onDelete();
    toast({
      title: "Employé supprimé",
      description: "L'employé a été supprimé avec succès",
    });
    onBack();
  };

  return (
    <Card className="w-full">
      <DetailHeader 
        employee={employee} 
        onBack={onBack} 
        onEdit={onEdit} 
        onDelete={handleDelete} 
      />
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <BasicInfo employee={employee} />
            <ContactInfo employee={employee} />
          </div>
          
          <div className="space-y-4">
            <PersonalInfo employee={employee} />
            <AdditionalInfo employee={employee} />
          </div>
        </div>
        
        <EmployeeNotes notes={employee.notes} />
      </CardContent>
      
      <DocumentsSection />
    </Card>
  );
}
