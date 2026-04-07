"use client";
import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/* ─── Shared logo component ─── */
function Logo({ url, fallback, bg, size = 20 }: { url: string | null; fallback: string; bg: string; size?: number }) {
  const [err, setErr] = useState(false);
  if (!url || err) {
    return (
      <div style={{ width: size, height: size, background: bg, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: size * 0.38, fontWeight: 800, fontFamily: "sans-serif", flexShrink: 0 }}>
        {fallback}
      </div>
    );
  }
  return <img src={url} width={size} height={size} alt={fallback} onError={() => setErr(true)} style={{ width: size, height: size, objectFit: "contain", flexShrink: 0 }} />;
}

/* ─── Card A: 60-Second Pipeline (deep card-in-card style) ─── */
function PipelineVisual() {
  const steps = [
    { label: "Post Detected",     sub: "Real-time scan",           color: "#7C3AED", icon: "PD", status: "Live",     statusColor: "bg-green-50 text-green-600" },
    { label: "AI Scored",         sub: "Intent: High (94%)",       color: "#8B5CF6", icon: "AI", status: "Scoring",  statusColor: "bg-purple-50 text-purple-600" },
    { label: "Lead Verified",     sub: "Phone + email verified",   color: "#6D28D9", icon: "LV", status: "Verified", statusColor: "bg-green-50 text-green-600" },
    { label: "Delivered to You",  sub: "Email + Dashboard",        color: "#5B21B6", icon: "DY", status: "Sent",     statusColor: "bg-blue-50 text-blue-600" },
  ];
  return (
    <div className="relative h-64">
      {/* Outer depth shadow layer */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200/60 shadow-inner" />
      {/* Inner card */}
      <div className="relative bg-white rounded-xl border border-gray-200 shadow-sm mx-2 mt-2 mb-2 h-[calc(100%-16px)] overflow-hidden">
        {/* Window chrome bar */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-gray-100">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <span className="ml-auto text-[11px] text-gray-400 font-semibold tracking-wide">Pipeline · Live</span>
        </div>
        {/* Title inside card */}
        <div className="px-4 pt-3 pb-1">
          <p className="text-sm font-bold text-gray-900">Lead processing flow</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Automated 4-step pipeline</p>
        </div>
        {/* Steps list */}
        <div className="px-4 pb-3 flex flex-col gap-1.5">
          {steps.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.12 }}
              className="flex items-center gap-3 bg-gray-50/80 rounded-xl px-3 py-2.5 border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors"
            >
              {/* Icon */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm"
                style={{ background: s.color }}
              >
                <span className="text-white text-[10px] font-black">{s.icon}</span>
              </div>
              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold text-gray-900 leading-tight">{s.label}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{s.sub}</p>
              </div>
              {/* Status badge */}
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${s.statusColor} flex-shrink-0`}>
                {s.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Card B: Instant Delivery (half-width, top-right) ─── */
function DeliveryVisual() {
  const channels = [
    { label: "Email",      logo: "https://cdn.simpleicons.org/gmail/EA4335",      bg: "#EA4335" },
    { label: "Dashboard",  logo: null,                                             bg: "#7C3AED" },
    { label: "n8n",        logo: "https://cdn.simpleicons.org/n8n/EA4B71",        bg: "#EA4B71" },
    { label: "Supabase",   logo: "https://cdn.simpleicons.org/supabase/3ECF8E",   bg: "#3ECF8E" },
    { label: "Webhook",    logo: null,                                             bg: "#1a1a2e" },
    { label: "API",        logo: null,                                             bg: "#0EA5E9" },
  ];
  return (
    <div className="h-56 flex items-center justify-center">
      <div className="flex flex-wrap justify-center gap-3 max-w-[270px]">
        {channels.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: i * 0.07 }}
            whileHover={{ y: -4, scale: 1.05 }}
            className="bg-white shadow-md rounded-2xl px-4 py-2.5 flex items-center gap-2 border border-gray-100 cursor-default"
          >
            <Logo url={c.logo} fallback={c.label.slice(0,2)} bg={c.bg} size={20} />
            <span className="text-sm font-bold text-gray-700">{c.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Card C: Multi-Source Detection (full-width, bottom) ─── */
function SourcesVisual() {
  const LEFT = [
    { label: "Facebook",     logo: "https://cdn.simpleicons.org/facebook/1877F2",    bg: "#1877F2", dy: 0   },
    { label: "Reddit",       logo: "https://cdn.simpleicons.org/reddit/FF4500",      bg: "#FF4500", dy: 0.6 },
    { label: "Twitter / X",  logo: "https://cdn.simpleicons.org/x/000000",           bg: "#000",    dy: 1.2 },
    { label: "Nextdoor",     logo: null,                                              bg: "#00A86B", dy: 1.8 },
    { label: "Craigslist",   logo: null,                                              bg: "#7638CC", dy: 2.4 },
  ];
  const RIGHT = [
    { label: "Apollo.io",    logo: "https://cdn.simpleicons.org/apollographql/6C47FF", bg: "#6C47FF", dy: 0   },
    { label: "Apify",        logo: null,                                               bg: "#FF9B00", dy: 0.5 },
    { label: "Google Maps",  logo: "https://cdn.simpleicons.org/googlemaps/4285F4",   bg: "#4285F4", dy: 1.0 },
    { label: "PhantomBuster",logo: null,                                               bg: "#A259FF", dy: 1.5 },
    { label: "LinkedIn",     logo: null,                                               bg: "#0A66C2", dy: 2.0 },
  ];

  // viewBox is 560×200. Left pills end at x≈140, right pills start at x≈420, hub center at (280,100)
  const leftY  = [28, 60, 100, 140, 172];
  const rightY = [28, 60, 100, 140, 172];

  return (
    <div className="relative w-full" style={{ height: 200 }}>
      {/* SVG connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 560 200" preserveAspectRatio="none">
        {/* Left paths */}
        {leftY.map((y, i) => (
          <motion.path key={`l${i}`}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 + i * 0.12 }}
            d={`M 140 ${y} C 210 ${y}, 240 100, 258 100`}
            fill="none" stroke="#e5e7eb" strokeWidth="1.5"
          />
        ))}
        {/* Right paths */}
        {rightY.map((y, i) => (
          <motion.path key={`r${i}`}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 + i * 0.12 }}
            d={`M 420 ${y} C 350 ${y}, 320 100, 302 100`}
            fill="none" stroke="#e5e7eb" strokeWidth="1.5"
          />
        ))}
      </svg>

      {/* Left source pills */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-1" style={{ width: 140 }}>
        {LEFT.map((s) => (
          <motion.div
            key={s.label}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: s.dy }}
            className="bg-white shadow-sm rounded-xl px-3 py-2 flex items-center gap-2 border border-gray-100 text-xs font-bold text-gray-700"
          >
            <Logo url={s.logo} fallback={s.label.slice(0,2)} bg={s.bg} size={16} />
            <span className="truncate">{s.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Right source pills */}
      <div className="absolute right-0 top-0 h-full flex flex-col justify-between py-1" style={{ width: 140 }}>
        {RIGHT.map((s) => (
          <motion.div
            key={s.label}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: s.dy }}
            className="bg-white shadow-sm rounded-xl px-3 py-2 flex items-center gap-2 border border-gray-100 text-xs font-bold text-gray-700"
          >
            <Logo url={s.logo} fallback={s.label.slice(0,2)} bg={s.bg} size={16} />
            <span className="truncate">{s.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Center Callfills hub */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.06 }}
          animate={{ boxShadow: ["0 0 0 0 rgba(124,58,237,0.2)", "0 0 0 14px rgba(124,58,237,0.04)", "0 0 0 0 rgba(124,58,237,0.2)"] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center"
          style={{ background: "linear-gradient(135deg,#7C3AED,#A855F7)" }}
        >
          <span className="text-white font-black text-sm tracking-wider font-sans">CF</span>
          <span className="text-white/60 text-[9px] font-semibold mt-0.5 tracking-widest">LEADS</span>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Main ─── */
export default function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-12 md:py-16 bg-[#f8f9fa]" ref={ref} id="how-it-works">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-[11px] font-sans font-bold tracking-[0.25em] uppercase text-purple-500 mb-4">
            How It Works
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 font-sans">
            From post to closed deal<br className="hidden md:block" /> in under 60 seconds
          </h2>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          {/* Top-left: 60-Second Pipeline */}
          <motion.div variants={itemVariants}
            className="bg-white rounded-[2rem] p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col">
            <PipelineVisual />
            <div className="mt-2">
              <h3 className="text-2xl font-black text-gray-900 mb-2 font-sans">The 60-Second Pipeline</h3>
              <p className="text-gray-500 text-base font-sans">
                Every lead is AI-scored, phone-verified and enriched — then in your inbox before your competitor sees the post.
              </p>
            </div>
          </motion.div>

          {/* Top-right: Instant Delivery */}
          <motion.div variants={itemVariants}
            className="bg-white rounded-[2rem] p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col">
            <DeliveryVisual />
            <div className="mt-2">
              <h3 className="text-2xl font-black text-gray-900 mb-2 font-sans">Instant Delivery</h3>
              <p className="text-gray-500 text-base font-sans">
                Verified leads delivered to your email, dashboard or via API — all in under 60 seconds.
              </p>
            </div>
          </motion.div>

          {/* Bottom full-width: Multi-Source Detection */}
          <motion.div variants={itemVariants}
            className="bg-white rounded-[2rem] p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] border border-gray-100 md:col-span-2 flex flex-col md:flex-row items-center gap-10">

            {/* Visual — takes more space */}
            <div className="w-full md:w-3/5">
              <SourcesVisual />
            </div>

            {/* Text */}
            <div className="w-full md:w-2/5">
              <h3 className="text-3xl font-black text-gray-900 mb-4 font-sans">Multi-Source Detection</h3>
              <p className="text-gray-500 text-lg font-sans leading-relaxed mb-6">
                10 platforms watched simultaneously — social communities, B2B databases, local classifieds and web scraping all funnelled into one clean lead feed.
              </p>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Facebook, Reddit, Twitter/X, Nextdoor", sub: "Social & community signals" },
                  { label: "Apollo.io & LinkedIn",                   sub: "B2B professional data" },
                  { label: "Apify & PhantomBuster",                 sub: "Web scraping engines" },
                  { label: "Google Maps & Craigslist",              sub: "Local business & classifieds" },
                ].map((f) => (
                  <div key={f.label} className="flex items-start gap-3">
                    <div className="mt-1 w-4 h-4 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{f.label}</p>
                      <p className="text-xs text-gray-400">{f.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
