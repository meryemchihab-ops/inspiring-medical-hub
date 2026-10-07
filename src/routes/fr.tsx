import { createFileRoute } from "@tanstack/react-router";
import { fr } from "@/content/fr";
import { medicalBayHead } from "@/lib/medicalbay-head";
import { LandingPage } from "@/sections/LandingPage";

export const Route = createFileRoute("/fr")({
  head: () => medicalBayHead(fr, "/fr"),
  component: () => <LandingPage c={fr} />,
});
