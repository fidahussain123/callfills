"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const problems = [
  {
    num: "01",
    title: "They posted online. You never saw it.",
    desc: "Every day, hundreds of people in your city post that they need exactly what you offer. They get no response and book a competitor.",
  },
  {
    num: "02",
    title: "You're too slow to respond.",
    desc: "The business that calls within 5 minutes wins 80% of jobs. Most contractors call back the next day. By then — it's too late.",
  },
  {
    num: "03",
    title: "Manual search doesn't scale.",
    desc: "You can't monitor Facebook, Reddit, Craigslist and Twitter simultaneously. You miss 99% of organic leads every single day.",
  },
];

export default function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="problem"
      className="relative py-16 md:py-24 bg-white"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block text-xs font-sans font-medium tracking-[0.2em] uppercase text-purple-400 mb-4">
            The Problem
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif italic tracking-tight text-gray-900 max-w-4xl mx-auto leading-[1.1]">
            Every business is losing customers they never knew existed
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {problems.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.15,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className="group relative bg-white border border-gray-200 rounded-2xl p-8 md:p-10 overflow-hidden hover:border-purple-200 transition-all duration-500 shadow-sm"
            >
              <span className="absolute -top-4 -right-2 text-[8rem] md:text-[10rem] font-serif italic font-bold text-gray-100 leading-none select-none pointer-events-none">
                {p.num}
              </span>

              <div className="relative z-10">
                <span className="inline-block text-xs font-sans font-semibold tracking-[0.15em] uppercase text-purple-400 mb-4">
                  Problem {p.num}
                </span>
                <h3 className="text-xl md:text-2xl font-serif italic text-gray-900 mb-4 leading-snug">
                  {p.title}
                </h3>
                <p className="text-[15px] text-gray-500 leading-relaxed font-sans font-light">
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
