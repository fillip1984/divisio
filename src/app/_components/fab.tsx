"use client";

import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function Fab({
  isActivitySwatchOpen,
  setIsActivitySwatchOpen,
}: {
  isActivitySwatchOpen: boolean;
  setIsActivitySwatchOpen: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    console.log("Activity Swatch Open State:", isActivitySwatchOpen);
  }, [isActivitySwatchOpen]);

  const fabMenuItems = [
    {
      label: "Create Activity",
      onClick: () => console.log("Action 1 clicked"),
    },
    {
      label: "Show/Hide Activity swatch",
      onClick: () => {
        setIsActivitySwatchOpen();
        setIsOpen(false);
      },
    },
  ];
  return (
    <>
      {isOpen && (
        <>
          {/* backdrop */}
          <div onClick={handleOpen} className="fixed inset-0 bg-black/40 " />

          {/* menu */}
          <div className="fixed right-4 bottom-20 z-10 flex flex-col items-end gap-2">
            {fabMenuItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={item.onClick}
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
        className="fixed right-4 bottom-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary"
      >
        <FaPlus
          className={`text-2xl transition ${isOpen ? "rotate-45" : ""}`}
        />
      </button>
    </>
  );
}
