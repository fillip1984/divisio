import {
  createTRPCRouter,
  publicProcedure,
  type trpcContextShape,
} from "../trpc";

export const routineRouter = createTRPCRouter({
  findAll: publicProcedure.query(async ({ ctx }) => {
    let routines = await ctx.db.routine.findMany({ orderBy: { name: "asc" } });
    if (routines.length > 0) {
      return routines;
    }

    // TODO: should only run once, so we can init the db with some routines
    await init(ctx);
    routines = await ctx.db.routine.findMany({ orderBy: { name: "asc" } });
    return routines;
  }),
});

async function init(ctx: trpcContextShape) {
  const routines = [
    {
      name: "Entertainment",
      description: "Play games or watch movies",
      icon: "FaGamepad",
      style: "blueAndPurple",
    },
    {
      name: "Exercise",
      description: "Work out at the gym or body weight exercises",
      // icon: <GiBiceps className="h-12 w-12" />,
      icon: "FaDumbbell",
      style: "redAndPink",
    },
    {
      name: "Running",
      description: "Go for a run in the park",
      icon: "FaPersonRunning",
      style: "greenAndYellow",
    },
    {
      name: "Work",
      description: "Going to work or doing work-related tasks",
      icon: "FaBusinessTime",
      style: "blueAndGreen",
      // prominent: true,
    },
    {
      name: "Reading",
      description:
        "Read a book or listen to an audiobook and seeing how long of a line I can make this and how long it can be before it breaks the layout",
      icon: "FaBook",
      style: "gray",
    },
    {
      name: "Placeholder Activity that is longer than usual",
      description: "This is a placeholder activity for testing purposes",
      icon: "FaAngellist",
      style: "orangeAndBlue",
    },
    {
      name: "Placeholder Activity that is longer than usual",
      description: "This is a placeholder activity for testing purposes",
      icon: "FaAngellist",
      style: "orangeAndBlue",
    },
  ];
  return await ctx.db.routine.createMany({
    data: routines,
  });
}
