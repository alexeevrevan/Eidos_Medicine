import type { User } from "@/types";

const LS_KEY = "demo_auth_user";

export const authService = {
  getCurrentUser(): User | null {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  },
  loginMock(user: User): User {
    localStorage.setItem(LS_KEY, JSON.stringify(user));
    return user;
  },
  logout(): void {
    localStorage.removeItem(LS_KEY);
  },
};
