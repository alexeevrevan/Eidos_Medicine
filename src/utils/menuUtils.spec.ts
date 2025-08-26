import { describe, it, expect, vi } from "vitest";
import { getAccessibleMenuItems } from "./menuUtils";
import type { RouteRecordRaw } from "vue-router";

vi.mock("@/stores/auth", () => ({
  useAuthStore: () => ({
    canAccessRoute: (routeName: string) => {
      const accessMap: Record<string, boolean> = {
        dashboard: true,
        profile: true,
        admin: false,
        forbidden: false,
      };
      return accessMap[routeName] || false;
    },
  }),
}));

describe("getAccessibleMenuItems", () => {
  const mockRoutes: RouteRecordRaw[] = [
    {
      path: "/dashboard",
      name: "dashboard",
      meta: {
        showInSidebar: true,
        title: "Dashboard",
        icon: "dashboard-icon",
      },
      component: () => {},
    },
    {
      path: "/profile",
      name: "profile",
      meta: {
        showInSidebar: true,
        title: "Profile",
        icon: "profile-icon",
      },
      component: () => {},
    },
    {
      path: "/admin",
      name: "admin",
      meta: {
        showInSidebar: true,
        title: "Admin",
        icon: "admin-icon",
      },
      component: () => {},
    },
    {
      path: "/forbidden",
      name: "forbidden",
      meta: {
        showInSidebar: true,
        title: "Forbidden",
        icon: "forbidden-icon",
      },
      component: () => {},
    },
    {
      path: "/hidden",
      name: "hidden",
      meta: {
        showInSidebar: false,
        title: "Hidden",
        icon: "hidden-icon",
      },
      component: () => {},
    },
  ];

  it("returns only accessible menu items with sidebar visibility", () => {
    const menuItems = getAccessibleMenuItems(mockRoutes);

    expect(menuItems.length).toBe(2);

    // Проверяем корректность возвращаемых элементов
    expect(menuItems).toEqual([
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          showInSidebar: true,
          title: "Dashboard",
          icon: "dashboard-icon",
        },
      },
      {
        path: "/profile",
        name: "profile",
        meta: {
          showInSidebar: true,
          title: "Profile",
          icon: "profile-icon",
        },
      },
    ]);
  });

  it("filters out items without sidebar meta", () => {
    const routesWithoutSidebarMeta: RouteRecordRaw[] = [
      {
        path: "/test",
        name: "test",
        component: () => {},
      },
    ];

    const menuItems = getAccessibleMenuItems(routesWithoutSidebarMeta);

    expect(menuItems.length).toBe(0);
  });

  it("handles empty routes array", () => {
    const menuItems = getAccessibleMenuItems([]);

    expect(menuItems.length).toBe(0);
  });
});
