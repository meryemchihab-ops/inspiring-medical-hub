import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/marketing";
export const WHATSAPP = "https://wa.me/212668686800";
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
