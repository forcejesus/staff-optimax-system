
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export function EmployeeForm() {
  const [tab, setTab] = useState("personal");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter un nouvel employé</CardTitle>
        <CardDescription>
          Remplissez les informations pour créer un nouvel employé dans le système.
        </CardDescription>
      </CardHeader>
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
                <Input id="firstName" placeholder="Prénom" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" placeholder="Nom" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" placeholder="+33 X XX XX XX XX" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Adresse</Label>
              <Textarea id="address" placeholder="Adresse complète" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="birthDate">Date de naissance</Label>
                <Input id="birthDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationalité</Label>
                <Input id="nationality" placeholder="Nationalité" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Genre</Label>
                <Select>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Homme</SelectItem>
                    <SelectItem value="female">Femme</SelectItem>
                    <SelectItem value="non-binary">Non-binaire</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="job" className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Département</Label>
                <Select>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Sélectionner un département" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hr">Ressources Humaines</SelectItem>
                    <SelectItem value="it">Informatique</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="operations">Opérations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Poste</Label>
                <Input id="position" placeholder="Titre du poste" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Date d'embauche</Label>
                <Input id="startDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contractType">Type de contrat</Label>
                <Select>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="manager">Responsable</Label>
                <Select>
                  <SelectTrigger id="manager">
                    <SelectValue placeholder="Sélectionner un responsable" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m1">Jean Dupont</SelectItem>
                    <SelectItem value="m2">Marie Lambert</SelectItem>
                    <SelectItem value="m3">Thomas Bernard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="workLocation">Lieu de travail</Label>
                <Input id="workLocation" placeholder="Lieu de travail" />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="additional" className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="socialSecurity">Numéro de sécurité sociale</Label>
                <Input id="socialSecurity" placeholder="X XX XX XX XXX XXX XX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankInfo">Coordonnées bancaires (IBAN)</Label>
                <Input id="bankInfo" placeholder="FRXX XXXX XXXX XXXX XXXX XXXX XXX" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Contact d'urgence</Label>
              <Textarea id="emergencyContact" placeholder="Nom, relation, téléphone" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Informations complémentaires..." />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Annuler</Button>
        <div className="flex gap-2">
          {tab !== "personal" && (
            <Button variant="outline" onClick={() => {
              const tabs = ["personal", "job", "additional"];
              const currentIndex = tabs.indexOf(tab);
              setTab(tabs[currentIndex - 1]);
            }}>
              Précédent
            </Button>
          )}
          {tab !== "additional" ? (
            <Button onClick={() => {
              const tabs = ["personal", "job", "additional"];
              const currentIndex = tabs.indexOf(tab);
              setTab(tabs[currentIndex + 1]);
            }}>
              Suivant
            </Button>
          ) : (
            <Button>
              Enregistrer
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
