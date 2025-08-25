import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
    meta: {
      layout: "empty",
      requiresAuth: false,
    },
  },
  {
    path: "/",
    component: () => import("@/layouts/DashboardLayout.vue"),
    redirect: "/schedule",
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/schedule",
        name: "schedule",
        component: () => import("@/views/ScheduleView.vue"),
        meta: {
          title: "Расписание",
          icon: "mdi:calendar-outline",
          showInSidebar: true,
        },
      },
      {
        path: "/sessions",
        name: "sessions",
        component: () => import("@/views/SessionsView.vue"),
        meta: {
          title: "Учебные сессии",
          icon: "mdi:school-outline",
          showInSidebar: true,
        },
      },
      {
        path: "/rooms",
        name: "rooms",
        component: () => import("@/views/RoomsView.vue"),
        meta: {
          title: "Список комнат",
          icon: "mdi:office-building-outline",
          showInSidebar: true,
        },
      },
      {
        path: "/users",
        name: "users",
        component: () => import("@/views/SessionsView.vue"),
        meta: {
          title: "Пользователи",
          icon: "mdi:account-outline",
          showInSidebar: true,
        },
      },
      {
        path: "/groups",
        name: "groups",
        component: () => import("@/views/GroupsView.vue"),
        meta: {
          title: "Учебные группы",
          icon: "mdi:account-multiple-outline",
          showInSidebar: true,
        },
      },
      {
        path: "/devices",
        name: "devices",
        component: () => import("@/views/DevicesView.vue"),
        meta: {
          title: "Список устройств",
          icon: "mdi:devices",
          showInSidebar: true,
        },
      },
      {
        path: "/settings",
        name: "settings",
        component: () => import("@/views/SettingsView.vue"),
        meta: {
          title: "Настройки системы",
          icon: "mdi:cog-outline",
          showInSidebar: true,
        },
      },
      {
        path: "/archive",
        name: "archive",
        component: () => import("@/views/ArchiveView.vue"),
        meta: {
          title: "Архив",
          icon: "mdi:archive-outline",
          showInSidebar: true,
        },
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("@/views/ProfileView.vue"),
        meta: { title: "Профиль" },
      },
    ],
  },
];
