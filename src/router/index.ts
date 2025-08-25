import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { ROLE_ACCESS } from "@/constants/roleAccess";
import { DEFAULT_ROUTES } from "@/constants/defaultRoutes";
import { routes } from "@/constants/routes";

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;
  const userRole = authStore.user?.role;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
    return;
  }

  if (isAuthenticated && userRole) {
    if (to.meta.requiresAuth) {
      const routeName = to.name as keyof typeof ROLE_ACCESS;

      if (userRole === "Преподаватель") {
        next();
        return;
      }

      const hasAccess = ROLE_ACCESS[userRole].includes(routeName);

      if (!hasAccess) {
        next({ name: DEFAULT_ROUTES[userRole] });
        return;
      }
    }
  }

  if (to.name === "login" && isAuthenticated) {
    next("/schedule");
    return;
  }

  next();
});

export default router;
