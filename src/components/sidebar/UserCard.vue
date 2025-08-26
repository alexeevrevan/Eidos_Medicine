<template>
  <button
    class="w-full text-left bg-white rounded-2xl shadow p-3 flex items-center gap-3 hover:shadow-md transition"
    @click="$emit('openProfile')"
  >
    <template v-if="!collapsed">
      <div class="flex-1">
        <div class="font-medium leading-tight">{{ fullName }}</div>
        <div class="text-xs text-gray-500">{{ role }}</div>
      </div>
      <div
        class="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold"
      >
        {{ initials }}
      </div>
    </template>
    <template v-else>
      <div
        class="w-9 h-9 rounded-full text-black flex items-center justify-center text-sm font-semibold self-center mx-auto"
      >
        {{ initials }}
      </div>
    </template>
  </button>
</template>

<script setup lang="ts">
import type { Role, User } from "@/types";
import { computed, ComputedRef } from "vue";
import { getInitials } from "@/utils/avatar";

const props = defineProps<{
  user: User;
  collapsed?: boolean;
}>();

defineEmits<{ (e: "openProfile"): void }>();

const fullName: ComputedRef<string> = computed(
  () => `${props.user.firstName} ${props.user.lastName}`
);

const role: ComputedRef<Role> = computed(() => props.user.role);

const initials: ComputedRef<string> = computed(() =>
  getInitials(props.user.firstName, props.user.lastName)
);
</script>
