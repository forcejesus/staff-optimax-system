
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { Employee, EmployeeUpdate, Department } from "@/types/employee";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeService, departmentService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

interface EmployeeEditProps {
  employee: Employee;
  onSave: (employee: Employee) => void;
  onCancel: () => void;
}

export function EmployeeEdit({ employee, onSave, onCancel }: EmployeeEditProps) {
  const [formData, setFormData] = useState<EmployeeUpdate>({
    prenom: employee.prenom,
    nom: employee.nom,
    email: employee.email,
    telephone: employee.telephone || "",
    adresse: employee.adresse || "",
    nationalite: employee.nationalite || "",
    genre: employee.genre || "",
    departement_id: employee.departement_id,
    poste_id: employee.poste_id,
    manager_id: employee.manager_id,
    lieu_travail: employee.lieu_travail || "",
    type_contrat: employee.type_contrat || "",
    statut: employee.statut || "Actif",
    numero_securite_sociale: employee.numero_securite_sociale || "",
    informations_bancaires: employee.informations_bancaires || "",
    contact_urgence: employee.contact_urgence || "",
    notes: employee.notes || ""
  });

  const { toast } = useToast();
  const { token } = useAuth();
  const queryClient = useQueryClient();

  // Récupérer tous les départements
  const { data: departments = [], isLoading: isLoadingDepartments } = useQuery({
    queryKey: ["departments"],
    queryFn: () => departmentService.getAll(token as string),
    enabled: !!token,
  });

  const updateMutation = useMutation({
    mutationFn: (data: EmployeeUpdate) => employeeService.update(token as string, employee.id, data),
    onSuccess: (data) => {
      toast({
        title: "Employé mis à jour",
        description: `Les informations de ${data.prenom} ${data.nom} ont été mises à jour avec succès.`
      });
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      onSave(data);
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour les informations de l'employé.",
        variant: "destructive",
      });
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const isLoading = updateMutation.isPending;

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onCancel} className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Annuler
          </Button>
        </div>
        <CardTitle className="text-2xl">Modifier un employé</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Informations personnelles</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prenom">Prénom</Label>
                  <Input 
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom</Label>
                  <Input 
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input 
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="adresse">Adresse</Label>
                <Input 
                  id="adresse"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nationalite">Nationalité</Label>
                  <Input 
                    id="nationalite"
                    name="nationalite"
                    value={formData.nationalite}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Select 
                    value={formData.genre} 
                    onValueChange={(value) => handleSelectChange("genre", value)}
                  >
                    <SelectTrigger id="genre">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Homme">Homme</SelectItem>
                      <SelectItem value="Femme">Femme</SelectItem>
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Informations professionnelles</h3>
              
              <div className="space-y-2">
                <Label htmlFor="departement_id">Département</Label>
                {isLoadingDepartments ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Select 
                    value={formData.departement_id.toString()} 
                    onValueChange={(value) => handleSelectChange("departement_id", value)}
                  >
                    <SelectTrigger id="departement_id">
                      <SelectValue placeholder="Sélectionner un département" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((department: Department) => (
                        <SelectItem key={department.id} value={department.id.toString()}>
                          {department.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="poste_id">Poste</Label>
                <Input 
                  id="poste_id"
                  name="poste_id"
                  type="number"
                  value={formData.poste_id.toString()}
                  onChange={handleChange}
                  disabled
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lieu_travail">Lieu de travail</Label>
                <Input 
                  id="lieu_travail"
                  name="lieu_travail"
                  value={formData.lieu_travail}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type_contrat">Type de contrat</Label>
                  <Select 
                    value={formData.type_contrat} 
                    onValueChange={(value) => handleSelectChange("type_contrat", value)}
                  >
                    <SelectTrigger id="type_contrat">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CDI">CDI</SelectItem>
                      <SelectItem value="CDD">CDD</SelectItem>
                      <SelectItem value="Stage">Stage</SelectItem>
                      <SelectItem value="Alternance">Alternance</SelectItem>
                      <SelectItem value="Freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="statut">Statut</Label>
                  <Select 
                    value={formData.statut} 
                    onValueChange={(value) => handleSelectChange("statut", value)}
                  >
                    <SelectTrigger id="statut">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Actif">Actif</SelectItem>
                      <SelectItem value="Inactif">Inactif</SelectItem>
                      <SelectItem value="En congé">En congé</SelectItem>
                      <SelectItem value="En pause">En pause</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Annuler
          </Button>
          <Button 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <Skeleton className="h-4 w-4 rounded-full animate-spin mr-2" />
                <span>Enregistrement...</span>
              </div>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
