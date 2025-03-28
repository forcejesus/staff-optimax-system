
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AdditionalInfoSectionProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function AdditionalInfoSection({ formData, handleChange }: AdditionalInfoSectionProps) {
  return (
    <>
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
    </>
  );
}
