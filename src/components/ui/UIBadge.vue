<template>
  <span
    :class="[
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
      colorClass,
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  color?: "gray" | "blue" | "yellow" | "green" | "red" | string;
}>();

const colorClass = computed(() => {
  switch (props.color) {
    case "blue":
      return "bg-[#AFBFF5] text-[#2F3144] border-[#AFBFF5]";
    case "yellow":
      return "bg-yellow-50 text-[#2F3144] border-yellow-200";
    case "green":
      return "bg-[#91C893] text-[#2F3144] border-[#91C893]";
    case "red":
      return "bg-[#F56565] text-[#2F3144] border-[#F56565]";
    case "gray":
      return "bg-gray-100 text-[#2F3144] border-gray-200";
    default:
      return "bg-gray-100 text-[#2F3144] border-gray-200";
  }
});
</script>
