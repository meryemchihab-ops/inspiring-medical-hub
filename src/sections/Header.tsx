import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Cta } from "./shared";
import logoMark from "@/assets/logo-mark.png";
import type { Copy } from "@/content/types";
const ANCHORS = ["#soins", "#parcours", "#faq"];
export function Header({ c }: { c: Copy }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container-wide header-inner">
        <a href="#top" className="brand-lockup" aria-label="Medical Bay">
          <span className="logo-window">
            <img src={logoMark} alt="" width={70} height={36} />
          </span>
          <span>
            <strong>Medical Bay</strong>
            <small>AGADIR · MOROCCO</small>
          </span>
        </a>
        <nav className="nav-links" aria-label="Main">
          {c.nav.map((n, i) => (
            <a key={n} href={ANCHORS[i]}>
              {n}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <div className="language-toggle" role="group" aria-label="Language">
            <Link
              to="/fr"
              hrefLang="fr"
              className={c.language === "fr" ? "selected" : ""}
              aria-current={c.language === "fr" ? "true" : undefined}
            >
              FR
            </Link>
            <span aria-hidden="true">|</span>
            <Link
              to="/en"
              hrefLang="en"
              className={c.language === "en" ? "selected" : ""}
              aria-current={c.language === "en" ? "true" : undefined}
            >
              EN
            </Link>
          </div>
          <Cta section="header">{c.quote}</Cta>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="header-menu" aria-label="Menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-12 flex flex-col px-6" aria-label="Mobile">
                {c.nav.map((n, i) => (
                  <a
                    key={n}
                    href={ANCHORS[i]}
                    onClick={() => setOpen(false)}
                    className="border-b py-4 font-[var(--font-display)] text-sm font-semibold"
                  >
                    {n}
                  </a>
                ))}
                <div className="mt-6" onClick={() => setOpen(false)}>
                  <Cta section="menu">{c.quote}</Cta>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
