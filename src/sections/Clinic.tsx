import { FileText, HeartHandshake, ShieldCheck } from "lucide-react";
import clinic from "@/assets/clinic.jpg";
import deco10 from "@/assets/deco/deco-10.webp";
import { Cta, Deco, Heading } from "./shared";
import type { Copy } from "@/content/types";
const ICONS = [FileText, ShieldCheck, HeartHandshake];
export function Clinic({ c }: { c: Copy }) {
  const s = c.clinic;
  return (
    <section id="equipe" aria-labelledby="clinic-title" className="section-pad deco-host">
      <div className="container-wide clinic-layout">
        <div>
          <div className="clinic-picture">
            <Deco src={deco10} name="stamp" w={900} h={900} />
            <img src={clinic} alt="" loading="lazy" width={800} height={860} />
            <p className="serif">{s.caption}</p>
          </div>
          <p className="image-disclaimer mt-3">{c.footer.illustrations}</p>
        </div>
        <div className="clinic-copy">
          <Heading id="clinic-title" label={s.label} title={s.title} accent={s.accent} />
          <p>{s.intro}</p>
          {s.items.map((it, i) => {
            const I = ICONS[i]!;
            return (
              <div key={it.title} className="guarantee-row">
                <I />
                <div>
                  <h3>{it.title}</h3>
                  <p>{it.description}</p>
                </div>
              </div>
            );
          })}
          <Cta section="clinic" variant="line">
            {s.cta}
          </Cta>
        </div>
      </div>
    </section>
  );
}
