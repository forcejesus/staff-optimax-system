
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { LeaveRequestFormValues } from "./schema";

export function LeaveTypeSelect() {
  const form = useFormContext<LeaveRequestFormValues>();
  
  return (
    <FormField
      control={form.control}
      name="leaveType"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel htmlFor="leaveType">Type de congé</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger id="leaveType">
                <SelectValue placeholder="Sélectionner un type de congé" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="paidLeave">Congés payés</SelectItem>
              <SelectItem value="unpaidLeave">Congés sans solde</SelectItem>
              <SelectItem value="sickLeave">Congé maladie</SelectItem>
              <SelectItem value="maternityLeave">Congé maternité</SelectItem>
              <SelectItem value="paternityLeave">Congé paternité</SelectItem>
              <SelectItem value="rtt">RTT</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
