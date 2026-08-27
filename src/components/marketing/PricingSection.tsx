import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Check, Minus } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCop, formatUsd } from "@/lib/format";
import { cn } from "@/lib/utils";
import { FALLBACK_PLANS, getPlans, type PlanCode } from "@/services/plans";

const ANNUAL_DISCOUNT = 0.2;

type Billing = "monthly" | "annual";
type Currency = "COP" | "USD";

export function PricingSection({ withComparison = false }: { withComparison?: boolean }) {
  const { t } = useTranslation();
  const [billing, setBilling] = useState<Billing>("monthly");
  const [currency, setCurrency] = useState<Currency>("COP");

  const { data: plans, isPending } = useQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
    initialData: FALLBACK_PLANS,
  });

  const priceLabel = (priceCop: number | null, isCustom: boolean) => {
    if (isCustom || priceCop === null) return t("pricing.custom");
    const value = billing === "annual" ? priceCop * 12 * (1 - ANNUAL_DISCOUNT) : priceCop;
    const amount = currency === "COP" ? formatCop(Math.round(value)) : formatUsd(value);
    return `${amount}${billing === "annual" ? t("pricing.perYear") : t("pricing.perMonth")}`;
  };

  const featureRows: Array<{
    label: string;
    values: Record<PlanCode, string | boolean>;
  }> = [
    {
      label: t("pricing.features.activeAutomations"),
      values: { starter: "1", growth: "3", enterprise: t("pricing.values.unlimited") },
    },
    {
      label: t("pricing.features.monthlyRequests"),
      values: { starter: "1", growth: "3", enterprise: t("pricing.values.requestsUnlimited") },
    },
    {
      label: t("pricing.features.support"),
      values: {
        starter: t("pricing.values.supportEmail"),
        growth: t("pricing.values.supportPriority"),
        enterprise: t("pricing.values.supportSla"),
      },
    },
    {
      label: t("pricing.features.academy"),
      values: {
        starter: t("pricing.values.academyBasic"),
        growth: t("pricing.values.academyFull"),
        enterprise: t("pricing.values.academyFull"),
      },
    },
    {
      label: t("pricing.features.expertDiscount"),
      values: { starter: false, growth: t("pricing.values.discount10"), enterprise: true },
    },
    {
      label: t("pricing.features.assignedExpert"),
      values: { starter: false, growth: false, enterprise: true },
    },
    { label: t("pricing.features.sla"), values: { starter: false, growth: false, enterprise: true } },
    {
      label: t("pricing.features.training"),
      values: { starter: false, growth: false, enterprise: true },
    },
    {
      label: t("pricing.features.integrations"),
      values: { starter: false, growth: false, enterprise: true },
    },
  ];

  const renderCell = (value: string | boolean) => {
    if (value === true)
      return <Check className="size-4 text-success" aria-label={t("pricing.values.included")} />;
    if (value === false)
      return <Minus className="size-4 text-ink-muted" aria-label={t("pricing.values.notIncluded")} />;
    return <span className="font-data text-sm text-ink">{value}</span>;
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap items-center gap-3">
        <div
          className="inline-flex rounded-[var(--radius-pill)] border border-border bg-surface p-0.5"
          role="group"
          aria-label={t("pricing.monthly")}
        >
          {(["monthly", "annual"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setBilling(option)}
              aria-pressed={billing === option}
              className={cn(
                "min-h-11 rounded-[var(--radius-pill)] px-4 text-sm font-medium transition-colors duration-200",
                billing === option
                  ? "bg-primary text-primary-foreground"
                  : "text-ink-muted hover:text-ink",
              )}
            >
              {t(option === "monthly" ? "pricing.monthly" : "pricing.annual")}
            </button>
          ))}
        </div>
        <span className="rounded-[var(--radius-pill)] border border-accent px-3 py-1 font-data text-xs text-accent">
          {t("pricing.annualDiscount")}
        </span>
        <div
          className="inline-flex rounded-[var(--radius-pill)] border border-border bg-surface p-0.5"
          role="group"
          aria-label="COP / USD"
        >
          {(["COP", "USD"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setCurrency(option)}
              aria-pressed={currency === option}
              className={cn(
                "min-h-11 rounded-[var(--radius-pill)] px-4 font-data text-sm transition-colors duration-200",
                currency === option
                  ? "bg-primary text-primary-foreground"
                  : "text-ink-muted hover:text-ink",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <p className="max-w-[60ch] text-xs text-ink-muted">{t("pricing.currencyNote")}</p>

      <div className="grid gap-6 lg:grid-cols-3">
        {isPending
          ? [0, 1, 2].map((index) => <Skeleton key={index} className="h-80 w-full rounded-[var(--radius-lg)]" />)
          : plans.map((plan) => (
              <article
                key={plan.code}
                className={cn(
                  "flex flex-col gap-6 rounded-[var(--radius-lg)] border bg-surface p-6 sm:p-8",
                  plan.code === "growth" ? "border-primary" : "border-border",
                )}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl font-medium text-ink">
                      {t(`pricing.plans.${plan.code}.name`)}
                    </h3>
                    {plan.code === "growth" ? (
                      <span className="rounded-[var(--radius-pill)] bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                        {t("pricing.popular")}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm text-ink-muted">
                    {t(`pricing.plans.${plan.code}.description`)}
                  </p>
                </div>

                <p className="font-data text-2xl text-ink">
                  {priceLabel(plan.price_cop, plan.is_custom_price)}
                </p>

                <ul className="space-y-2 border-t border-border pt-6">
                  {featureRows.slice(0, 5).map((row) => (
                    <li key={row.label} className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-ink-muted">{row.label}</span>
                      {renderCell(row.values[plan.code])}
                    </li>
                  ))}
                </ul>

                <Button asChild className="mt-auto" variant={plan.code === "growth" ? "default" : "outline"}>
                  <Link to="/registro">
                    {t(plan.code === "enterprise" ? "pricing.ctaEnterprise" : "pricing.cta")}
                  </Link>
                </Button>
              </article>
            ))}
      </div>

      {withComparison ? (
        <div className="space-y-6">
          <h3 className="text-2xl font-medium text-ink">{t("pricing.compareTitle")}</h3>
          <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-border">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-surface-muted">
                  <th scope="col" className="p-4 text-sm font-medium text-ink-muted">
                    {t("pricing.compareTitle")}
                  </th>
                  {(["starter", "growth", "enterprise"] as const).map((code) => (
                    <th key={code} scope="col" className="p-4 text-sm font-medium text-ink">
                      {t(`pricing.plans.${code}.name`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureRows.map((row) => (
                  <tr key={row.label} className="border-b border-border last:border-0">
                    <th scope="row" className="p-4 text-sm font-normal text-ink-muted">
                      {row.label}
                    </th>
                    {(["starter", "growth", "enterprise"] as const).map((code) => (
                      <td key={code} className="p-4">
                        {renderCell(row.values[code])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
}
