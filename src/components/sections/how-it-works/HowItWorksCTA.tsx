"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HowItWorksCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32 bg-white border-t-2 border-black" ref={ref}>
      <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[11px] font-sans font-bold tracking-[0.25em] uppercase text-gray-400 mb-6">
            You just saw exactly how it works
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-gray-900 leading-[1.05] mb-4">
            Every step. Every tool.
            <br />Every second.
          </h2>
          <p className="text-base text-gray-400 font-sans font-light mb-10 max-w-md mx-auto">
            The system runs 24/7 while you focus on the work. All you do is pick up the phone.
          </p>

          <motion.a
            href="/#cta"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white text-sm font-black font-sans border-2 border-black hover:bg-gray-900 transition-colors"
          >
            Start Your Free Trial
            <ArrowRight className="w-4 h-4" />
          </motion.a>

          <p className="text-xs text-gray-400 font-sans mt-5">
            7-day free trial · No credit card · Setup in 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}
