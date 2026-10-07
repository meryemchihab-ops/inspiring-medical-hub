import { createFileRoute } from "@tanstack/react-router";
import { fr } from "@/content/fr";
import { medicalBayHead } from "@/lib/medicalbay-head";
import { LandingPage } from "@/sections/LandingPage";

// The root URL serves the French page (primary market); /fr and /en share the same composition.
export const Route = createFileRoute("/")({
  head: () => medicalBayHead(fr, "/"),
  component: () => <LandingPage c={fr} />,
});
