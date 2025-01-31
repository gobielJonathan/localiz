import {
  App,
  inject,
  onMounted,
  onUnmounted,
  Reactive,
  ref,
  watch,
} from "vue";
import { i18nValue } from "./index";

const INJECT_PROVIDE_KEY = "i18n";

export const i18nPlugin = {
  install: (
    app: App,
    options: {
      i18n: i18nValue;
    }
  ) => {
    app.provide(INJECT_PROVIDE_KEY, options.i18n);
    return app;
  },
};

export function useTranslation() {
  const i18nInject = inject<i18nValue>(INJECT_PROVIDE_KEY);
  if (typeof i18nInject === "undefined") {
    throw Error(
      "i18n instance not found. Please provide by using app.provide() in main.ts"
    );
  }

  return {
    t: i18nInject.t,
    i18n: i18nInject,
  };
}

export function useValue(
  key: string,
  options?: Reactive<Record<string, string>>
) {
  const i18nInject = inject<i18nValue>("i18n");
  if (typeof i18nInject === "undefined") {
    throw Error(
      "i18n instance not found. Please provide by using app.provide() in main.ts"
    );
  }

  const value = ref(i18nInject.t(key, options));

  function updateValue() {
    value.value = i18nInject?.t(key, options) ?? "";
  }

  onMounted(() => {
    i18nInject.on("onlanguagechanged", updateValue);
  });

  onUnmounted(() => {
    i18nInject.off("onlanguagechanged", updateValue);
  });

  watch(
    () => options,
    (newOptions) => {
      if (newOptions) {
        updateValue();
      }
    },
    { immediate: true, deep: true }
  );

  return value;
}
