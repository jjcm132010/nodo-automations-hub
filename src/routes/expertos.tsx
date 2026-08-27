import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { PlaceholderPage } from "@/components/marketing/PlaceholderPage";

export const Route = createFileRoute("/expertos")({
  head: () => ({
    meta: [
      { title: "Expertos — Nodo" },
      {
        name: "description",
        content: "Marketplace de expertos verificados en automatización, datos e IA aplicada.",
      },
      { property: "og:title", content: "Expertos — Nodo" },
      { property: "og:description", content: "Contrata especialistas verificados en automatización." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExpertsPage,
});

function ExpertsPage() {
  const { t } = useTranslation();
  return (
    <PlaceholderPage title={t("placeholders.experts.title")} body={t("placeholders.experts.body")} />
  );
}
