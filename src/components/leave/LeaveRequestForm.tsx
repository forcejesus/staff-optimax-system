
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeaveTypeSelect } from "./LeaveTypeSelect";
import { DateRangeFields } from "./DateRangeFields";
import { TimeSelectionFields } from "./TimeSelectionFields";
import { DaysCountField } from "./DaysCountField";
import { TextAreaFields } from "./TextAreaFields";
import { toast } from "sonner";
import { leaveRequestSchema, type LeaveRequestFormValues } from "./schema";
import { useState } from "react";

export function LeaveRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<LeaveRequestFormValues>({
    resolver: zodResolver(leaveRequestSchema),
    defaultValues: {
      leaveType: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      reason: "",
      handover: "",
    },
  });

  function onSubmit(data: LeaveRequestFormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", data);
      toast.success("Demande de congé soumise avec succès");
      setIsSubmitting(false);
      form.reset();
    }, 1500);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Demande de congé</CardTitle>
        <CardDescription>
          Remplissez ce formulaire pour demander un congé
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <LeaveTypeSelect />
            <DateRangeFields />
            <TimeSelectionFields />
            <DaysCountField />
            <TextAreaFields />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => form.reset()}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Traitement en cours..." : "Soumettre la demande"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
