import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { PlaceholderPage } from "@/components/marketing/PlaceholderPage";

export const Route = createFileRoute("/academia")({
  head: () => ({
    meta: [
      { title: "Academia — Nodo" },
      {
        name: "description",
        content: "Academia de IA aplicada: formación práctica para equipos que automatizan procesos.",
      },
      { property: "og:title", content: "Academia — Nodo" },
      { property: "og:description", content: "Formación práctica en IA aplicada para tu equipo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AcademyPage,
});

function AcademyPage() {
  const { t } = useTranslation();
  return (
    <PlaceholderPage title={t("placeholders.academy.title")} body={t("placeholders.academy.body")} />
  );
}
