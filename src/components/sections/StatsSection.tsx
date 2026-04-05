"use client";
import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface CounterProps {
  target: number;
  suffix: string;
  prefix?: string;
  label: string;
  inView: boolean;
  delay?: number;
}

function Counter({ target, suffix, prefix = "", label, inView, delay = 0 }: CounterProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const timer = setTimeout(() => {
      const controls = animate(0, target, {
        duration: 2,
        ease: [0.25, 0.4, 0.25, 1],
        onUpdate: (v) => setDisplayValue(Math.round(v)),
      });
      return () => controls.stop();
    }, delay);

    return () => clearTimeout(timer);
  }, [inView, target, delay]);

  return (
    <div className="text-center">
      <p className="text-5xl sm:text-6xl md:text-8xl font-serif italic text-gray-900 mb-3">
        {prefix}
        {displayValue}
        {suffix}
      </p>
      <p className="text-sm md:text-base text-gray-400 font-sans font-light tracking-wide">
        {label}
      </p>
    </div>
  );
}

const stats = [
  { target: 500, suffix: "+", label: "Leads/day", delay: 0 },
  { target: 10, suffix: "x", label: "More reach", delay: 200 },
  { target: 80, suffix: "%", label: "Find rate", delay: 400 },
  { target: 60, suffix: "s", prefix: "<", label: "Alert time", delay: 600 },
];

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-28 md:py-40 bg-white" ref={ref}>
      {/* Subtle top/bottom borders */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="inline-block text-xs font-sans font-medium tracking-[0.2em] uppercase text-gray-400 mb-6">
            The Numbers
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic tracking-tight text-gray-900 leading-[1.1]">
            Results that speak for themselves
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: stat.delay / 1000 }}
            >
              <Counter
                target={stat.target}
                suffix={stat.suffix}
                prefix={stat.prefix}
                label={stat.label}
                inView={isInView}
                delay={stat.delay}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
