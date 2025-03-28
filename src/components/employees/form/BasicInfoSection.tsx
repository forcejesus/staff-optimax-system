
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BasicInfoSectionProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

export function BasicInfoSection({ formData, handleChange, handleSelectChange }: BasicInfoSectionProps) {
  return (
    <>
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
    </>
  );
}
