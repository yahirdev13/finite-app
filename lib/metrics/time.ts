export interface YearProgress {
  day: number;
  total: number;
  percentage: number;
  remaining: number;
}

export interface SeasonProgress {
  name: string;
  percentage: number;
}

export interface DecadeProgress {
  label: string;
  percentage: number;
}

export interface MonthProgress {
  name: string;
  percentage: number;
}

export function yearProgress(now: Date): YearProgress {
  const year = now.getFullYear();
  const start = new Date(year, 0, 1);
  const end = new Date(year + 1, 0, 1);
  const total = Math.round(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  const day =
    Math.floor(
      (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;
  const remaining = total - day;
  const percentage = parseFloat(((day / total) * 100).toFixed(1));

  return { day, total, percentage, remaining };
}

interface SeasonDef {
  name: string;
  start: [number, number];
  end: [number, number];
}

const SEASONS: SeasonDef[] = [
  { name: "Primavera", start: [2, 20], end: [5, 20] },
  { name: "Verano", start: [5, 21], end: [8, 21] },
  { name: "Otoño", start: [8, 22], end: [11, 20] },
  { name: "Invierno", start: [11, 21], end: [2, 19] },
];

export function seasonProgress(now: Date): SeasonProgress {
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  const md = month * 100 + day;

  for (const season of SEASONS) {
    const [sm, sd] = season.start;
    const [em, ed] = season.end;
    const startMd = sm * 100 + sd;
    const endMd = em * 100 + ed;

    if (season.name === "Invierno") {
      if (md >= startMd || md <= endMd) {
        let startDate: Date;
        let endDate: Date;
        if (md >= startMd) {
          startDate = new Date(year, sm, sd);
          endDate = new Date(year + 1, em, ed);
        } else {
          startDate = new Date(year - 1, sm, sd);
          endDate = new Date(year, em, ed);
        }
        const total = endDate.getTime() - startDate.getTime();
        const elapsed = now.getTime() - startDate.getTime();
        return {
          name: season.name,
          percentage: parseFloat(((elapsed / total) * 100).toFixed(1)),
        };
      }
    } else {
      if (md >= startMd && md <= endMd) {
        const startDate = new Date(year, sm, sd);
        const endDate = new Date(year, em, ed);
        const total = endDate.getTime() - startDate.getTime();
        const elapsed = now.getTime() - startDate.getTime();
        return {
          name: season.name,
          percentage: parseFloat(((elapsed / total) * 100).toFixed(1)),
        };
      }
    }
  }

  return { name: "Primavera", percentage: 0 };
}

export function decadeProgress(now: Date, dob: string): DecadeProgress {
  const birthDate = new Date(dob);
  const ageMs = now.getTime() - birthDate.getTime();
  const ageYears = ageMs / (1000 * 60 * 60 * 24 * 365.25);
  const decadeStart = Math.floor(ageYears / 10) * 10;
  const progressInDecade = ageYears - decadeStart;
  const percentage = parseFloat(((progressInDecade / 10) * 100).toFixed(1));

  return {
    label: `${decadeStart}s`,
    percentage,
  };
}

export function monthProgress(now: Date): MonthProgress {
  const monthName = new Intl.DateTimeFormat("es-MX", { month: "long" }).format(now);
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const currentDay = now.getDate();
  const percentage = parseFloat(((currentDay / daysInMonth) * 100).toFixed(1));

  return {
    name: monthName.charAt(0).toUpperCase() + monthName.slice(1),
    percentage,
  };
}
