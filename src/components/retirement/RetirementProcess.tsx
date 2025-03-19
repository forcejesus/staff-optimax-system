
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

// Define the form schema
const formSchema = z.object({
  employee: z.string().optional(),
  retirementDate: z.string().optional(),
  retirementType: z.string().optional(),
  comments: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function RetirementProcess() {
  // Initialize the React Hook Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee: "",
      retirementDate: "",
      retirementType: "",
      comments: "",
    },
  });

  const [documentCheckboxes, setDocumentCheckboxes] = useState({
    attestation: false,
    certificat: false,
    solde: false,
    attestationPole: false,
    releve: false,
  });

  const handleDocumentCheckboxChange = (document: keyof typeof documentCheckboxes) => {
    setDocumentCheckboxes(prev => ({
      ...prev,
      [document]: !prev[document]
    }));
  };

  const handleStepCompletion = () => {
    // Logic to mark step as completed
    console.log("Step marked as completed");
  };

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    // Handle form submission
  };

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
                      <input 
                        type="checkbox" 
                        className="mr-2" 
                        checked={documentCheckboxes.attestation}
                        onChange={() => handleDocumentCheckboxChange('attestation')}
                      />
                      <span>Attestation de fin de carrière</span>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="mr-2" 
                        checked={documentCheckboxes.certificat}
                        onChange={() => handleDocumentCheckboxChange('certificat')}
                      />
                      <span>Certificat de travail</span>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="mr-2" 
                        checked={documentCheckboxes.solde}
                        onChange={() => handleDocumentCheckboxChange('solde')}
                      />
                      <span>Solde de tout compte</span>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="mr-2" 
                        checked={documentCheckboxes.attestationPole}
                        onChange={() => handleDocumentCheckboxChange('attestationPole')}
                      />
                      <span>Attestation Pôle Emploi</span>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="mr-2" 
                        checked={documentCheckboxes.releve}
                        onChange={() => handleDocumentCheckboxChange('releve')}
                      />
                      <span>Relevé de situation individuelle</span>
                    </div>
                    <Button className="w-full" onClick={handleStepCompletion}>Marquer comme terminé</Button>
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="employee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employé</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un employé" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="robert">Robert Lefèvre</SelectItem>
                          <SelectItem value="jeanne">Jeanne Moreau</SelectItem>
                          <SelectItem value="michel">Michel Durand</SelectItem>
                          <SelectItem value="francoise">Françoise Blanc</SelectItem>
                          <SelectItem value="philippe">Philippe Martin</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="retirementDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date de départ prévue</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="retirementType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de départ</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner le type de départ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="normal">Retraite normale</SelectItem>
                        <SelectItem value="early">Retraite anticipée</SelectItem>
                        <SelectItem value="disability">Retraite pour invalidité</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commentaires</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Informations complémentaires..." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">
                Soumettre la demande
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
