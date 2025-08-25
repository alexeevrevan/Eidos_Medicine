<template>
  <aside
    class="h-screen bg-white border-r border-gray-100 flex flex-col shrink-0 sticky top-0"
    :style="{
      width: collapsed ? 'var(--sidebar-w-collapsed)' : 'var(--sidebar-w)',
    }"
  >
    <div class="p-4 flex items-center justify-between">
      <Logo :collapsed="collapsed" />
      <SidebarToggle :collapsed="collapsed" @toggle="toggle" />
    </div>

    <nav class="px-3 flex-1 overflow-auto">
      <div class="flex flex-col gap-1">
        <SidebarItem
          v-for="item in accessibleMenuItems"
          :key="item.path"
          :to="item.path"
          :label="item.meta.title as string"
          :icon="item.meta.icon as string"
          :active="item.path === route.path"
          :collapsed="collapsed"
        />
      </div>
    </nav>

    <div class="p-3 flex flex-col gap-3">
      <UserCard
        v-if="user"
        :user="user"
        :collapsed="collapsed"
        @openProfile="goProfile"
      />

      <button
        @click="logout"
        class="flex items-center gap-3 px-3 py-2 rounded-xl text-left hover:bg-gray-100 transition"
        :title="'Выйти'"
      >
        <Icon icon="mdi:logout" class="text-[20px] text-gray-500" />
        <span v-if="!collapsed">Выйти</span>
      </button>
      <LanguageSelect :collapsed="collapsed" />
      <div
        class="text-xs text-gray-400 px-1"
        :class="collapsed ? 'text-center' : ''"
      >
        Версия {{ APP_VERSION }}
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { Icon } from "@iconify/vue";
import Logo from "./Logo.vue";
import SidebarItem from "./SidebarItem.vue";
import SidebarToggle from "./SidebarToggle.vue";
import UserCard from "./UserCard.vue";
import LanguageSelect from "./LanguageSelect.vue";
import { useUiStore } from "@/stores/ui";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";
import { APP_VERSION } from "@/environments/version";

const ui = useUiStore();
const auth = useAuthStore();
const { sidebarCollapsed } = storeToRefs(ui);
const { user } = storeToRefs(auth);

const collapsed = sidebarCollapsed;
const toggle = () => ui.toggleSidebar();

const route = useRoute();
const r = useRouter();

const allMenuItems = computed(() =>
  router
    .getRoutes()
    .filter((rt) => rt.meta?.showInSidebar)
    .map((rt) => ({
      path: rt.path || "/",
      meta: rt.meta,
      name: rt.name as string,
    }))
);

const accessibleMenuItems = computed(() => {
  if (!user.value) return [];

  return allMenuItems.value.filter((item) => auth.canAccessRoute(item.name));
});

const goProfile = () => r.push({ name: "profile" });

const logout = () => {
  auth.logout();
  r.push({ name: "login" });
};
</script>
