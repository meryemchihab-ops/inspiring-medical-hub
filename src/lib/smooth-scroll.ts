import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

const HEADER_HEIGHT = 91;
let lenis: Lenis | null = null;

export const scrollToY = (y: number) =>
  lenis ? lenis.scrollTo(y, { duration: 1.1 }) : window.scrollTo({ top: y, behavior: "smooth" });

// Lenis smooth scroll driven by the GSAP ticker so ScrollTrigger stays in sync.
// Skipped entirely for visitors who prefer reduced motion.
export function initSmoothScroll() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const instance = new Lenis({ anchors: { offset: -HEADER_HEIGHT } });
  lenis = instance;
  instance.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => instance.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  // Radix locks the body while a dialog or sheet is open; keep the page still behind it.
  const lock = new MutationObserver(() =>
    document.body.hasAttribute("data-scroll-locked") ? instance.stop() : instance.start(),
  );
  lock.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked"] });
  void document.fonts.ready.then(() => ScrollTrigger.refresh());
  return () => {
    lock.disconnect();
    gsap.ticker.remove(tick);
    instance.destroy();
    lenis = null;
  };
}
