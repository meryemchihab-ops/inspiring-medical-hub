import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { Cta, Heading } from "./shared";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Copy } from "@/content/types";

const ROW = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const STACK = "(max-width: 1023px) and (prefers-reduced-motion: no-preference)";

export function Steps({ c }: { c: Copy }) {
  const s = c.steps;
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Each step lights up in turn: its number pops, the card rises, then the link to the
      // next step draws across (sideways on desktop, downwards when the steps stack).
      const play = (axis: "scaleX" | "scaleY") => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ".tl-list", start: "top 75%", once: true },
        });
        gsap.utils.toArray<HTMLElement>(".tl-item").forEach((item, i) => {
          const at = i * 0.35;
          tl.from(
            item.querySelector(".tl-node"),
            { scale: 0.4, autoAlpha: 0, duration: 0.45, ease: "back.out(2.2)" },
            at,
          ).from(
            item.querySelector(".tl-card"),
            { y: 28, autoAlpha: 0, duration: 0.7, ease: "power2.out" },
            at + 0.1,
          );
          const fill = item.querySelector(".tl-link > span");
          if (fill) tl.from(fill, { [axis]: 0, duration: 0.5, ease: "power1.inOut" }, at + 0.3);
        });
      };
      mm.add(ROW, () => play("scaleX"));
      mm.add(STACK, () => play("scaleY"));
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <section
      ref={root}
      id="parcours"
      aria-labelledby="steps-title"
      className="steps-section timeline-section"
    >
      <div className="container-wide">
        <div className="section-top tl-head">
          <div>
            <Heading id="steps-title" label={s.label} title={s.title} accent={s.accent} />
          </div>
          <div>
            <p>{s.intro}</p>
            <div className="mt-5">
              <Cta section="steps">{s.cta}</Cta>
            </div>
          </div>
        </div>
        <ol className="tl-list">
          {s.items.map((it, i) => (
            <li key={it.title} className="tl-item">
              <span className="tl-node" aria-hidden="true">
                0{i + 1}
              </span>
              {i < s.items.length - 1 && (
                <span className="tl-link" aria-hidden="true">
                  <span />
                </span>
              )}
              <div className="tl-card">
                <h3>{it.title}</h3>
                <p>{it.description}</p>
                <span className="tl-chip">
                  <CheckCircle2 size={13} />
                  {it.deliverable}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
