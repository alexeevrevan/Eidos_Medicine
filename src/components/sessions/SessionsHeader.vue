<template>
  <div class="mb-2">
    <div class="flex items-center gap-2">
      <h1 class="text-xl font-bold mr-auto">Учебные сессии</h1>

      <UiSearchInput
        v-model="searchText"
        placeholder="Поиск"
        class="w-56"
        @submit.prevent="onSearch"
      />

      <UiIconButton
        icon="mdi:filter-variant"
        variant="soft"
        @click="$emit('open-filters')"
      />
      <UiIconButton
        icon="mdi:sort"
        variant="soft"
        @click="$emit('open-sort')"
      />

      <UiButton label="Создать" @click="$emit('create')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import UiSearchInput from "@/components/ui/UISearchInput.vue";
import UiIconButton from "@/components/ui/UIIconButton.vue";
import UiButton from "@/components/ui/UIButton.vue";

const searchText = ref("");

const emit = defineEmits(["search", "open-filters", "open-sort", "create"]);

function onSearch() {
  emit("search", searchText.value);
}
</script>
