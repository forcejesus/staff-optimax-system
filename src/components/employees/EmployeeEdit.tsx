
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  status: string;
}

interface EmployeeEditProps {
  employee: Employee;
  onSave: (employee: Employee) => void;
  onCancel: () => void;
}

export function EmployeeEdit({ employee, onSave, onCancel }: EmployeeEditProps) {
  const [tab, setTab] = useState("personal");
  const [formData, setFormData] = useState({
    ...employee,
    firstName: employee.name.split(" ")[0],
    lastName: employee.name.split(" ")[1] || "",
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Combine firstName and lastName to create the full name
    const updatedEmployee = {
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`.trim(),
    };
    
    onSave(updatedEmployee);
    toast({
      title: "Modifications enregistrées",
      description: "Les informations de l'employé ont été mises à jour",
    });
  };

  return (
    <Card>
      <CardHeader>
        <Button variant="ghost" onClick={onCancel} className="w-fit mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <CardTitle>Modifier les informations de l'employé</CardTitle>
        <CardDescription>
          Modifiez les informations de {employee.name}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
              <TabsTrigger value="job">Poste & Contrat</TabsTrigger>
              <TabsTrigger value="additional">Informations complémentaires</TabsTrigger>
            </TabsList>
            <TabsContent value="personal" className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input 
                    id="firstName" 
                    placeholder="Prénom" 
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Nom" 
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="email@example.com" 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input 
                    id="phone" 
                    placeholder="+33 X XX XX XX XX" 
                    defaultValue="+221 XX XXX XX XX"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Textarea 
                  id="address" 
                  placeholder="Adresse complète" 
                  defaultValue=""
                  onChange={handleChange}
                />
              </div>
            </TabsContent>
            <TabsContent value="job" className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Département</Label>
                  <Select 
                    defaultValue={formData.department}
                    onValueChange={(value) => handleSelectChange("department", value)}
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Sélectionner un département" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ressources Humaines">Ressources Humaines</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Développement">Développement</SelectItem>
                      <SelectItem value="Comptabilité">Comptabilité</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Poste</Label>
                  <Input 
                    id="position" 
                    placeholder="Titre du poste" 
                    value={formData.position}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select 
                    defaultValue={formData.status}
                    onValueChange={(value) => handleSelectChange("status", value)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Actif">Actif</SelectItem>
                      <SelectItem value="En congé">En congé</SelectItem>
                      <SelectItem value="Suspendu">Suspendu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contractType">Type de contrat</Label>
                  <Select defaultValue="cdi">
                    <SelectTrigger id="contractType">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cdi">CDI</SelectItem>
                      <SelectItem value="cdd">CDD</SelectItem>
                      <SelectItem value="interim">Intérim</SelectItem>
                      <SelectItem value="apprenticeship">Apprentissage</SelectItem>
                      <SelectItem value="internship">Stage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="additional" className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="socialSecurity">Numéro de sécurité sociale</Label>
                  <Input id="socialSecurity" placeholder="X XX XX XX XXX XXX XX" defaultValue="" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bankInfo">Coordonnées bancaires (IBAN)</Label>
                  <Input id="bankInfo" placeholder="FRXX XXXX XXXX XXXX XXXX XXXX XXX" defaultValue="" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Contact d'urgence</Label>
                <Textarea id="emergencyContact" placeholder="Nom, relation, téléphone" defaultValue="" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Informations complémentaires..." defaultValue="" />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={onCancel}>Annuler</Button>
          <div className="flex gap-2">
            {tab !== "personal" && (
              <Button variant="outline" type="button" onClick={() => {
                const tabs = ["personal", "job", "additional"];
                const currentIndex = tabs.indexOf(tab);
                setTab(tabs[currentIndex - 1]);
              }}>
                Précédent
              </Button>
            )}
            {tab !== "additional" ? (
              <Button type="button" onClick={() => {
                const tabs = ["personal", "job", "additional"];
                const currentIndex = tabs.indexOf(tab);
                setTab(tabs[currentIndex + 1]);
              }}>
                Suivant
              </Button>
            ) : (
              <Button type="submit">
                Enregistrer
              </Button>
            )}
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
