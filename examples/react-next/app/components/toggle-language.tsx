'use client'

import { useTranslation } from "localiz/react";
import { useState, useEffect } from "react";

export default function ToggleLanguage() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState("en");

  useEffect(() => {
    function updateLang() {
      setLang(i18n.language);
    }

    i18n.on("onlanguagechanged", updateLang);
    return () => {
      i18n.off("onlanguagechanged", updateLang);
    };
  }, [i18n]);

  const changeLanguage = () => {
    i18n.changeLanguage(lang === "en" ? "es" : "en");
  };

  return (
    <button
      className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
      onClick={changeLanguage}
    >
      change to {lang === "en" ? "spanish" : "english"}
    </button>
  );
}
