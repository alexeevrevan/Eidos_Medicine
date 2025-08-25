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
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          :label="item.meta.title || ''"
          :icon="item.meta.icon || ''"
          :active="item.path === route.path"
          :collapsed="collapsed"
        />
      </div>
    </nav>

    <SidebarFooter :collapsed="collapsed" />
  </aside>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import Logo from "./Logo.vue";
import SidebarItem from "./SidebarItem.vue";
import SidebarToggle from "./SidebarToggle.vue";
import SidebarFooter from "./SidebarFooter.vue";
import { useUiStore } from "@/stores/ui";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";
import { getAccessibleMenuItems } from "@/utils/menuUtils";

const ui = useUiStore();
const { sidebarCollapsed } = storeToRefs(ui);

const collapsed = sidebarCollapsed;
const toggle = () => ui.toggleSidebar();

const route = useRoute();

const menuItems = computed(() => getAccessibleMenuItems(router.getRoutes()));
</script>
