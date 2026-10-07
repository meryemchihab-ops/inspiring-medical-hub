import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Treatments } from "./Treatments";
import { Prices } from "./Prices";
import { Smile } from "./Smile";
import { Steps } from "./Steps";
import { Stay } from "./Stay";
import { Packs } from "./Packs";
import { Assurance } from "./Assurance";
import { Clinic } from "./Clinic";
import { Faq } from "./Faq";
import { Booking } from "./Booking";
import { Footer } from "./Footer";
import { Overlays } from "./Overlays";
import type { Copy } from "@/content/types";
export function LandingPage({ c }: { c: Copy }) {
  const [legal, setLegal] = useState(false);
  useEffect(() => {
    document.documentElement.lang = c.language;
  }, [c.language]);
  return (
    <>
      <a className="skip-link" href="#main">
        {c.skip}
      </a>
      <Header c={c} />
      <main id="main">
        <Hero c={c} />
        <Treatments c={c} />
        <Prices c={c} />
        <Smile c={c} />
        <Steps c={c} />
        <Stay c={c} />
        <Packs c={c} />
        <Assurance c={c} />
        <Clinic c={c} />
        <Faq c={c} />
        <Booking c={c} onLegal={() => setLegal(true)} />
      </main>
      <Footer c={c} onLegal={() => setLegal(true)} />
      <Overlays c={c} legalOpen={legal} setLegalOpen={setLegal} />
    </>
  );
}
