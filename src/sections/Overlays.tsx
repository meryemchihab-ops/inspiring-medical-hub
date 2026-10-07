import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Cta, WHATSAPP } from "./shared";
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
    } catch {}
    if (dismissed) return;
    const t = window.setTimeout(() => setOffer(true), 30000);
    return () => window.clearTimeout(t);
  }, []);
  function choose(v: "accepted" | "declined") {
    document.cookie = `mb_consent=${v}; max-age=15552000; path=/; SameSite=Lax`;
    setConsent(true);
  }
  function closeOffer() {
    setOffer(false);
    try {
      sessionStorage.setItem("mb_offer", "1");
    } catch {}
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
        <MessageCircle />
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
      {!consent && (
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
      {offer && (
        <aside className="offer-panel" aria-label={c.offer.title}>
          <Button
            variant="ghost"
            size="icon"
            className="offer-close"
            onClick={closeOffer}
            aria-label={c.offer.close}
          >
            <X />
          </Button>
          <h3>{c.offer.title}</h3>
          <p>{c.offer.text}</p>
          <div onClick={closeOffer}>
            <Cta section="offer">{c.offer.cta}</Cta>
          </div>
        </aside>
      )}
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
