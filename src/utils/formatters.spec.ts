import { describe, it, expect } from "vitest";
import { formatDateRange } from "./formatters";

describe("formatDateRange", () => {
  it("formats date range correctly", () => {
    const result = formatDateRange(
      "2023-10-15T14:30:00",
      "2023-10-15T16:45:00"
    );
    expect(result).toBe("15.10.2023, 14:30 - 16:45");
  });

  it("handles date range across different days", () => {
    const result = formatDateRange(
      "2023-10-15T22:30:00",
      "2023-10-16T01:45:00"
    );
    expect(result).toBe("15.10.2023, 22:30 - 01:45");
  });

  it("pads single-digit numbers with zero", () => {
    const result = formatDateRange(
      "2023-10-05T08:05:00",
      "2023-10-05T09:07:00"
    );
    expect(result).toBe("05.10.2023, 08:05 - 09:07");
  });

  it("handles midnight and noon", () => {
    const result = formatDateRange(
      "2023-10-15T00:00:00",
      "2023-10-15T12:00:00"
    );
    expect(result).toBe("15.10.2023, 00:00 - 12:00");
  });

  it("works correctly at year end", () => {
    const result = formatDateRange(
      "2023-12-31T23:30:00",
      "2024-01-01T00:30:00"
    );
    expect(result).toBe("31.12.2023, 23:30 - 00:30");
  });

  it("handles leap year correctly", () => {
    const result = formatDateRange(
      "2024-02-28T22:30:00",
      "2024-02-29T01:45:00"
    );
    expect(result).toBe("28.02.2024, 22:30 - 01:45");
  });
});
