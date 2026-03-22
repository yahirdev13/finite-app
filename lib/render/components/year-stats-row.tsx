import type { Theme } from "@/lib/render/themes";

interface YearStatsRowProps {
  percentage: number;
  day: number;
  total: number;
  remaining: number;
  theme: Theme;
  contentWidth: number;
}

export function YearStatsRow({ percentage, day, total, remaining, theme }: YearStatsRowProps) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "baseline",
      justifyContent: "space-between",
      width: "100%",
    }}>
      {/* Left: Year percentage */}
      <div style={{ display: "flex", flexDirection: "row", alignItems: "baseline" }}>
        <span style={{
          fontSize: 96,
          fontWeight: 700,
          color: theme.accent,
          letterSpacing: -2,
        }}>
          {percentage}
        </span>
        <span style={{
          fontSize: 56,
          fontWeight: 400,
          color: theme.accent,
        }}>
          %
        </span>
      </div>

      {/* Center: Day / Total */}
      <div style={{ display: "flex", flexDirection: "row", alignItems: "baseline" }}>
        <span style={{
          fontSize: 28,
          fontWeight: 600,
          color: theme.text_bright,
        }}>
          {day}
        </span>
        <span style={{
          fontSize: 28,
          fontWeight: 400,
          color: theme.text_dim,
        }}>
          {" / "}{total}
        </span>
      </div>

      {/* Right: Days remaining */}
      <div style={{ display: "flex", flexDirection: "row", alignItems: "baseline" }}>
        <span style={{
          fontSize: 28,
          fontWeight: 600,
          color: theme.text_bright,
        }}>
          {remaining}
        </span>
        <span style={{
          fontSize: 28,
          fontWeight: 400,
          color: theme.text_dim,
        }}>
          {" left"}
        </span>
      </div>
    </div>
  );
}
