// Row 1: Year percentage + day fraction + days remaining
// All three groups share the SAME text baseline. No labels underneath.

import type { Theme } from "../themes";

interface YearStatsRowProps {
  percentage: number;
  day: number;
  total: number;
  remaining: number;
  theme: Theme;
}

export function YearStatsRow({
  percentage,
  day,
  total,
  remaining,
  theme,
}: YearStatsRowProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      {/* Left: 22% */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
        }}
      >
        <span
          style={{
            fontSize: 150,
            fontWeight: 700,
            color: theme.accent,
            letterSpacing: -4,
          }}
        >
          {percentage}
        </span>
        <span
          style={{
            fontSize: 84,
            fontWeight: 400,
            color: theme.accent,
          }}
        >
          %
        </span>
      </div>

      {/* Center: 81 / 365 */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
        }}
      >
        <span
          style={{
            fontSize: 50,
            fontWeight: 600,
            color: theme.text_bright,
          }}
        >
          {day}
        </span>
        <span
          style={{
            fontSize: 50,
            fontWeight: 400,
            color: theme.text_dim,
          }}
        >
          {" / "}
          {total}
        </span>
      </div>

      {/* Right: 284 left */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
        }}
      >
        <span
          style={{
            fontSize: 50,
            fontWeight: 600,
            color: theme.text_bright,
          }}
        >
          {remaining}
        </span>
        <span
          style={{
            fontSize: 50,
            fontWeight: 400,
            color: theme.text_dim,
          }}
        >
          {" left"}
        </span>
      </div>
    </div>
  );
}
