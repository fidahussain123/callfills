import type { Metadata } from "next";
import PageHero from "@/components/sections/how-it-works/PageHero";
import TabNav from "@/components/sections/how-it-works/TabNav";
import SourcesSection from "@/components/sections/how-it-works/SourcesSection";
import DetectSection from "@/components/sections/how-it-works/DetectSection";
import FilterSection from "@/components/sections/how-it-works/FilterSection";
import EnrichSection from "@/components/sections/how-it-works/EnrichSection";
import DeliverSection from "@/components/sections/how-it-works/DeliverSection";
import FollowUpSection from "@/components/sections/how-it-works/FollowUpSection";
import HowItWorksCTA from "@/components/sections/how-it-works/HowItWorksCTA";

export const metadata: Metadata = {
  title: "How It Works — Callfills",
  description:
    "Exactly how Callfills finds your next customer. From a social media post to a verified lead on WhatsApp in under 60 seconds.",
};

export default function HowItWorksPage() {
  return (
    <main className="bg-white">
      <PageHero />
      <TabNav />
      <SourcesSection />
      <DetectSection />
      <FilterSection />
      <EnrichSection />
      <DeliverSection />
      <FollowUpSection />
      <HowItWorksCTA />
    </main>
  );
}
