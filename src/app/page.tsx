import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TrustedBySection from "@/components/sections/TrustedBySection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import SourcesSection from "@/components/sections/SourcesSection";
import NotificationSection from "@/components/sections/NotificationSection";
import PricingSection from "@/components/sections/PricingSection";
import IndustriesSection from "@/components/sections/IndustriesSection";
import StatsSection from "@/components/sections/StatsSection";
import FinalCtaSection from "@/components/sections/FinalCtaSection";
import Footer from "@/components/sections/Footer";
import WhatsAppFab from "@/components/sections/WhatsAppFab";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <TrustedBySection />
      <FeaturesSection />
      <SourcesSection />
      <NotificationSection />
      <PricingSection />
      <IndustriesSection />
      <StatsSection />
      <FinalCtaSection />
      <Footer />
      <WhatsAppFab />
    </main>
  );
}
