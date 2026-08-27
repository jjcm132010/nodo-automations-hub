import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { Faq } from "@/components/marketing/Faq";
import { FinalCta } from "@/components/marketing/FinalCta";
import { PricingSection } from "@/components/marketing/PricingSection";
import { Section, SectionHeader } from "@/components/marketing/Section";

export const Route = createFileRoute("/precios")({
  head: () => ({
    meta: [
      { title: "Precios — Nodo" },
      {
        name: "description",
        content:
          "Planes de automatización con IA de Nodo: Starter, Growth y Enterprise. Comparativa completa y facturación mensual o anual.",
      },
      { property: "og:title", content: "Precios — Nodo" },
      {
        property: "og:description",
        content: "Starter, Growth y Enterprise: elige según cuántas automatizaciones necesitas activas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const { t } = useTranslation();

  return (
    <PublicLayout>
      <Section className="border-t-0">
        <SectionHeader title={t("pricing.title")} subtitle={t("pricing.subtitle")} />
        <div className="mt-12">
          <PricingSection withComparison />
        </div>
      </Section>
      <Faq />
      <FinalCta />
    </PublicLayout>
  );
}
