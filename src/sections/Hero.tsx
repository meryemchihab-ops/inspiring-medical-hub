import {
  CalendarCheck,
  Languages,
  MapPin,
  ShieldCheck,
  UserCheck,
  Hotel,
  CheckCircle2,
} from "lucide-react";
import { useRef, type CSSProperties } from "react";
import heroArt from "@/assets/hero-agadir-beach.webp";
import stamp from "@/assets/agadir-stamp.webp";
import { Cta, GOOGLE_RATING, GOOGLE_REVIEWS, WHATSAPP } from "./shared";
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
            <img src={heroArt} alt="" width={896} height={1200} fetchPriority="high" />
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
            <a
              className="google-badge"
              href={GOOGLE_REVIEWS}
              target="_blank"
              rel="noreferrer"
              data-hero-in
              onClick={() => track("reviews_click", { section: "hero" })}
            >
              <GoogleMark />
              <b>{GOOGLE_RATING.toLocaleString(c.language === "fr" ? "fr-FR" : "en-GB")}</b>
              <span className="sr-only">/5</span>
              <span
                className="google-stars"
                style={{ "--fill": `${(GOOGLE_RATING / 5) * 100}%` } as CSSProperties}
                aria-hidden="true"
              />
              <span className="sr-only">{c.hero.reviews}</span>
            </a>
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

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}
