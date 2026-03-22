import { DotGrid } from "@/lib/render/components/dot-grid";
import { StatCard } from "@/lib/render/components/stat-card";
import { ProgressBar } from "@/lib/render/components/progress-bar";
import { Countdown } from "@/lib/render/components/countdown";
import { darkTheme, lightTheme, SPACING } from "@/lib/render/themes";

import type { AllMetrics } from "@/lib/metrics";
import type { UserConfig } from "@/lib/config";

interface WallpaperProps {
  metrics: AllMetrics;
  config: UserConfig;
  width: number;
  height: number;
}

function DateLine({ now, locale, theme }: { now: Date; locale: string; theme: typeof darkTheme }) {
  const weekday = new Intl.DateTimeFormat(locale, { weekday: "long" }).format(now);
  const day = now.getDate();
  const month = new Intl.DateTimeFormat(locale, { month: "long" }).format(now);

  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div
      style={{
        fontSize: 30,
        color: theme.text_secondary,
        fontFamily: "Inter",
        textAlign: "center",
      }}
    >
      {`${cap(weekday)} ${day} de ${cap(month)}`}
    </div>
  );
}

export function WallpaperComponent({
  metrics,
  config,
  width,
  height,
}: WallpaperProps) {
  const theme = config.theme === "dark" ? darkTheme : lightTheme;
  const contentWidth = width - SPACING.safe_horizontal * 2;

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: theme.background,
        display: "flex",
        flexDirection: "column",
        padding: `${SPACING.safe_top}px ${SPACING.safe_horizontal}px ${SPACING.safe_bottom}px`,
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        {/* Top: Date + Stats */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          <DateLine now={metrics.now} locale={config.locale} theme={theme} />

          {(config.metrics.year_percentage || config.metrics.day_of_year || config.metrics.days_remaining) && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 16,
              }}
            >
              {config.metrics.year_percentage && (
                <StatCard
                  value={`${metrics.year.percentage}%`}
                  label="del año"
                  theme={theme}
                />
              )}
              {config.metrics.day_of_year && (
                <StatCard
                  value={`${metrics.year.day}`}
                  label={`día de ${metrics.year.total}`}
                  theme={theme}
                />
              )}
              {config.metrics.days_remaining && (
                <StatCard
                  value={`${metrics.year.remaining}`}
                  label="días restantes"
                  theme={theme}
                />
              )}
            </div>
          )}
        </div>

        {/* Middle: Progress bars + Countdowns */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          {(config.metrics.season_progress || config.metrics.decade_progress || config.metrics.month_progress) && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {config.metrics.month_progress && (
                <ProgressBar
                  label={metrics.month.name}
                  percentage={metrics.month.percentage}
                  theme={theme}
                />
              )}
              {config.metrics.season_progress && (
                <ProgressBar
                  label={metrics.season.name}
                  percentage={metrics.season.percentage}
                  theme={theme}
                />
              )}
              {config.metrics.decade_progress && (
                <ProgressBar
                  label={metrics.decade.label}
                  percentage={metrics.decade.percentage}
                  theme={theme}
                />
              )}
            </div>
          )}

          {config.metrics.countdowns && metrics.countdowns.length > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {metrics.countdowns.map((c, i) => (
                <Countdown
                  key={i}
                  daysRemaining={c.daysRemaining}
                  label={c.label}
                  theme={theme}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bottom: Year dot grid */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          {config.metrics.year_progress && (
            <DotGrid
              dayOfYear={metrics.year.day}
              totalDays={metrics.year.total}
              theme={theme}
              width={contentWidth}
            />
          )}
        </div>
      </div>
    </div>
  );
}
