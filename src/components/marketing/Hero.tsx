import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { NodeGraph } from "@/components/marketing/NodeGraph";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-6xl px-4 pt-12 pb-12 sm:px-6 sm:pt-24 sm:pb-24">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
        <div className="space-y-6">
          <p className="font-data text-xs tracking-widest text-ink-muted uppercase">
            {t("home.hero.eyebrow")}
          </p>
          <h1 className="text-5xl font-display sm:text-6xl">{t("home.hero.title")}</h1>
          <p className="max-w-[60ch] text-lg text-ink-muted">{t("home.hero.subtitle")}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link to="/registro">{t("home.hero.cta")}</Link>
            </Button>
            <Link
              to="/como-funciona"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline"
            >
              {t("home.hero.secondary")}
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <p className="font-data text-xs text-ink-muted">{t("home.hero.note")}</p>
        </div>

        <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-6">
          <NodeGraph className="h-auto w-full" />
        </div>
      </div>
    </section>
  );
}
