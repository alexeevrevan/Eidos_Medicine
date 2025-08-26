import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
    meta: {
      layout: "empty",
      requiresAuth: false,
      title: "routes.login",
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
          title: "routes.schedule",
          icon: "mdi:calendar-outline",
          showInSidebar: true,
        },
      },
      {
        path: "/sessions",
        name: "sessions",
        component: () => import("@/views/SessionsView.vue"),
        meta: {
          title: "routes.sessions",
          icon: "mdi:school-outline",
          showInSidebar: true,
        },
      },
      {
        path: "/rooms",
        name: "rooms",
        component: () => import("@/views/RoomsView.vue"),
        meta: {
          title: "routes.rooms",
          icon: "mdi:office-building-outline",
          showInSidebar: true,
        },
      },
      {
        path: "/users",
        name: "users",
        component: () => import("@/views/UsersView.vue"),
        meta: {
          title: "routes.users",
          icon: "mdi:account-outline",
          showInSidebar: true,
        },
      },
      {
        path: "/groups",
        name: "groups",
        component: () => import("@/views/GroupsView.vue"),
        meta: {
          title: "routes.groups",
          icon: "mdi:account-multiple-outline",
          showInSidebar: true,
        },
      },
      {
        path: "/devices",
        name: "devices",
        component: () => import("@/views/DevicesView.vue"),
        meta: {
          title: "routes.devices",
          icon: "mdi:devices",
          showInSidebar: true,
        },
      },
      {
        path: "/settings",
        name: "settings",
        component: () => import("@/views/SettingsView.vue"),
        meta: {
          title: "routes.settings",
          icon: "mdi:cog-outline",
          showInSidebar: true,
        },
      },
      {
        path: "/archive",
        name: "archive",
        component: () => import("@/views/ArchiveView.vue"),
        meta: {
          title: "routes.archive",
          icon: "mdi:archive-outline",
          showInSidebar: true,
        },
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("@/views/ProfileView.vue"),
        meta: {
          title: "routes.profile",
        },
      },
    ],
  },
];
