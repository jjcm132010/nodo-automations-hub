import { useTranslation } from "react-i18next";

import { Section, SectionHeader } from "@/components/marketing/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq({ title }: { title?: string }) {
  const { t } = useTranslation();
  const items = t("home.faq.items", { returnObjects: true }) as Array<{ q: string; a: string }>;

  return (
    <Section className="bg-surface-muted">
      <SectionHeader title={title ?? t("home.faq.title")} />
      <Accordion type="single" collapsible className="mt-12 max-w-[70ch]">
        {items.map((item) => (
          <AccordionItem key={item.q} value={item.q}>
            <AccordionTrigger className="text-left text-base text-ink">{item.q}</AccordionTrigger>
            <AccordionContent className="text-sm text-ink-muted">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
