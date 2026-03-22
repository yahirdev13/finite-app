import type { Theme } from "@/lib/render/themes";

interface ProgressBarProps {
  label: string;
  percentage: number;
  theme: Theme;
  color?: string;
}

export function ProgressBar({ label, percentage, theme, color }: ProgressBarProps) {
  const fillColor = color || theme.progress_fill;
  const displayPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 26,
            color: theme.text_secondary,
            fontFamily: "Inter",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 26,
            color: theme.accent,
            fontFamily: "Inter",
          }}
        >
          {`${displayPercentage}%`}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          height: 14,
          borderRadius: 7,
          backgroundColor: theme.progress_track,
          width: "100%",
        }}
      >
        <div
          style={{
            height: 14,
            borderRadius: 7,
            backgroundColor: fillColor,
            width: `${displayPercentage}%`,
          }}
        />
      </div>
    </div>
  );
}
