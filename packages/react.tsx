import {
  cloneElement,
  ComponentProps,
  ComponentType,
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { i18nValue } from "./index";

interface LocalizeContextValue {
  i18n: i18nValue;
  t: (key: string, options?: Record<string, string>) => string;
}

const LocalizeContext = createContext<LocalizeContextValue | undefined>(
  undefined
);

interface LocalizeProviderProps {
  i18n: i18nValue;
}

export const LocalizeProvider = ({
  i18n,
  children,
}: PropsWithChildren<LocalizeProviderProps>) => {
  const value = useMemo(
    () => ({
      i18n: i18n,
      t: i18n.t,
    }),
    [i18n]
  );
  return (
    <LocalizeContext.Provider value={value}>
      {children}
    </LocalizeContext.Provider>
  );
};
LocalizeProvider.displayName = "LocalizeProvider";

export function useTranslation() {
  const [, setRerender] = useState(false);
  const context = useContext(LocalizeContext);

  useEffect(() => {
    function rerender() {
      setRerender((prev) => !prev);
    }

    context?.i18n?.on("onlanguagechanged", rerender);
    return () => context?.i18n?.off("onlanguagechanged", rerender);
  }, []);

  if (!context) {
    throw new Error("useTranslation must be used within a LocalizeProvider");
  }
  return context;
}

export function withTranslation<T extends ComponentType<any>>(Component: T) {
  return (props: ComponentProps<T>) => {
    const context = useTranslation();
    const element = <Component {...props} />;
    return cloneElement<
      ComponentProps<T> & { t: i18nValue["t"]; i18n: i18nValue }
    >(element, { ...props, t: context.t, i18n: context.i18n });
  };
}