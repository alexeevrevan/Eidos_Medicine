<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-lg h-10 w-10 text-sm transition',
      variantClass,
      disabled ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-95',
    ]"
    :disabled="disabled"
    type="button"
    @click="$emit('click')"
  >
    <Icon :icon="icon" class="w-5 h-5" />
  </button>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from "vue";
import { Icon } from "@iconify/vue";

const props = withDefaults(
  defineProps<{
    icon: string;
    label?: string;
    variant?: "soft" | "ghost" | "primary";
    disabled?: boolean;
  }>(),
  {
    variant: "soft",
  }
);

defineEmits<{ (e: "click"): void }>();

const variantClass: ComputedRef<string> = computed(() => {
  switch (props.variant) {
    case "ghost":
      return "bg-transparent text-gray-700 hover:bg-gray-100";
    case "primary":
      return "bg-blue-600 text-white";
    default:
      return "bg-gray-100 text-gray-800";
  }
});
</script>
