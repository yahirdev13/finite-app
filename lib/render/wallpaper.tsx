import { YearStatsRow } from "./components/year-stats-row";
import { LifeDayRow } from "./components/life-day-row";
import { DotGrid } from "./components/dot-grid";
import { darkTheme, lightTheme, SPACING } from "./themes";

import type { AllMetrics } from "@/lib/metrics";
import type { UserConfig } from "@/lib/config";

interface WallpaperProps {
  metrics: AllMetrics;
  config: UserConfig;
  width: number;
  height: number;
}

export function WallpaperComponent({
  metrics,
  config,
  width,
  height,
}: WallpaperProps): React.ReactElement {
  const theme = config.theme === "dark" ? darkTheme : lightTheme;

  const showRow1 =
    config.metrics.year_percentage ||
    config.metrics.day_of_year ||
    config.metrics.days_remaining;

  const showRow2 =
    config.metrics.life_day ||
    config.metrics.birthday_countdown;

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: theme.background,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top safe area: EMPTY — iOS clock and date render here */}
      <div style={{ height: SPACING.safe_top, flexShrink: 0 }} />

      {/* ZONE A: Data block */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: SPACING.horizontal,
          paddingRight: SPACING.horizontal,
          flexShrink: 0,
        }}
      >
        {/* Row 1: Year stats (same baseline) */}
        {showRow1 && (
          <YearStatsRow
            percentage={metrics.yearProgress.percentage}
            day={metrics.yearProgress.day}
            total={metrics.yearProgress.total}
            remaining={metrics.yearProgress.remaining}
            theme={theme}
            contentWidth={width - 2 * SPACING.horizontal}
          />
        )}

        {/* Row 2: Life day + Birthday bar (bottom-aligned) */}
        {showRow2 && (
          <LifeDayRow
            lifeDay={metrics.lifeDay}
            birthdayDaysLeft={metrics.birthdayCountdown.daysLeft}
            birthdayPercentage={metrics.birthdayCountdown.percentage}
            theme={theme}
            showLifeDay={config.metrics.life_day}
            showBirthday={config.metrics.birthday_countdown}
          />
        )}
      </div>

      {/* SPACER: Pushes dot grid to the bottom */}
      <div style={{ flex: 1 }} />

      {/* ZONE B: Dot grid (anchored to bottom) */}
      {config.metrics.year_progress && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: SPACING.safe_bottom,
            flexShrink: 0,
          }}
        >
          <DotGrid
            dayOfYear={metrics.yearProgress.day}
            totalDays={metrics.yearProgress.total}
            theme={theme}
          />
        </div>
      )}
    </div>
  );
}
