"use client";

import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function Fab() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const fabMenuItems = [
    {
      label: "Create Activity",
      onClick: () => console.log("Action 1 clicked"),
    },
    {
      label: "Show/Hide Activity swatch",
      onClick: () => console.log("Action 2 clicked"),
    },
  ];
  return (
    <div>
      {isOpen && (
        <>
          {/* backdrop */}
          <div onClick={handleOpen} className="fixed inset-0 bg-black/40 " />

          {/* menu */}
          <div className="fixed right-4 bottom-20 flex flex-col items-end gap-2">
            {fabMenuItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className="rounded-lg bg-background/80 p-2 hover:bg-background"
              >
                {item.label}
              </button>
            ))}
          </div>
        </>
      )}

      <button
        type="button"
        onClick={handleOpen}
        className="fixed right-4 bottom-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary"
      >
        <FaPlus
          className={`text-2xl transition ${isOpen ? "rotate-45" : ""}`}
        />
      </button>
    </div>
  );
}
