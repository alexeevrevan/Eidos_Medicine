import type { Role } from "@/types";

export const DEFAULT_ROUTES: Record<Role, string> = {
  Преподаватель: "/schedule",
  Админ: "/settings",
  Пользователь: "/schedule",
} as const;
