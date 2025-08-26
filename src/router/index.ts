import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { ROLE_ACCESS } from "@/constants/roleAccess";
import { DEFAULT_ROUTES } from "@/constants/defaultRoutes";
import { routes } from "@/constants/routes";
import { Role } from "@/types";

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated: boolean = authStore.isAuthenticated;
  const userRole: Role | undefined = authStore.user?.role;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
    return;
  }

  if (isAuthenticated && userRole) {
    if (to.meta.requiresAuth) {
      const routeName = to.name as string;

      if (userRole === "Преподаватель") {
        next();
        return;
      }

      const hasAccess: boolean = ROLE_ACCESS[userRole].includes(routeName);

      if (!hasAccess) {
        const defaultRoute = DEFAULT_ROUTES[userRole];
        next({ path: defaultRoute });
        return;
      }
    }
  }

  next();
});

export default router;
