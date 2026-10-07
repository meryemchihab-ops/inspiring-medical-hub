import { useState } from "react";
import smileDetail from "@/assets/smile-detail.jpg";
import deco05 from "@/assets/deco/deco-05.webp";
import { Cta, Deco, Heading } from "./shared";
import type { Copy } from "@/content/types";
export function Smile({ c }: { c: Copy }) {
  const [tab, setTab] = useState(0);
  const s = c.smile;
  return (
    <section
      id="sourire"
      aria-labelledby="smile-title"
      className="smile-section section-pad deco-host"
    >
      <Deco src={deco05} name="sparkle" w={1000} h={1000} />
      <div className="container-wide smile-layout">
        <div>
          <div className="smile-photo">
            <img
              src={smileDetail}
              alt=""
              loading="lazy"
              width={800}
              height={600}
              style={{ objectPosition: "center 30%" }}
            />
          </div>
          <p className="image-disclaimer">{s.disclaimer}</p>
        </div>
        <div className="smile-text">
          <Heading id="smile-title" label={s.label} title={s.title} accent={s.accent} />
          <p>{s.description}</p>
          <div className="detail-tabs" role="tablist">
            {s.tabs.map((t, i) => (
              <button
                key={t}
                type="button"
                role="tab"
                id={`smile-tab-${i}`}
                aria-selected={tab === i}
                aria-controls="smile-panel"
                onClick={() => setTab(i)}
              >
                {t}
              </button>
            ))}
          </div>
          <p
            key={tab}
            id="smile-panel"
            className="tab-fade"
            role="tabpanel"
            aria-labelledby={`smile-tab-${tab}`}
          >
            {s.details[tab]}
          </p>
          <Cta section="smile">{s.cta}</Cta>
        </div>
      </div>
    </section>
  );
}
