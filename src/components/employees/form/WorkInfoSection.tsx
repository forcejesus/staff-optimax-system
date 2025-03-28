
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Department, Position } from "@/types/employee";
import { useQuery } from "@tanstack/react-query";
import { positionService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

interface WorkInfoSectionProps {
  formData: any;
  departments: Department[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

export function WorkInfoSection({ 
  formData, 
  departments, 
  handleChange, 
  handleSelectChange 
}: WorkInfoSectionProps) {
  const { token } = useAuth();

  // Récupérer la liste des postes
  const { 
    data: positions = [], 
    isLoading: isLoadingPositions 
  } = useQuery({
    queryKey: ["positions"],
    queryFn: () => {
      if (!token) throw new Error("Token manquant");
      return positionService.getAll(token);
    },
    enabled: !!token,
  });

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="departement_id">Département</Label>
        <Select 
          name="departement_id" 
          value={formData.departement_id?.toString() || ""} 
          onValueChange={(value) => handleSelectChange("departement_id", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un département" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Aucun département</SelectItem>
            {departments.map((dept: Department) => (
              <SelectItem key={dept.id} value={dept.id.toString()}>
                {dept.nom}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="poste_id">Poste</Label>
        {isLoadingPositions ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <Select 
            name="poste_id" 
            value={formData.poste_id?.toString() || ""} 
            onValueChange={(value) => handleSelectChange("poste_id", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un poste" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Aucun poste</SelectItem>
              {positions.map((position: Position) => (
                <SelectItem key={position.id} value={position.id.toString()}>
                  {position.titre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="lieu_travail">Lieu de travail</Label>
        <Input 
          id="lieu_travail"
          name="lieu_travail"
          value={formData.lieu_travail || ""}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="type_contrat">Type de contrat</Label>
        <Select 
          name="type_contrat" 
          value={formData.type_contrat || ""} 
          onValueChange={(value) => handleSelectChange("type_contrat", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un type de contrat" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Aucun type</SelectItem>
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
          value={formData.statut || "Actif"} 
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
    </>
  );
}
