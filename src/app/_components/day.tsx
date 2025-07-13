"use client";

import React from "react";
import type { DaySchemaType } from "~/server/api/types";

export default function Day({ day }: { day: DaySchemaType }) {
  const activities = [
    { id: "1", name: "Activity 1" },
    { id: "2", name: "Activity 2" },
    { id: "3", name: "Activity 3" },
  ];
  const handleAdd = () => {};
  return (
    <div
      key={day.label}
      className={`flex min-w-[400px] snap-center flex-col gap-2 rounded-lg border border-white/40 p-2 ${day.activities && day.activities.length > 0 ? "bg-green-400/80" : "bg-black/30"}`}
    >
      {/* heading */}
      <h3>{day.label}</h3>

      {/* activities */}
      <div className="flex flex-col gap-1">
        {activities && activities.length > 0 ? (
          <ul className="flex flex-col gap-1">
            {activities.map((activity) => (
              <li
                key={activity.id}
                className="rounded-lg bg-linear-to-r from-blue-500 to-purple-500 p-2"
              >
                {activity.name}
              </li>
            ))}
          </ul>
        ) : (
          <div>No activities</div>
        )}
      </div>
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}
