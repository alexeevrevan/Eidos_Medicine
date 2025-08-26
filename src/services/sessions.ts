import raw from "@/mock/sessions.json";
import type { Session } from "@/types/sessions";

export function getSessions(): Session[] {
  return raw.sessions.map(
    (r) =>
      ({
        ...r,
        rooms: r.rooms.map((room) => ({
          id: room.id,
          name: room.name,
        })),
      } as Session)
  );
}

export function sortSessionsByDate(
  sessions: Session[],
  direction: "asc" | "desc" = "desc"
): Session[] {
  return [...sessions].sort((a, b) => {
    const aStart = new Date(a.start).getTime();
    const bStart = new Date(b.start).getTime();
    return direction === "asc" ? aStart - bStart : bStart - aStart;
  });
}

export function paginateSessions(
  sessions: Session[],
  page: number,
  pageSize: number
): Session[] {
  const start: number = (page - 1) * pageSize;
  return sessions.slice(start, start + pageSize);
}

export function filterSessionsByModule(
  sessions: Session[],
  query: string
): Session[] {
  if (!query) return sessions;

  const normalizedQuery: string = query.trim().toLocaleLowerCase();

  return sessions.filter((session: Session) =>
    (session.module || "").toLocaleLowerCase().includes(normalizedQuery)
  );
}
