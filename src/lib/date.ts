const toDate = (iso: string) => new Date(`${iso}T00:00:00`);

export function formatLongDate(iso: string): string {
  return toDate(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatShortDate(iso: string): string {
  return toDate(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function formatWeekday(iso: string): string {
  return toDate(iso).toLocaleDateString("en-US", { weekday: "long" });
}

export function formatWeekdayShort(iso: string): string {
  return toDate(iso).toLocaleDateString("en-US", { weekday: "short" });
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const ms = toDate(checkOut).getTime() - toDate(checkIn).getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

export function formatDateRange(startIso: string, endIso: string): string {
  const start = toDate(startIso);
  const end = toDate(endIso);
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();

  if (sameMonth) {
    const monthName = start.toLocaleDateString("en-US", { month: "long" });
    return `${monthName} ${start.getDate()} – ${end.getDate()}, ${end.getFullYear()}`;
  }

  return `${formatLongDate(startIso)} — ${formatLongDate(endIso)}`;
}
