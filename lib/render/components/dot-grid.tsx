import type { Theme } from "@/lib/render/themes";

interface DotGridProps {
  dayOfYear: number;
  totalDays: number;
  theme: Theme;
}

const DOT_SIZE = 28;
const DOT_GAP = 6;
const DOTS_PER_ROW = 15;
const GRID_WIDTH = DOTS_PER_ROW * DOT_SIZE + (DOTS_PER_ROW - 1) * DOT_GAP; // 504

export function DotGrid({ dayOfYear, totalDays, theme }: DotGridProps) {
  const dots: React.ReactElement[] = [];

  for (let i = 0; i < totalDays; i++) {
    const dayNumber = i + 1;
    let bgColor: string;
    let opacity: number;

    if (dayNumber < dayOfYear) {
      bgColor = theme.dot_active;
      opacity = 0.85;
    } else if (dayNumber === dayOfYear) {
      bgColor = theme.dot_active;
      opacity = 1.0;
    } else {
      bgColor = theme.dot_inactive;
      opacity = 1.0;
    }

    dots.push(
      <div
        key={i}
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: DOT_SIZE / 2,
          backgroundColor: bgColor,
          opacity,
        }}
      />
    );
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: DOT_GAP,
      width: GRID_WIDTH,
    }}>
      {dots}
    </div>
  );
}
