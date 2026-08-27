import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { signIn } from "@/services/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Iniciar sesión — Nodo" },
      { name: "description", content: "Entra a tu panel de Nodo para gestionar tus automatizaciones." },
      { property: "og:title", content: "Iniciar sesión — Nodo" },
      { property: "og:description", content: "Accede a tu panel de automatizaciones en Nodo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { session } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  // Con sesión activa, /login redirige al panel.
  useEffect(() => {
    if (session) void navigate({ to: "/app", replace: true });
  }, [session, navigate]);

  const validateEmail = () => {
    if (!email) return t("auth.errors.emailRequired");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return t("auth.errors.emailInvalid");
    return undefined;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = {
      email: validateEmail(),
      password: password ? undefined : t("auth.errors.passwordRequired"),
    };
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) return;

    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      setErrors({ form: t("auth.errors.invalidCredentials") });
      return;
    }
    void navigate({ to: "/app", replace: true });
  };

  return (
    <PublicLayout>
      <div className="mx-auto max-w-md px-4 py-12 sm:px-6 sm:py-24">
        <h1 className="text-3xl font-display sm:text-5xl">{t("auth.login.title")}</h1>
        <p className="mt-3 text-base text-ink-muted">{t("auth.login.subtitle")}</p>

        <form onSubmit={handleSubmit} className="mt-12 space-y-6" noValidate>
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
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onBlur={() =>
                  setErrors((prev) => ({
                    ...prev,
                    password: password ? undefined : t("auth.errors.passwordRequired"),
                  }))
                }
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
            {t("auth.login.submit")}
          </Button>
        </form>

        <p className="mt-6 text-sm text-ink-muted">
          {t("auth.login.noAccount")}{" "}
          <Link to="/registro" className="font-medium text-primary underline-offset-4 hover:underline">
            {t("auth.login.createAccount")}
          </Link>
        </p>
      </div>
    </PublicLayout>
  );
}
