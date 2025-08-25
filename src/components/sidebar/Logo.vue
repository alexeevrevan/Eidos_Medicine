<template>
  <div class="flex items-center gap-2">
    <img
      src="@/assets/icons/logo.svg"
      :alt="$t('logo.alt')"
      :class="collapsed ? 'w-8 h-8' : 'w-12 h-12'"
    />
    <span v-if="!collapsed" class="font-semibold text-lg">
      {{ $t("logo.title") }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ collapsed: boolean }>();
</script>
