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
) {
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
) {
  const start = (page - 1) * pageSize;
  return sessions.slice(start, start + pageSize);
}
