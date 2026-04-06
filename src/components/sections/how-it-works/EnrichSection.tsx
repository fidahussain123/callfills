"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const DATABASES = [
  { name: "Hunter", result: "checking" },
  { name: "Wiza", result: "checking" },
  { name: "Datagma", result: "found" },
  { name: "ContactOut", result: "skip" },
  { name: "PeopleDataLabs", result: "skip" },
];

function EnrichWaterfall({ isInView }: { isInView: boolean }) {
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const t = setInterval(() => {
      setStep(i);
      i++;
      if (i >= DATABASES.length) clearInterval(t);
    }, 500);
    return () => clearInterval(t);
  }, [isInView]);

  return (
    <div className="border-2 border-black p-4 bg-gray-50">
      <p className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-3">FullEnrich waterfall</p>
      <div className="space-y-2">
        {DATABASES.map((db, i) => (
          <div key={db.name} className={`flex items-center gap-3 py-1.5 transition-opacity duration-300 ${i > step ? "opacity-30" : "opacity-100"}`}>
            <span className="text-xs font-mono text-gray-700 w-32">{db.name}</span>
            <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
              {i <= step && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.4 }}
                  className={`h-full rounded-full ${db.result === "found" ? "bg-green-500" : "bg-gray-400"}`}
                />
              )}
            </div>
            {i <= step && (
              <span className={`text-[10px] font-mono font-bold ${
                db.result === "found" ? "text-green-600" : db.result === "checking" ? "text-gray-400" : "text-gray-300"
              }`}>
                {db.result === "found" ? "FOUND" : db.result === "skip" ? "skip" : "checking..."}
              </span>
            )}
          </div>
        ))}
      </div>
      {step >= DATABASES.length - 1 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-[11px] font-mono text-green-600 font-bold mt-3 pt-3 border-t border-gray-200">
          Found in 1.4 seconds
        </motion.p>
      )}
    </div>
  );
}

function LeadCard({ enriched }: { enriched: boolean }) {
  return (
    <div className="border-2 border-black p-4 bg-white">
      <p className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-3">
        {enriched ? "Enriched lead" : "What we have"}
      </p>
      <div className="space-y-2">
        {[
          { label: "Name", value: "Sarah Johnson" },
          { label: "Platform", value: "Facebook" },
          { label: "Post", value: "Need a plumber in Houston..." },
          { label: "Phone", value: enriched ? "+1 (713) 555-0192" : "???", highlight: enriched },
          { label: "Email", value: enriched ? "sarah.j@gmail.com" : "???", highlight: enriched },
          ...(enriched ? [{ label: "Verified", value: "Yes", highlight: true }] : []),
        ].map((row) => (
          <div key={row.label} className="flex justify-between items-start gap-2 text-xs font-sans">
            <span className="text-gray-400 flex-shrink-0">{row.label}</span>
            <span className={`text-right font-medium ${
              row.highlight ? "text-green-600 font-bold" : row.value === "???" ? "text-gray-300 tracking-widest" : "text-gray-900"
            }`}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EnrichSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1800);
    const t3 = setTimeout(() => setPhase(3), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [isInView]);

  return (
    <section id="hiw-enrich" className="py-20 md:py-28 bg-gray-50 border-t-2 border-black" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <span className="inline-block text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-gray-400 mb-3">04 — Enrich</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 leading-[1.05] mb-3">
            A name is not a lead.<br />A phone number is.
          </h2>
          <p className="text-base text-gray-400 font-sans font-light max-w-xl">
            We find verified contact details using waterfall enrichment across 20+ databases.
          </p>
        </motion.div>

        {/* 3-step sequence */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-14">
          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, x: -20 }}
            animate={phase >= 1 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <LeadCard enriched={false} />
          </motion.div>

          <div className="flex items-center justify-center md:flex-col gap-2">
            <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
          </div>

          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <EnrichWaterfall isInView={phase >= 2} />
          </motion.div>

          <div className="flex items-center justify-center md:flex-col gap-2">
            <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
          </div>

          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, x: 20 }}
            animate={phase >= 3 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <LeadCard enriched={true} />
          </motion.div>
        </div>

        {/* Credit cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-l-2 border-t-2 border-black">
          {[
            { credit: "1 credit", value: "1 verified email", note: "Only charged when we find something" },
            { credit: "10 credits", value: "1 verified mobile", note: "Mobile numbers = highest response rate" },
          ].map((card) => (
            <div key={card.credit} className="border-r-2 border-b-2 border-black p-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-black font-sans text-gray-900">{card.credit}</span>
                <span className="text-gray-400 font-sans">=</span>
                <span className="text-sm font-bold text-gray-900 font-sans">{card.value}</span>
              </div>
              <p className="text-xs text-gray-500 font-sans flex items-center gap-1.5">
                <Check className="w-3 h-3 text-green-500" /> {card.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
