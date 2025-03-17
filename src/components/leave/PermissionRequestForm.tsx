
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function PermissionRequestForm() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Demande de permission</CardTitle>
        <CardDescription>
          Utilisez ce formulaire pour demander une permission spéciale ou une absence exceptionnelle
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="permissionType">Type de permission</Label>
          <Select>
            <SelectTrigger id="permissionType">
              <SelectValue placeholder="Sélectionner un type de permission" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="familyEvent">Événement familial</SelectItem>
              <SelectItem value="medical">Rendez-vous médical</SelectItem>
              <SelectItem value="administrative">Démarche administrative</SelectItem>
              <SelectItem value="childcare">Garde d'enfant</SelectItem>
              <SelectItem value="other">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Date</Label>
            <Input id="startDate" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Durée (en heures)</Label>
            <Input id="duration" type="number" min="1" max="8" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startTime">Heure de début</Label>
            <Input id="startTime" type="time" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endTime">Heure de fin</Label>
            <Input id="endTime" type="time" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="reason">Motif détaillé</Label>
          <Textarea id="reason" placeholder="Expliquez la raison de votre demande..." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="document">Document justificatif (si nécessaire)</Label>
          <Input id="document" type="file" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="replacement">Remplacement pendant l'absence</Label>
          <Select>
            <SelectTrigger id="replacement">
              <SelectValue placeholder="Sélectionner un remplaçant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="m1">Jean Dupont</SelectItem>
              <SelectItem value="m2">Marie Lambert</SelectItem>
              <SelectItem value="m3">Thomas Bernard</SelectItem>
              <SelectItem value="none">Pas de remplacement nécessaire</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Annuler</Button>
        <Button>Soumettre la demande</Button>
      </CardFooter>
    </Card>
  );
}
