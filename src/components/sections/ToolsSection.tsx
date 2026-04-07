"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MultiOrbitSemiCircle from "@/components/ui/multi-orbit-semicircle";

export default function ToolsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-12 md:py-16 overflow-hidden" ref={ref} id="tools">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-4"
        >
          <p className="text-[11px] font-sans font-bold tracking-[0.25em] uppercase text-purple-500 mb-4">
            The Stack
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-[3.5rem] font-black tracking-tight text-gray-900 leading-[1.08] mb-4 font-sans">
            Every tool. One platform.
          </h2>
          <p className="text-base text-gray-400 font-sans font-light max-w-lg mx-auto">
            24 best-in-class tools wired into a single pipeline — all funnelling leads to you.
          </p>
        </motion.div>

        {/* Orbit diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <MultiOrbitSemiCircle />
        </motion.div>

        {/* Stat pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-wrap justify-center gap-3 mt-2"
        >
          {[
            { value: "24+",        label: "Data sources" },
            { value: "100k+/day",  label: "Signals tracked" },
            { value: "<60 sec",    label: "Avg. response time" },
            { value: "40+",        label: "Enrichment fields" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-gray-200 bg-white shadow-sm"
            >
              <span className="text-base font-black font-sans text-gray-900">{stat.value}</span>
              <span className="text-xs font-sans text-gray-400 font-medium">{stat.label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
