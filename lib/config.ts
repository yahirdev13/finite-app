// User configuration types and defaults
// Only 6 metric toggles. No countdowns array. No goals object.

import { kv } from "@vercel/kv";

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

export async function getConfig(): Promise<UserConfig> {
  try {
    if (!process.env.KV_REST_API_URL) {
      return DEFAULT_CONFIG;
    }
    const config = await kv.get<UserConfig>("config:user");
    if (!config) {
      return DEFAULT_CONFIG;
    }
    // Merge with defaults to handle missing fields from older configs
    return {
      ...DEFAULT_CONFIG,
      ...config,
      metrics: {
        ...DEFAULT_CONFIG.metrics,
        ...(config.metrics || {}),
      },
    };
  } catch {
    return DEFAULT_CONFIG;
  }
}
