import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";

import ruLocale from "./locales/ru.json";

const i18n = createI18n({
  locale: "ru",
  fallbackLocale: "ru",
  messages: {
    ru: ruLocale,
  },
  legacy: false,
  globalInjection: true,
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.mount("#app");
