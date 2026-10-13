import { motion, useScroll, useSpring } from "framer-motion";
import type { RefObject } from "react";

// Decorative hand-drawn stroke that draws itself along the right edge as the page scrolls.
const PATH =
  "M120 0C60 90 190 170 130 270C70 370 20 420 90 520C160 620 190 640 120 760C50 880 20 950 100 1060C180 1170 200 1210 130 1320C60 1430 30 1500 110 1610C190 1720 190 1770 120 1880C50 1990 40 2060 110 2170C170 2270 180 2330 120 2440C80 2520 90 2580 120 2660C160 2740 80 2800 110 2900C130 2960 100 2990 100 3000";

export function ScrollStroke({ target }: { target: RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({ target, offset: ["start 80%", "end 60%"] });
  const pathLength = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  // Hidden by CSS under reduced motion; always rendered so server and client HTML match.
  return (
    <svg
      className="scroll-stroke"
      viewBox="0 0 200 3000"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <motion.path
        d={PATH}
        stroke="var(--teal-light)"
        strokeWidth={7}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        style={{ pathLength }}
      />
    </svg>
  );
}
