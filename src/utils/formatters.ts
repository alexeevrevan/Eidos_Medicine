export function formatDateRange(startIso: string, endIso: string): string {
  const start: Date = new Date(startIso);
  const end: Date = new Date(endIso);

  const dd = (n: number): string => String(n).padStart(2, "0");

  const date: string = `${dd(start.getDate())}.${dd(
    start.getMonth() + 1
  )}.${start.getFullYear()}`;
  const time: string = `${dd(start.getHours())}:${dd(
    start.getMinutes()
  )} - ${dd(end.getHours())}:${dd(end.getMinutes())}`;

  return `${date}, ${time}`;
}
