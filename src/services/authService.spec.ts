import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { authService } from "./authService";
import type { User } from "@/types";

describe("authService", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  const mockUser: User = {
    id: "1",
    firstName: "Иван",
    lastName: "Иванов",
    role: "Преподаватель",
  };

  describe("getCurrentUser", () => {
    it("returns null when no user is stored", () => {
      const user = authService.getCurrentUser();
      expect(user).toBeNull();
    });

    it("returns stored user when valid JSON is present", () => {
      localStorage.setItem("demo_auth_user", JSON.stringify(mockUser));

      const user = authService.getCurrentUser();
      expect(user).toEqual(mockUser);
    });

    it("returns null when localStorage contains invalid JSON", () => {
      localStorage.setItem("demo_auth_user", "{invalid json}");

      const user = authService.getCurrentUser();
      expect(user).toBeNull();
    });
  });

  describe("loginMock", () => {
    it("stores user in localStorage", () => {
      const returnedUser = authService.loginMock(mockUser);

      expect(returnedUser).toEqual(mockUser);

      const storedUser = JSON.parse(
        localStorage.getItem("demo_auth_user") || "{}"
      );
      expect(storedUser).toEqual(mockUser);
    });
  });

  describe("logout", () => {
    it("removes user from localStorage", () => {
      authService.loginMock(mockUser);

      authService.logout();

      expect(localStorage.getItem("demo_auth_user")).toBeNull();
    });
  });
});
