// Main wallpaper component — assembles all zones into final image
// Structure: empty top (iOS) → Zone A (data) → spacer → Zone B (dots) → empty bottom (iOS)
// NO greeting, NO date text, NO labels, NO captions

import { YearStatsRow } from "./components/year-stats-row";
import { LifeDayRow } from "./components/life-day-row";
import { DotGrid } from "./components/dot-grid";
import { darkTheme, lightTheme, SPACING } from "./themes";
import type { Theme } from "./themes";
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
  const theme: Theme =
    config.theme === "dark" ? darkTheme : lightTheme;

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
      {/* Top safe area — iOS renders clock and date here. We render NOTHING. */}
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
        {/* Row 1: 22%  81/365  284 left — same baseline */}
        {showRow1 && (
          <YearStatsRow
            percentage={metrics.yearProgress.percentage}
            day={metrics.yearProgress.day}
            total={metrics.yearProgress.total}
            remaining={metrics.yearProgress.remaining}
            theme={theme}
          />
        )}

        {/* Row 2: DAY 11,238 (left) + birthday bar (right) — bottom-aligned */}
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

      {/* Spacer — pushes dot grid to bottom */}
      <div style={{ flex: 1 }} />

      {/* ZONE B: Dot grid — anchored near bottom */}
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
