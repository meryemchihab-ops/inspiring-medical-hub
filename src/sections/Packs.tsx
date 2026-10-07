import { Check } from "lucide-react";
import deco03 from "@/assets/deco/deco-03.webp";
import { Cta, Deco, Heading } from "./shared";
import type { Copy } from "@/content/types";
export function Packs({ c }: { c: Copy }) {
  const p = c.packs;
  return (
    <section
      id="projets"
      aria-labelledby="packs-title"
      className="packs-section section-pad deco-host"
    >
      <Deco src={deco03} name="border" w={2400} h={240} />
      <div className="container-wide">
        <Heading id="packs-title" label={p.label} title={p.title} accent={p.accent} />
        <p className="mt-5 max-w-md text-sm" style={{ color: "var(--slate)" }}>
          {p.intro}
        </p>
        <div className="pack-grid">
          {p.items.map((it, i) => {
            const f = i === 1;
            return (
              <article key={it.name} className={`pack-card${f ? " featured" : ""}`}>
                {f && <div className="pack-badge">{p.badge}</div>}
                <p className="serif" aria-hidden="true">
                  0{i + 1}
                </p>
                <h3>{it.name}</h3>
                <p>{it.description}</p>
                <div className="pack-price">{p.price}</div>
                <ul>
                  {p.features.map((x) => (
                    <li key={x}>
                      <Check />
                      {x}
                    </li>
                  ))}
                </ul>
                <Cta section={`pack-${i}`} variant={f ? "brand" : "line"}>
                  {p.cta}
                </Cta>
              </article>
            );
          })}
        </div>
        <details className="pack-comparison">
          <summary>{p.compare}</summary>
          <table>
            <thead>
              <tr>
                <th scope="col" />
                {p.items.map((i) => (
                  <th scope="col" key={i.name}>
                    {i.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {p.features.map((f) => (
                <tr key={f}>
                  <th scope="row">{f}</th>
                  {p.items.map((i) => (
                    <td key={i.name}>
                      <Check size={14} aria-label="✓" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </details>
        <p className="mt-5 text-xs" style={{ color: "var(--slate)" }}>
          {p.condition}
        </p>
      </div>
    </section>
  );
}
