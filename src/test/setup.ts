import { config } from "@vue/test-utils";
import { createI18n } from "vue-i18n";

const i18n = createI18n({
  locale: "ru",
  fallbackLocale: "en",
  messages: {
    ru: {
      sessions: {
        title: "Сессии",
        searchPlaceholder: "Поиск по модулю",
        createButton: "Создать сессию",
      },
      sessionsTable: {
        dateTime: "Дата и время",
        status: "Статус",
        moduleName: "Модуль",
        sessionType: "Тип сессии",
        room: "Аудитория",
        users: "Участники",
        noData: "Нет данных",
      },
    },
  },
});

config.global.plugins = [i18n];
