import { ReactNode, useEffect } from "react";
import { i18n } from "localiz";
import { LocalizeProvider } from "localiz/react";

const i18nInstance = i18n().init({
  //you can set the default language to the language saved in local storage
  defaultLang: localStorage.getItem("i18n") || "en",
  resources: {
    en: {
      hello: "Hello, {{name}}!",
    },
    es: {
      hello: "¡Hola, {{name}}!",
    },
  },
});

export default function LocalizationWrapper(props: { children: ReactNode }) {
  useEffect(() => {
    const storeLang = () => localStorage.setItem("i18n", i18nInstance.language);
    i18nInstance.on("onlanguagechanged", storeLang);

    return () => {
      i18nInstance.off("onlanguagechanged", storeLang);
    };
  }, []);

  return (
    <LocalizeProvider i18n={i18nInstance}>{props.children}</LocalizeProvider>
  );
}
