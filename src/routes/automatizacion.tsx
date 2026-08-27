import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { PlaceholderPage } from "@/components/marketing/PlaceholderPage";

export const Route = createFileRoute("/automatizacion")({
  head: () => ({
    meta: [
      { title: "Automatización — Nodo" },
      {
        name: "description",
        content: "Automatización a la medida con IA: análisis del proceso, cotización y entrega documentada.",
      },
      { property: "og:title", content: "Automatización — Nodo" },
      { property: "og:description", content: "Automatización a la medida construida por expertos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AutomationPage,
});

function AutomationPage() {
  const { t } = useTranslation();
  return (
    <PlaceholderPage
      title={t("placeholders.automation.title")}
      body={t("placeholders.automation.body")}
    />
  );
}
