
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";

export function RetirementProcess() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Processus de départ à la retraite</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-10">
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border ml-5 mt-6 mb-6"></div>
              
              {/* Étape 1 */}
              <div className="relative z-10 flex items-start mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">1. Information de l'employé</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Informer l'employé des procédures de départ à la retraite et des documents à fournir.
                  </p>
                </div>
              </div>
              
              {/* Étape 2 */}
              <div className="relative z-10 flex items-start mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">2. Vérification des droits à la retraite</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Vérifier l'éligibilité à la retraite et calculer les droits acquis.
                  </p>
                </div>
              </div>
              
              {/* Étape 3 */}
              <div className="relative z-10 flex items-start mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground">
                  <Circle className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">3. Préparation des documents</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Préparer tous les documents nécessaires pour le départ à la retraite.
                  </p>
                  <div className="mt-4 p-4 border rounded-md space-y-4">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>Attestation de fin de carrière</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>Certificat de travail</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>Solde de tout compte</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>Attestation Pôle Emploi</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>Relevé de situation individuelle</span>
                    </div>
                    <Button className="w-full">Marquer comme terminé</Button>
                  </div>
                </div>
              </div>
              
              {/* Étape 4 */}
              <div className="relative z-10 flex items-start mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground">
                  <Circle className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">4. Entretien de départ</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Organiser un entretien de départ avec l'employé pour discuter de la transition.
                  </p>
                </div>
              </div>
              
              {/* Étape 5 */}
              <div className="relative z-10 flex items-start">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground">
                  <Circle className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">5. Finalisation du départ</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Finaliser toutes les procédures administratives et organiser la cérémonie de départ.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Demande de départ à la retraite</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <FormLabel htmlFor="employee">Employé</FormLabel>
                <Select>
                  <SelectTrigger id="employee">
                    <SelectValue placeholder="Sélectionner un employé" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="robert">Robert Lefèvre</SelectItem>
                    <SelectItem value="jeanne">Jeanne Moreau</SelectItem>
                    <SelectItem value="michel">Michel Durand</SelectItem>
                    <SelectItem value="francoise">Françoise Blanc</SelectItem>
                    <SelectItem value="philippe">Philippe Martin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <FormLabel htmlFor="retirementDate">Date de départ prévue</FormLabel>
                <Input id="retirementDate" type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <FormLabel htmlFor="retirementType">Type de départ</FormLabel>
              <Select>
                <SelectTrigger id="retirementType">
                  <SelectValue placeholder="Sélectionner le type de départ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Retraite normale</SelectItem>
                  <SelectItem value="early">Retraite anticipée</SelectItem>
                  <SelectItem value="disability">Retraite pour invalidité</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <FormLabel htmlFor="comments">Commentaires</FormLabel>
              <Textarea id="comments" placeholder="Informations complémentaires..." />
            </div>
            <Button className="w-full">
              Soumettre la demande
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
