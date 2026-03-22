export interface Theme {
  background: string;
  text_primary: string;
  text_secondary: string;
  text_tertiary: string;
  accent: string;
  dot_active: string;
  dot_inactive: string;
  dot_current: string;
  gauge_track: string;
  gauge_fill: string;
  progress_track: string;
  progress_fill: string;
  countdown_text: string;
  stat_big: string;
}

export const darkTheme: Theme = {
  background: "#0A1024",
  text_primary: "#E6EBF5",
  text_secondary: "#7C8A9A",
  text_tertiary: "#506070",
  accent: "#0066FF",
  dot_active: "#0066FF",
  dot_inactive: "#000F26",
  dot_current: "#0066FF",
  gauge_track: "#000F26",
  gauge_fill: "#0066FF",
  progress_track: "#000F26",
  progress_fill: "#0066FF",
  countdown_text: "#0066FF",
  stat_big: "#0066FF",
};

export const lightTheme: Theme = {
  background: "#E6EBF5",
  text_primary: "#0A1024",
  text_secondary: "#506070",
  text_tertiary: "#7C8A9A",
  accent: "#003D99",
  dot_active: "#0A1024",
  dot_inactive: "#C0CCE0",
  dot_current: "#003D99",
  gauge_track: "#C0CCE0",
  gauge_fill: "#003D99",
  progress_track: "#C0CCE0",
  progress_fill: "#003D99",
  countdown_text: "#003D99",
  stat_big: "#0A1024",
};

export const SPACING = {
  safe_top: 660,
  safe_bottom: 432,
  safe_horizontal: 48,
  section_gap: 40,
  inner_gap: 12,
};
