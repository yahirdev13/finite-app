export function lifeDayNumber(now: Date, dob: string): number {
  const birth = new Date(dob);
  return Math.floor((now.getTime() - birth.getTime()) / 86400000);
}

export function birthdayCountdown(now: Date, dob: string): {
  daysLeft: number;
  percentage: number;
} {
  const birth = new Date(dob);
  const thisYear = now.getFullYear();
  let nextBirthday = new Date(thisYear, birth.getMonth(), birth.getDate());

  if (nextBirthday.getTime() <= now.getTime()) {
    nextBirthday = new Date(thisYear + 1, birth.getMonth(), birth.getDate());
  }

  const lastBirthday = new Date(
    nextBirthday.getFullYear() - 1,
    birth.getMonth(),
    birth.getDate()
  );

  const totalDays = Math.round(
    (nextBirthday.getTime() - lastBirthday.getTime()) / 86400000
  );
  const elapsed = Math.round(
    (now.getTime() - lastBirthday.getTime()) / 86400000
  );

  return {
    daysLeft: totalDays - elapsed,
    percentage: elapsed / totalDays,
  };
}
