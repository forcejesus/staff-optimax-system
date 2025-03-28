
import { Employee } from "@/types/employee";
import { Cake, User, Calendar } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface PersonalInfoProps {
  employee: Employee;
}

export function PersonalInfo({ employee }: PersonalInfoProps) {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMMM yyyy', { locale: fr });
    } catch (error) {
      return 'Date invalide';
    }
  };

  return (
    <section className="space-y-2">
      <h3 className="text-lg font-medium">Informations personnelles</h3>
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <Cake className="h-4 w-4 mt-1 text-muted-foreground" />
          <div>
            <div className="font-medium">Date de naissance</div>
            <div>{employee.date_naissance ? formatDate(employee.date_naissance) : "Non renseignée"}</div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <User className="h-4 w-4 mt-1 text-muted-foreground" />
          <div>
            <div className="font-medium">Nationalité</div>
            <div>{employee.nationalite || "Non renseignée"}</div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <User className="h-4 w-4 mt-1 text-muted-foreground" />
          <div>
            <div className="font-medium">Genre</div>
            <div>{employee.genre || "Non renseigné"}</div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
          <div>
            <div className="font-medium">Date d'embauche</div>
            <div>{employee.date_embauche ? formatDate(employee.date_embauche) : "Non renseignée"}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
