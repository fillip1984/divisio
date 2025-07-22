import { type Duration, format, intervalToDuration, parseISO } from "date-fns";
import z from "zod";
import { yyyyMMddHyphenated } from "~/utils/date";
import { createTRPCRouter, publicProcedure } from "../trpc";

export type Daylight = {
  sunrise: Date;
  sunset: Date;
  firstLight: Date;
  lastLight: Date;
  dayLength: Duration;
};

// internal type for the response from the sunrise-sunset API
type SunriseSunsetResponse = {
  results: {
    sunrise: string;
    sunset: string;
    solar_noon: string;
    day_length: number;
    civil_twilight_begin: string;
    civil_twilight_end: string;
    nautical_twilight_begin: string;
    nautical_twilight_end: string;
    astronomical_twilight_begin: string;
    astronomical_twilight_end: string;
  };
  status: string;
  tzid: string;
};

export const DaylightRouter = createTRPCRouter({
  find: publicProcedure
    .input(z.object({ date: z.date() }))
    .query(async ({ ctx, input }) => {
      const formattedDate = format(input.date, yyyyMMddHyphenated);
      const preferences = {
        latitude: 38.24,
        longitude: -85.76,
        timezone: "America/New_York",
      }; // Example coordinates for Louisville, KY

      // provided by: https://sunrise-sunset.org/api
      // disabled formatted so values come over as full dates, setting to 1 or omitting will result in 12 hour time format
      const sunriseSunsetResponse = await fetch(
        `https://api.sunrise-sunset.org/json?lat=${preferences.latitude}&lng=${preferences.longitude}&date=${formattedDate}&tzId=${preferences.timezone}&formatted=0`,
      );

      if (!sunriseSunsetResponse.ok) {
        // check that response was returned
        console.warn(
          "Error occurred while fetching sunrise/sunset info, info is nice to have so not throwing an error",
        );
        return null;
      }

      // translate to a predictable type
      const sunriseSunsetData =
        (await sunriseSunsetResponse.json()) as SunriseSunsetResponse;

      // translate to Daylight type
      const sunrise = parseISO(sunriseSunsetData.results.sunrise);
      const sunset = parseISO(sunriseSunsetData.results.sunset);
      const firstLight = parseISO(
        sunriseSunsetData.results.civil_twilight_begin,
      );
      const lastLight = parseISO(sunriseSunsetData.results.civil_twilight_end);
      // See: https://stackoverflow.com/questions/48776140/format-a-duration-from-seconds-using-date-fns
      const dayLength = intervalToDuration({
        start: 0,
        end: sunriseSunsetData.results.day_length * 1000,
      });

      const result = {
        sunrise,
        sunset,
        firstLight,
        lastLight,
        dayLength,
      } as Daylight;

      return result;
    }),
});
