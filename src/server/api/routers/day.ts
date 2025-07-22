import { addDays, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";
import z from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  type trpcContextShape,
} from "../trpc";

export const dayRouter = createTRPCRouter({
  findAll: publicProcedure.query(async ({ ctx }) => {
    let days = await ctx.db.day.findMany({
      include: { timeslots: { include: { routine: true } } },
      orderBy: { value: "asc" },
    });
    if (days.length === 0) {
      // should only run once, so we can init the db with some days
      await init(ctx);
      days = await ctx.db.day.findMany({
        include: { timeslots: { include: { routine: true } } },
        orderBy: { value: "asc" },
      });
    }
    return days;
  }),
  addTimeslot: publicProcedure
    .input(
      z.object({
        dayId: z.string(),
        routineId: z.string(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { dayId, routineId, startTime, endTime } = input;

      return await ctx.db.timeslot.create({
        data: {
          dayId,
          routineId,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
        },
      });
    }),
  deleteTimeslot: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      return await ctx.db.timeslot.delete({
        where: { id },
      });
    }),
  updateTimeslot: publicProcedure
    .input(
      z.object({
        id: z.string(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, startTime, endTime } = input;

      return await ctx.db.timeslot.update({
        where: { id },
        data: {
          startTime: new Date(startTime),
          endTime: new Date(endTime),
        },
      });
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
