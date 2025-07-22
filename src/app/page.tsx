"use client";

import { api } from "~/trpc/react";
import Day from "./_components/day";
import LoadingAndRetry from "./_components/shared/LoadingAndRetry";

export default function Home() {
  const { data: routines } = api.routine.findAll.useQuery();
  const {
    data: days,
    isLoading,
    isError,
    refetch: retry,
  } = api.day.findAll.useQuery();

  return (
    <>
      {(isLoading || isError) && (
        <LoadingAndRetry
          isLoading={isLoading}
          isError={isError}
          retry={retry}
        />
      )}
      {!isLoading && days && (
        <div className="flex h-screen flex-1 overflow-hidden">
          <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto p-4">
            {days.length > 0 &&
              days.map((day) => <Day key={day.label} day={day} />)}
          </div>
        </div>
      )}
    </>
  );
}
