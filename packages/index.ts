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

export interface i18nValue {
  language: string;
  init(config: {
    resources: Resource;
    defaultLang: string;
    // allow an empty value to count as invalid (by default is true)
    returnEmptyString?: boolean;
  }): i18nValue;
  on(type: i18nListenerType, callback: i18nListenerCallback): void;
  off(type: i18nListenerType, callback: i18nListenerCallback): void;
  t(key: string, options?: Record<string, string>): string;
  exists(key: string): boolean;
  changeLanguage(language: string): void;
  getResourceByLanguage(lang: string): Resource;
  getValue(key: string): string;
}
type i18nCreator = () => i18nValue;
type i18nListenerType = "onlanguagechanged";
type i18nListenerCallback = () => void;

export const i18n: i18nCreator = () => {
  let _language: string = "";
  let _isReturnEmptyString = true;
  let _resources: Resource = {};
  let _listeners = new Map<i18nListenerType, Set<i18nListenerCallback>>();

  function emit(type: i18nListenerType) {
    if (!_listeners.has(type)) {
      return;
    }
    _listeners.get(type)?.forEach((callback) => callback());
  }

  return {
    get language() {
      return _language;
    },

    on(type: i18nListenerType, callback: i18nListenerCallback) {
      if (!_listeners.has(type)) {
        _listeners.set(type, new Set());
      }
      _listeners.get(type)?.add(callback);
    },

    off(type: i18nListenerType, callback: i18nListenerCallback) {
      if (!_listeners.has(type)) {
        return;
      }
      _listeners.get(type)?.delete(callback);
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
      emit("onlanguagechanged");
    },
    getResourceByLanguage(lang: string): Resource {
      return _resources[lang] as Resource;
    },
    getValue(key: string): string {
      return _get(_resources, `${_language}.${key}`) as string;
    },
  };
};
