import { Cta } from "./shared";
import type { Copy } from "@/content/types";
export function Assurance({ c }: { c: Copy }) {
  return (
    <section className="assurance-band" aria-label={c.assurance.byline}>
      <div className="container-wide assurance-inner">
        <div>
          <span className="eyebrow">{c.assurance.byline}</span>
          <blockquote className="mt-5">{c.assurance.quote}</blockquote>
        </div>
        <Cta section="assurance" variant="light">
          {c.assurance.cta}
        </Cta>
      </div>
    </section>
  );
}
