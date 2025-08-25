<template>
  <form class="relative" @submit.prevent="$emit('submit')">
    <Icon
      icon="mdi:magnify"
      class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
    />
    <input
      :value="modelValue"
      :placeholder="placeholder"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      class="w-full h-10 pl-10 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      type="text"
    />
    <button
      v-if="modelValue"
      type="button"
      class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      @click="$emit('update:modelValue', '')"
      title="Очистить"
    >
      <Icon icon="mdi:close" class="w-5 h-5" />
    </button>
  </form>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
defineProps<{
  modelValue: string;
  placeholder?: string;
}>();
defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "submit"): void;
}>();
</script>
