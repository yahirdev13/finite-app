// Year progress dot grid — 365 dots, 15 per row (one quincena)
// Container width MUST be exact for flexWrap to produce correct rows

import type { Theme } from "../themes";

const DOT_SIZE = 56;
const DOT_GAP = 8;
const DOTS_PER_ROW = 15;

// 15 x 56 + 14 x 8 = 840 + 112 = 952
const GRID_WIDTH =
  DOTS_PER_ROW * DOT_SIZE + (DOTS_PER_ROW - 1) * DOT_GAP;

interface DotGridProps {
  dayOfYear: number;
  totalDays: number;
  theme: Theme;
}

export function DotGrid({ dayOfYear, totalDays, theme }: DotGridProps) {
  const dots: React.ReactElement[] = [];

  for (let i = 0; i < totalDays; i++) {
    const dayNum = i + 1;
    let bg: string;
    let opacity = 1;

    if (dayNum < dayOfYear) {
      bg = theme.dot_active;
      opacity = 0.82;
    } else if (dayNum === dayOfYear) {
      bg = theme.dot_active;
      opacity = 1.0;
    } else {
      bg = theme.dot_inactive;
      opacity = 1.0;
    }

    dots.push(
      <div
        key={i}
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: DOT_SIZE / 2,
          backgroundColor: bg,
          opacity,
        }}
      />
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: DOT_GAP,
        width: GRID_WIDTH,
      }}
    >
      {dots}
    </div>
  );
}
