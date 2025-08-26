import { describe, it, expect } from "vitest";
import { getInitials } from "./avatar";

describe("getInitials", () => {
  it("returns correct initials for full name", () => {
    expect(getInitials("Иван", "Иванов")).toBe("ИИ");
    expect(getInitials("Петр", "Петров")).toBe("ПП");
  });

  it("converts initials to uppercase", () => {
    expect(getInitials("иван", "иванов")).toBe("ИИ");
  });

  it("handles empty or undefined inputs", () => {
    expect(getInitials("", "")).toBe("");
    expect(getInitials("Иван", "")).toBe("И");
    expect(getInitials("", "Иванов")).toBe("И");
  });

  it("handles null inputs", () => {
    expect(getInitials(null as any, null as any)).toBe("");
    expect(getInitials("Иван", null as any)).toBe("И");
    expect(getInitials(null as any, "Иванов")).toBe("И");
  });

  it("works with single-character names", () => {
    expect(getInitials("А", "Б")).toBe("АБ");
  });

  it("works with different character sets", () => {
    expect(getInitials("John", "Doe")).toBe("JD");
    expect(getInitials("Иван", "Smith")).toBe("ИS");
  });
});
