import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/locales/en.json";
import es from "@/locales/es.json";

export const LANGUAGES = ["es", "en"] as const;
export type Language = (typeof LANGUAGES)[number];
export const LANGUAGE_STORAGE_KEY = "nodo.language";

// El idioma inicial es siempre 'es' para que el HTML del servidor y el del
// cliente coincidan; la preferencia guardada se aplica tras la hidratación.
if (!i18next.isInitialized) {
  void i18next.use(initReactI18next).init({
    resources: { es: { translation: es }, en: { translation: en } },
    lng: "es",
    fallbackLng: "es",
    supportedLngs: LANGUAGES as unknown as string[],
    interpolation: { escapeValue: false },
    returnObjects: true,
  });
}

export function readStoredLanguage(): Language | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return stored === "es" || stored === "en" ? stored : null;
}

export default i18next;
