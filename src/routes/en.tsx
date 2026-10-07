import { createFileRoute } from "@tanstack/react-router";
import { en } from "@/content/en";
import { medicalBayHead } from "@/lib/medicalbay-head";
import { LandingPage } from "@/sections/LandingPage";

export const Route = createFileRoute("/en")({
  head: () => medicalBayHead(en, "/en"),
  component: () => <LandingPage c={en} />,
});
