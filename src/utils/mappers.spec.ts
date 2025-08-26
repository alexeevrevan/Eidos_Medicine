import { describe, it, expect, vi } from "vitest";
import { getStatusColor, getStatusLabel, getTypeLabel } from "./mappers";

vi.mock("vue-i18n", () => ({
  useI18n: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "statuses.planned": "Запланировано",
        "statuses.in_progress": "В процессе",
        "statuses.finished": "Завершено",
        "statuses.canceled": "Отменено",
        "statuses.completed": "Выполнено",
        "types.accreditation": "Аккредитация",
        "types.lesson": "Занятие",
        "types.exam": "Экзамен",
      };
      return translations[key] || key;
    },
  }),
}));

describe("Status Mappers", () => {
  describe("getStatusColor", () => {
    it("returns correct color for known statuses", () => {
      expect(getStatusColor("planned")).toBe("blue");
      expect(getStatusColor("in_progress")).toBe("yellow");
      expect(getStatusColor("finished")).toBe("green");
      expect(getStatusColor("canceled")).toBe("red");
      expect(getStatusColor("completed")).toBe("green");
    });

    it("returns gray for unknown status", () => {
      expect(getStatusColor("unknown")).toBe("gray");
    });
  });

  describe("getStatusLabel", () => {
    it("returns translated label for known statuses", () => {
      expect(getStatusLabel("planned")).toBe("Запланировано");
      expect(getStatusLabel("in_progress")).toBe("В процессе");
      expect(getStatusLabel("finished")).toBe("Завершено");
      expect(getStatusLabel("canceled")).toBe("Отменено");
      expect(getStatusLabel("completed")).toBe("Выполнено");
    });

    it("returns original status for unknown status", () => {
      expect(getStatusLabel("unknown")).toBe("unknown");
    });
  });

  describe("getTypeLabel", () => {
    it("returns translated label for known types", () => {
      expect(getTypeLabel("accreditation")).toBe("Аккредитация");
      expect(getTypeLabel("lesson")).toBe("Занятие");
      expect(getTypeLabel("exam")).toBe("Экзамен");
    });

    it("returns original type for unknown type", () => {
      expect(getTypeLabel("unknown")).toBe("unknown");
    });
  });
});
