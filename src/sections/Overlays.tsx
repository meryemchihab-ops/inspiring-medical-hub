import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import welcomeArt from "@/assets/hero-agadir-beach.webp";
import { Cta, WHATSAPP, WhatsAppIcon } from "./shared";
import { track } from "@/lib/marketing";
import type { Copy } from "@/content/types";
const readConsent = () =>
  document.cookie
    .split("; ")
    .find((x) => x.startsWith("mb_consent="))
    ?.split("=")[1];
export function Overlays({
  c,
  legalOpen,
  setLegalOpen,
}: {
  c: Copy;
  legalOpen: boolean;
  setLegalOpen: (v: boolean) => void;
}) {
  const [consent, setConsent] = useState(true);
  const [offer, setOffer] = useState(false);
  useEffect(() => {
    setConsent(!!readConsent());
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem("mb_offer") === "1";
    } catch {
      // Storage can be blocked (private mode); the welcome then simply shows again.
    }
    if (dismissed) return;
    // A short welcome a moment after arrival, once per browsing session.
    const t = window.setTimeout(() => {
      setOffer(true);
      track("offer_view", { lang: c.language });
    }, 2000);
    return () => window.clearTimeout(t);
  }, [c.language]);
  function choose(v: "accepted" | "declined") {
    document.cookie = `mb_consent=${v}; max-age=15552000; path=/; SameSite=Lax`;
    setConsent(true);
  }
  function closeOffer() {
    setOffer(false);
    try {
      sessionStorage.setItem("mb_offer", "1");
    } catch {
      // Storage can be blocked (private mode); the welcome then simply shows again.
    }
  }
  return (
    <>
      <a
        className="whatsapp-float"
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        aria-label={c.whatsapp}
        onClick={() => track("whatsapp_click", { section: "float" })}
      >
        <WhatsAppIcon />
      </a>
      <div className="mobile-bottom">
        <Button asChild variant="line">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("whatsapp_click", { section: "bottom" })}
          >
            {c.whatsapp}
          </a>
        </Button>
        <Cta section="bottom">{c.quote}</Cta>
      </div>
      {/* Held back while the welcome modal is open so the two never overlap. */}
      {!consent && !offer && (
        <div className="cookie-panel" role="dialog" aria-label="Cookies">
          <p>{c.consent.text}</p>
          <div className="cookie-panel-actions">
            <Button variant="brand" onClick={() => choose("accepted")}>
              {c.consent.accept}
            </Button>
            <Button variant="line" onClick={() => choose("declined")}>
              {c.consent.reject}
            </Button>
          </div>
        </div>
      )}
      <Dialog open={offer} onOpenChange={(open) => !open && closeOffer()}>
        <DialogContent className="welcome-modal">
          <img src={welcomeArt} alt="" width={896} height={1200} className="welcome-art" />
          <div className="welcome-body">
            <span className="eyebrow">{c.offer.label}</span>
            <DialogHeader>
              <DialogTitle className="welcome-title">{c.offer.title}</DialogTitle>
              <DialogDescription className="welcome-text">{c.offer.text}</DialogDescription>
            </DialogHeader>
            <ul className="welcome-points">
              {c.offer.points.map((p) => (
                <li key={p}>
                  <CheckCircle2 aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="welcome-actions" onClick={closeOffer}>
              <Cta section="offer">{c.offer.cta}</Cta>
              <Button asChild variant="line">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("whatsapp_click", { section: "offer" })}
                >
                  <WhatsAppIcon />
                  {c.whatsapp}
                </a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={legalOpen} onOpenChange={setLegalOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{c.legal.title}</DialogTitle>
          </DialogHeader>
          <div className="legal-copy">
            {c.legal.sections.map((s) => (
              <section key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </section>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
