import { TranslateResult } from "vue-i18n";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $t(key: string, values?: Record<string, unknown>): TranslateResult;
  }
}
