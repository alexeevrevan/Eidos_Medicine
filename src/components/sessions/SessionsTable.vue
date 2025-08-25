<template>
  <div class="border rounded-lg overflow-hidden flex-1 flex flex-col">
    <div
      class="grid grid-cols-[240px_140px_1fr_160px_220px_140px] bg-gray-50 text-gray-700 font-bold text-sm px-4 py-2.5 border-b"
    >
      <button
        class="text-left hover:text-gray-900 flex items-center gap-1"
        @click="$emit('toggle-sort')"
      >
        {{ $t("sessionsTable.dateTime") }}
        <span v-if="sort.key === 'date'">
          {{ sort.dir === "asc" ? "▲" : "▼" }}
        </span>
      </button>
      <div>{{ $t("sessionsTable.status") }}</div>
      <div>{{ $t("sessionsTable.moduleName") }}</div>
      <div>{{ $t("sessionsTable.sessionType") }}</div>
      <div>{{ $t("sessionsTable.room") }}</div>
      <div>{{ $t("sessionsTable.users") }}</div>
    </div>

    <div class="overflow-y-auto" style="max-height: 520px">
      <div
        v-for="row in rows"
        :key="row.id"
        class="grid grid-cols-[240px_140px_1fr_160px_220px_140px] items-center px-4 py-2 border-b hover:bg-gray-50"
      >
        <div class="text-xs text-gray-900">
          {{ formatDateRange(row.start, row.end) }}
        </div>
        <div>
          <UiBadge :color="getStatusColor(row.status.name)" class="text-xs">
            {{ getStatusLabel(row.status.name) }}
          </UiBadge>
        </div>
        <div class="text-xs text-gray-900">
          {{ row.module }}
        </div>
        <div class="text-xs text-gray-700">
          {{ getTypeLabel(row.type.name) }}
        </div>
        <div
          class="text-xs text-gray-700 truncate"
          :title="row.rooms.map((r) => r.name).join(', ')"
        >
          {{ row.rooms.map((r) => r.name).join(", ") }}
        </div>
        <div
          class="text-xs text-gray-700 truncate"
          :title="row.users.map((u) => u.name).join(', ')"
        >
          {{ row.users.map((u) => u.name).join(", ") }}
        </div>
      </div>

      <div
        v-if="rows.length === 0"
        class="text-center text-gray-500 py-4 text-xs"
      >
        {{ $t("sessionsTable.noData") }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { Session } from "@/types/sessions";
import UiBadge from "@/components/ui/UIBadge.vue";
import { formatDateRange } from "@/utils/formatters";
import { getStatusColor, getStatusLabel, getTypeLabel } from "@/utils/mappers";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps<{
  rows: Session[];
  sort: {
    key: string | null;
    dir: "asc" | "desc";
  };
}>();

defineEmits(["toggle-sort"]);
</script>
