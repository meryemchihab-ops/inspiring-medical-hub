import logoMark from "@/assets/logo-mark.png";
import { MapPin, ArrowUpRight } from "lucide-react";
import pebbles from "@/assets/deco/corner-pebbles.webp";
import { Button } from "@/components/ui/button";
import { Deco, GOOGLE_PLACE } from "./shared";
import type { Copy } from "@/content/types";
const ANCHORS = ["#soins", "#parcours", "#faq"];
const MAP_EMBED = "https://www.google.com/maps?q=MEDICAL+BAY+Agadir@30.4013031,-9.5850907&z=16&output=embed";

function FooterMap({ c }: { c: Copy }) {
  const f = c.footer;
  return (
    <section className="footer-map" aria-label={f.mapTitle}>
      <iframe
        title={f.mapTitle}
        src={MAP_EMBED}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div className="footer-map-card">
        <MapPin aria-hidden="true" />
        <div>
          <h3>{f.mapTitle}</h3>
          <p>{f.address}</p>
          <a href={GOOGLE_PLACE} target="_blank" rel="noreferrer" className="text-link">
            {f.mapOpen} <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer({ c, onLegal }: { c: Copy; onLegal: () => void }) {
  return (
    <footer className="footer deco-host">
      <Deco src={pebbles} name="pebbles" w={800} h={800} />
      <div className="container-wide">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#top" className="footer-logo" aria-label="Medical Bay">
              <img src={logoMark} alt="" width={70} height={36} loading="lazy" />
              <span>
                <strong>Medical Bay</strong>
                <small>AGADIR · MOROCCO</small>
              </span>
            </a>
            <p className="footer-slogan serif">{c.footer.slogan}</p>
          </div>
          <nav aria-label={c.footer.explore}>
            <h3>{c.footer.explore}</h3>
            <div className="footer-contact">
              {c.nav.map((n, i) => (
                <a key={n} href={ANCHORS[i]}>
                  {n}
                </a>
              ))}
            </div>
          </nav>
          <div>
            <h3>{c.footer.contact}</h3>
            <address className="footer-contact not-italic">
              <a href="tel:+212668686800">+212 668 68 68 00</a>
              <a href="mailto:contact@medicalbay.ma">contact@medicalbay.ma</a>
              <a href={GOOGLE_PLACE} target="_blank" rel="noreferrer">
                {c.footer.address}
              </a>
              <a
                href="https://www.instagram.com/medicalbay.maroc/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </address>
          </div>
        </div>
        <FooterMap c={c} />
        <div className="footer-bottom">
          <div>
            <p>{c.footer.copyright}</p>
            <p>{c.footer.illustrations}</p>
            <p className="updated-note">{c.footer.updated}</p>
          </div>
          <div className="footer-legal">
            {c.footer.legal.map((l) => (
              <Button key={l} type="button" variant="link" onClick={onLegal}>
                {l}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
