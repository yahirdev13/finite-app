export interface UserConfig {
  date_of_birth: string;
  life_expectancy: number;
  name: string;
  theme: "dark" | "light";
  locale: "es-MX";
  metrics: {
    year_progress: boolean;
    year_percentage: boolean;
    days_remaining: boolean;
    day_of_year: boolean;
    life_day: boolean;
    birthday_countdown: boolean;
  };
}

export const DEFAULT_CONFIG: UserConfig = {
  date_of_birth: "1995-06-15",
  life_expectancy: 80,
  name: "Dev",
  theme: "dark",
  locale: "es-MX",
  metrics: {
    year_progress: true,
    year_percentage: true,
    days_remaining: true,
    day_of_year: true,
    life_day: true,
    birthday_countdown: true,
  },
};
