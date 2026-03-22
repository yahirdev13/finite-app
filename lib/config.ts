export interface UserConfig {
  date_of_birth: string;
  name: string;
  theme: "dark" | "light";
  locale: "es-MX";
  metrics: {
    year_progress: boolean;
    year_percentage: boolean;
    days_remaining: boolean;
    season_progress: boolean;
    decade_progress: boolean;
    month_progress: boolean;
    day_of_year: boolean;
    countdowns: boolean;
  };
  countdowns: Array<{
    label: string;
    date: string;
    emoji?: string;
  }>;
  goals: {
    books_year: { current: number; target: number };
    projects_year: { current: number; target: number };
    savings_percent: number;
  };
}

export const DEFAULT_CONFIG: UserConfig = {
  date_of_birth: "1995-06-15",
  name: "Dev",
  theme: "dark",
  locale: "es-MX",
  metrics: {
    year_progress: true,
    year_percentage: true,
    days_remaining: true,
    season_progress: true,
    decade_progress: false,
    month_progress: false,
    day_of_year: true,
    countdowns: true,
  },
  countdowns: [{ label: "Año nuevo", date: "2027-01-01" }],
  goals: {
    books_year: { current: 0, target: 12 },
    projects_year: { current: 0, target: 6 },
    savings_percent: 30,
  },
};
