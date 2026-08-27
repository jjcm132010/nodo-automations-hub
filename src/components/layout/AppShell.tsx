import { Link, useNavigate } from "@tanstack/react-router";
import {
  GraduationCap,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Receipt,
  Settings,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/services/auth";

const NAV = [
  { key: "app.nav.dashboard", Icon: LayoutDashboard },
  { key: "app.nav.requests", Icon: ListChecks },
  { key: "app.nav.experts", Icon: Users },
  { key: "app.nav.academy", Icon: GraduationCap },
  { key: "app.nav.billing", Icon: Receipt },
  { key: "app.nav.settings", Icon: Settings },
] as const;

export function AppShell({ children, initials }: { children: ReactNode; initials: string }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    void navigate({ to: "/login", replace: true });
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Escritorio: sidebar. Móvil: navegación inferior. */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-surface p-4 lg:flex">
        <Link to="/" className="mb-8 px-2 text-xl font-semibold tracking-tight text-ink">
          {t("brand.name")}
          <span className="text-accent">.</span>
        </Link>
        <nav className="flex flex-col gap-1" aria-label={t("app.title")}>
          {NAV.map(({ key, Icon }, index) => (
            <span
              key={key}
              aria-current={index === 0 ? "page" : undefined}
              className={
                index === 0
                  ? "flex min-h-11 items-center gap-3 rounded-[var(--radius-md)] bg-surface-muted px-3 text-sm font-medium text-ink"
                  : "flex min-h-11 items-center gap-3 rounded-[var(--radius-md)] px-3 text-sm text-ink-muted"
              }
            >
              <Icon className="size-4" />
              {t(key)}
            </span>
          ))}
        </nav>
        <div className="mt-auto flex items-center gap-2 pt-6">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-border bg-surface px-4 py-3 sm:px-6">
          <Link to="/" className="text-lg font-semibold tracking-tight text-ink lg:hidden">
            {t("brand.name")}
            <span className="text-accent">.</span>
          </Link>
          <h1 className="hidden text-lg font-medium text-ink lg:block">{t("app.title")}</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-11 rounded-[var(--radius-pill)] p-0">
                <Avatar className="size-9">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">{t("app.account.menu")}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("app.account.menu")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>{t("app.account.profile")}</DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="size-4" />
                {t("app.account.signOut")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 px-4 pt-6 pb-24 sm:px-6 lg:pb-12">{children}</main>

        <nav
          className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-surface lg:hidden"
          aria-label={t("app.title")}
        >
          {NAV.slice(0, 4).map(({ key, Icon }, index) => (
            <span
              key={key}
              aria-current={index === 0 ? "page" : undefined}
              className={
                index === 0
                  ? "flex min-h-14 flex-1 flex-col items-center justify-center gap-1 text-xs font-medium text-primary"
                  : "flex min-h-14 flex-1 flex-col items-center justify-center gap-1 text-xs text-ink-muted"
              }
            >
              <Icon className="size-5" />
              {t(key)}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}
