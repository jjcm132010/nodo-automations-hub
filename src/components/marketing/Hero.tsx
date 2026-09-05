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
    <section className="relative mt-[3.75rem] h-[calc(100svh-3.75rem)]">
      <KineticGrid globalColor="default">
        <div className="mx-auto flex h-full max-w-4xl flex-col items-center justify-center gap-5 px-4 py-6 text-center sm:gap-7 sm:px-6 sm:py-10 lg:gap-8 lg:py-16">
          <span className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-border-strong bg-surface/60 px-4 py-1.5 text-xs text-ink-muted backdrop-blur-sm">
            <Sparkles className="size-3.5 text-accent" />
            {t("home.hero.chip")}
          </span>

          <h1 className="text-4xl font-display text-ink sm:text-5xl lg:text-6xl">
            {t("home.hero.title")} <em className="text-accent italic">{t("home.hero.titleAccent")}</em>
          </h1>

          <p className="max-w-[60ch] text-base text-ink-muted sm:text-lg">
            {t("home.hero.subtitle")}
          </p>

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
              <div key={metric.label} className="px-4 py-2 text-center sm:px-6">
                <dt className="font-data text-xl text-ink sm:text-2xl">{metric.value}</dt>
                <dd className="mt-1 text-[10px] tracking-widest text-ink-muted uppercase sm:text-xs">
                  {metric.label}
                </dd>
              </div>
            ))}
          </dl>

          <p className="font-data text-[10px] text-ink-muted sm:text-xs">{t("home.hero.note")}</p>
        </div>
      </KineticGrid>
    </section>
  );
}
