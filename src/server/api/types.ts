import type { Day } from "date-fns";
import type { RouterOutputs } from "~/trpc/react";

export type DaySchemaType = RouterOutputs["day"]["findAll"][number] & {
  date: Date;
};

export type TimeslotSchemaType = Omit<
  DaySchemaType["timeslots"][number],
  "routine"
>;
// export type ActivitySchemaType = RouterOutputs["activity"]["findAll"][number];
export type DaylightSchemaType = RouterOutputs["daylight"]["find"];
export type RoutineSchemaType = RouterOutputs["routine"]["findAll"][number];

// export const ActivitySchema = z.object({
//   id: z.string(),
//   name: z.string(),
//   description: z.string().optional(),
//   style: z.string().optional(),
//   icon: z.any().optional(),
//   prominent: z.boolean().optional(),
// });
// export type ActivitySchemaType = z.infer<typeof ActivitySchema>;

// export const DaySchema = z.object({
//   id: z.string(),
//   label: z.string(),
//   value: z.number(),
//   date: z.date(),
//   activities: z.array(ActivitySchema).optional(),
// });
// export type DaySchemaType = z.infer<typeof DaySchema>;
