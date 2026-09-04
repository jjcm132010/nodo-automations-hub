import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

import KineticGrid from "@/components/ui/kinetic-grid";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { t } = useTranslation();

  const metrics = [
    { value: t("home.hero.metrics.delivery.value"), label: t("home.hero.metrics.delivery.label") },
    {
      value: t("home.hero.metrics.integrations.value"),
      label: t("home.hero.metrics.integrations.label"),
    },
    { value: t("home.hero.metrics.code.value"), label: t("home.hero.metrics.code.label") },
  ];

  return (
    <KineticGrid globalColor="default" className="min-h-[calc(100svh-3.75rem)]">
      <section className="mx-auto flex min-h-[calc(100svh-3.75rem)] max-w-4xl flex-col items-center justify-center gap-8 px-4 py-24 text-center sm:px-6">
        <span className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-border-strong bg-surface/60 px-4 py-1.5 text-xs text-ink-muted backdrop-blur-sm">
          <Sparkles className="size-3.5 text-accent" />
          {t("home.hero.chip")}
        </span>

        <h1 className="text-5xl font-display text-ink sm:text-6xl">
          {t("home.hero.title")} <em className="text-accent italic">{t("home.hero.titleAccent")}</em>
        </h1>

        <p className="max-w-[60ch] text-lg text-ink-muted">{t("home.hero.subtitle")}</p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="rounded-[var(--radius-pill)] bg-gradient-to-b from-primary-mid to-primary text-primary-foreground shadow-[var(--shadow-glow-primary)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:from-primary-hover hover:to-primary-mid"
          >
            <Link to="/registro">{t("home.hero.cta")}</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-[var(--radius-pill)] border-border-strong bg-surface/40 text-ink backdrop-blur-sm hover:bg-surface/70"
          >
            <Link to="/como-funciona">
              {t("home.hero.secondary")}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <dl className="flex flex-wrap items-center justify-center divide-x divide-border">
          {metrics.map((metric) => (
            <div key={metric.label} className="px-6 py-2 text-center">
              <dt className="font-data text-2xl text-ink">{metric.value}</dt>
              <dd className="mt-1 text-xs tracking-widest text-ink-muted uppercase">
                {metric.label}
              </dd>
            </div>
          ))}
        </dl>

        <p className="font-data text-xs text-ink-muted">{t("home.hero.note")}</p>
      </section>
    </KineticGrid>
  );
}
