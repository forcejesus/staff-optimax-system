
import { z } from "zod";

export const leaveRequestSchema = z.object({
  leaveType: z.string({
    required_error: "Veuillez sélectionner un type de congé",
  }),
  startDate: z.string({
    required_error: "La date de début est requise",
  }),
  endDate: z.string({
    required_error: "La date de fin est requise",
  }).refine((date) => date !== "", {
    message: "La date de fin est requise",
  }),
  startTime: z.string({
    required_error: "Veuillez sélectionner matin ou après-midi",
  }),
  endTime: z.string({
    required_error: "Veuillez sélectionner matin ou après-midi",
  }),
  daysCount: z.number().optional(),
  reason: z.string().optional(),
  handover: z.string().optional(),
});

export type LeaveRequestFormValues = z.infer<typeof leaveRequestSchema>;
