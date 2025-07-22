import type { Day } from "date-fns";
import type { RouterOutputs } from "~/trpc/react";

export type DaySchemaType = RouterOutputs["day"]["findAll"][number];

export type TimeslotSchemaType = DaySchemaType["timeslots"][number];

// export type TimeslotSchemaType = Omit<
//   DaySchemaType["timeslots"][number],
//   "routine"
// >;
// export type ActivitySchemaType = RouterOutputs["activity"]["findAll"][number];
export type DaylightSchemaType = RouterOutputs["daylight"]["find"];
export type RoutineSchemaType = RouterOutputs["routine"]["findAll"][number];
