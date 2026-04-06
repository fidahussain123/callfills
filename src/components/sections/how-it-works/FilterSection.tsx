"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ANALYSES = [
  {
    post: `"Does anyone know a good plumber in Houston? My pipe burst this morning and water is everywhere."`,
    pass: true,
    lines: [
      { text: "Intent: HIRING", ok: true },
      { text: "Urgency: HIGH", ok: true },
      { text: "Location: Houston TX", ok: true },
      { text: "Service needed: Emergency plumbing", ok: true },
      { text: "Confidence: 97%", ok: true },
      { text: "Decision: LEAD CONFIRMED — forwarding to client", ok: true },
    ],
  },
  {
    post: `"HVAC companies are making so much money this summer. Should I get into the trade?"`,
    pass: false,
    lines: [
      { text: "Intent: NOT HIRING", ok: false },
      { text: "Context: Industry discussion — not a service request", ok: false },
      { text: "Confidence: 99%", ok: null },
      { text: "Decision: DISCARDED — not a buyer", ok: false },
    ],
  },
  {
    post: `"AC completely died. 95 degrees outside. Need someone ASAP. Houston area. Any recommendations?"`,
    pass: true,
    lines: [
      { text: "Intent: HIRING", ok: true },
      { text: "Urgency: CRITICAL", ok: true },
      { text: "Location: Houston TX", ok: true },
      { text: "Confidence: 99%", ok: true },
      { text: "Decision: LEAD CONFIRMED — forwarding to client", ok: true },
    ],
  },
];

function useTypewriter(text: string, speed = 18, active = true) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!active) { setDisplayed(""); return; }
    setDisplayed("");
    let i = 0;
    const t = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text, active]);
  return displayed;
}

function AnalysisLine({ line, delay, analysisKey }: { line: { text: string; ok: boolean | null }; delay: number; analysisKey: number }) {
  const [visible, setVisible] = useState(false);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    setVisible(false);
    setTyped("");
    const t = setTimeout(() => {
      setVisible(true);
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setTyped(line.text.slice(0, i));
        if (i >= line.text.length) clearInterval(interval);
      }, 18);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(t);
  }, [line.text, delay, analysisKey]);

  if (!visible) return null;

  const color = line.ok === true ? "text-green-400" : line.ok === false ? "text-red-400" : "text-gray-400";
  const symbol = line.ok === true ? "PASS" : line.ok === false ? "FAIL" : "";

  return (
    <div className={`font-mono text-xs leading-relaxed ${color} flex items-center gap-1.5`}>
      {symbol && (
        <span className={`text-[8px] font-bold px-1 py-0.5 rounded ${
          line.ok ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
        }`}>{symbol}</span>
      )}
      {typed}
    </div>
  );
}

function AITerminal() {
  const [idx, setIdx] = useState(0);
  const [thinking, setThinking] = useState(true);
  const [dots, setDots] = useState("");
  const [showLines, setShowLines] = useState(false);
  const analysis = ANALYSES[idx];

  useEffect(() => {
    setThinking(true);
    setShowLines(false);
    setDots("");

    const dotInterval = setInterval(() => setDots((d) => (d.length >= 3 ? "" : d + ".")), 300);
    const thinkTimer = setTimeout(() => {
      clearInterval(dotInterval);
      setThinking(false);
      setShowLines(true);
    }, 900);

    return () => { clearInterval(dotInterval); clearTimeout(thinkTimer); };
  }, [idx]);

  useEffect(() => {
    const cycle = setInterval(() => {
      setIdx((i) => (i + 1) % ANALYSES.length);
    }, 6000);
    return () => clearInterval(cycle);
  }, []);

  return (
    <div className="border-2 border-black bg-[#0d0d0d] overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#222] bg-[#111]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-[10px] font-mono text-gray-500">Callfills AI · GPT-4o mini · Analyzing{thinking ? dots : " Done"}</span>
        <div className="flex gap-1">
          {ANALYSES.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === idx ? "bg-purple-500" : "bg-gray-700"}`} />
          ))}
        </div>
      </div>

      <div className="p-4 min-h-[260px]">
        {/* Input post */}
        <div className="mb-4">
          <p className="text-[10px] font-mono text-gray-600 mb-1">INPUT POST:</p>
          <p className="text-xs font-mono text-gray-300 leading-relaxed italic">{analysis.post}</p>
        </div>

        {/* Thinking */}
        {thinking && (
          <div className="flex items-center gap-2 py-2">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.span key={i} animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
              ))}
            </div>
            <span className="text-[10px] font-mono text-gray-500">AI reading context{dots}</span>
          </div>
        )}

        {/* Output */}
        {showLines && (
          <div className="space-y-1.5 border-t border-[#222] pt-3">
            <p className="text-[10px] font-mono text-gray-600 mb-2">OUTPUT:</p>
            {analysis.lines.map((line, i) => (
              <AnalysisLine key={`${idx}-${i}`} line={line} delay={i * 220} analysisKey={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function FilterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const stats = [
    { value: "47,293", label: "Posts scanned" },
    { value: "1,847", label: "Keyword matches" },
    { value: "94", label: "AI confirmed leads" },
    { value: "2.1%", label: "Match → lead rate" },
  ];

  return (
    <section id="hiw-filter" className="py-20 md:py-28 bg-white border-t-2 border-black" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <span className="inline-block text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-gray-400 mb-3">03 — Filter</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 leading-[1.05] mb-3">
            AI reads every candidate.<br />Only real buyers pass.
          </h2>
          <p className="text-base text-gray-400 font-sans font-light max-w-xl">
            Keyword match gets us candidates. GPT-4o confirms if someone is actually ready to hire.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-12"
        >
          <AITerminal />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">In the last 24 hours</p>
          <div className="grid grid-cols-2 md:grid-cols-4 border-l-2 border-t-2 border-black">
            {stats.map((s) => (
              <div key={s.label} className="border-r-2 border-b-2 border-black p-5">
                <p className="text-3xl font-black font-sans text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500 font-sans mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
