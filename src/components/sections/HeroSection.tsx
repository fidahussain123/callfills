"use client";
import HeroGeometric from "@/components/ui/shape-landing-hero";

const tickerItems = [
  "New lead detected — Houston TX · HVAC repair needed",
  "Facebook Group · posted 2 mins ago",
  "New lead — Dallas TX · Emergency plumber",
  "Reddit r/dallas · posted 4 mins ago",
  "New lead — Austin TX · AC not cooling",
  "Craigslist · posted 1 min ago",
  "New lead — San Antonio TX · Roof leak repair",
  "Nextdoor · posted 3 mins ago",
];

export default function HeroSection() {
  return (
    <section id="hero">
      <HeroGeometric
        badge="AI Lead Generation Engine"
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

      {/* Live Ticker */}
      <div className="relative bg-white border-t border-b border-gray-100 py-3 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="ticker-left-fast flex whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="mx-8 text-sm font-sans font-semibold text-purple-400/70 tracking-wide"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
