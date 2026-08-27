import { useTranslation } from "react-i18next";

import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-[var(--radius-pill)] border border-border bg-surface p-0.5",
        className,
      )}
      role="group"
      aria-label={t("common.language")}
    >
      {(["es", "en"] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
          aria-label={t(lang === "es" ? "common.spanish" : "common.english")}
          className={cn(
            "min-h-11 rounded-[var(--radius-pill)] px-3 text-sm font-medium transition-colors duration-200 sm:min-h-9",
            language === lang
              ? "bg-primary text-primary-foreground"
              : "text-ink-muted hover:text-ink",
          )}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
