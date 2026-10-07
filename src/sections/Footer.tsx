import logoFull from "@/assets/logo-full-light.png";
import pebbles from "@/assets/deco/corner-pebbles.webp";
import { Button } from "@/components/ui/button";
import { Deco } from "./shared";
import type { Copy } from "@/content/types";
const ANCHORS = ["#soins", "#sejour", "#parcours", "#faq"];
export function Footer({ c, onLegal }: { c: Copy; onLegal: () => void }) {
  return (
    <footer className="footer deco-host">
      <div className="footer-skyline" aria-hidden="true" />
      <Deco src={pebbles} name="pebbles" w={800} h={800} />
      <div className="container-wide">
        <div className="footer-main">
          <div className="footer-brand">
            <img
              className="footer-logo"
              src={logoFull}
              alt="Medical Bay — Votre partenaire de santé"
              width={190}
              height={159}
              loading="lazy"
            />
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
              <span>{c.footer.address}</span>
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
