<template>
  <router-link
    :to="to"
    class="group flex items-center gap-3 px-3 py-2 rounded-xl transition select-none"
    :class="[
      active
        ? 'bg-[#3761F3] text-white font-semibold'
        : 'text-gray-700 hover:bg-gray-100',
    ]"
  >
    <Icon
      :icon="icon"
      class="text-[20px]"
      :class="active ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'"
    />
    <span
      v-if="!collapsed"
      class="truncate"
      :class="active ? 'font-semibold' : ''"
    >
      {{ label }}
    </span>
  </router-link>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{
  to: string;
  icon: string;
  label: string;
  active: boolean;
  collapsed: boolean;
}>();
</script>
