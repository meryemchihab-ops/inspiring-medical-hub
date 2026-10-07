import { CheckCircle2 } from "lucide-react";
import deco06 from "@/assets/deco/deco-06.webp";
import { Cta, Deco, Heading } from "./shared";
import type { Copy } from "@/content/types";
export function Steps({ c }: { c: Copy }) {
  const s = c.steps;
  return (
    <section
      id="parcours"
      aria-labelledby="steps-title"
      className="steps-section section-pad deco-host"
    >
      <div className="container-wide steps-layout">
        <div className="steps-intro">
          <Heading id="steps-title" label={s.label} title={s.title} accent={s.accent} />
          <p>{s.intro}</p>
          <Cta section="steps">{s.cta}</Cta>
          <Deco src={deco06} name="route" w={1400} h={700} />
        </div>
        <ol className="steps-list">
          {s.items.map((it, i) => (
            <li key={it.title} className="step-item">
              <span className="step-number" aria-hidden="true">
                0{i + 1}
              </span>
              <div>
                <h3>{it.title}</h3>
                <p>{it.description}</p>
                <span className="step-deliverable">
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
