import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Workflow } from "lucide-react";
import { useTranslation } from "react-i18next";

import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { getMyProfile, getMyRoles } from "@/services/profile";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({
    meta: [
      { title: "Panel — Nodo" },
      { name: "description", content: "Panel de control de tus automatizaciones en Nodo." },
      { property: "og:title", content: "Panel — Nodo" },
      { property: "og:description", content: "Gestiona tus automatizaciones en Nodo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const { data, isPending } = useQuery({
    queryKey: ["me", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const [profile, roles] = await Promise.all([getMyProfile(user!.id), getMyRoles(user!.id)]);
      return { profile, roles };
    },
  });

  const name = data?.profile?.full_name ?? user?.email ?? "";
  const initials = name.trim().slice(0, 2).toUpperCase() || "NO";
  const isExpert = data?.roles.includes("expert");

  return (
    <AppShell initials={initials}>
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="space-y-2">
          {isPending ? (
            <Skeleton className="h-8 w-64" />
          ) : (
            <h2 className="text-2xl font-medium text-ink">
              {t("app.greeting")}, {name}
            </h2>
          )}
          {isExpert ? (
            <span className="inline-flex rounded-[var(--radius-pill)] border border-warning px-3 py-1 font-data text-xs text-warning">
              {t("app.role.expertPending")}
            </span>
          ) : null}
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {(["active", "inProgress", "requests"] as const).map((key) => (
            <div
              key={key}
              className="space-y-2 rounded-[var(--radius-lg)] border border-border bg-surface p-6"
            >
              <p className="text-sm text-ink-muted">{t(`app.stats.${key}`)}</p>
              <p className="font-data text-3xl text-ink">0</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start gap-4 rounded-[var(--radius-lg)] border border-border bg-surface p-6 sm:p-12">
          <Workflow className="size-6 text-primary" />
          <h3 className="text-xl font-medium text-ink">{t("app.empty.title")}</h3>
          <p className="max-w-[60ch] text-sm text-ink-muted">{t("app.empty.body")}</p>
          <Button disabled>{t("app.empty.cta")}</Button>
        </div>
      </div>
    </AppShell>
  );
}
