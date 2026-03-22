// Central metrics calculator — aggregates all metric functions

import { yearProgress } from "./time";
import { lifeDayNumber, birthdayCountdown } from "./life";
import type { UserConfig } from "@/lib/config";

export interface AllMetrics {
  yearProgress: {
    day: number;
    total: number;
    percentage: number;
    remaining: number;
  };
  lifeDay: number;
  birthdayCountdown: {
    daysLeft: number;
    percentage: number;
  };
}

export function calculateAllMetrics(
  now: Date,
  config: UserConfig
): AllMetrics {
  return {
    yearProgress: yearProgress(now),
    lifeDay: lifeDayNumber(now, config.date_of_birth),
    birthdayCountdown: birthdayCountdown(now, config.date_of_birth),
  };
}
