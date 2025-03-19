
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { LeaveRequestFormValues } from "./schema";

export function DaysCountField() {
  const form = useFormContext<LeaveRequestFormValues>();
  
  return (
    <FormField
      control={form.control}
      name="daysCount"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel htmlFor="daysCount">Nombre de jours</FormLabel>
          <FormControl>
            <Input 
              id="daysCount" 
              type="number" 
              min="0.5" 
              step="0.5" 
              placeholder="Calculé automatiquement" 
              disabled 
              value={field.value || ''} 
              onChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
