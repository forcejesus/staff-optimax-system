
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { LeaveRequestFormValues } from "./schema";

export function TextAreaFields() {
  const form = useFormContext<LeaveRequestFormValues>();
  
  return (
    <>
      <FormField
        control={form.control}
        name="reason"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel htmlFor="reason">Motif</FormLabel>
            <FormControl>
              <Textarea 
                id="reason" 
                placeholder="Raison de la demande de congé" 
                {...field} 
              />
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="handover"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel htmlFor="handover">Instructions de passation</FormLabel>
            <FormControl>
              <Textarea 
                id="handover" 
                placeholder="Instructions pour votre remplacement pendant votre absence..." 
                {...field} 
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}
