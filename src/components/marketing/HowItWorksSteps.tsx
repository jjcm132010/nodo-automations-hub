import { useTranslation } from "react-i18next";

import { Section, SectionHeader } from "@/components/marketing/Section";

type Step = { title: string; body: string };

export function HowItWorksSteps() {
  const { t } = useTranslation();
  const steps = t("home.steps.items", { returnObjects: true }) as Step[];

  return (
    <Section id="como-funciona">
      <SectionHeader title={t("home.steps.title")} subtitle={t("home.steps.subtitle")} />
      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="space-y-3 rounded-[var(--radius-lg)] border border-border bg-surface p-6"
          >
            <span className="font-data text-sm text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl font-medium text-ink">{step.title}</h3>
            <p className="text-sm text-ink-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
