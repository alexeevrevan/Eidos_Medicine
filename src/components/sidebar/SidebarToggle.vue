<template>
  <button
    @click="$emit('toggle')"
    class="w-7 h-7 rounded-full bg-black shadow flex items-center justify-center transition absolute -right-3.5 top-30"
    :title="collapsed ? 'Развернуть' : 'Свернуть'"
  >
    <Icon
      :icon="collapsed ? 'mdi:chevron-right' : 'mdi:chevron-left'"
      class="text-white"
    />
  </button>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{ collapsed: boolean }>();
defineEmits<{ (e: "toggle"): void }>();
</script>
