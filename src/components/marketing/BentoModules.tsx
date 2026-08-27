import { Link } from "@tanstack/react-router";
import { ArrowUpRight, GraduationCap, Users, Workflow } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Section, SectionHeader } from "@/components/marketing/Section";

export function BentoModules() {
  const { t } = useTranslation();

  const automationPoints = t("home.modules.automation.points", { returnObjects: true }) as string[];
  const expertPoints = t("home.modules.experts.points", { returnObjects: true }) as string[];
  const academyPoints = t("home.modules.academy.points", { returnObjects: true }) as string[];

  return (
    <Section className="bg-surface-muted">
      <SectionHeader title={t("home.modules.title")} subtitle={t("home.modules.subtitle")} />

      {/* Bento asimétrico: el módulo principal ocupa dos filas en escritorio. */}
      <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:grid-rows-2">
        <Link
          to="/automatizacion"
          className="group flex flex-col justify-between gap-8 rounded-[var(--radius-lg)] border border-border bg-surface p-6 transition-transform duration-200 hover:-translate-y-0.5 sm:p-8 lg:col-span-2 lg:row-span-2"
        >
          <div className="space-y-4">
            <Workflow className="size-6 text-primary" />
            <h3 className="text-3xl font-display">{t("home.modules.automation.title")}</h3>
            <p className="max-w-[54ch] text-base text-ink-muted">
              {t("home.modules.automation.body")}
            </p>
          </div>
          <ul className="space-y-2">
            {automationPoints.map((point) => (
              <li key={point} className="font-data text-sm text-ink">
                {point}
              </li>
            ))}
          </ul>
          <ArrowUpRight className="size-5 text-ink-muted transition-colors duration-200 group-hover:text-primary" />
        </Link>

        {[
          {
            to: "/expertos" as const,
            Icon: Users,
            title: t("home.modules.experts.title"),
            body: t("home.modules.experts.body"),
            points: expertPoints,
          },
          {
            to: "/academia" as const,
            Icon: GraduationCap,
            title: t("home.modules.academy.title"),
            body: t("home.modules.academy.body"),
            points: academyPoints,
          },
        ].map(({ to, Icon, title, body, points }) => (
          <Link
            key={to}
            to={to}
            className="group flex flex-col gap-4 rounded-[var(--radius-lg)] border border-border bg-surface p-6 transition-transform duration-200 hover:-translate-y-0.5"
          >
            <Icon className="size-5 text-primary" />
            <h3 className="text-xl font-medium text-ink">{title}</h3>
            <p className="text-sm text-ink-muted">{body}</p>
            <ul className="mt-auto space-y-1">
              {points.map((point) => (
                <li key={point} className="font-data text-xs text-ink-muted">
                  {point}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </Section>
  );
}
