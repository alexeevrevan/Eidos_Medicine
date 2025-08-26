<template>
  <div class="bg-white rounded-xl shadow p-4 flex flex-col h-full">
    <SessionsHeader
      @search="onSearch"
      @open-filters="onOpenFilters"
      @open-sort="onOpenSort"
      @create="onCreate"
    />

    <SessionsTable :rows="pagedRows" :sort="sort" @toggle-sort="toggleSort" />

    <div class="pt-4">
      <UiPagination
        v-model:page="page"
        :total="filteredRows.length"
        :page-size="pageSize"
        @change="onPageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  getSessions,
  sortSessionsByDate,
  paginateSessions,
  filterSessionsByModule,
} from "@/services/sessions";
import type { SortConfig } from "@/types/sessions";

import SessionsHeader from "@/components/sessions/SessionsHeader.vue";
import SessionsTable from "@/components/sessions/SessionsTable.vue";
import UiPagination from "@/components/ui/UIPagination.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const rows = ref(getSessions());
const page = ref(1);
const pageSize = ref(25);
const search = ref("");

const sort = ref<SortConfig>({
  key: "date",
  dir: "desc",
});

const sortedRows = computed(() =>
  sortSessionsByDate(rows.value, sort.value.dir)
);

const filteredRows = computed(() =>
  filterSessionsByModule(sortedRows.value, search.value)
);

const pagedRows = computed(() =>
  paginateSessions(filteredRows.value, page.value, pageSize.value)
);

function toggleSort() {
  sort.value = {
    key: "date",
    dir: sort.value.dir === "asc" ? "desc" : "asc",
  };
}

function onPageChange({ page: p }: { page: number }) {
  page.value = p;
}

function onSearch(query: string) {
  search.value = query;
  page.value = 1;
}

function onOpenFilters() {
  console.log(t("sessions.openFilters"));
}

function onOpenSort() {
  console.log(t("sessions.openSort"));
}

function onCreate() {
  console.log(t("sessions.create"));
}
</script>
