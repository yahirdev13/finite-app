export interface LifeCalendar {
  weeksLived: number;
  totalWeeks: number;
  percentage: number;
  yearsLived: number;
}

export function lifeCalendar(
  now: Date,
  dob: string,
  lifeExpectancy: number
): LifeCalendar {
  const birthDate = new Date(dob);
  const msPerWeek = 1000 * 60 * 60 * 24 * 7;
  const weeksLived = Math.floor(
    (now.getTime() - birthDate.getTime()) / msPerWeek
  );
  const totalWeeks = lifeExpectancy * 52;
  const percentage = parseFloat(((weeksLived / totalWeeks) * 100).toFixed(1));
  const yearsLived = parseFloat(
    ((now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1)
  );

  return { weeksLived, totalWeeks, percentage, yearsLived };
}
