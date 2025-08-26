<template>
  <div class="flex items-center justify-between bg-white">
    <div class="inline-flex items-center gap-1">
      <button
        class="px-2 h-9 border rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        :disabled="page <= 1"
        @click="setPage(page - 1)"
        title="Назад"
      >
        <Icon icon="mdi:chevron-left" class="w-5 h-5" />
      </button>

      <div class="flex items-center gap-1">
        <button
          v-for="p in pages"
          :key="p"
          class="min-w-[36px] h-9 px-2 rounded-lg border text-sm"
          :class="
            p === page
              ? 'bg-blue-600 text-white border-blue-600'
              : 'hover:bg-gray-50 border-gray-300 text-gray-700'
          "
          @click="setPage(p)"
        >
          {{ p }}
        </button>
      </div>

      <button
        class="px-2 h-9 border rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        :disabled="page >= totalPages"
        @click="setPage(page + 1)"
        title="Вперед"
      >
        <Icon icon="mdi:chevron-right" class="w-5 h-5" />
      </button>
    </div>

    <div class="flex items-center gap-2 text-sm">
      <span class="text-gray-500">Всего: {{ total }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps<{
  page: number;
  total: number;
}>();

const emit = defineEmits<{
  (e: "update:page", value: number): void;
  (e: "change", payload: { page: number }): void;
}>();

const pageSize: number = 25;
const totalPages: ComputedRef<number> = computed(() =>
  Math.max(1, Math.ceil(props.total / pageSize))
);

const pages: ComputedRef<number[]> = computed(() =>
  Array.from({ length: totalPages.value }, (_, i) => i + 1)
);

function setPage(p: number) {
  const safe: number = Math.min(Math.max(1, p), totalPages.value);
  emit("update:page", safe);
  emit("change", { page: safe });
}
</script>
