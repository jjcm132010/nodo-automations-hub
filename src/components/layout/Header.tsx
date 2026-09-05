import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

const NAV = [
  { to: "/automatizacion", key: "nav.automation" },
  { to: "/expertos", key: "nav.experts" },
  { to: "/academia", key: "nav.academy" },
  { to: "/precios", key: "nav.pricing" },
] as const;

export function Header() {
  const { t } = useTranslation();
  const { session } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-[3.75rem] max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link to="/" className="text-xl font-semibold tracking-tight text-ink">
          {t("brand.name")}
          <span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label={t("common.menu")}>
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
              activeProps={{ className: "text-ink font-medium" }}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageToggle />
          <ThemeToggle />
          {session ? (
            <Button asChild size="sm">
              <Link to="/app">{t("nav.app")}</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">{t("nav.login")}</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/registro">{t("nav.cta")}</Link>
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="size-11"
            aria-expanded={open}
            aria-label={t(open ? "common.close" : "common.menu")}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-surface lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-2" aria-label={t("common.menu")}>
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center border-b border-border text-base text-ink"
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="flex flex-wrap items-center gap-3 py-4">
              <LanguageToggle />
              {session ? (
                <Button asChild size="sm">
                  <Link to="/app">{t("nav.app")}</Link>
                </Button>
              ) : (
                <>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/login">{t("nav.login")}</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link to="/registro">{t("nav.cta")}</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
