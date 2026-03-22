export interface Theme {
  background: string;
  accent: string;
  text_bright: string;
  text_dim: string;
  text_faint: string;
  text_white: string;
  dot_active: string;
  dot_inactive: string;
  bar_track: string;
  bar_fill: string;
}

export const darkTheme: Theme = {
  background: "#0A1024",
  accent: "#0066FF",
  text_bright: "rgba(255,255,255,0.7)",
  text_dim: "rgba(255,255,255,0.25)",
  text_faint: "rgba(255,255,255,0.2)",
  text_white: "#FFFFFF",
  dot_active: "#0066FF",
  dot_inactive: "rgba(255,255,255,0.05)",
  bar_track: "rgba(255,255,255,0.04)",
  bar_fill: "#0066FF",
};

export const lightTheme: Theme = {
  background: "#E6EBF5",
  accent: "#003D99",
  text_bright: "rgba(0,0,0,0.7)",
  text_dim: "rgba(0,0,0,0.25)",
  text_faint: "rgba(0,0,0,0.2)",
  text_white: "#0A1024",
  dot_active: "#0A1024",
  dot_inactive: "rgba(0,0,0,0.05)",
  bar_track: "rgba(0,0,0,0.06)",
  bar_fill: "#003D99",
};

export const SPACING = {
  safe_top: 560,
  safe_bottom: 150,
  horizontal: 60,
  row_gap: 48,
  dot_size: 28,
  dot_gap: 6,
  dots_per_row: 15,
};
