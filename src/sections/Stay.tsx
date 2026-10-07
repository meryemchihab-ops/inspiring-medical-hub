import { Check } from "lucide-react";
import coast from "@/assets/agadir-coast.jpg";
import clinic from "@/assets/clinic.jpg";
import deco04 from "@/assets/deco/deco-04.webp";
import { Cta, Deco, Heading } from "./shared";
import type { Copy } from "@/content/types";
export function Stay({ c }: { c: Copy }) {
  const s = c.stay;
  return (
    <section
      id="sejour"
      aria-labelledby="stay-title"
      className="stay-section section-pad deco-host"
    >
      <Deco src={deco04} name="palm" w={800} h={1000} />
      <div className="container-wide">
        <div className="section-top">
          <div>
            <Heading id="stay-title" label={s.label} title={s.title} accent={s.accent} />
          </div>
          <div>
            <p>{s.intro}</p>
            <div className="mt-4">
              <Cta section="stay" variant="line">
                {s.cta}
              </Cta>
            </div>
          </div>
        </div>
        <div className="stay-mosaic">
          <div className="stay-coast">
            <img src={coast} alt="" loading="lazy" width={1200} height={800} />
            <div className="stay-caption">
              <p className="serif">{s.caption}</p>
            </div>
          </div>
          <div className="stay-clinic">
            <img src={clinic} alt="" loading="lazy" width={600} height={400} />
          </div>
          <div className="stay-note">
            <p className="serif">A→Z</p>
            <p>{s.note}</p>
          </div>
        </div>
        <div className="included-strip">
          {s.included.map((i) => (
            <span key={i}>
              <Check />
              {i}
            </span>
          ))}
        </div>
        <p className="image-disclaimer mt-4">{c.footer.illustrations}</p>
      </div>
    </section>
  );
}
