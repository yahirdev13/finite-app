// Year progress metrics — pure date math, no external APIs

export function yearProgress(now: Date) {
  const year = now.getFullYear();
  const start = new Date(year, 0, 1);
  const end = new Date(year + 1, 0, 1);
  const totalDays = Math.round(
    (end.getTime() - start.getTime()) / 86400000
  );
  const elapsed =
    Math.floor((now.getTime() - start.getTime()) / 86400000) + 1;

  return {
    day: elapsed,
    total: totalDays,
    percentage: Math.round((elapsed / totalDays) * 100),
    remaining: totalDays - elapsed,
  };
}
