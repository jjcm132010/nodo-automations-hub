import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { LANGUAGE_STORAGE_KEY, readStoredLanguage, type Language } from "@/lib/i18n";

export function useLanguage() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const stored = readStoredLanguage();
    const initial = stored ?? (navigator.language.startsWith("en") ? "en" : "es");
    if (initial !== i18n.language) void i18n.changeLanguage(initial);
    document.documentElement.lang = initial;
  }, [i18n]);

  const setLanguage = (lang: Language) => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    void i18n.changeLanguage(lang);
  };

  return { language: (i18n.language === "en" ? "en" : "es") as Language, setLanguage };
}
