import type { Theme } from "@/lib/render/themes";

interface HeaderProps {
  name: string;
  now: Date;
  locale: string;
  theme: Theme;
}

export function Header({ name, now, locale, theme }: HeaderProps) {
  const weekday = new Intl.DateTimeFormat(locale, { weekday: "long" }).format(now);
  const day = now.getDate();
  const month = new Intl.DateTimeFormat(locale, { month: "long" }).format(now);
  const year = now.getFullYear();

  const capitalizedWeekday =
    weekday.charAt(0).toUpperCase() + weekday.slice(1);
  const capitalizedMonth =
    month.charAt(0).toUpperCase() + month.slice(1);

  const dateString = `${capitalizedWeekday} ${day} de ${capitalizedMonth}, ${year}`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <div
        style={{
          fontSize: 38,
          color: theme.accent,
          fontFamily: "Inter",
        }}
      >
        {`Hola, ${name}`}
      </div>
      <div
        style={{
          fontSize: 22,
          color: theme.text_secondary,
          fontFamily: "Inter",
        }}
      >
        {dateString}
      </div>
    </div>
  );
}
