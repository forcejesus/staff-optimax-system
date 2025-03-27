
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, ArrowLeft, Trash, Phone, Mail, MapPin, Cake, Briefcase, User, Building, Calendar } from "lucide-react";
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
import { Employee } from "@/types/employee";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface EmployeeDetailProps {
  employee: Employee;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}

export function EmployeeDetail({ employee, onEdit, onDelete, onBack }: EmployeeDetailProps) {
  const { toast } = useToast();
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMMM yyyy', { locale: fr });
    } catch (error) {
      return 'Date invalide';
    }
  };

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
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onEdit}>
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
        <CardTitle className="text-2xl">{employee.prenom} {employee.nom}</CardTitle>
        <div className="text-muted-foreground">{employee.email}</div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
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
          </div>
          
          <div className="space-y-4">
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
          </div>
        </div>
        
        {employee.notes && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Notes</h3>
            <div className="p-4 bg-muted/40 rounded-md">
              {employee.notes}
            </div>
          </div>
        )}
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
