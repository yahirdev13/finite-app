import { yearProgress, seasonProgress, decadeProgress, monthProgress } from "./time";
import { calculateCountdowns } from "./countdowns";

import type { YearProgress, SeasonProgress, DecadeProgress, MonthProgress } from "./time";
import type { CountdownResult } from "./countdowns";
import type { UserConfig } from "@/lib/config";

export interface AllMetrics {
  year: YearProgress;
  season: SeasonProgress;
  decade: DecadeProgress;
  month: MonthProgress;
  countdowns: CountdownResult[];
  now: Date;
}

export function calculateAllMetrics(
  now: Date,
  config: UserConfig
): AllMetrics {
  return {
    year: yearProgress(now),
    season: seasonProgress(now),
    decade: decadeProgress(now, config.date_of_birth),
    month: monthProgress(now),
    countdowns: calculateCountdowns(now, config.countdowns),
    now,
  };
}
