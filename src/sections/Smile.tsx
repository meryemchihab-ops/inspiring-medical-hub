import { motion, useReducedMotion } from "motion/react";
import smileDetail from "@/assets/smile-detail.jpg";
import deco05 from "@/assets/deco/deco-05.webp";
import { Cta, Deco, Heading } from "./shared";
import type { Copy } from "@/content/types";
export function Smile({ c }: { c: Copy }) {
  const s = c.smile;
  const reduce = useReducedMotion();
  const reveal = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 48, scale: 0.96 },
          whileInView: { opacity: 1, y: 0, scale: 1 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.7, delay: (i % 2) * 0.12, ease: [0.22, 1, 0.36, 1] as const },
        };
  return (
    <section
      id="sourire"
      aria-labelledby="smile-title"
      className="smile-section section-pad deco-host"
    >
      <Deco src={deco05} name="sparkle" w={1000} h={1000} />
      <div className="container-wide">
        <div className="smile-head">
          <Heading id="smile-title" label={s.label} title={s.title} accent={s.accent} />
          <p>{s.description}</p>
        </div>
        <div className="smile-cards">
          <motion.figure className="smile-card smile-card-photo" {...reveal(0)}>
            <img
              src={smileDetail}
              alt=""
              loading="lazy"
              width={800}
              height={600}
              style={{ objectPosition: "center 30%" }}
            />
          </motion.figure>
          {s.tabs.map((t, i) => (
            <motion.article key={t} className="smile-card" {...reveal(i + 1)}>
              <span className="smile-card-num serif">0{i + 1}</span>
              <h3>{t}</h3>
              <p>{s.details[i]}</p>
            </motion.article>
          ))}
        </div>
        <p className="image-disclaimer">{s.disclaimer}</p>
        <Cta section="smile">{s.cta}</Cta>
      </div>
    </section>
  );
}
