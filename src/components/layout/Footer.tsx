import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Twitter } from "lucide-react";
import { useTranslation } from "react-i18next";

import { LanguageToggle } from "@/components/layout/LanguageToggle";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-4">
        <div className="space-y-3">
          <p className="text-xl font-semibold tracking-tight text-ink">
            {t("brand.name")}
            <span className="text-accent">.</span>
          </p>
          <p className="max-w-[40ch] text-sm text-ink-muted">{t("footer.description")}</p>
          <LanguageToggle />
        </div>

        <nav className="space-y-3" aria-label={t("footer.product")}>
          <p className="text-sm font-medium text-ink">{t("footer.product")}</p>
          <Link to="/automatizacion" className="block text-sm text-ink-muted hover:text-ink">
            {t("nav.automation")}
          </Link>
          <Link to="/expertos" className="block text-sm text-ink-muted hover:text-ink">
            {t("nav.experts")}
          </Link>
          <Link to="/academia" className="block text-sm text-ink-muted hover:text-ink">
            {t("nav.academy")}
          </Link>
          <Link to="/precios" className="block text-sm text-ink-muted hover:text-ink">
            {t("nav.pricing")}
          </Link>
        </nav>

        <nav className="space-y-3" aria-label={t("footer.company")}>
          <p className="text-sm font-medium text-ink">{t("footer.company")}</p>
          <Link to="/como-funciona" className="block text-sm text-ink-muted hover:text-ink">
            {t("nav.howItWorks")}
          </Link>
          <Link to="/registro" className="block text-sm text-ink-muted hover:text-ink">
            {t("auth.register.submit")}
          </Link>
          <Link to="/login" className="block text-sm text-ink-muted hover:text-ink">
            {t("nav.login")}
          </Link>
        </nav>

        <div className="space-y-3">
          <p className="text-sm font-medium text-ink">{t("footer.social")}</p>
          <div className="flex gap-2">
            {[
              { Icon: Linkedin, label: "LinkedIn" },
              { Icon: Twitter, label: "X" },
              { Icon: Github, label: "GitHub" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="https://lovable.dev"
                aria-label={label}
                className="inline-flex size-11 items-center justify-center rounded-[var(--radius-md)] border border-border text-ink-muted transition-colors duration-200 hover:text-ink"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-ink-muted sm:px-6">
          © {new Date().getFullYear()} {t("brand.name")}. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
