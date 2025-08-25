<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <component :is="layout" :key="$route.path">
          <component :is="Component" />
        </component>
      </template>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import DashboardLayout from "@/layouts/DashboardLayout.vue";

const route = useRoute();

const layout = computed(() => {
  return route.meta.layout === "empty" ? "div" : DashboardLayout;
});
</script>
