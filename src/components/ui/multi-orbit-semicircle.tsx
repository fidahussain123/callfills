"use client";
import React, { useState, useRef, useEffect } from "react";

/* ─── Each tool has a hand-placed position + size ─── */
interface Tool {
  name: string;
  tip: string;
  logo: string | null;
  fb: string;     // fallback text
  bg: string;
  x: number;      // centre x
  y: number;      // centre y
  s: number;      // bubble diameter
}

const TOOLS: Tool[] = [
  // ─ Big / hero icons (s 56–66) ─
  { name: "Facebook",   tip: "Group & marketplace scraping",    logo: "https://cdn.simpleicons.org/facebook/1877F2",     fb: "FB", bg: "#1877F2", x: 135, y: 56,  s: 60 },
  { name: "Reddit",     tip: "Community intent signals",        logo: "https://cdn.simpleicons.org/reddit/FF4500",       fb: "RD", bg: "#FF4500", x: 72,  y: 245, s: 58 },
  { name: "OpenAI",     tip: "AI lead scoring",                 logo: null,                                              fb: "AI", bg: "#111",    x: 225, y: 118, s: 64 },
  { name: "Google",     tip: "Places & Maps data",              logo: "https://cdn.simpleicons.org/google/4285F4",       fb: "GO", bg: "#4285F4", x: 348, y: 340, s: 56 },
  { name: "WhatsApp",   tip: "Instant lead delivery",           logo: "https://cdn.simpleicons.org/whatsapp/25D366",     fb: "WA", bg: "#25D366", x: 48,  y: 138, s: 56 },

  // ─ Medium icons (s 44–52) ─
  { name: "LinkedIn",   tip: "Professional network",            logo: null,                                              fb: "LI", bg: "#0A66C2", x: 305, y: 42,  s: 48 },
  { name: "Google Maps",tip: "Local business discovery",        logo: "https://cdn.simpleicons.org/googlemaps/4285F4",   fb: "GM", bg: "#4285F4", x: 340, y: 178, s: 50 },
  { name: "Twitter / X",tip: "Social listening",                logo: "https://cdn.simpleicons.org/x/000000",            fb: "X",  bg: "#111",    x: 158, y: 320, s: 52 },
  { name: "Telegram",   tip: "Instant alert channel",           logo: "https://cdn.simpleicons.org/telegram/26A5E4",     fb: "TG", bg: "#26A5E4", x: 370, y: 248, s: 48 },
  { name: "Supabase",   tip: "Lead database & storage",         logo: "https://cdn.simpleicons.org/supabase/3ECF8E",     fb: "SB", bg: "#3ECF8E", x: 105, y: 420, s: 50 },
  { name: "Apollo.io",  tip: "B2B prospecting database",        logo: "https://cdn.simpleicons.org/apollographql/6C47FF", fb: "AP", bg: "#6C47FF", x: 198, y: 210, s: 46 },
  { name: "n8n",        tip: "Automation engine",                logo: "https://cdn.simpleicons.org/n8n/EA4B71",          fb: "N8", bg: "#EA4B71", x: 378, y: 105, s: 44 },

  // ─ Smaller icons (s 34–42) ─
  { name: "Apify",       tip: "Web scraping at scale",          logo: null,                                              fb: "AP", bg: "#FF9B00", x: 38,  y: 348, s: 42 },
  { name: "Twilio",      tip: "SMS & voice outreach",           logo: null,                                              fb: "TW", bg: "#F22F46", x: 285, y: 275, s: 40 },
  { name: "PhantomBuster",tip:"Data extraction automation",     logo: null,                                              fb: "PB", bg: "#A259FF", x: 240, y: 388, s: 38 },
  { name: "Brevo",       tip: "Email sequence automation",      logo: null,                                              fb: "BR", bg: "#0B996E", x: 48,  y: 465, s: 36 },
  { name: "Nextdoor",    tip: "Neighbourhood lead signals",     logo: null,                                              fb: "ND", bg: "#00A86B", x: 185, y: 458, s: 40 },
  { name: "FullEnrich",  tip: "Contact enrichment",             logo: null,                                              fb: "FE", bg: "#6366F1", x: 318, y: 430, s: 38 },
  { name: "Hunter.io",   tip: "Email finder",                   logo: null,                                              fb: "HU", bg: "#F56A00", x: 400, y: 170, s: 36 },
  { name: "AiSensy",     tip: "WhatsApp campaign platform",     logo: null,                                              fb: "AS", bg: "#128C7E", x: 268, y: 468, s: 34 },
  { name: "JustDial",    tip: "Indian SMB lead database",       logo: null,                                              fb: "JD", bg: "#FF6600", x: 388, y: 398, s: 36 },
  { name: "Typebot",     tip: "Conversational qualification",   logo: null,                                              fb: "TB", bg: "#0042DA", x: 125, y: 172, s: 40 },
  { name: "Razorpay",    tip: "Payment intent tracking",        logo: "https://cdn.simpleicons.org/razorpay/0D60FF",     fb: "RZ", bg: "#0D60FF", x: 310, y: 120, s: 36 },
  { name: "Craigslist",  tip: "Local classifieds scraping",     logo: null,                                              fb: "CL", bg: "#7638CC", x: 62,  y: 56,  s: 36 },
];

/* ─── Canvas / hub ─── */
const W  = 920;
const H  = 530;
const VX = 490;  // Verify hub centre
const VY = 265;
const VR = 50;   // Verify hub radius

/* ─── Tool icon ─── */
function ToolIcon({ logo, fb, bg, size }: { logo: string | null; fb: string; bg: string; size: number }) {
  const [err, setErr] = useState(false);
  if (!logo || err) {
    return (
      <div style={{ width: size, height: size, borderRadius: "50%", background: bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontWeight: 800, fontSize: size * 0.32, fontFamily: "sans-serif" }}>
        {fb}
      </div>
    );
  }
  return (
    <img src={logo} alt={fb} width={size} height={size}
      onError={() => setErr(true)}
      style={{ width: size, height: size, objectFit: "contain", display: "block" }} />
  );
}

/* ─── Sample leads ─── */
const LEADS = [
  { name: "Sarah J.",   need: "AC not cooling — urgent",  src: "Facebook",  score: 96 },
  { name: "Mike T.",    need: "Roof leak, needs fix",      src: "Reddit",    score: 89 },
  { name: "Priya K.",   need: "Plumber needed today",      src: "LinkedIn",  score: 94 },
  { name: "James L.",   need: "HVAC installation quote",   src: "Google",    score: 91 },
  { name: "Ana R.",     need: "Electrician ASAP",          src: "Facebook",  score: 88 },
  { name: "Carlos M.",  need: "Water heater replace",      src: "Nextdoor",  score: 93 },
  { name: "Tom B.",     need: "Garage door broken",        src: "Reddit",    score: 87 },
  { name: "Nina S.",    need: "Pest control needed",       src: "Facebook",  score: 92 },
];

/* Scattered card slots — position + rotation */
const CARD_SLOTS = [
  { left: 622, top:  38,  rotate: -4   },
  { left: 728, top: 195,  rotate:  3   },
  { left: 614, top: 355,  rotate: -5.5 },
];

/* ─── Component ─── */
export default function MultiOrbitSemiCircle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [cards, setCards] = useState([
    { idx: 0, key: 0 },
    { idx: 1, key: 1 },
    { idx: 2, key: 2 },
  ]);
  const counter    = useRef(3);
  const slotCursor = useRef(0);

  // responsive scaling
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      setScale(Math.min(1, containerRef.current.offsetWidth / W));
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // cycle leads into card slots
  useEffect(() => {
    const id = setInterval(() => {
      const nextLead = counter.current % LEADS.length;
      const nextSlot = slotCursor.current % CARD_SLOTS.length;
      counter.current++;
      slotCursor.current++;
      setCards(prev => prev.map((c, i) =>
        i === nextSlot ? { idx: nextLead, key: counter.current } : c
      ));
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        /* ── connection lines ── */
        @keyframes flow-in  { to { stroke-dashoffset: -32; } }
        @keyframes flow-out { to { stroke-dashoffset: -24; } }

        /* ── verify hub ── */
        @keyframes hub-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(124,58,237,0.3), 0 0 0 0 rgba(124,58,237,0.1); }
          50%     { box-shadow: 0 0 0 20px rgba(124,58,237,0.07), 0 0 0 40px rgba(124,58,237,0.03); }
        }
        @keyframes spin-ring { to { transform: rotate(360deg); } }

        /* ── tool icon gentle floats (4 variants) ── */
        @keyframes tf-0 {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-5px); }
        }
        @keyframes tf-1 {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-7px); }
        }
        @keyframes tf-2 {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-4px); }
        }
        @keyframes tf-3 {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-6px); }
        }

        /* ── lead cards ── */
        @keyframes card-pop {
          from { opacity: 0; transform: scale(0.82) translateY(10px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        @keyframes blink-dot {
          0%,100% { opacity: 1; } 50% { opacity: 0.25; }
        }
        @keyframes cf-0 {
          0%,100% { transform: rotate(-4deg)   translateY(0); }
          50%     { transform: rotate(-4deg)   translateY(-5px); }
        }
        @keyframes cf-1 {
          0%,100% { transform: rotate(3deg)    translateY(0); }
          50%     { transform: rotate(3deg)    translateY(-6px); }
        }
        @keyframes cf-2 {
          0%,100% { transform: rotate(-5.5deg) translateY(0); }
          50%     { transform: rotate(-5.5deg) translateY(-4px); }
        }
      `}</style>

      <div ref={containerRef} style={{ width: "100%", position: "relative", height: H * scale }}>
        <div style={{ width: W, height: H, position: "absolute", top: 0, left: "50%",
          transform: `translateX(-50%) scale(${scale})`, transformOrigin: "top center" }}>

          {/* ── SVG: connection lines ── */}
          <svg width={W} height={H} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <defs>
              <linearGradient id="outGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="rgba(109,40,217,0.55)" />
                <stop offset="100%" stopColor="rgba(168,85,247,0.75)" />
              </linearGradient>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L0,8 L8,4 z" fill="rgba(124,58,237,0.7)" />
              </marker>
            </defs>

            {/* Tool → Verify animated lines */}
            {TOOLS.map((t, i) => {
              const br = t.s / 2 + 2;
              const dx = VX - t.x, dy = VY - t.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const ux = dx / dist, uy = dy / dist;
              const delay = ((i * 0.11) % 2).toFixed(2);
              return (
                <line key={t.name}
                  x1={(t.x + ux * br).toFixed(1)} y1={(t.y + uy * br).toFixed(1)}
                  x2={(VX - ux * (VR + 2)).toFixed(1)} y2={(VY - uy * (VR + 2)).toFixed(1)}
                  stroke="rgba(124,58,237,0.18)" strokeWidth={1.2} strokeDasharray="6 5"
                  style={{ animation: `flow-in 1.9s linear ${delay}s infinite` }} />
              );
            })}

            {/* Verify → Leads animated arrow */}
            <line
              x1={VX + VR + 6} y1={VY}
              x2={612} y2={VY}
              stroke="url(#outGrad)" strokeWidth={2.8}
              strokeDasharray="9 6"
              markerEnd="url(#arrow)"
              style={{ animation: "flow-out 1s linear infinite" }} />
          </svg>

          {/* ── Scattered tool bubbles ── */}
          {TOOLS.map((t, i) => {
            const iconSize = Math.round(t.s * 0.58);
            const floatIdx = i % 4;
            const dur = 3.4 + (i % 5) * 0.6;   // 3.4s – 6.4s
            const del = (i * 0.18) % 2;          // staggered start
            return (
              <div key={t.name} title={`${t.name} · ${t.tip}`}
                style={{
                  position: "absolute",
                  left: t.x - t.s / 2,
                  top:  t.y - t.s / 2,
                  width: t.s,
                  height: t.s,
                  borderRadius: "50%",
                  background: "#fff",
                  border: "1.5px solid rgba(124,58,237,0.14)",
                  boxShadow: t.s >= 54
                    ? "0 4px 18px rgba(0,0,0,0.10)"
                    : "0 2px 10px rgba(0,0,0,0.07)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "box-shadow 0.2s, border-color 0.2s",
                  zIndex: 2,
                  animation: `tf-${floatIdx} ${dur}s ease-in-out ${del}s infinite`,
                }}
                className="group hover:border-purple-400 hover:shadow-lg hover:shadow-purple-100"
              >
                <ToolIcon logo={t.logo} fb={t.fb} bg={t.bg} size={iconSize} />
                {/* Tooltip */}
                <div style={{ position: "absolute", bottom: "calc(100% + 7px)", left: "50%",
                  transform: "translateX(-50%)", background: "#18181b", color: "#e4e4e7",
                  fontSize: 10, fontFamily: "sans-serif", fontWeight: 600,
                  whiteSpace: "nowrap", padding: "4px 9px", borderRadius: 6,
                  pointerEvents: "none", opacity: 0, transition: "opacity 0.15s", zIndex: 30 }}
                  className="group-hover:opacity-100">
                  <strong>{t.name}</strong>
                  <span style={{ color: "#a1a1aa" }}> · {t.tip}</span>
                </div>
              </div>
            );
          })}

          {/* ── AI Verify hub ── */}
          <div style={{ position: "absolute", left: VX - VR, top: VY - VR,
            width: VR * 2, height: VR * 2, borderRadius: "50%",
            background: "linear-gradient(135deg,#5B21B6 0%,#7C3AED 50%,#A855F7 100%)",
            animation: "hub-pulse 2.8s ease-in-out infinite",
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", zIndex: 10 }}>
            <div style={{ position: "absolute", inset: -6, borderRadius: "50%",
              border: "1.5px dashed rgba(196,181,253,0.45)",
              animation: "spin-ring 10s linear infinite" }} />
            <div style={{ position: "absolute", inset: -12, borderRadius: "50%",
              border: "1px dashed rgba(196,181,253,0.18)" }} />
            <span style={{ color: "#fff", fontWeight: 900, fontSize: 10.5,
              fontFamily: "sans-serif", letterSpacing: "0.06em",
              lineHeight: 1.35, textAlign: "center" }}>
              AI<br />VERIFY
            </span>
          </div>

          {/* ── Scattered floating lead cards ── */}
          {cards.map((card, si) => {
            const lead = LEADS[card.idx];
            const pos  = CARD_SLOTS[si];
            const scoreColor = lead.score >= 92 ? "#16A34A" : lead.score >= 88 ? "#7C3AED" : "#D97706";
            const scoreBg    = lead.score >= 92 ? "rgba(22,163,74,0.09)" : lead.score >= 88 ? "rgba(124,58,237,0.09)" : "rgba(217,119,6,0.09)";
            return (
              <div key={card.key}
                style={{
                  position: "absolute", left: pos.left, top: pos.top, width: 210,
                  borderRadius: 16, background: "#fff",
                  border: "1.5px solid rgba(124,58,237,0.13)",
                  boxShadow: "0 6px 28px rgba(0,0,0,0.10), 0 1px 4px rgba(124,58,237,0.08)",
                  padding: "12px 14px", zIndex: 10,
                  animation: `card-pop 0.42s cubic-bezier(0.34,1.56,0.64,1) forwards, cf-${si} ${3.8 + si * 0.6}s ease-in-out ${si * 0.4}s infinite`,
                }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ADE80",
                      display: "inline-block", flexShrink: 0,
                      animation: "blink-dot 1.4s ease-in-out infinite" }} />
                    <span style={{ fontWeight: 800, fontSize: 12, fontFamily: "sans-serif", color: "#111" }}>
                      {lead.name}
                    </span>
                  </div>
                  <span style={{ fontSize: 10, fontFamily: "sans-serif", fontWeight: 800,
                    color: scoreColor, background: scoreBg,
                    padding: "2px 7px", borderRadius: 99 }}>
                    {lead.score}%
                  </span>
                </div>
                <p style={{ fontSize: 11, color: "#444", fontFamily: "sans-serif",
                  lineHeight: 1.4, margin: "0 0 8px" }}>
                  {lead.need}
                </p>
                <span style={{ fontSize: 9.5, fontFamily: "sans-serif", fontWeight: 700,
                  color: "#7C3AED", background: "rgba(124,58,237,0.07)",
                  padding: "3px 8px", borderRadius: 6, display: "inline-block" }}>
                  {lead.src}
                </span>
              </div>
            );
          })}

        </div>
      </div>
    </>
  );
}
