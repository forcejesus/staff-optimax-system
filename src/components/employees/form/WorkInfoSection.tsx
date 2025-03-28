
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Department } from "@/types/employee";

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
  return (
    <>
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
    </>
  );
}
