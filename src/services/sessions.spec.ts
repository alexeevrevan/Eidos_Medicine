import { describe, it, expect } from "vitest";
import {
  getSessions,
  sortSessionsByDate,
  paginateSessions,
  filterSessionsByModule,
} from "./sessions";
import type { Session } from "@/types/sessions";

const createMockSessions = (): Session[] => [
  {
    id: 1,
    module: "Математический анализ",
    start: "2023-06-01T10:00:00",
    end: "2023-06-01T12:00:00",
    type: { id: 1, name: "lesson" },
    status: { id: 1, name: "planned" },
    rooms: [{ id: 1, name: "Аудитория 101" }],
    users: [],
  },
  {
    id: 2,
    module: "Физика",
    start: "2023-06-02T14:00:00",
    end: "2023-06-02T16:00:00",
    type: { id: 2, name: "exam" },
    status: { id: 2, name: "in_progress" },
    rooms: [{ id: 2, name: "Аудитория 202" }],
    users: [],
  },
  {
    id: 3,
    module: "Программирование",
    start: "2023-05-31T09:00:00",
    end: "2023-05-31T11:00:00",
    type: { id: 3, name: "lesson" },
    status: { id: 3, name: "finished" },
    rooms: [{ id: 3, name: "Компьютерный класс" }],
    users: [],
  },
];

describe("Sessions Service", () => {
  describe("getSessions", () => {
    it("should return sessions with mapped rooms", () => {
      const sessions = getSessions();

      expect(sessions).toBeInstanceOf(Array);
      sessions.forEach((session) => {
        expect(session.rooms).toBeInstanceOf(Array);
        session.rooms.forEach((room) => {
          expect(room).toHaveProperty("id");
          expect(room).toHaveProperty("name");
        });
      });
    });
  });

  describe("sortSessionsByDate", () => {
    it("sorts sessions in descending order by default", () => {
      const mockSessions = createMockSessions();
      const sortedSessions = sortSessionsByDate(mockSessions);

      expect(sortedSessions[0].id).toBe(2);
      expect(sortedSessions[2].id).toBe(3);
    });

    it("sorts sessions in ascending order", () => {
      const mockSessions = createMockSessions();
      const sortedSessions = sortSessionsByDate(mockSessions, "asc");

      expect(sortedSessions[0].id).toBe(3);
      expect(sortedSessions[2].id).toBe(2);
    });
  });

  describe("paginateSessions", () => {
    const mockSessions = createMockSessions();

    it("returns correct page of sessions", () => {
      const page1 = paginateSessions(mockSessions, 1, 2);
      expect(page1.length).toBe(2);
      expect(page1[0].id).toBe(1);
      expect(page1[1].id).toBe(2);

      const page2 = paginateSessions(mockSessions, 2, 2);
      expect(page2.length).toBe(1);
      expect(page2[0].id).toBe(3);
    });

    it("handles page size larger than total sessions", () => {
      const page = paginateSessions(mockSessions, 1, 10);
      expect(page.length).toBe(3);
    });

    it("returns empty array for out of range page", () => {
      const page = paginateSessions(mockSessions, 3, 2);
      expect(page.length).toBe(0);
    });
  });

  describe("filterSessionsByModule", () => {
    const mockSessions = createMockSessions();

    it("returns all sessions when query is empty", () => {
      const filtered = filterSessionsByModule(mockSessions, "");
      expect(filtered.length).toBe(3);
    });

    it("filters sessions by module case-insensitively", () => {
      const filteredMath = filterSessionsByModule(mockSessions, "мАтем");
      expect(filteredMath.length).toBe(1);
      expect(filteredMath[0].module).toBe("Математический анализ");

      const filteredProg = filterSessionsByModule(mockSessions, "програм");
      expect(filteredProg.length).toBe(1);
      expect(filteredProg[0].module).toBe("Программирование");
    });

    it("returns empty array when no matches found", () => {
      const filtered = filterSessionsByModule(mockSessions, "химия");
      expect(filtered.length).toBe(0);
    });
  });
});
