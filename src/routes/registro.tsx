import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";
import { signUp, type AccountType } from "@/services/auth";

export const Route = createFileRoute("/registro")({
  head: () => ({
    meta: [
      { title: "Crear cuenta — Nodo" },
      {
        name: "description",
        content: "Crea tu cuenta en Nodo como cliente o como experto en automatización con IA.",
      },
      { property: "og:title", content: "Crear cuenta — Nodo" },
      { property: "og:description", content: "Empieza por tu primera automatización con Nodo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { session } = useAuth();
  const { language } = useLanguage();

  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState<AccountType>("client");
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    form?: string | undefined;
  }>({});

  useEffect(() => {
    if (session) void navigate({ to: "/app", replace: true });
  }, [session, navigate]);

  const validateEmail = () => {
    if (!email) return t("auth.errors.emailRequired");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return t("auth.errors.emailInvalid");
    return undefined;
  };
  const validatePassword = () => {
    if (!password) return t("auth.errors.passwordRequired");
    if (password.length < 8) return t("auth.errors.passwordShort");
    return undefined;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = {
      fullName: fullName.trim() ? undefined : t("auth.errors.nameRequired"),
      email: validateEmail(),
      password: validatePassword(),
    };
    setErrors(nextErrors);
    if (nextErrors.fullName || nextErrors.email || nextErrors.password) return;

    setSubmitting(true);
    const { error } = await signUp({
      email,
      password,
      fullName: fullName.trim(),
      company: company.trim() || undefined,
      accountType,
      language,
    });
    setSubmitting(false);
    if (error) {
      setErrors({ form: t("auth.errors.generic") });
      return;
    }
    void navigate({ to: "/app", replace: true });
  };

  return (
    <PublicLayout>
      <div className="mx-auto max-w-md px-4 py-12 sm:px-6 sm:py-24">
        <h1 className="text-3xl font-display sm:text-5xl">{t("auth.register.title")}</h1>
        <p className="mt-3 text-base text-ink-muted">{t("auth.register.subtitle")}</p>

        <form onSubmit={handleSubmit} className="mt-12 space-y-6" noValidate>
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-ink">{t("auth.register.accountType")}</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {(["client", "expert"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setAccountType(type)}
                  aria-pressed={accountType === type}
                  className={cn(
                    "rounded-[var(--radius-lg)] border p-4 text-left transition-colors duration-200",
                    accountType === type
                      ? "border-primary bg-surface"
                      : "border-border bg-surface hover:border-ink-muted",
                  )}
                >
                  <span className="block text-sm font-medium text-ink">
                    {t(`auth.register.${type}`)}
                  </span>
                  <span className="mt-1 block text-xs text-ink-muted">
                    {t(`auth.register.${type}Hint`)}
                  </span>
                </button>
              ))}
            </div>
            {accountType === "expert" ? (
              <p className="text-xs text-warning">{t("auth.register.expertPending")}</p>
            ) : null}
          </fieldset>

          <div className="space-y-2">
            <Label htmlFor="fullName">{t("auth.fields.fullName")}</Label>
            <Input
              id="fullName"
              value={fullName}
              autoComplete="name"
              onChange={(event) => setFullName(event.target.value)}
              onBlur={() =>
                setErrors((prev) => ({
                  ...prev,
                  fullName: fullName.trim() ? undefined : t("auth.errors.nameRequired"),
                }))
              }
              aria-invalid={Boolean(errors.fullName)}
            />
            {errors.fullName ? <p className="text-sm text-danger">{errors.fullName}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">
              {t("auth.fields.company")}{" "}
              <span className="text-ink-muted">({t("common.optional")})</span>
            </Label>
            <Input
              id="company"
              value={company}
              autoComplete="organization"
              onChange={(event) => setCompany(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("auth.fields.email")}</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onBlur={() => setErrors((prev) => ({ ...prev, email: validateEmail() }))}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? <p className="text-sm text-danger">{errors.email}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t("auth.fields.password")}</Label>
            <div className="relative">
              <Input
                id="password"
                type={show ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onBlur={() => setErrors((prev) => ({ ...prev, password: validatePassword() }))}
                aria-invalid={Boolean(errors.password)}
                className="pr-12"
              />
              <button
                type="button"
                onClick={() => setShow((value) => !value)}
                aria-label={t(show ? "auth.fields.hidePassword" : "auth.fields.showPassword")}
                className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-ink-muted hover:text-ink"
              >
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {errors.password ? <p className="text-sm text-danger">{errors.password}</p> : null}
          </div>

          {errors.form ? <p className="text-sm text-danger">{errors.form}</p> : null}

          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {t("auth.register.submit")}
          </Button>
        </form>

        <p className="mt-6 text-sm text-ink-muted">
          {t("auth.register.hasAccount")}{" "}
          <Link to="/login" className="font-medium text-primary underline-offset-4 hover:underline">
            {t("auth.register.goLogin")}
          </Link>
        </p>
      </div>
    </PublicLayout>
  );
}
