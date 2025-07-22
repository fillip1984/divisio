import { eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";

export const yyyyMMddHyphenated = "yyyy-MM-dd";
export const HH_mm_aka24hr = "HH:mm";
export const MMMdd = "MMM dd";
export const h_mm_a_aka12hr = "h:mm a";

export const findDateByDayOfWeek = (date: Date, dayOfWeek: number) => {
  const sunday = startOfWeek(date);
  const saturday = endOfWeek(date);
  const week = eachDayOfInterval({
    start: sunday,
    end: saturday,
  });
  const result = week[dayOfWeek];
  if (!result) {
    throw new Error(`Invalid dayOfWeek: ${dayOfWeek}`);
  }
  return result;
};
