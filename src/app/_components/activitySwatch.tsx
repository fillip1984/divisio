import React from "react";

export default function ActivitySwatch({ isOpen }: { isOpen: boolean }) {
  return (
    <nav
      className={`absolute top-0 right-0 bottom-0 w-[400px] bg-background transition-all duration-300 ${isOpen ? "" : "translate-x-full"}`}
    >
      ActivitySwatch
    </nav>
  );
}
