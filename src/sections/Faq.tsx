import { MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import deco09 from "@/assets/deco/deco-09.webp";
import deco11 from "@/assets/deco/deco-11.webp";
import { Deco, Heading, WHATSAPP } from "./shared";
import { track } from "@/lib/marketing";
import type { Copy } from "@/content/types";
export function Faq({ c }: { c: Copy }) {
  const f = c.faq;
  return (
    <section id="faq" aria-labelledby="faq-title" className="faq-section section-pad deco-host">
      <Deco src={deco09} name="dune" w={2400} h={500} />
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
          <Deco src={deco11} name="float" w={1000} h={1400} />
        </div>
        <Accordion type="single" collapsible className="faq-list">
          {f.items.map((it, i) => (
            <AccordionItem key={it.q} value={`q${i}`}>
              <AccordionTrigger>{it.q}</AccordionTrigger>
              <AccordionContent>{it.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
