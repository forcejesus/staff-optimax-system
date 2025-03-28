
import { Employee } from "@/types/employee";

interface AdditionalInfoProps {
  employee: Employee;
}

export function AdditionalInfo({ employee }: AdditionalInfoProps) {
  return (
    <section className="space-y-2">
      <h3 className="text-lg font-medium">Informations complémentaires</h3>
      <div className="space-y-2">
        <div>
          <div className="font-medium">Numéro de sécurité sociale</div>
          <div>{employee.numero_securite_sociale || "Non renseigné"}</div>
        </div>
        <div>
          <div className="font-medium">Contact d'urgence</div>
          <div>{employee.contact_urgence || "Non renseigné"}</div>
        </div>
        <div>
          <div className="font-medium">Lieu de travail</div>
          <div>{employee.lieu_travail || "Non renseigné"}</div>
        </div>
      </div>
    </section>
  );
}
