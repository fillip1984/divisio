"use client";

import { format } from "date-fns";
import { useState } from "react";
import { BsSunrise, BsSunset } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import type { Daylight } from "~/server/api/routers/daylight";
import type { ActivitySchemaType, DaySchemaType } from "~/server/api/types";
import { api } from "~/trpc/react";
import { retrieveIcon } from "~/utils/icon";
import { Button } from "./activityButton";
import Modal from "./ui/modal";

export default function Day({ day }: { day: DaySchemaType }) {
  const [isAddActivityModalOpen, setIsAddActivityModalOpen] = useState(false);

  const { data: daylight } = api.daylight.find.useQuery({
    date: new Date(day.date),
  });

  return (
    <>
      <div
        key={day.label}
        className={`flex min-w-[400px] snap-center flex-col gap-2 overflow-hidden rounded-lg border border-white/40 ${day.activities && day.activities.length > 0 ? "bg-green-400/80" : "bg-black/30"}`}
      >
        {/* heading */}
        <div className="flex items-center justify-between p-2">
          <h3>{day.label}</h3>
          <p>{format(day.date, "MMM dd")}</p>
        </div>

        {/* activities */}
        <div className="flex flex-col gap-1 overflow-y-auto px-3 pb-8">
          {daylight && <DaylightCard daylight={daylight} />}

          <ul className="flex flex-col gap-1">
            {day.activities?.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </ul>
        </div>

        {/* footer */}
        <div className="flex p-1">
          <button
            type="button"
            onClick={() => setIsAddActivityModalOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-white py-2 font-bold text-2xl hover:bg-white/95 hover:text-black"
          >
            <FaPlus className="" />
            Add
          </button>
        </div>
      </div>
      <AddActivityModal
        isOpen={isAddActivityModalOpen}
        close={() => setIsAddActivityModalOpen(false)}
      />
    </>
  );
}

const AddActivityModal = ({
  isOpen,
  close,
}: { isOpen: boolean; close: () => void }) => {
  const { data: routines } = api.routine.findAll.useQuery();
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className="max-w-[800px] rounded-lg bg-background p-4 shadow-lg">
        <div className="flex flex-col gap-2">
          {routines?.map((routine) => (
            <ActivityCard
              key={routine.id}
              activity={{
                id: routine.id,
                name: routine.name,
                description: routine.description,
                icon: routine.icon,
                style: routine.style,
                // prominent: routine.prominent,
              }}
            />
            // <div key={routine.id} className="mb-2">
            //   <h3 className="font-semibold">{routine.name}</h3>
            //   <p className="text-gray-500 text-sm">{routine.description}</p>
            // </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

const ActivityCard = ({ activity }: { activity: ActivitySchemaType }) => {
  return (
    <Button
      className="flex size-full items-center gap-2 rounded-lg p-2 text-left transition duration-200"
      intent={activity.style ?? "blueAndGreen"}
    >
      <span className="text-4xl">{retrieveIcon(activity.icon)}</span>
      <div className="flex flex-col items-start">
        <p className="line-clamp-1 font-bold">{activity.name}</p>
        <p className="line-clamp-2 text-gray-200 text-xs">
          {activity.description}
        </p>
      </div>
    </Button>
  );
};

const DaylightCard = ({ daylight }: { daylight: Daylight }) => {
  return (
    <Button
      onClick={() => window.open("https://sunrise-sunset.org", "_blank")}
      intent={"zincToZinc"}
      size={"custom"}
      className="relative flex h-20 justify-between gap-2 rounded p-2"
    >
      <span className="flex min-w-1/4 flex-col items-center justify-center">
        <BsSunrise className="text-3xl" />
        <span>{daylight.firstLight.toLocaleTimeString()}</span>
      </span>
      <div className="flex flex-1 flex-col items-center justify-center">
        <p className="font-bold">Daylight</p>
        <p className="rounded p-1 text-white text-xs">
          {daylight.dayLength.hours}h {daylight.dayLength.minutes}m
        </p>
      </div>
      <span className="flex min-w-1/4 flex-col items-center justify-center">
        <BsSunset className="text-3xl" />
        <span>{daylight.lastLight.toLocaleTimeString()}</span>
      </span>
      <p className="absolute right-0 bottom-0 rounded p-1 text-[8px] text-gray-300">
        Source: sunrise-sunset.org
      </p>
    </Button>
  );
};
