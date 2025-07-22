import { addDays, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";
import {
  createTRPCRouter,
  publicProcedure,
  type trpcContextShape,
} from "../trpc";

export const dayRouter = createTRPCRouter({
  findAll: publicProcedure.query(async ({ ctx }) => {
    let days = await ctx.db.day.findMany({
      include: { activities: true },
      orderBy: { value: "asc" },
    });
    if (days.length === 0) {
      // should only run once, so we can init the db with some days
      await init(ctx);
      days = await ctx.db.day.findMany({
        include: { activities: true },
        orderBy: { value: "asc" },
      });
    }

    // Reference date (e.g., today)
    const referenceDate = new Date();

    // Get the start of the week (you can specify which day the week starts on)
    const sunday = startOfWeek(referenceDate);
    const saturday = endOfWeek(referenceDate);
    const week = eachDayOfInterval({
      start: sunday,
      end: saturday,
    });

    days = days.map((day) => {
      return {
        ...day,
        date: week[day.value],
      };
    });
    return days;
  }),
});

async function init(ctx: trpcContextShape) {
  const days = [
    { label: "Sunday", value: 0 },
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
  ];

  return await ctx.db.day.createMany({
    data: days,
  });
}
