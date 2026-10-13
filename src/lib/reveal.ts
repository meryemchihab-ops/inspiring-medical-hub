import type { PointerEvent, RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "./gsap";

const REDUCED_MOTION_OK = "(prefers-reduced-motion: no-preference)";

interface RevealOptions {
  y?: number;
  tilt?: boolean;
  stagger?: number;
  media?: string;
}

// Elements matching `selector` inside `scope` rise in, staggered, as they scroll into view.
// Skipped entirely when the visitor prefers reduced motion.
export function useScrollReveal(
  scope: RefObject<HTMLElement | null>,
  selector: string,
  { y = 56, tilt = true, stagger = 0.12, media = REDUCED_MOTION_OK }: RevealOptions = {},
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(media, () => {
        gsap.set(selector, {
          autoAlpha: 0,
          y,
          ...(tilt && { rotateX: -14, transformPerspective: 900 }),
        });
        ScrollTrigger.batch(selector, {
          start: "top 88%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, {
              autoAlpha: 1,
              y: 0,
              rotateX: 0,
              duration: 1.1,
              ease: "power3.out",
              stagger,
              overwrite: true,
              // Hand the transform back to CSS so hover effects keep working.
              onComplete: () => gsap.set(els, { clearProps: "all" }),
            }),
        });
      });
      return () => mm.revert();
    },
    { scope },
  );
}

// Feeds the cursor position to a card's CSS spotlight.
export function trackPointer(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}
