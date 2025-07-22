"use client";

import { format } from "date-fns";
import { useState } from "react";
import { BsSunrise, BsSunset } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import type { Daylight } from "~/server/api/routers/daylight";

import type {
  DaySchemaType,
  RoutineSchemaType,
  TimeslotSchemaType,
} from "~/server/api/types";
import { api } from "~/trpc/react";
import { findDateByDayOfWeek } from "~/utils/date";
import { retrieveIcon } from "~/utils/icon";
import { Button } from "./activityButton";
import LoadingAndRetry from "./shared/LoadingAndRetry";
import Modal from "./ui/modal";

export default function Day({ day }: { day: DaySchemaType }) {
  const [date, setDate] = useState<Date>(
    findDateByDayOfWeek(new Date(), day.value),
  );
  const {
    data: daylight,
    isLoading: isLoadingDaylight,
    isError: isErrorDaylight,
    refetch: retryDaylight,
  } = api.daylight.find.useQuery(
    {
      date: date,
    },
    {
      enabled: !!date,
    },
  );
  const [isAddActivityModalOpen, setIsAddActivityModalOpen] = useState(false);

  return (
    <>
      <div
        key={day.label}
        className={`flex min-w-[400px] snap-center flex-col gap-2 overflow-hidden rounded-lg border bg-background/30 ${day.timeslots && day.timeslots.length > 0 ? "border-green-400" : "border-white/40"}`}
      >
        {/* heading */}
        <div className="flex items-center justify-between p-2">
          <h3>{day.label}</h3>
          {date && <p>{format(date, "MMM dd")}</p>}
        </div>

        {/* activities */}
        {isLoadingDaylight && (
          <LoadingAndRetry
            isLoading={isLoadingDaylight}
            isError={isErrorDaylight}
            retry={retryDaylight}
          />
        )}

        {!isLoadingDaylight && (
          <div className="flex flex-col gap-1 overflow-y-auto px-3 pb-8">
            {daylight && <DaylightCard daylight={daylight} />}

            <div className="flex flex-col gap-1">
              {day.timeslots.map((timeslot) => (
                <RoutineCard
                  key={timeslot.id}
                  routine={timeslot.routine}
                  timeslot={timeslot}
                  onClick={() =>
                    window.open(`/activities/${timeslot.routine.id}`, "_blank")
                  }
                />
              ))}
            </div>
          </div>
        )}

        {/* footer */}
        {!isLoadingDaylight && (
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
        )}
      </div>
      <AddActivityModal
        isOpen={isAddActivityModalOpen}
        close={() => setIsAddActivityModalOpen(false)}
        dayId={day.id}
      />
    </>
  );
}

const AddActivityModal = ({
  isOpen,
  close,
  dayId,
}: { isOpen: boolean; close: () => void; dayId: string }) => {
  const utils = api.useUtils();
  const { data: routines } = api.routine.findAll.useQuery();
  const { mutate: addTimeslot } = api.day.addTimeslot.useMutation({
    onSuccess: () => {
      void utils.day.findAll.invalidate();
      console.log("activities and days invalidated");
      close();
    },
    onError: (error) => {
      console.error("Failed to add activity:", error);
    },
  });
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className="max-w-[800px] rounded-lg bg-background p-4 shadow-lg">
        <div className="flex flex-col gap-2">
          {routines?.map((routine) => (
            <RoutineCard
              key={routine.id}
              routine={
                {
                  id: routine.id,
                  name: routine.name,
                  description: routine.description,
                  icon: routine.icon,
                  style: routine.style,
                } as RoutineSchemaType
              }
              timeslot={undefined}
              onClick={() =>
                addTimeslot({
                  dayId,
                  routineId: routine.id,
                  startTime: new Date().toISOString(),
                  endTime: new Date(
                    new Date().getTime() + 60 * 60 * 1000,
                  ).toISOString(),
                })
              }
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};

const RoutineCard = ({
  routine,
  onClick,
  timeslot,
}: {
  routine: RoutineSchemaType;
  onClick: () => void;
  timeslot: TimeslotSchemaType | undefined;
}) => {
  return (
    <Button
      onClick={onClick}
      className="flex size-full items-center gap-2 rounded-lg p-2 text-left transition duration-200"
      // intent={(routine.style as unknown as ConfigVariants) ?? "blueAndGreen"}
    >
      <span className="text-4xl">{retrieveIcon(routine.icon)}</span>
      <div className="flex flex-col items-start">
        <p className="line-clamp-1 font-bold">{routine.name}</p>
        <p className="line-clamp-2 text-gray-200 text-xs">
          {routine.description}
        </p>
        {timeslot && (
          <p className="font-bold text-xs">
            {format(new Date(timeslot.startTime), "HH:mm")} -{" "}
            {format(new Date(timeslot.endTime), "HH:mm")}
          </p>
        )}
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
