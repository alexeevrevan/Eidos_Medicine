<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md">
      <form
        @submit.prevent="onSubmit"
        class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <h2 class="text-2xl font-bold mb-6 text-center">
          {{ $t("login.title") }}
        </h2>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            {{ $t("login.firstName") }}
            <input
              v-model="firstName"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            {{ $t("login.lastName") }}
            <input
              v-model="lastName"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            {{ $t("login.role") }}
            <select
              v-model="role"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option v-for="roleOption in roleOptions" :key="roleOption">
                {{ roleOption }}
              </option>
            </select>
          </label>
        </div>

        <div class="flex items-center justify-center">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {{ $t("login.submit") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import type { Role } from "@/types";

const firstName: Ref<string, string> = ref("Иван");
const lastName: Ref<string, string> = ref("Петров");
const role: Ref<Role, Role> = ref<Role>("Преподаватель");

const roleOptions: Role[] = ["Преподаватель", "Админ", "Пользователь"];

const auth = useAuthStore();
const router = useRouter();

const onSubmit = (): void => {
  auth.login({
    id: crypto.randomUUID(),
    firstName: firstName.value,
    lastName: lastName.value,
    role: role.value,
  });
  router.push({ name: "schedule" });
};
</script>
