import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useUiStore } from "./ui";

describe("UiStore", () => {
  let store: ReturnType<typeof useUiStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useUiStore();
  });

  describe("Initial State", () => {
    it("initializes with default values", () => {
      expect(store.sidebarCollapsed).toBe(false);
      expect(store.language).toBe("ru");
    });
  });

  describe("Actions", () => {
    describe("toggleSidebar", () => {
      it("toggles sidebar state", () => {
        expect(store.sidebarCollapsed).toBe(false);

        store.toggleSidebar();
        expect(store.sidebarCollapsed).toBe(true);

        store.toggleSidebar();
        expect(store.sidebarCollapsed).toBe(false);
      });
    });

    describe("setLanguage", () => {
      it("sets language", () => {
        expect(store.language).toBe("ru");

        store.setLanguage("ru");
        expect(store.language).toBe("ru");
      });
    });
  });

  describe("Multiple State Changes", () => {
    it("allows sequential state changes", () => {
      expect(store.sidebarCollapsed).toBe(false);

      store.toggleSidebar();
      expect(store.sidebarCollapsed).toBe(true);

      store.setLanguage("ru");
      expect(store.language).toBe("ru");
      expect(store.sidebarCollapsed).toBe(true);
    });
  });
});
