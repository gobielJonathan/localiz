import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import _get from "lodash.get";

const stringTemplate = (
  template: string,
  data: Record<string, string>
): string => {
  if (!template) {
    return "";
  }

  const pattern = /{{\s*(\w+?)\s*}}/g;
  return template.replace(pattern, (_, token) => {
    if (Object.prototype.hasOwnProperty.call(data, token)) {
      return data[token];
    }
    return "";
  });
};

type Resource = {
  [key: string]: Resource | string;
};

interface i18nValue {
  language: string;
  init(config: {
    resources: Resource;
    defaultLang: string;
    // allow an empty value to count as invalid (by default is true)
    returnEmptyString?: boolean;
  }): i18nValue;
  t(key: string, options?: Record<string, string>): string;
  exists(key: string): boolean;
  changeLanguage(language: string): void;
  getDataByLanguage(lang: string): Resource;
}
type i18nCreator = () => i18nValue;

export const i18n: i18nCreator = () => {
  let _language: string = "";
  let _isReturnEmptyString = true;
  let _resources: Resource = {};

  return {
    get language() {
      return _language;
    },

    init(config: {
      resources: Resource;
      defaultLang: string;
      // allow an empty value to count as invalid (by default is true)
      returnEmptyString?: boolean;
    }) {
      _resources = config.resources;
      _language = config.defaultLang;
      _isReturnEmptyString = config.returnEmptyString ?? true;

      return this;
    },
    t(key: string, options?: Record<string, string>) {
      const translationValue = _get(_resources, `${_language}.${key}`);
      if (translationValue) {
        return stringTemplate(String(translationValue), options ?? {});
      }
      if (_isReturnEmptyString) return "";
      return translationValue;
    },
    exists(key: string) {
      return Boolean(_get(_resources, `${_language}.${key}`));
    },
    changeLanguage(language: string) {
      _language = language;
    },
    getDataByLanguage(lang: string): Resource {
      return _resources[lang] as Resource;
    },
  };
};

interface LocalizeContextValue {
  i18n: ReturnType<typeof i18n>;
  t: (key: string, options?: Record<string, string>) => string;
}

const LocalizeContext = createContext<LocalizeContextValue | undefined>(
  undefined
);

interface LocalizeProviderProps {
  lang: string;
  i18n: ReturnType<typeof i18n>;
}

export const LocalizeProvider = ({
  i18n,
  lang,
  children,
}: PropsWithChildren<LocalizeProviderProps>) => {
  const value = useMemo(
    () => ({
      i18n: i18n,
      t: i18n.t,
    }),
    [i18n]
  );

  i18n.changeLanguage(lang);
  return (
    <LocalizeContext.Provider value={value}>
      {children}
    </LocalizeContext.Provider>
  );
};
LocalizeProvider.displayName = "LocalizeProvider";

export function useTranslation() {
  const context = useContext(LocalizeContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LocalizeProvider");
  }
  return context;
}
