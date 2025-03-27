
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import { Employee, Department } from "@/types/employee";
import { employeeService, departmentService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EmployeeEditProps {
  employee: Employee;
  onSave: (employee: Employee) => void;
  onCancel: () => void;
}

export function EmployeeEdit({ employee, onSave, onCancel }: EmployeeEditProps) {
  const [formData, setFormData] = useState({
    ...employee,
  });
  const { toast } = useToast();
  const { token } = useAuth();
  
  // Récupérer la liste des départements
  const { data: departments = [], isLoading: isLoadingDepartments } = useQuery({
    queryKey: ["departments"],
    queryFn: () => {
      if (!token) throw new Error("Token manquant");
      return departmentService.getAll(token);
    },
    enabled: !!token,
  });

  // Mutation pour mettre à jour un employé
  const updateEmployeeMutation = useMutation({
    mutationFn: (data: any) => {
      if (!token) throw new Error("Token manquant");
      return employeeService.update(token, employee.id, data);
    },
    onSuccess: (data) => {
      toast({
        title: "Employé mis à jour",
        description: `La fiche de ${data.prenom} ${data.nom} a été mise à jour avec succès.`,
      });
      onSave(data);
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'employé. Veuillez réessayer.",
        variant: "destructive",
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Préparer les données pour l'API
    const updateData = {
      prenom: formData.prenom,
      nom: formData.nom,
      email: formData.email,
      telephone: formData.telephone,
      adresse: formData.adresse,
      nationalite: formData.nationalite,
      genre: formData.genre,
      departement_id: Number(formData.departement_id),
      poste_id: Number(formData.poste_id || 0),
      manager_id: Number(formData.manager_id || 0),
      lieu_travail: formData.lieu_travail,
      type_contrat: formData.type_contrat,
      statut: formData.statut,
      numero_securite_sociale: formData.numero_securite_sociale,
      informations_bancaires: formData.informations_bancaires || "",
      contact_urgence: formData.contact_urgence || "",
      notes: formData.notes || "",
    };
    
    updateEmployeeMutation.mutate(updateData);
  };

  if (isLoadingDepartments) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-8 w-64" />
        </div>
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">
          Modifier la fiche de {employee.prenom} {employee.nom}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  name="genre" 
                  value={formData.genre} 
                  onValueChange={(value) => handleSelectChange("genre", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Homme">Homme</SelectItem>
                    <SelectItem value="Femme">Femme</SelectItem>
                    <SelectItem value="Autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="departement_id">Département</Label>
                <Select 
                  name="departement_id" 
                  value={formData.departement_id.toString()} 
                  onValueChange={(value) => handleSelectChange("departement_id", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un département" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept: Department) => (
                      <SelectItem key={dept.id} value={dept.id.toString()}>
                        {dept.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              <div className="space-y-2">
                <Label htmlFor="type_contrat">Type de contrat</Label>
                <Select 
                  name="type_contrat" 
                  value={formData.type_contrat} 
                  onValueChange={(value) => handleSelectChange("type_contrat", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type de contrat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CDI">CDI</SelectItem>
                    <SelectItem value="CDD">CDD</SelectItem>
                    <SelectItem value="Intérim">Intérim</SelectItem>
                    <SelectItem value="Stage">Stage</SelectItem>
                    <SelectItem value="Alternance">Alternance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="statut">Statut</Label>
                <Select 
                  name="statut" 
                  value={formData.statut} 
                  onValueChange={(value) => handleSelectChange("statut", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Actif">Actif</SelectItem>
                    <SelectItem value="Inactif">Inactif</SelectItem>
                    <SelectItem value="En congé">En congé</SelectItem>
                    <SelectItem value="En maladie">En maladie</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="numero_securite_sociale">Numéro de sécurité sociale</Label>
                <Input 
                  id="numero_securite_sociale"
                  name="numero_securite_sociale"
                  value={formData.numero_securite_sociale}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="informations_bancaires">Informations bancaires</Label>
                <Input 
                  id="informations_bancaires"
                  name="informations_bancaires"
                  value={formData.informations_bancaires}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="contact_urgence">Contact d'urgence</Label>
                <Input 
                  id="contact_urgence"
                  name="contact_urgence"
                  value={formData.contact_urgence}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit" disabled={updateEmployeeMutation.isPending}>
            {updateEmployeeMutation.isPending ? (
              <span className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full animate-spin" />
                Enregistrement...
              </span>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
