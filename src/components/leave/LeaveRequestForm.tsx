
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function LeaveRequestForm() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Demande de congé</CardTitle>
        <CardDescription>
          Remplissez ce formulaire pour demander un congé
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="leaveType">Type de congé</Label>
          <Select>
            <SelectTrigger id="leaveType">
              <SelectValue placeholder="Sélectionner un type de congé" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paidLeave">Congés payés</SelectItem>
              <SelectItem value="unpaidLeave">Congés sans solde</SelectItem>
              <SelectItem value="sickLeave">Congé maladie</SelectItem>
              <SelectItem value="maternityLeave">Congé maternité</SelectItem>
              <SelectItem value="paternityLeave">Congé paternité</SelectItem>
              <SelectItem value="rtt">RTT</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Date de début</Label>
            <Input id="startDate" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">Date de fin</Label>
            <Input id="endDate" type="date" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startTime">Matin/Après-midi (début)</Label>
            <Select>
              <SelectTrigger id="startTime">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Matin</SelectItem>
                <SelectItem value="afternoon">Après-midi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="endTime">Matin/Après-midi (fin)</Label>
            <Select>
              <SelectTrigger id="endTime">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Matin</SelectItem>
                <SelectItem value="afternoon">Après-midi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="daysCount">Nombre de jours</Label>
          <Input id="daysCount" type="number" min="0.5" step="0.5" placeholder="Calculé automatiquement" disabled />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reason">Motif</Label>
          <Textarea id="reason" placeholder="Raison de la demande de congé" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="handover">Instructions de passation</Label>
          <Textarea id="handover" placeholder="Instructions pour votre remplacement pendant votre absence..." />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Annuler</Button>
        <Button>Soumettre la demande</Button>
      </CardFooter>
    </Card>
  );
}
