import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TrustedBySection from "@/components/sections/TrustedBySection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ToolsSection from "@/components/sections/ToolsSection";
import SourcesSection from "@/components/sections/SourcesSection";
import PricingSection from "@/components/sections/PricingSection";
import IndustriesSection from "@/components/sections/IndustriesSection";
import StatsSection from "@/components/sections/StatsSection";
import FinalCtaSection from "@/components/sections/FinalCtaSection";

import WhatsAppFab from "@/components/sections/WhatsAppFab";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <TrustedBySection />
      <FeaturesSection />
      <ToolsSection />
      <SourcesSection />
      <PricingSection />
      <IndustriesSection />
      <StatsSection />
      <FinalCtaSection />

      <WhatsAppFab />
    </main>
  );
}
