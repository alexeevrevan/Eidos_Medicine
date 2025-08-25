import { defineStore } from "pinia";
import type { User, Role } from "@/types";
import { authService } from "@/services/authService";
import { ROLE_ACCESS } from "@/constants/roleAccess";
import { DEFAULT_ROUTES } from "@/constants/defaultRoutes";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: authService.getCurrentUser() as User | null,
  }),
  getters: {
    isAuthenticated(): boolean {
      return !!this.user;
    },
    userRole(): Role | null {
      return this.user?.role ?? null;
    },
    canAccessRoute() {
      return (routeName: string): boolean => {
        if (!this.user) return false;

        return ROLE_ACCESS[this.user.role].includes(routeName);
      };
    },
    defaultRouteForRole(): string {
      if (!this.user) return "/login";
      return DEFAULT_ROUTES[this.user.role];
    },
  },
  actions: {
    login(user: User) {
      this.user = authService.loginMock(user);
    },
    logout() {
      authService.logout();
      this.user = null;
    },
    redirectToDefaultRoute() {
      return this.defaultRouteForRole;
    },
  },
});
