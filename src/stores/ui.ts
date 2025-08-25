import { defineStore } from "pinia";

interface State {
  sidebarCollapsed: boolean;
  language: "ru";
}

export const useUiStore = defineStore("ui", {
  state: (): State => ({
    sidebarCollapsed: false,
    language: "ru",
  }),
  actions: {
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },
    setLanguage(lang: "ru") {
      this.language = lang;
    },
  },
});
