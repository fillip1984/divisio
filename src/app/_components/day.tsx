"use client";

import { useState } from "react";
import { BsSunrise, BsSunset } from "react-icons/bs";
import { FaAngellist, FaBusinessTime } from "react-icons/fa";
import { FaBook, FaGamepad, FaPersonRunning, FaPlus } from "react-icons/fa6";
import { GiBiceps, GiSunrise, GiSunset } from "react-icons/gi";
import type { ActivitySchemaType, DaySchemaType } from "~/server/api/types";
import { Button } from "./activityButton";

export default function Day({ day }: { day: DaySchemaType }) {
  const activities = [
    {
      id: "1",
      name: "Entertainment",
      description: "Play games or watch movies",
      icon: <FaGamepad className="h-12 w-12" />,
      style: "blueAndPurple",
    },
    {
      id: "2",
      name: "Exercise",
      description: "Work out at the gym or body weight exercises",
      icon: <GiBiceps className="h-12 w-12" />,
      style: "redAndPink",
    },
    {
      id: "3",
      name: "Running",
      description: "Go for a run in the park",
      icon: <FaPersonRunning className="h-12 w-12" />,
      style: "greenAndYellow",
    },
    {
      id: "6",
      name: "Work",
      description: "Going to work or doing work-related tasks",
      icon: <FaBusinessTime className="h-20 w-20" />,
      style: "blueAndGreen",
      prominent: true,
    },
    {
      id: "4",
      name: "Reading",
      description:
        "Read a book or listen to an audiobook and seeing how long of a line I can make this and how long it can be before it breaks the layout",
      icon: <FaBook className="h-12 w-12" />,
      style: "gray",
    },
    {
      id: "5",
      name: "Placeholder Activity that is longer than usual",
      description: "This is a placeholder activity for testing purposes",
      icon: <FaAngellist className="h-12 w-12" />,
      style: "orangeAndBlue",
    },
    {
      id: "7",
      name: "Placeholder Activity that is longer than usual",
      description: "This is a placeholder activity for testing purposes",
      icon: <FaAngellist className="h-12 w-12" />,
      style: "orangeAndBlue",
    },
  ];
  const handleAdd = () => {};
  return (
    <div
      key={day.label}
      className={`flex min-w-[400px] snap-center flex-col gap-2 overflow-hidden rounded-lg border border-white/40 ${day.activities && day.activities.length > 0 ? "bg-green-400/80" : "bg-black/30"}`}
    >
      {/* heading */}
      <div className="p-2">
        <h3>{day.label}</h3>
      </div>

      {/* activities */}
      <div className="flex flex-col gap-1 overflow-y-auto px-3 pb-8">
        <Button
          intent={"zincToZinc"}
          size={"custom"}
          className="flex justify-between gap-2 rounded p-2"
        >
          <span className=" flex min-w-1/4 flex-col items-center justify-center">
            <BsSunrise className="text-3xl" />
            <span>6:35 AM</span>
          </span>
          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="font-bold">Daylight</p>
            <p className="rounded p-1 text-white text-xs">
              14 hours 23 minutes
            </p>
          </div>
          <span className=" flex min-w-1/4 flex-col items-center justify-center">
            <BsSunset className="text-3xl" />
            <span>8:35 PM</span>
          </span>
        </Button>
        {activities && activities.length > 0 ? (
          <ul className="flex flex-col gap-1">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </ul>
        ) : (
          <div>No activities</div>
        )}
      </div>

      {/* footer */}
      <div className="flex p-1">
        <button
          type="button"
          onClick={handleAdd}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-white py-2 font-bold text-2xl hover:bg-white/95 hover:text-black"
        >
          <FaPlus className="" />
          Add
        </button>
      </div>
    </div>
  );
}

const ActivityCard = ({ activity }: { activity: ActivitySchemaType }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        setIsOpen(!isOpen);
        console.log("clicked");
      }}
      className="perspective-normal min-h-[100px] "
    >
      <div
        className={`transform-3d relative size-full transition duration-300 ${isOpen ? "rotate-y-180" : ""}`}
      >
        <div className="backface-hidden absolute inset-0 size-full">
          <Button
            className="flex size-full items-center gap-2 rounded-lg p-2 text-left"
            intent={activity.style}
          >
            <span className={`${activity.prominent ? "" : "w-1/5"}`}>
              {activity.icon}
            </span>
            <div className="flex flex-col items-start">
              <p className="line-clamp-1 font-bold">{activity.name}</p>
              <p className="line-clamp-2 text-gray-200 text-xs">
                {activity.description}
              </p>
            </div>
          </Button>
        </div>
        <div className="backface-hidden fixed inset-0 size-full rotate-y-180 rounded-lg bg-background">
          Back
        </div>
      </div>
    </button>
  );
};
