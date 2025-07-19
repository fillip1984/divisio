import {
  createTRPCRouter,
  publicProcedure,
  type trpcContextShape,
} from "../trpc";

export const activityRouter = createTRPCRouter({
  findAll: publicProcedure.query(async ({ ctx }) => {
    await init(ctx);
    return await ctx.db.activity.findMany();
  }),
});

async function init(ctx: trpcContextShape) {
  const routines = [
    {
      name: "Entertainment",
      description: "Play games or watch movies",
      // icon: <FaGamepad className="h-12 w-12" />,
      style: "blueAndPurple",
    },
    {
      name: "Exercise",
      description: "Work out at the gym or body weight exercises",
      // icon: <GiBiceps className="h-12 w-12" />,
      style: "redAndPink",
    },
    {
      name: "Running",
      description: "Go for a run in the park",
      // icon: <FaPersonRunning className="h-12 w-12" />,
      style: "greenAndYellow",
    },
    {
      name: "Work",
      description: "Going to work or doing work-related tasks",
      // icon: <FaBusinessTime className="h-20 w-20" />,
      style: "blueAndGreen",
      // prominent: true,
    },
    {
      name: "Reading",
      description:
        "Read a book or listen to an audiobook and seeing how long of a line I can make this and how long it can be before it breaks the layout",
      // icon: <FaBook className="h-12 w-12" />,
      style: "gray",
    },
    {
      name: "Placeholder Activity that is longer than usual",
      description: "This is a placeholder activity for testing purposes",
      // icon: <FaAngellist className="h-12 w-12" />,
      style: "orangeAndBlue",
    },
    {
      name: "Placeholder Activity that is longer than usual",
      description: "This is a placeholder activity for testing purposes",
      // icon: <FaAngellist className="h-12 w-12" />,
      style: "orangeAndBlue",
    },
  ];
  return await ctx.db.routine.createMany({
    data: routines,
  });
}
