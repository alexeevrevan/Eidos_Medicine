<template>
  <div class="p-3 flex flex-col gap-3">
    <UserCard
      v-if="user"
      :user="user"
      :collapsed="collapsed"
      @openProfile="goProfile"
    />

    <button
      @click="logout"
      class="flex items-center gap-3 px-3 py-2 rounded-xl text-left hover:bg-gray-100 transition"
      :title="'Выйти'"
    >
      <Icon icon="mdi:logout" class="text-[20px] text-gray-500" />
      <span v-if="!collapsed">Выйти</span>
    </button>

    <LanguageSelect :collapsed="collapsed" />

    <div
      class="text-xs text-gray-400 px-1"
      :class="collapsed ? 'text-center' : ''"
    >
      Версия {{ APP_VERSION }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import UserCard from "./UserCard.vue";
import LanguageSelect from "./LanguageSelect.vue";
import { APP_VERSION } from "@/environments/version";

const auth = useAuthStore();
const router = useRouter();

const { user } = storeToRefs(auth);

const props = defineProps<{
  collapsed: boolean;
}>();

const goProfile = () => router.push({ name: "profile" });

const logout = () => {
  auth.logout();
  router.push({ name: "login" });
};
</script>
