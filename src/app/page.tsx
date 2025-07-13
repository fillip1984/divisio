import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { HydrateClient, api } from "~/trpc/server";
import Day from "./_components/day";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();

  const days = [
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
    { label: "Sunday", value: 7 },
  ];

  return (
    <HydrateClient>
      <div className="flex h-screen flex-1 overflow-hidden">
        <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto p-4">
          {days.map((day) => (
            <Day key={day.label} day={day} />
          ))}
        </div>

        {/* <div className="flex gap-2">
          <div className="bg-background">asdf</div>
          <div className="bg-primary">asdf</div>
          <div className="bg-secondary">asdf</div>
        </div> */}
      </div>
    </HydrateClient>
  );
}
