"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Phone, ExternalLink } from "lucide-react";

const TIMELINE = [
  { time: "0:00", action: "Post detected on Facebook", tool: "Apify scraper picks up new post" },
  { time: "0:04", action: "Keyword match confirmed", tool: '"plumber" + "Houston" + "need" detected' },
  { time: "0:11", action: "AI confirms buying intent", tool: "GPT-4o: 97% confidence — real buyer" },
  { time: "0:18", action: "Contact details found", tool: "FullEnrich: phone + email retrieved" },
  { time: "0:31", action: "Lead record created", tool: "Saved to dashboard with full details" },
  { time: "0:47", action: "WhatsApp alert sent", tool: "Message delivered to your phone" },
];

function Timeline({ isInView }: { isInView: boolean }) {
  const [completed, setCompleted] = useState(-1);

  useEffect(() => {
    if (!isInView) return;
    TIMELINE.forEach((_, i) => {
      setTimeout(() => setCompleted(i), 400 + i * 650);
    });
  }, [isInView]);

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[72px] top-3 bottom-3 w-[2px] bg-gray-200" />
      <motion.div
        className="absolute left-[72px] top-3 w-[2px] bg-black origin-top"
        style={{ height: `${((completed + 1) / TIMELINE.length) * 100}%` }}
        transition={{ duration: 0.5 }}
      />

      <div className="space-y-5">
        {TIMELINE.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
            className="flex items-start gap-4"
          >
            <span className="w-[60px] text-right text-[11px] font-mono font-bold text-gray-400 flex-shrink-0 pt-0.5">{step.time}</span>
            <div className="relative z-10 flex-shrink-0">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                i <= completed ? "bg-black border-black" : "bg-white border-gray-300"
              }`}>
                {i <= completed && <Check className="w-3 h-3 text-white" />}
              </div>
            </div>
            <div className={`transition-opacity duration-500 ${i <= completed ? "opacity-100" : "opacity-30"}`}>
              <p className="text-sm font-bold font-sans text-gray-900">{step.action}</p>
              <p className="text-xs text-gray-500 font-sans mt-0.5">{step.tool}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PhoneNotification({ isInView }: { isInView: boolean }) {
  const fields = [
    { label: "Person", value: "Sarah Johnson" },
    { label: "Needs", value: "Emergency plumbing repair" },
    { label: "Location", value: "Houston TX 77001" },
    { label: "Posted", value: "47 seconds ago" },
    { label: "Source", value: "Facebook Group" },
    { label: "Confidence", value: "97%" },
    { label: "Phone", value: "+1 (713) 555-0192" },
    { label: "Email", value: "sarah.j@gmail.com" },
  ];

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ type: "spring", stiffness: 160, damping: 22, delay: 0.5 }}
      className="flex justify-center"
    >
      <div className="w-72 bg-white border-[3px] border-gray-900 rounded-[44px] p-3 shadow-2xl">
        {/* Notch */}
        <div className="w-24 h-6 bg-gray-900 rounded-full mx-auto mb-3" />

        <div className="bg-gray-50 rounded-[32px] overflow-hidden pt-2 pb-4 px-4 min-h-[500px] flex flex-col">
          {/* Status bar */}
          <div className="flex justify-between text-[9px] text-gray-400 font-mono mb-4">
            <span>9:47</span>
            <span>●●●● 100%</span>
          </div>

          {/* WhatsApp card */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl flex-1 flex flex-col overflow-hidden">
            <div className="bg-[#075E54] px-3 py-2.5 flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                  <span className="text-[10px] font-black text-white">CF</span>
                </div>
                <motion.span
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#075E54]"
                />
              </div>
              <div>
                <p className="text-[11px] font-bold text-white font-sans">Callfills</p>
                <p className="text-[9px] text-green-300 font-sans">New Lead — Houston TX</p>
              </div>
            </div>

            <div className="px-3 py-3 flex-1 space-y-2.5">
              {fields.map((f) => (
                <div key={f.label} className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-400 font-sans">{f.label}</span>
                  <span className={`text-[10px] font-bold font-sans ${
                    f.label === "Phone" || f.label === "Email" ? "text-purple-600" : "text-gray-800"
                  }`}>{f.value}</span>
                </div>
              ))}

              <div className="pt-2 border-t border-gray-200 flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1 py-2 bg-black text-white rounded-lg text-[10px] font-bold font-sans">
                  <Phone className="w-3 h-3" /> Call Now
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 py-2 bg-gray-100 text-gray-700 rounded-lg text-[10px] font-sans">
                  <ExternalLink className="w-3 h-3" /> Dashboard
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <div className="w-28 h-1 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function DeliverSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="hiw-deliver" className="py-20 md:py-28 bg-white border-t-2 border-black" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <span className="inline-block text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-gray-400 mb-3">05 — Deliver</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 leading-[1.05] mb-3">
            Under 60 seconds from<br />post to your pocket
          </h2>
          <p className="text-base text-gray-400 font-sans font-light max-w-xl">
            The moment a lead is confirmed — you know about it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <Timeline isInView={isInView} />
          <PhoneNotification isInView={isInView} />
        </div>
      </div>
    </section>
  );
}
