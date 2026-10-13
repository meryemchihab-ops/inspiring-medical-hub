import {
  CalendarCheck,
  Languages,
  MapPin,
  ShieldCheck,
  UserCheck,
  Hotel,
  CheckCircle2,
} from "lucide-react";
import { useRef } from "react";
import heroArt from "@/assets/hero-illustration.webp";
import stamp from "@/assets/agadir-stamp.webp";
import { Cta, WHATSAPP } from "./shared";
import { gsap, useGSAP } from "@/lib/gsap";
import { track } from "@/lib/marketing";
import type { Copy } from "@/content/types";
const ICONS = [CalendarCheck, Hotel, UserCheck, Languages];
const HEADER_HEIGHT = 91;
export function Hero({ c }: { c: Copy }) {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = root.current!;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-line]", {
          yPercent: 115,
          duration: 1.2,
          stagger: 0.14,
          ease: "power4.out",
        });
        gsap.from("[data-hero-in]", {
          y: 30,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.09,
          delay: 0.5,
          ease: "power3.out",
        });
        gsap.from(".hand-line path", {
          strokeDashoffset: 1,
          duration: 1.1,
          delay: 1.1,
          ease: "power2.inOut",
        });
        gsap.from(frame.current, {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 1.6,
          ease: "power4.inOut",
        });
        gsap.from(".hero-frame img", { scale: 1.25, duration: 2.2, ease: "power3.out" });
      });
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const scrollOut = {
          trigger: el,
          start: `top ${HEADER_HEIGHT}px`,
          end: "bottom top",
          scrub: true,
        };
        gsap.to(".hero-frame img", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: scrollOut,
        });
        gsap.to(".hero-text", {
          yPercent: -10,
          autoAlpha: 0.15,
          ease: "none",
          scrollTrigger: scrollOut,
        });
      });
      // Content stays hidden by CSS until the entrance tweens above have taken over.
      el.setAttribute("data-motion", "ready");
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <>
      <section
        id="top"
        ref={root}
        className="hero"
        data-motion="pending"
        aria-labelledby="hero-title"
      >
        <div className="hero-stage" aria-hidden="true">
          <div ref={frame} className="hero-frame">
            <img src={heroArt} alt="" width={1152} height={1536} fetchPriority="high" />
          </div>
        </div>
        <div className="location-stamp" aria-hidden="true">
          <img src={stamp} alt="" width={400} height={400} />
          <svg viewBox="0 0 100 100" className="stamp-ring">
            <defs>
              <path id="stamp-circle" d="M50 50 m-42.5 0 a42.5 42.5 0 1 1 85 0 a42.5 42.5 0 1 1 -85 0" />
            </defs>
            <text>
              <textPath href="#stamp-circle" textLength={265} lengthAdjust="spacing">
                {`MEDICAL BAY · AGADIR · ${c.hero.location} · `}
              </textPath>
            </text>
          </svg>
        </div>
        <div className="container-wide hero-content">
          <div className="hero-text">
            <span className="eyebrow" data-hero-in>
              {c.hero.label}
            </span>
            <h1 id="hero-title">
              {c.hero.lines.map((line) => (
                <span key={line} className="reveal-line">
                  <span data-line>{line}</span>
                </span>
              ))}
              <span className="serif" data-hero-in>
                {c.hero.accent}
                <svg
                  className="hand-line"
                  viewBox="0 0 300 10"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M2 7 C60 1 160 1 298 5" pathLength={1} />
                </svg>
              </span>
            </h1>
            <p className="hero-description" data-hero-in>
              {c.hero.description}
            </p>
            <div className="hero-actions" data-hero-in>
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
            <div className="hero-reassurance" data-hero-in>
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
