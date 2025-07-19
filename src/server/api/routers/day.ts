import {
  createTRPCRouter,
  publicProcedure,
  type trpcContextShape,
} from "../trpc";

export const dayRouter = createTRPCRouter({
  findAll: publicProcedure.query(async ({ ctx }) => {
    let days = await ctx.db.day.findMany({
      include: { activities: true },
    });
    if (days.length > 0) {
      return days;
    }

    // should only run once, so we can init the db with some days
    await init(ctx);
    days = await ctx.db.day.findMany({
      include: { activities: true },
    });
    return days;
  }),
});

async function init(ctx: trpcContextShape) {
  const days = [
    { label: "Monday" },
    { label: "Tuesday" },
    { label: "Wednesday" },
    { label: "Thursday" },
    { label: "Friday" },
    { label: "Saturday" },
    { label: "Sunday" },
  ];

  return await ctx.db.day.createMany({
    data: days,
  });
}
