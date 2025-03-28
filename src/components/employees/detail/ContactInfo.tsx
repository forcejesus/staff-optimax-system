
import { Employee } from "@/types/employee";
import { Mail, Phone, MapPin } from "lucide-react";

interface ContactInfoProps {
  employee: Employee;
}

export function ContactInfo({ employee }: ContactInfoProps) {
  return (
    <section className="space-y-2">
      <h3 className="text-lg font-medium">Coordonnées</h3>
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
          <div>
            <div className="font-medium">Email</div>
            <div>{employee.email}</div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
          <div>
            <div className="font-medium">Téléphone</div>
            <div>{employee.telephone || "Non renseigné"}</div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
          <div>
            <div className="font-medium">Adresse</div>
            <div>{employee.adresse || "Non renseignée"}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
