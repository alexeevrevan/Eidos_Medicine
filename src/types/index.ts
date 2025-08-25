export type Role = "Преподаватель" | "Админ" | "Пользователь";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: Role;
}
