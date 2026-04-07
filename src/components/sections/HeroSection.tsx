"use client";
import HeroGeometric from "@/components/ui/shape-landing-hero";

export default function HeroSection() {
  return (
    <section id="hero">
      <HeroGeometric
        badge=""
        title1="Find Every Lead."
        title2="Close Every Deal."
        subtitle="We watch Facebook, Reddit, Craigslist and Twitter 24/7. The moment someone posts 'need a plumber in Houston' — you get their verified details in under 60 seconds."
      >
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#cta"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-500 text-white font-bold rounded-xl hover:opacity-90 transition-all text-sm tracking-wide font-sans hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/25"
          >
            Start Free Trial
          </a>
          <a
            href="#how-it-works"
            className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-100 transition-all text-sm font-sans hover:scale-[1.02] active:scale-[0.98]"
          >
            See How It Works
          </a>
        </div>
      </HeroGeometric>
    </section>
  );
}
