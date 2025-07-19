import { z } from "zod";

export const ActivitySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  style: z.string().optional(),
  icon: z.any().optional(),
  prominent: z.boolean().optional(),
});
export type ActivitySchemaType = z.infer<typeof ActivitySchema>;

export const DaySchema = z.object({
  label: z.string(),
  // value: z.number(),
  activities: z.array(ActivitySchema).optional(),
});
export type DaySchemaType = z.infer<typeof DaySchema>;
