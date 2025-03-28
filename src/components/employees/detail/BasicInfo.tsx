
import { Badge } from "@/components/ui/badge";
import { Employee } from "@/types/employee";
import { Building, Briefcase, User } from "lucide-react";

interface BasicInfoProps {
  employee: Employee;
}

export function BasicInfo({ employee }: BasicInfoProps) {
  return (
    <section className="space-y-2">
      <h3 className="text-lg font-medium">Informations professionnelles</h3>
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <Building className="h-4 w-4 mt-1 text-muted-foreground" />
          <div>
            <div className="font-medium">Département</div>
            <div>{employee.nom_departement}</div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Briefcase className="h-4 w-4 mt-1 text-muted-foreground" />
          <div>
            <div className="font-medium">Poste</div>
            <div>{employee.titre_poste}</div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <User className="h-4 w-4 mt-1 text-muted-foreground" />
          <div>
            <div className="font-medium">Manager</div>
            <div>{employee.nom_manager || "Non assigné"}</div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Badge variant={employee.statut === "Actif" ? "default" : "outline"} className="mt-1">
            {employee.statut}
          </Badge>
          <div>
            <div className="font-medium">Type de contrat</div>
            <div>{employee.type_contrat}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
