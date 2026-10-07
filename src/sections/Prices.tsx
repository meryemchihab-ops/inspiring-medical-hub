import deco07 from "@/assets/deco/deco-07.webp";
import { Cta, Deco } from "./shared";
import type { Copy } from "@/content/types";
export function Prices({ c }: { c: Copy }) {
  const p = c.prices;
  return (
    <section
      id="tarifs"
      aria-labelledby="prices-title"
      className="price-section section-pad deco-host"
    >
      <Deco src={deco07} name="rings" w={1100} h={1100} />
      <div className="container-wide price-layout">
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
          <div className="savings-number" aria-label={`${p.upTo} 70%`}>
            <small
              style={{
                fontStyle: "normal",
                fontFamily: "var(--font-display)",
                fontSize: 12,
                display: "block",
              }}
            >
              {p.upTo}
            </small>
            70<small>%</small>
          </div>
          <p>{p.saving}</p>
          <Cta section="prices" variant="brand">
            {p.cta}
          </Cta>
        </div>
        <div>
          {p.rows.map((r) => (
            <div key={r.name} className="price-row">
              <h3>{r.name}</h3>
              <div className="bar-line">
                <span>{p.europe}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: "100%" }} />
                </div>
                <span className="price-value">{r.eu}</span>
              </div>
              <div className="bar-line">
                <span>{p.morocco}</span>
                <div className="bar-track">
                  <div className="bar-fill morocco" style={{ width: `${r.ratio}%` }} />
                </div>
                <span className="price-value">{r.ma}</span>
              </div>
            </div>
          ))}
          <p className="price-footnote">
            {p.footnote}
            <br />
            {p.source}
          </p>
        </div>
      </div>
    </section>
  );
}
