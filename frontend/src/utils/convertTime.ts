const getRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000; // seconds

  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 60 * 60 * 24 * 365],
    ["month", 60 * 60 * 24 * 30],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
    ["second", 1],
  ];

  for (const [unit, secondsInUnit] of units) {
    if (diff >= secondsInUnit || unit === "second") {
      const value = Math.floor(diff / secondsInUnit);
      return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
        -value,
        unit
      );
    }
  }
};

export default getRelativeTime;
