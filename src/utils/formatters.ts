export function formatDateRange(startIso: string, endIso: string) {
  const start = new Date(startIso);
  const end = new Date(endIso);

  const dd = (n: number) => String(n).padStart(2, "0");

  const date = `${dd(start.getDate())}.${dd(
    start.getMonth() + 1
  )}.${start.getFullYear()}`;
  const time = `${dd(start.getHours())}:${dd(start.getMinutes())} - ${dd(
    end.getHours()
  )}:${dd(end.getMinutes())}`;

  return `${date}, ${time}`;
}
