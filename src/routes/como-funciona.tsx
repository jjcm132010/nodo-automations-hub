import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";
import { useTranslation } from "react-i18next";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { Faq } from "@/components/marketing/Faq";
import { HowItWorksSteps } from "@/components/marketing/HowItWorksSteps";
import { Section, SectionHeader } from "@/components/marketing/Section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/como-funciona")({
  head: () => ({
    meta: [
      { title: "Cómo funciona — Nodo" },
      {
        name: "description",
        content:
          "Del proceso descrito a la automatización funcionando: estados, responsables y tiempos del flujo de trabajo de Nodo.",
      },
      { property: "og:title", content: "Cómo funciona — Nodo" },
      {
        property: "og:description",
        content: "El recorrido completo de una solicitud dentro de Nodo, estado por estado.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowItWorksPage,
});

type State = { name: string; owner: string; body: string };

function HowItWorksPage() {
  const { t } = useTranslation();
  const states = t("howItWorks.states", { returnObjects: true }) as State[];

  return (
    <PublicLayout>
      <Section className="border-t-0">
        <SectionHeader title={t("howItWorks.title")} subtitle={t("howItWorks.subtitle")} />
      </Section>

      <HowItWorksSteps />

      <Section className="bg-surface-muted">
        <SectionHeader title={t("howItWorks.diagramTitle")} subtitle={t("howItWorks.diagramNote")} />
        {/* Diagrama de estados: lista vertical con conectores, legible en móvil */}
        <ol className="mt-12 max-w-[70ch] space-y-0">
          {states.map((state, index) => (
            <li key={state.name}>
              <div className="flex gap-4 rounded-[var(--radius-lg)] border border-border bg-surface p-6">
                <span className="font-data text-sm text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-medium text-ink">{state.name}</h3>
                    <span className="rounded-[var(--radius-pill)] border border-border px-3 py-0.5 font-data text-xs text-ink-muted">
                      {state.owner}
                    </span>
                  </div>
                  <p className="text-sm text-ink-muted">{state.body}</p>
                </div>
              </div>
              {index < states.length - 1 ? (
                <div className="flex justify-start py-2 pl-8">
                  <ArrowDown className="size-4 text-ink-muted" aria-hidden="true" />
                </div>
              ) : null}
            </li>
          ))}
        </ol>
        <div className="mt-12">
          <Button asChild size="lg">
            <Link to="/registro">{t("howItWorks.cta")}</Link>
          </Button>
        </div>
      </Section>

      <Faq title={t("howItWorks.faqTitle")} />
    </PublicLayout>
  );
}
