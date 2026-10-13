import { useEffect, useRef, useState } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Treatments } from "./Treatments";
import { Steps } from "./Steps";
import { Faq } from "./Faq";
import { Booking } from "./Booking";
import { Footer } from "./Footer";
import { Overlays } from "./Overlays";
import { ScrollStroke } from "./ScrollStroke";
import { initSmoothScroll } from "@/lib/smooth-scroll";
import type { Copy } from "@/content/types";
export function LandingPage({ c }: { c: Copy }) {
  const [legal, setLegal] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => {
    document.documentElement.lang = c.language;
  }, [c.language]);
  useEffect(() => initSmoothScroll(), []);
  return (
    <>
      <a className="skip-link" href="#main">
        {c.skip}
      </a>
      <Header c={c} />
      <main id="main" ref={mainRef} className="relative">
        <ScrollStroke target={mainRef} />
        <Hero c={c} />
        <Treatments c={c} />
        <Steps c={c} />
        <Faq c={c} />
        <Booking c={c} onLegal={() => setLegal(true)} />
      </main>
      <Footer c={c} onLegal={() => setLegal(true)} />
      <Overlays c={c} legalOpen={legal} setLegalOpen={setLegal} />
    </>
  );
}
