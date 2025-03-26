
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, ArrowLeft, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  status: string;
}

interface EmployeeDetailProps {
  employee: Employee;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onBack: () => void;
}

export function EmployeeDetail({ employee, onEdit, onDelete, onBack }: EmployeeDetailProps) {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDelete = () => {
    onDelete(employee.id);
    toast({
      title: "Employé supprimé",
      description: "L'employé a été supprimé avec succès",
    });
    onBack();
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onEdit(employee.id)}>
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash className="mr-2 h-4 w-4" />
                  Supprimer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action est irréversible. Elle supprimera définitivement l'employé et toutes les données associées.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Confirmer</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <CardTitle className="text-2xl">{employee.name}</CardTitle>
        <div className="text-muted-foreground">{employee.email}</div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <section className="space-y-2">
              <h3 className="text-lg font-medium">Informations professionnelles</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Département</div>
                <div>{employee.department}</div>
                <div className="font-medium">Poste</div>
                <div>{employee.position}</div>
                <div className="font-medium">Statut</div>
                <div>
                  <Badge variant={employee.status === "Actif" ? "default" : "outline"}>
                    {employee.status}
                  </Badge>
                </div>
              </div>
            </section>
            
            <section className="space-y-2">
              <h3 className="text-lg font-medium">Coordonnées</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Email</div>
                <div>{employee.email}</div>
                <div className="font-medium">Téléphone</div>
                <div>+221 XX XXX XX XX</div>
                <div className="font-medium">Adresse</div>
                <div>Non renseignée</div>
              </div>
            </section>
          </div>
          
          <div className="space-y-4">
            <section className="space-y-2">
              <h3 className="text-lg font-medium">Contrat et rémunération</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Type de contrat</div>
                <div>CDI</div>
                <div className="font-medium">Date d'embauche</div>
                <div>01/01/2022</div>
                <div className="font-medium">Salaire</div>
                <div>Confidentiel</div>
              </div>
            </section>
            
            <section className="space-y-2">
              <h3 className="text-lg font-medium">Congés et absences</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Jours de congés restants</div>
                <div>24 jours</div>
                <div className="font-medium">Prochain congé prévu</div>
                <div>Aucun</div>
              </div>
            </section>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-6 flex flex-col items-start">
        <h3 className="text-lg font-medium mb-4">Documents</h3>
        <div className="text-sm text-muted-foreground">
          Aucun document disponible
        </div>
      </CardFooter>
    </Card>
  );
}
