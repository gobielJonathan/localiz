"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { setCookie } from "cookies-next";
import { i18n } from "localiz";
import { LocalizeProvider } from "localiz/react";

interface Props {
  defaultLang: string;
}

export default function LocalizationWrapper(props: PropsWithChildren<Props>) {
  const [i18nInstance] = useState(() =>
    i18n().init({
      defaultLang: props.defaultLang,
      resources: {
        en: {
          hello: "Hello, {{name}}!",
        },
        es: {
          hello: "¡Hola, {{name}}!",
        },
      },
    })
  );

  const i18nStore = async (lang: string) => {
    await setCookie("i18n", lang);
  };

  //this effect will save the language in local storage
  //you can adjust the logic to save the language in your own way
  useEffect(() => {
    const storeLang = () => i18nStore(i18nInstance.language);

    i18nInstance.on("onlanguagechanged", storeLang);

    return () => {
      i18nInstance.off("onlanguagechanged", storeLang);
    };
  }, [i18nInstance]);

  return (
    <LocalizeProvider i18n={i18nInstance}>{props.children}</LocalizeProvider>
  );
}
