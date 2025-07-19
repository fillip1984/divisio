"use client";

import { useState } from "react";
import { BsSunrise, BsSunset } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import type { ActivitySchemaType, DaySchemaType } from "~/server/api/types";
import { Button } from "./activityButton";
import Modal from "./ui/modal";

export default function Day({ day }: { day: DaySchemaType }) {
  const [isAddActivityModalOpen, setIsAddActivityModalOpen] = useState(false);

  return (
    <>
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
          {day.activities && day.activities.length > 0 ? (
            <ul className="flex flex-col gap-1">
              {day.activities.map((activity) => (
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

const ActivityCard = ({ activity }: { activity: ActivitySchemaType }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Button
      onClick={() => setIsOpen(!isOpen)}
      className="flex size-full items-center gap-2 rounded-lg p-2 text-left transition duration-200"
      intent={activity.style}
    >
      <span className={`${activity.prominent ? "" : "w-1/5"}`}>
        {activity.icon}
      </span>
      <div className="flex flex-col items-start">
        <p className="line-clamp-1 font-bold">{activity.name}</p>
        <p className="line-clamp-2 text-gray-200 text-xs">
          {activity.description}
          {isOpen ? (
            <span className="text-red-500"> (Open)</span>
          ) : (
            <span className="text-green-500"> (Closed)</span>
          )}
        </p>
      </div>
    </Button>
  );
};

const AddActivityModal = ({
  isOpen,
  close,
}: { isOpen: boolean; close: () => void }) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className="rounded-lg bg-background p-4 shadow-lg">
        <h2 className="mb-4 font-bold text-xl">Add Activity</h2>
        {/* Add your form or activity creation logic here */}
        <p>Form to add a new activity will go here.</p>
      </div>
    </Modal>
  );
};
