// Life metrics — day counter and birthday countdown

export function lifeDayNumber(now: Date, dob: string): number {
  const birth = new Date(dob);
  return Math.floor((now.getTime() - birth.getTime()) / 86400000);
}

export function birthdayCountdown(
  now: Date,
  dob: string
): { daysLeft: number; percentage: number } {
  const birth = new Date(dob);
  const thisYear = now.getFullYear();

  let nextBday = new Date(thisYear, birth.getMonth(), birth.getDate());
  if (nextBday.getTime() <= now.getTime()) {
    nextBday = new Date(thisYear + 1, birth.getMonth(), birth.getDate());
  }

  const lastBday = new Date(
    nextBday.getFullYear() - 1,
    birth.getMonth(),
    birth.getDate()
  );

  const total = Math.round(
    (nextBday.getTime() - lastBday.getTime()) / 86400000
  );
  const elapsed = Math.round(
    (now.getTime() - lastBday.getTime()) / 86400000
  );

  return {
    daysLeft: total - elapsed,
    percentage: elapsed / total,
  };
}
