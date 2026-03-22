import type { Theme } from "@/lib/render/themes";

interface StatCardProps {
  value: string;
  label: string;
  theme: Theme;
}

export function StatCard({ value, label, theme }: StatCardProps) {
  const fontSize = value.length > 5 ? 72 : value.length > 3 ? 88 : 104;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <div
        style={{
          fontSize,
          color: theme.stat_big,
          fontFamily: "Inter",
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 28,
          color: theme.text_secondary,
          fontFamily: "Inter",
          marginTop: 8,
        }}
      >
        {label}
      </div>
    </div>
  );
}
