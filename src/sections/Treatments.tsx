import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import facettes from "@/assets/treatments/1-facettes.webp";
import implants from "@/assets/treatments/2-implants.webp";
import smileDesign from "@/assets/treatments/3-digital-smile-design.webp";
import zirconium from "@/assets/treatments/4-couronnes-zirconium.webp";
import ceramique from "@/assets/treatments/5-couronnes-ceramique.webp";
import aligneurs from "@/assets/treatments/6-aligneurs.webp";
import blanchiment from "@/assets/treatments/7-blanchiment.webp";
import { Cta } from "./shared";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Copy } from "@/content/types";

// One illustration per treatment, in the same order as the content items.
const ILLUSTRATIONS = [facettes, implants, smileDesign, zirconium, ceramique, aligneurs, blanchiment];

function Words({ children }: { children: string }) {
  return children.split(" ").map((word, i, all) => (
    <span key={i} className="word">
      {word}
      {i < all.length - 1 ? " " : ""}
    </span>
  ));
}

export function Treatments({ c }: { c: Copy }) {
  const [open, setOpen] = useState(0);
  const t = c.treatments;
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".word",
          { opacity: 0.18 },
          {
            opacity: 1,
            stagger: 0.12,
            ease: "none",
            scrollTrigger: {
              trigger: ".treatment-stage",
              start: "top 85%",
              end: "top 25%",
              scrub: true,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const select = (i: number) => setOpen(open === i ? -1 : i);

  return (
    <section id="soins" ref={root} aria-labelledby="treatments-title">
      <div className="treatment-stage">
        <div className="container-wide">
          <div className="treatment-head">
            <span className="eyebrow">{t.label}</span>
            <h2 id="treatments-title" className="section-heading mt-5">
              <Words>{t.title}</Words>
              <br />
              <span className="serif">
                <Words>{t.accent}</Words>
              </span>
            </h2>
            <p>{t.intro}</p>
          </div>
          <div className="treatment-visual" aria-hidden="true">
            {ILLUSTRATIONS.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                width={900}
                height={900}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                data-on={i === Math.max(open, 0)}
              />
            ))}
          </div>
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
                      onClick={() => select(i)}
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
            <p className="treatment-note">{t.note}</p>
          </div>
          <div className="visual-caption">
            <p className="serif">{t.caption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
