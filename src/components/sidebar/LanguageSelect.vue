<template>
  <div class="w-full">
    <template v-if="!collapsed">
      <div class="relative">
        <select
          class="w-full appearance-none bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          v-model="lang"
        >
          <option value="ru">Русский</option>
          <option value="pl">Польский</option>
        </select>
        <span
          class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-sm overflow-hidden"
        >
          <img :alt="lang" :src="`https://flagcdn.com/w20/${lang}.png`" />
        </span>
        <Icon
          icon="mdi:chevron-down"
          class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
        />
      </div>
    </template>
    <div v-else class="flex justify-center">
      <span
        class="w-8 h-8 rounded-sm overflow-hidden flex items-center justify-center"
      >
        <img
          :alt="lang"
          :src="`https://flagcdn.com/w40/${lang}.png`"
          class="w-full h-full object-cover"
        />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { storeToRefs } from "pinia";
import { useUiStore } from "@/stores/ui";

const props = defineProps<{ collapsed: boolean }>();

const ui = useUiStore();
const { language } = storeToRefs(ui);
const lang = language;
</script>
