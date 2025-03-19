
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { LeaveRequestFormValues } from "./schema";
import { useEffect } from "react";

export function DateRangeFields() {
  const form = useFormContext<LeaveRequestFormValues>();
  
  // Update the days count when dates change
  useEffect(() => {
    const startDate = form.watch("startDate");
    const endDate = form.watch("endDate");
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        // Simple calculation (can be improved to account for weekends and holidays)
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        form.setValue("daysCount", diffDays);
      }
    }
  }, [form.watch("startDate"), form.watch("endDate")]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="startDate"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel htmlFor="startDate">Date de début</FormLabel>
            <FormControl>
              <Input id="startDate" type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="endDate"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel htmlFor="endDate">Date de fin</FormLabel>
            <FormControl>
              <Input id="endDate" type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
