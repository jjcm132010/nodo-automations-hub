import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

export function FinalCta() {
  const { t } = useTranslation();

  return (
    <section className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6 sm:py-24">
        <h2 className="max-w-[36ch] text-3xl font-display sm:text-5xl">
          {t("home.finalCta.title")}
        </h2>
        <p className="max-w-[60ch] text-base text-ink-muted">{t("home.finalCta.body")}</p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/registro">{t("home.finalCta.cta")}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/precios">{t("home.finalCta.secondary")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
