// Color palettes and spacing constants for FINITE wallpaper

export const darkTheme = {
  background: "#0A1024",
  accent: "#0066FF",
  text_bright: "rgba(255,255,255,0.7)",
  text_dim: "rgba(255,255,255,0.25)",
  text_faint: "rgba(255,255,255,0.2)",
  text_white: "#FFFFFF",
  dot_active: "#0066FF",
  dot_inactive: "rgba(255,255,255,0.035)",
  bar_track: "rgba(255,255,255,0.04)",
  bar_fill: "#0066FF",
};

export const lightTheme = {
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

export type Theme = typeof darkTheme;

export const SPACING = {
  safe_top: 560,
  safe_bottom: 230,
  horizontal: 75,
  row_gap: 75,
};
