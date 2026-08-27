import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("border-t border-border", className)}>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-24">{children}</div>
    </section>
  );
}

export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="max-w-[46ch] space-y-3">
      <h2 className="text-3xl font-display sm:text-5xl">{title}</h2>
      {subtitle ? <p className="text-base text-ink-muted">{subtitle}</p> : null}
    </div>
  );
}
