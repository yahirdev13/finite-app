import type { Theme } from "@/lib/render/themes";

interface LifeGridProps {
  weeksLived: number;
  totalWeeks: number;
  theme: Theme;
  width: number;
}

export function LifeGrid({ weeksLived, totalWeeks, theme }: LifeGridProps) {
  const dotSize = 8;
  const gap = 2;
  const columns = 52;
  const gridWidth = columns * (dotSize + gap) - gap;

  const dots: React.ReactElement[] = [];
  for (let i = 0; i < totalWeeks; i++) {
    const isLived = i < weeksLived;

    dots.push(
      <div
        key={i}
        style={{
          width: dotSize,
          height: dotSize,
          borderRadius: 2,
          backgroundColor: isLived ? theme.dot_active : theme.dot_inactive,
        }}
      />
    );
  }

  const formattedLived = weeksLived.toLocaleString("es-MX");
  const formattedTotal = totalWeeks.toLocaleString("es-MX");

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
          fontSize: 22,
          color: theme.text_tertiary,
          fontFamily: "Inter",
        }}
      >
        {`Semana ${formattedLived} de ${formattedTotal}`}
      </div>
    </div>
  );
}
