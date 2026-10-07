import {
  CalendarCheck,
  Languages,
  MapPin,
  ShieldCheck,
  UserCheck,
  Hotel,
  CheckCircle2,
  ArrowDown,
} from "lucide-react";
import heroSmile from "@/assets/hero-smile.jpg";
import { Cta, WHATSAPP } from "./shared";
import { track } from "@/lib/marketing";
import type { Copy } from "@/content/types";
const ICONS = [CalendarCheck, Hotel, UserCheck, Languages];
export function Hero({ c }: { c: Copy }) {
  return (
    <>
      <section id="top" className="hero" aria-labelledby="hero-title">
        <img
          className="hero-photo"
          src={heroSmile}
          alt=""
          fetchPriority="high"
          width={1920}
          height={1080}
        />
        <div className="location-stamp" aria-hidden="true">
          <small>AGADIR</small>
          <span className="serif">Maroc</span>
          <small>{c.hero.location}</small>
        </div>
        <div className="container-wide hero-content">
          <div className="hero-text">
            <span className="eyebrow">{c.hero.label}</span>
            <h1 id="hero-title">
              {c.hero.lines[0]}
              <br />
              {c.hero.lines[1]}
              <span className="serif">
                {c.hero.accent}
                <svg
                  className="hand-line"
                  viewBox="0 0 300 10"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M2 7 C60 1 160 1 298 5" />
                </svg>
              </span>
            </h1>
            <p className="hero-description">{c.hero.description}</p>
            <div className="hero-actions">
              <Cta section="hero">{c.hero.cta}</Cta>
              <a
                className="line-button brand-button-ghost inline-flex items-center justify-center"
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("whatsapp_click", { section: "hero" })}
                style={{ border: "1px solid currentColor", minHeight: 50, padding: "15px 16px" }}
              >
                {c.whatsapp}
              </a>
            </div>
            <div className="hero-reassurance">
              <span>
                <CheckCircle2 />
                {c.noCommitment}
              </span>
              <span>
                <ShieldCheck />
                {c.hero.response}
              </span>
            </div>
          </div>
        </div>
        <div className="photo-note">
          <MapPin size={14} />
          {c.footer.address}
        </div>
        <div className="scroll-note">
          <ArrowDown size={12} />
          {c.hero.scroll}
        </div>
      </section>
      <section className="trust-strip" aria-label={c.trust[0]?.title}>
        <div className="container-wide trust-inner">
          {c.trust.map((t, i) => {
            const I = ICONS[i]!;
            return (
              <div key={t.title} className="trust-item">
                <I />
                <div>
                  <b>{t.title}</b>
                  {t.detail}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
