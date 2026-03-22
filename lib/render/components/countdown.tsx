import type { Theme } from "@/lib/render/themes";

interface CountdownProps {
  daysRemaining: number;
  label: string;
  theme: Theme;
}

export function Countdown({ daysRemaining, label, theme }: CountdownProps) {
  const isToday = daysRemaining <= 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "baseline",
      }}
    >
      <div
        style={{
          fontSize: 52,
          color: theme.countdown_text,
          fontFamily: "Inter",
        }}
      >
        {isToday ? "HOY" : String(daysRemaining)}
      </div>
      {!isToday && (
        <div
          style={{
            fontSize: 30,
            color: theme.countdown_text,
            fontFamily: "Inter",
          }}
        >
          d
        </div>
      )}
      <div
        style={{
          fontSize: 28,
          color: theme.text_secondary,
          fontFamily: "Inter",
          marginLeft: 14,
        }}
      >
        {label}
      </div>
    </div>
  );
}
