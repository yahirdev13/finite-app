import type { Theme } from "@/lib/render/themes";

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
  const formattedDay = lifeDay.toLocaleString("en-US");

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end",
      width: "100%",
      marginTop: 48,
    }}>
      {/* Left: Day counter */}
      {showLifeDay && (
        <div style={{
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}>
          <span style={{
            fontSize: 18,
            fontWeight: 500,
            color: theme.text_faint,
            letterSpacing: 3,
          }}>
            {"DAY"}
          </span>
          <span style={{
            fontSize: 72,
            fontWeight: 700,
            color: theme.text_white,
            letterSpacing: -2,
            lineHeight: 1.1,
          }}>
            {formattedDay}
          </span>
        </div>
      )}

      {/* Right: Birthday progress */}
      {showBirthday && (
        <div style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "flex-end",
          marginLeft: 24,
          paddingBottom: 8,
        }}>
          {/* "85 left" text */}
          <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
          }}>
            <span style={{
              fontSize: 18,
              fontWeight: 600,
              color: theme.accent,
            }}>
              {birthdayDaysLeft}
            </span>
            <span style={{
              fontSize: 18,
              fontWeight: 400,
              color: theme.text_faint,
            }}>
              {" left"}
            </span>
          </div>

          {/* Progress bar */}
          <div style={{
            display: "flex",
            width: "100%",
            height: 6,
            backgroundColor: theme.bar_track,
            borderRadius: 3,
            marginTop: 8,
            overflow: "hidden",
          }}>
            <div style={{
              width: `${Math.round(birthdayPercentage * 100)}%`,
              height: 6,
              backgroundColor: theme.bar_fill,
              borderRadius: 3,
            }} />
          </div>
        </div>
      )}
    </div>
  );
}
