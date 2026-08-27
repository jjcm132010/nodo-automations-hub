import { BarChart3, Boxes, FileText, Headphones, Megaphone, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Section, SectionHeader } from "@/components/marketing/Section";

const ICONS = [TrendingUp, Headphones, FileText, Megaphone, Boxes, BarChart3];

export function Industries() {
  const { t } = useTranslation();
  const items = t("home.industries.items", { returnObjects: true }) as Array<{
    title: string;
    body: string;
  }>;

  return (
    <Section>
      <SectionHeader title={t("home.industries.title")} subtitle={t("home.industries.subtitle")} />
      <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const Icon = ICONS[index] ?? TrendingUp;
          return (
            <article key={item.title} className="space-y-3 bg-surface p-6">
              <Icon className="size-5 text-accent" />
              <h3 className="text-lg font-medium text-ink">{item.title}</h3>
              <p className="text-sm text-ink-muted">{item.body}</p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
