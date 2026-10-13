import { useRef } from "react";
import { MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Heading, WHATSAPP } from "./shared";
import { track } from "@/lib/marketing";
import { useScrollReveal } from "@/lib/reveal";
import type { Copy } from "@/content/types";
export function Faq({ c }: { c: Copy }) {
  const f = c.faq;
  const root = useRef<HTMLElement>(null);
  useScrollReveal(root, ".faq-item", {
    y: 28,
    tilt: false,
    stagger: 0.07,
  });
  return (
    <section
      ref={root}
      id="faq"
      aria-labelledby="faq-title"
      className="faq-section section-pad deco-host"
    >
      <div className="container-wide faq-layout">
        <div className="faq-intro">
          <Heading id="faq-title" label={f.label} title={f.title} accent={f.accent} />
          <p>{f.intro}</p>
          <Button asChild variant="brand">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("whatsapp_click", { section: "faq" })}
            >
              <MessageCircle />
              {f.cta}
            </a>
          </Button>
        </div>
        <Accordion type="single" collapsible className="faq-list">
          {f.items.map((it, i) => (
            <AccordionItem key={it.q} value={`q${i}`} className="faq-item">
              <AccordionTrigger>{it.q}</AccordionTrigger>
              <AccordionContent>{it.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
