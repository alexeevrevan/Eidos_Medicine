<template>
  <form class="relative" @submit.prevent="handleSubmit">
    <Icon
      icon="mdi:magnify"
      class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
    />
    <input
      :value="modelValue"
      :placeholder="placeholder"
      @input="handleInput"
      class="w-full h-10 pl-10 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      type="text"
    />
    <button
      v-if="modelValue"
      type="button"
      class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      @click="clearInput"
    >
      <Icon icon="mdi:close" class="w-5 h-5" />
    </button>
  </form>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "submit"): void;
}>();

function handleInput(event: Event): void {
  const input = event.target as HTMLInputElement;
  emit("update:modelValue", input.value);
}

function handleSubmit(event: Event): void {
  event.preventDefault();
  emit("submit");
}

function clearInput(): void {
  emit("update:modelValue", "");
}
</script>
