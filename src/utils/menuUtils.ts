import type { RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/stores/auth";

interface MenuItemMeta {
  showInSidebar?: boolean;
  title?: string;
  icon?: string;
}

interface MenuItem {
  path: string;
  meta: MenuItemMeta;
  name: string;
}

export function getAccessibleMenuItems(routes: RouteRecordRaw[]): MenuItem[] {
  const authStore = useAuthStore();

  return routes
    .filter((rt) => rt.meta && (rt.meta as MenuItemMeta).showInSidebar)
    .map((rt) => ({
      path: rt.path || "/",
      meta: rt.meta as MenuItemMeta,
      name: rt.name as string,
    }))
    .filter((item) => authStore.canAccessRoute(item.name));
}
