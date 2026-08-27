import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";

export function PlaceholderPage({ title, body }: { title: string; body: string }) {
  const { t } = useTranslation();

  return (
    <PublicLayout>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-24">
        <span className="rounded-[var(--radius-pill)] border border-accent px-3 py-1 font-data text-xs text-accent">
          {t("common.soon")}
        </span>
        <h1 className="mt-6 max-w-[36ch] text-3xl font-display sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-[60ch] text-lg text-ink-muted">{body}</p>
        <div className="mt-12 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/registro">{t("home.finalCta.cta")}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/como-funciona">{t("nav.howItWorks")}</Link>
          </Button>
        </div>
      </div>
    </PublicLayout>
  );
}
