import type { Theme } from "@/lib/render/themes";

interface DotGridProps {
  dayOfYear: number;
  totalDays: number;
  theme: Theme;
  width: number;
}

export function DotGrid({ dayOfYear, totalDays, theme, width }: DotGridProps) {
  const dotSize = 22;
  const gap = 6;
  const cell = dotSize + gap;
  const columns = Math.floor((width + gap) / cell);
  const gridWidth = columns * cell - gap;
  const remaining = totalDays - dayOfYear;

  const dots: React.ReactElement[] = [];
  for (let i = 0; i < totalDays; i++) {
    const isCurrent = i === dayOfYear - 1;
    const isActive = i < dayOfYear;

    dots.push(
      <div
        key={i}
        style={{
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          backgroundColor: isCurrent
            ? theme.dot_current
            : isActive
              ? theme.dot_active
              : theme.dot_inactive,
          ...(isCurrent
            ? {
                boxShadow: `0 0 8px ${theme.dot_current}`,
              }
            : {}),
        }}
      />
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: gap,
          width: gridWidth,
          justifyContent: "flex-start",
        }}
      >
        {dots}
      </div>
      <div
        style={{
          fontSize: 24,
          color: theme.text_tertiary,
          fontFamily: "Inter",
        }}
      >
        {`Día ${dayOfYear} · ${remaining} restantes`}
      </div>
    </div>
  );
}
