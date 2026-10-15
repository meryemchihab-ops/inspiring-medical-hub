import { Home, MapPin, Plane } from "lucide-react";
import deco07 from "@/assets/deco/deco-07.webp";
import { Cta, Deco } from "./shared";
import type { Copy } from "@/content/types";
const audienceIcons = [Plane, MapPin, Home];
export function Prices({ c }: { c: Copy }) {
  const p = c.prices;
  const number = new Intl.NumberFormat(c.language === "fr" ? "fr-FR" : "en-GB");
  return (
    <section
      id="tarifs"
      aria-labelledby="prices-title"
      className="price-section section-pad deco-host"
    >
      <Deco src={deco07} name="rings" w={1100} h={1100} />
      <div className="container-wide">
        <div className="price-top">
          <div className="price-intro">
            <span className="eyebrow" style={{ color: "var(--teal-light)" }}>
              {p.label}
            </span>
            <h2 id="prices-title" className="section-heading">
              {p.title}
              <br />
              <span className="serif">{p.accent}</span>
            </h2>
            <p>{p.intro}</p>
            <Cta section="prices" variant="brand">
              {p.cta}
            </Cta>
          </div>
          <ul className="price-audience">
            {p.audience.map((a, i) => {
              const Icon = audienceIcons[i] ?? MapPin;
              return (
                <li key={a.title}>
                  <Icon aria-hidden="true" />
                  <div>
                    <strong>{a.title}</strong>
                    <span>{a.detail}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="price-board">
          <div className="price-free">
            <div>
              <strong>{p.free}</strong>
              <span>{p.freeDetail}</span>
            </div>
            <span className="price-free-value">0 {p.currency}</span>
          </div>
          <p className="price-same">{p.same}</p>
          <div className="price-groups">
            {p.groups.map((g) => (
              <div key={g.title} className="price-group">
                <h3>{g.title}</h3>
                <dl>
                  {g.rows.map((r) => (
                    <div key={r.name} className="price-item">
                      <dt>{r.name}</dt>
                      <dd>
                        {number.format(r.price)} {p.currency}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <p className="price-footnote">
            {p.footnote} {p.source}
          </p>
        </div>
      </div>
    </section>
  );
}
