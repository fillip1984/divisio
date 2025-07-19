import { HydrateClient, api } from "~/trpc/server";
import Day from "./_components/day";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();
  const routines = await api.activity.findAll();
  const days = await api.day.findAll();

  return (
    <HydrateClient>
      <div className="flex h-screen flex-1 overflow-hidden">
        <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto p-4">
          {days.length > 0 &&
            days.map((day) => <Day key={day.label} day={day} />)}
        </div>
      </div>
    </HydrateClient>
  );
}
