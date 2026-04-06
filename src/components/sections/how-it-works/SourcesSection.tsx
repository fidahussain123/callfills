"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, MessageSquare, List, MapPin, Zap, Search } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const SOURCES = [
  { name: "Facebook Groups", color: "#4267B2", base: 2847, interval: 14 },
  { name: "Reddit (r/local)", color: "#FF4500", base: 1203, interval: 31 },
  { name: "Craigslist", color: "#7C3AED", base: 891, interval: 62 },
  { name: "Nextdoor", color: "#00B246", base: 634, interval: 47 },
  { name: "Twitter / X", color: "#1DA1F2", base: 4521, interval: 8 },
  { name: "Google Alerts", color: "#EA4335", base: 317, interval: 22 },
];

const SOURCE_CARDS = [
  { icon: Users, name: "Facebook", desc: "People post service requests in local community groups constantly" },
  { icon: MessageSquare, name: "Reddit", desc: "Local subreddits have hyper-specific neighbourhood service requests" },
  { icon: List, name: "Craigslist", desc: "Services Wanted section — thousands of requests posted daily" },
  { icon: MapPin, name: "Nextdoor", desc: "Hyper-local. Highest conversion rate of any source we monitor" },
  { icon: Zap, name: "Twitter / X", desc: "Real-time. We catch posts within seconds of them going live" },
  { icon: Search, name: "Google Alerts", desc: "We monitor your keywords across the entire Google index automatically" },
];

function LiveDashboard() {
  const [seconds, setSeconds] = useState<number[]>(SOURCES.map((s) => s.interval));
  const [counts, setCounts] = useState<number[]>(SOURCES.map((s) => s.base));
  const [total, setTotal] = useState(10413);
  const [matches, setMatches] = useState(847);
  const [delivered, setDelivered] = useState(42);

  useEffect(() => {
    const tick = setInterval(() => {
      setSeconds((prev) =>
        prev.map((s, i) => {
          if (s <= 0) return SOURCES[i].interval;
          return s - 1;
        })
      );
    }, 1000);

    const grow = setInterval(() => {
      setCounts((prev) =>
        prev.map((c) => c + Math.floor(Math.random() * 3))
      );
      setTotal((t) => t + Math.floor(Math.random() * 5 + 2));
      setMatches((m) => (Math.random() > 0.7 ? m + 1 : m));
      setDelivered((d) => (Math.random() > 0.85 ? d + 1 : d));
    }, 3000);

    return () => { clearInterval(tick); clearInterval(grow); };
  }, []);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `0:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div className="h-full flex gap-3 text-white">
      {/* Left — Live Sources */}
      <div className="flex-1 bg-[#1a1a1a] rounded-xl p-4 overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">Live Sources — Active</span>
        </div>
        <div className="space-y-2.5">
          {SOURCES.map((src, i) => (
            <div key={src.name} className="flex items-center gap-2.5 py-1.5 border-b border-[#2a2a2a]">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse" style={{ backgroundColor: src.color }} />
              <span className="text-xs font-sans text-gray-200 flex-1 truncate">{src.name}</span>
              <span className="text-[10px] font-mono text-gray-500">{fmt(seconds[i])} ago</span>
              <span className="text-[10px] font-mono text-gray-400 w-16 text-right">{counts[i].toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Summary */}
      <div className="w-44 bg-[#1a1a1a] rounded-xl p-4 flex flex-col gap-3">
        <p className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">Today&apos;s Summary</p>
        {[
          { label: "Posts scanned", value: total.toLocaleString(), color: "text-white" },
          { label: "Keyword matches", value: matches.toString(), color: "text-yellow-400" },
          { label: "Leads delivered", value: delivered.toString(), color: "text-green-400" },
          { label: "Uptime", value: "99.98%", color: "text-purple-400" },
        ].map((item) => (
          <div key={item.label} className="bg-[#242424] rounded-lg p-2.5">
            <p className={`text-lg font-black font-sans ${item.color}`}>{item.value}</p>
            <p className="text-[10px] text-gray-500 font-sans mt-0.5">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SourcesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="hiw-sources" className="bg-white" ref={ref}>
      <ContainerScroll
        titleComponent={
          <div className="mb-2">
            <span className="inline-block text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">01 — Sources</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 leading-[1.05]">
              We watch 6 places simultaneously.
              <br />
              <span className="text-purple-600">Every 30 minutes. Always.</span>
            </h2>
          </div>
        }
      >
        <LiveDashboard />
      </ContainerScroll>

      {/* Source cards */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-l-2 border-t-2 border-black">
          {SOURCE_CARDS.map(({ icon: Icon, name, desc }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="border-r-2 border-b-2 border-black p-6 group hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <Icon className="w-5 h-5 text-gray-900" />
                <span className="inline-flex items-center gap-1.5 text-[10px] font-sans font-bold text-green-700 bg-green-50 border border-green-300 px-2 py-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Active
                </span>
              </div>
              <p className="text-sm font-black font-sans text-gray-900 mb-2">{name}</p>
              <p className="text-xs text-gray-500 font-sans leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
