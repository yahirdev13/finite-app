// Row 2: Life day counter (left) + Birthday progress bar (right)
// Both sides bottom-aligned with alignItems: flex-end

import type { Theme } from "../themes";

interface LifeDayRowProps {
  lifeDay: number;
  birthdayDaysLeft: number;
  birthdayPercentage: number;
  theme: Theme;
  showLifeDay: boolean;
  showBirthday: boolean;
}

export function LifeDayRow({
  lifeDay,
  birthdayDaysLeft,
  birthdayPercentage,
  theme,
  showLifeDay,
  showBirthday,
}: LifeDayRowProps) {
  const formatted = lifeDay.toLocaleString("en-US");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        width: "100%",
        marginTop: 75,
      }}
    >
      {/* Left: DAY label + big number */}
      {showLifeDay && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: 33,
              fontWeight: 500,
              color: theme.text_faint,
              letterSpacing: 4,
            }}
          >
            DAY
          </span>
          <span
            style={{
              fontSize: 117,
              fontWeight: 700,
              color: theme.text_white,
              letterSpacing: -3,
              lineHeight: 1.1,
            }}
          >
            {formatted}
          </span>
        </div>
      )}

      {/* Right: Birthday countdown bar */}
      {showBirthday && (
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "flex-end",
            marginLeft: showLifeDay ? 58 : 0,
            paddingBottom: 12,
          }}
        >
          {/* "85 left" right-aligned above bar */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              marginBottom: 14,
            }}
          >
            <span
              style={{
                fontSize: 42,
                fontWeight: 600,
                color: theme.accent,
              }}
            >
              {birthdayDaysLeft}
            </span>
            <span
              style={{
                fontSize: 42,
                fontWeight: 400,
                color: theme.text_faint,
                marginLeft: 6,
              }}
            >
              left
            </span>
          </div>

          {/* Progress bar */}
          <div
            style={{
              display: "flex",
              width: "100%",
              height: 10,
              backgroundColor: theme.bar_track,
              borderRadius: 5,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${Math.round(birthdayPercentage * 100)}%`,
                height: 10,
                backgroundColor: theme.bar_fill,
                borderRadius: 5,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
