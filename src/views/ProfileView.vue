<template>
  <div class="bg-white rounded-xl shadow p-6">
    <h2 class="text-xl font-semibold mb-4">{{ $t("userProfile.title") }}</h2>
    <div v-if="user" class="space-y-2">
      <div>
        <b>{{ $t("userProfile.firstName") }}:</b> {{ user.firstName }}
      </div>
      <div>
        <b>{{ $t("userProfile.lastName") }}:</b> {{ user.lastName }}
      </div>
      <div>
        <b>{{ $t("userProfile.role") }}:</b> {{ user.role }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const { user } = storeToRefs(auth);
</script>
