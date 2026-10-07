import { useState } from "react";
import { Plus } from "lucide-react";
import smileDetail from "@/assets/smile-detail.jpg";
import deco01 from "@/assets/deco/deco-01.webp";
import deco02 from "@/assets/deco/deco-02.webp";
import { Cta, Deco, Heading } from "./shared";
import type { Copy } from "@/content/types";
export function Treatments({ c }: { c: Copy }) {
  const [open, setOpen] = useState(0);
  const t = c.treatments;
  return (
    <section id="soins" aria-labelledby="treatments-title" className="section-pad deco-host">
      <Deco src={deco01} name="wave" w={2400} h={300} />
      <Deco src={deco02} name="blob" w={1200} h={1200} />
      <div className="container-wide">
        <div className="section-top">
          <div>
            <Heading id="treatments-title" label={t.label} title={t.title} accent={t.accent} />
          </div>
          <p>{t.intro}</p>
        </div>
        <div className="treatment-layout">
          <div className="treatment-list">
            {t.items.map((it, i) => {
              const on = open === i;
              return (
                <div key={it.name} className={`treatment-row${on ? " treatment-active" : ""}`}>
                  <h3>
                    <button
                      type="button"
                      className="treatment-trigger"
                      aria-expanded={on}
                      aria-controls={`tr-${i}`}
                      onClick={() => setOpen(on ? -1 : i)}
                    >
                      <span className="treatment-number">0{i + 1}</span>
                      <strong>
                        {it.name}
                        {i === 0 && <span className="small-tag">{t.popular}</span>}
                      </strong>
                      <Plus aria-hidden="true" />
                    </button>
                  </h3>
                  <div id={`tr-${i}`} className="treatment-panel" data-open={on} inert={!on}>
                    <div className="treatment-panel-clip">
                      <div className="treatment-details">
                        <p className="serif">{it.tagline}</p>
                        <p>{it.description}</p>
                        <div className="mt-4">
                          <Cta section={`treatment-${i}`} variant="line">
                            {t.cta}
                          </Cta>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <p className="mt-6 text-xs" style={{ color: "var(--slate)" }}>
              {t.note}
            </p>
          </div>
          <div className="treatment-visual">
            <img src={smileDetail} alt="" loading="lazy" width={800} height={860} />
            <div className="visual-caption">
              <p className="serif" style={{ fontSize: 29, color: "inherit" }}>
                {t.caption}
              </p>
              <p>{c.footer.illustrations}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
