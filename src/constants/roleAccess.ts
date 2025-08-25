import type { Role } from "@/types";

export const ROLE_ACCESS: Record<Role, readonly string[]> = {
  Преподаватель: [
    "schedule",
    "sessions",
    "rooms",
    "users",
    "groups",
    "devices",
    "profile",
    "settings",
    "archive",
  ],
  Админ: ["settings", "archive"],
  Пользователь: ["schedule"],
} as const;
