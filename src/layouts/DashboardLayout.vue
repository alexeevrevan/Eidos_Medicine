<template>
  <div class="min-h-screen w-full flex bg-gray-50">
    <Sidebar />
    <main class="flex-1 p-6">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "@/components/sidebar/Sidebar.vue";
</script>
