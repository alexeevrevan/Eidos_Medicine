import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useAuthStore } from "./auth";
import { authService } from "@/services/authService";
import { ROLE_ACCESS } from "@/constants/roleAccess";
import { DEFAULT_ROUTES } from "@/constants/defaultRoutes";
import type { User } from "@/types";

vi.mock("@/services/authService", () => ({
  authService: {
    getCurrentUser: vi.fn(),
    loginMock: vi.fn(),
    logout: vi.fn(),
  },
}));

describe("AuthStore", () => {
  let store: ReturnType<typeof useAuthStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useAuthStore();
  });

  const mockTeacherUser: User = {
    id: "1",
    firstName: "Иван",
    lastName: "Иванов",
    role: "Преподаватель",
  };

  const mockAdminUser: User = {
    id: "2",
    firstName: "Администратор",
    lastName: "Системы",
    role: "Админ",
  };

  describe("Getters", () => {
    describe("isAuthenticated", () => {
      it("returns true when user is present", () => {
        store.user = mockTeacherUser;
        expect(store.isAuthenticated).toBe(true);
      });

      it("returns false when user is null", () => {
        store.user = null;
        expect(store.isAuthenticated).toBe(false);
      });
    });

    describe("userRole", () => {
      it("returns user role when user is present", () => {
        store.user = mockTeacherUser;
        expect(store.userRole).toBe("Преподаватель");
      });

      it("returns null when user is null", () => {
        store.user = null;
        expect(store.userRole).toBeNull();
      });
    });

    describe("canAccessRoute", () => {
      it("returns false when user is not authenticated", () => {
        store.user = null;
        expect(store.canAccessRoute("dashboard")).toBe(false);
      });

      it("correctly checks route access for different roles", () => {
        store.user = mockTeacherUser;
        ROLE_ACCESS["Преподаватель"].forEach((route) => {
          expect(store.canAccessRoute(route)).toBe(true);
        });

        expect(store.canAccessRoute("admin-panel")).toBe(false);

        store.user = mockAdminUser;
        ROLE_ACCESS["Админ"].forEach((route) => {
          expect(store.canAccessRoute(route)).toBe(true);
        });
      });
    });

    describe("defaultRouteForRole", () => {
      it("returns login route when user is not authenticated", () => {
        store.user = null;
        expect(store.defaultRouteForRole).toBe("/login");
      });

      it("returns correct default route for each role", () => {
        store.user = mockTeacherUser;
        expect(store.defaultRouteForRole).toBe(DEFAULT_ROUTES["Преподаватель"]);

        store.user = mockAdminUser;
        expect(store.defaultRouteForRole).toBe(DEFAULT_ROUTES["Админ"]);
      });
    });
  });

  describe("Actions", () => {
    describe("login", () => {
      it("sets user from authService", () => {
        vi.mocked(authService.loginMock).mockReturnValue(mockTeacherUser);

        store.login(mockTeacherUser);

        expect(authService.loginMock).toHaveBeenCalledWith(mockTeacherUser);
        expect(store.user).toEqual(mockTeacherUser);
      });
    });

    describe("logout", () => {
      it("clears user and calls authService logout", () => {
        store.user = mockTeacherUser;

        store.logout();
        expect(authService.logout).toHaveBeenCalled();
        expect(store.user).toBeNull();
      });
    });

    describe("redirectToDefaultRoute", () => {
      it("returns default route for user role", () => {
        store.user = mockTeacherUser;
        expect(store.redirectToDefaultRoute()).toBe(
          DEFAULT_ROUTES["Преподаватель"]
        );

        store.user = mockAdminUser;
        expect(store.redirectToDefaultRoute()).toBe(DEFAULT_ROUTES["Админ"]);
      });
    });
  });
});
