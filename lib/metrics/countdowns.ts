export interface CountdownResult {
  label: string;
  daysRemaining: number;
}

export function calculateCountdowns(
  now: Date,
  countdowns: Array<{ label: string; date: string }>
): CountdownResult[] {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return countdowns
    .map((c) => {
      const target = new Date(c.date);
      const diff = Math.ceil(
        (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );
      return { label: c.label, daysRemaining: diff };
    })
    .filter((c) => c.daysRemaining >= 0)
    .sort((a, b) => a.daysRemaining - b.daysRemaining);
}
