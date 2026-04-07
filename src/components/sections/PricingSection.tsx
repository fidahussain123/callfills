"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Check, Star, TrendingUp, Users, Zap, Phone, Mail, ArrowRight } from "lucide-react";

/* ─── Plan data ─── */
const plans = [
  {
    name: "Starter",
    monthly: 2499,
    annual: 1999,
    credits: "500 credits",
    highlighted: false,
    features: [
      "500 lead views/mo",
      "3 source platforms",
      "Email support",
      "Basic dashboard",
    ],
  },
  {
    name: "Growth",
    monthly: 7999,
    annual: 6399,
    credits: "2,000 credits",
    highlighted: true,
    features: [
      "2,000 lead views/mo",
      "All 6 platforms",
      "Priority support",
      "Advanced dashboard",
      "WhatsApp alerts",
      "Team access (3 users)",
    ],
  },
  {
    name: "Agency",
    monthly: 29999,
    annual: 23999,
    credits: "10,000 credits",
    highlighted: false,
    features: [
      "10,000 lead views/mo",
      "All 6 platforms",
      "Dedicated account manager",
      "Custom integrations",
      "API access",
      "Unlimited team",
    ],
  },
];

/* ─── Interactive dashboard mockup ─── */
function DashboardMockup() {
  const [activeTab, setActiveTab] = useState<"overview" | "leads" | "credits">("overview");
  const [credits, setCredits] = useState(485);
  const [animate, setAnimate] = useState(false);
  const [leadsToday, setLeadsToday] = useState(12);

  // Simulate live lead counter
  useEffect(() => {
    const id = setInterval(() => {
      setLeadsToday(prev => prev + Math.floor(Math.random() * 2));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const deduct = (amount: number) => {
    if (credits < amount) return;
    setCredits(c => c - amount);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 400);
  };

  const tabs = [
    { id: "overview" as const, label: "Overview" },
    { id: "leads" as const, label: "Leads" },
    { id: "credits" as const, label: "Credits" },
  ];

  const chartBars = [32, 48, 28, 64, 52, 72, 44, 80, 56, 68, 92, 76];

  return (
    <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-xl shadow-purple-500/5">
      {/* Gradient top bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-purple-600 via-violet-500 to-purple-400" />

      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center">
            <span className="text-white text-[10px] font-black font-sans">CF</span>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 font-sans">Callfills Dashboard</p>
            <p className="text-[10px] text-gray-400 font-sans">Lead Intelligence Platform</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] text-gray-400 font-sans font-medium">Live</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-5 gap-1 pt-2 border-b border-gray-100">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 text-xs font-sans font-semibold rounded-t-lg transition-all ${
              activeTab === tab.id
                ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50/50"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-5 min-h-[300px]">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: "Leads Today", value: leadsToday, icon: TrendingUp, color: "text-green-600", bg: "bg-green-50", change: "+23%" },
                  { label: "Active Sources", value: 6, icon: Zap, color: "text-purple-600", bg: "bg-purple-50", change: "All live" },
                  { label: "Response Rate", value: "94%", icon: Users, color: "text-blue-600", bg: "bg-blue-50", change: "+5%" },
                ].map(stat => (
                  <div key={stat.label} className="rounded-xl border border-gray-100 p-3 bg-gray-50/50">
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className={`w-5 h-5 rounded-md ${stat.bg} flex items-center justify-center`}>
                        <stat.icon className={`w-3 h-3 ${stat.color}`} />
                      </div>
                      <span className="text-[9px] text-gray-400 font-sans font-medium uppercase tracking-wider">{stat.label}</span>
                    </div>
                    <p className="text-lg font-black text-gray-900 font-sans">{stat.value}</p>
                    <span className={`text-[9px] font-sans font-bold ${stat.color}`}>{stat.change}</span>
                  </div>
                ))}
              </div>

              {/* Mini chart */}
              <div className="rounded-xl border border-gray-100 p-4 bg-gray-50/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-sans font-bold text-gray-500 uppercase tracking-wider">Leads this week</span>
                  <span className="text-[10px] font-sans font-bold text-green-600">+34% vs last week</span>
                </div>
                <div className="flex items-end gap-1.5 h-16">
                  {chartBars.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.5, delay: i * 0.04 }}
                      className={`flex-1 rounded-sm ${i === chartBars.length - 1 ? "bg-gradient-to-t from-purple-600 to-violet-400" : "bg-purple-200/60"}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "leads" && (
            <motion.div
              key="leads"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-2.5"
            >
              {[
                { name: "Sarah J.", need: "AC repair urgent", src: "Facebook", score: 96, time: "2m ago" },
                { name: "Mike T.", need: "Roof leak fix", src: "Reddit", score: 89, time: "5m ago" },
                { name: "Priya K.", need: "Plumber needed", src: "LinkedIn", score: 94, time: "8m ago" },
                { name: "James L.", need: "HVAC installation", src: "Google", score: 91, time: "12m ago" },
                { name: "Ana R.", need: "Electrician ASAP", src: "Facebook", score: 88, time: "15m ago" },
              ].map((lead, i) => (
                <motion.div
                  key={lead.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-white hover:border-purple-200 hover:bg-purple-50/30 transition-all cursor-default"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-purple-600 font-sans">{lead.name.split(" ").map(n => n[0]).join("")}</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 font-sans">{lead.name}</p>
                      <p className="text-[10px] text-gray-400 font-sans">{lead.need}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-sans font-bold text-purple-500 bg-purple-50 px-2 py-0.5 rounded-full">{lead.src}</span>
                    <span className={`text-[10px] font-sans font-bold ${lead.score >= 92 ? "text-green-600" : "text-purple-600"}`}>{lead.score}%</span>
                    <span className="text-[9px] text-gray-300 font-sans">{lead.time}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "credits" && (
            <motion.div
              key="credits"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {/* Credit display */}
              <div className="text-center py-4 mb-5 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100">
                <p className="text-[10px] text-purple-400 font-sans font-bold uppercase tracking-wider mb-1">Available Credits</p>
                <motion.p
                  animate={animate ? { scale: [1, 1.12, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className="text-4xl font-black text-gray-900 font-sans"
                >
                  {credits}
                </motion.p>
                <div className="w-48 mx-auto mt-3 h-1.5 bg-purple-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-600 to-violet-400 rounded-full"
                    animate={{ width: `${(credits / 500) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2.5 mb-5">
                <button onClick={() => deduct(1)}
                  className="w-full py-3 bg-white border border-purple-200 text-purple-600 rounded-xl text-xs font-sans font-bold hover:bg-purple-50 transition-all flex items-center justify-center gap-2">
                  <Mail className="w-3.5 h-3.5" /> Get Email — 1 credit
                </button>
                <button onClick={() => deduct(10)}
                  className="w-full py-3 bg-white border border-gray-200 text-gray-600 rounded-xl text-xs font-sans font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                  <Phone className="w-3.5 h-3.5" /> Get Phone — 10 credits
                </button>
              </div>

              {/* Rates */}
              <div className="space-y-2 pt-4 border-t border-gray-100">
                {[
                  { left: "1 credit", right: "= 1 verified email" },
                  { left: "10 credits", right: "= 1 verified mobile" },
                  { left: "Charged", right: "only on success", accent: true },
                ].map(row => (
                  <div key={row.left} className="flex justify-between text-[11px] font-sans">
                    <span className="text-gray-400">{row.left}</span>
                    <span className={row.accent ? "text-purple-600 font-bold" : "text-gray-600"}>{row.right}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Main ─── */
export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="relative py-12 md:py-16 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-[11px] font-sans font-bold tracking-[0.25em] uppercase text-purple-500 mb-4">
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-black tracking-tight text-gray-900 leading-[1.08] mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-base md:text-lg text-gray-400 font-sans font-medium max-w-lg mx-auto mb-8">
            View leads for free. Pay only when you want contact details.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm font-sans font-semibold transition-colors ${!annual ? "text-gray-900" : "text-gray-400"}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${annual ? "bg-purple-600" : "bg-gray-200"}`}
            >
              <motion.div
                className="absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md"
                animate={{ left: annual ? 30 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm font-sans font-semibold transition-colors ${annual ? "text-gray-900" : "text-gray-400"}`}>Annually</span>
            {annual && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="ml-1 text-[10px] font-sans font-bold text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full"
              >
                Save 20%
              </motion.span>
            )}
          </div>
        </motion.div>

        {/* Grid: pricing cards + dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">

          {/* Pricing cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {plans.map((plan, i) => {
              const price = annual ? plan.annual : plan.monthly;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className={`relative rounded-2xl p-6 md:p-7 border transition-all duration-500 group ${
                    plan.highlighted
                      ? "bg-gradient-to-b from-white to-purple-50/40 border-purple-300 shadow-[0_4px_48px_rgba(124,58,237,0.10)]"
                      : "bg-white border-gray-200 hover:border-purple-200 shadow-sm hover:shadow-md"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-violet-500 text-white text-[10px] font-sans font-bold tracking-wider uppercase rounded-full flex items-center gap-1.5 shadow-lg shadow-purple-500/25">
                        <Star className="w-3 h-3" /> Most Popular
                      </span>
                    </div>
                  )}

                  <h3 className="text-lg font-sans font-bold text-gray-900 mb-1">{plan.name}</h3>
                  <p className="text-xs text-gray-400 font-sans mb-5">{plan.credits}</p>

                  <div className="mb-6">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={price}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.25 }}
                        className="text-3xl font-sans font-black text-gray-900 inline-block"
                      >
                        ₹{price.toLocaleString("en-IN")}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-sm text-gray-400 font-sans">/mo</span>
                    {annual && (
                      <span className="block text-[10px] text-green-600 font-sans font-bold mt-1">
                        ₹{((plan.monthly - plan.annual) * 12).toLocaleString("en-IN")} saved/year
                      </span>
                    )}
                  </div>

                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-gray-500 font-sans">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                          plan.highlighted ? "bg-purple-100" : "bg-gray-100"
                        }`}>
                          <Check className={`w-2.5 h-2.5 ${plan.highlighted ? "text-purple-600" : "text-gray-400"}`} />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full py-3.5 rounded-xl text-sm font-sans font-bold transition-all flex items-center justify-center gap-2 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-purple-600 to-violet-500 text-white hover:opacity-90 shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/25"
                      : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                  }`}>
                    Get Started <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
