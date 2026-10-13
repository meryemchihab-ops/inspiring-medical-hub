import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/marketing";
export const WHATSAPP = "https://wa.me/212668686800";
export const GOOGLE_PLACE =
  "https://www.google.com/maps/place/MEDICAL+BAY/@30.4013031,-9.5850907,16z/data=!4m6!3m5!1s0xdb3b7b2e1d594fb:0x5d7f0a6bf528be4a!8m2!3d30.4013031!4d-9.5850907";
export const GOOGLE_REVIEWS = "https://maps.app.goo.gl/q1mYnK3wzS7SRhkcA";
// Copied from the Google Business profile; update when the rating or count changes.
export const GOOGLE_RATING = 4.7;
export const GOOGLE_REVIEW_COUNT = 13;
export function Cta({
  section,
  variant = "brand",
  children,
  href = "#reserver",
}: {
  section: string;
  variant?: "brand" | "light" | "line";
  children: ReactNode;
  href?: string;
}) {
  return (
    <Button asChild variant={variant}>
      <a href={href} onClick={() => track("cta_click", { section })}>
        {children}
        <ArrowUpRight />
      </a>
    </Button>
  );
}
export function Heading({
  id,
  label,
  title,
  accent,
}: {
  id: string;
  label?: string;
  title: string;
  accent: string;
}) {
  return (
    <>
      {label && <span className="eyebrow">{label}</span>}
      <h2 id={id} className={label ? "section-heading mt-5" : "section-heading"}>
        {title}
        <br />
        <span className="serif">{accent}</span>
      </h2>
    </>
  );
}

export function Deco({ src, name, w, h }: { src: string; name: string; w: number; h: number }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      width={w}
      height={h}
      loading="lazy"
      decoding="async"
      className={`deco deco-${name}`}
    />
  );
}
