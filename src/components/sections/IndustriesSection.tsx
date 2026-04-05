"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Building2,
  Thermometer,
  Wrench,
  Dumbbell,
  Heart,
  ShieldCheck,
  GraduationCap,
  Users,
  TrendingUp,
  Scissors,
  UtensilsCrossed,
  Zap,
} from "lucide-react";

const industries = [
  { name: "Real Estate", icon: Building2 },
  { name: "HVAC", icon: Thermometer },
  { name: "Plumbing", icon: Wrench },
  { name: "Fitness", icon: Dumbbell },
  { name: "Healthcare", icon: Heart },
  { name: "Insurance", icon: ShieldCheck },
  { name: "EdTech", icon: GraduationCap },
  { name: "Recruitment", icon: Users },
  { name: "Finance", icon: TrendingUp },
  { name: "Salons", icon: Scissors },
  { name: "Restaurants", icon: UtensilsCrossed },
  { name: "SaaS", icon: Zap },
];

function IndustryPill({ name, icon: Icon }: { name: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-sans font-medium text-gray-600 whitespace-nowrap mx-2 hover:border-[#00E87A]/30 transition-colors duration-300 shadow-sm">
      <Icon className="w-4 h-4 text-[#00E87A]/60" />
      {name}
    </span>
  );
}

export default function IndustriesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const row1 = industries;
  const row2 = [...industries.slice(6), ...industries.slice(0, 6)];

  return (
    <section
      id="industries"
      className="relative py-28 md:py-40 bg-gray-50 overflow-hidden"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="inline-block text-xs font-sans font-medium tracking-[0.2em] uppercase text-gray-400 mb-6">
            Industries
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif italic tracking-tight text-gray-900 leading-[1.1]">
            Built for every service business
          </h2>
        </motion.div>
      </div>

      {/* Ticker Rows */}
      <div className="space-y-4">
        {/* Row 1 — scrolls left */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10" />
          <div className="ticker-left flex py-2">
            {[...row1, ...row1].map((ind, i) => (
              <IndustryPill key={`r1-${i}`} name={ind.name} icon={ind.icon} />
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10" />
          <div className="ticker-right flex py-2">
            {[...row2, ...row2].map((ind, i) => (
              <IndustryPill key={`r2-${i}`} name={ind.name} icon={ind.icon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
