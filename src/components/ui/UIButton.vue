<template>
  <button
    :class="[
      'inline-flex items-center gap-2 rounded-lg px-5 h-10 text-sm font-medium transition',
      variantClass,
      disabled ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-95',
    ]"
    :disabled="disabled"
    type="button"
    @click="$emit('click')"
  >
    <Icon v-if="icon" :icon="icon" class="w-5 h-5" />
    <span>{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps<{
  label: string;
  icon?: string;
  variant?: "primary" | "soft" | "ghost";
  disabled?: boolean;
}>();

defineEmits<{ (e: "click"): void }>();

const variantClass = computed(() => {
  switch (props.variant) {
    case "soft":
      return "bg-blue-50 text-blue-700";
    case "ghost":
      return "bg-transparent text-gray-700";
    default:
      return "bg-blue-600 text-white";
  }
});
</script>
