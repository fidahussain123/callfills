"use client";
import { motion } from "framer-motion";
import { ElegantShape } from "@/components/ui/shape-landing-hero";

export default function FinalCtaSection() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2 + i * 0.15,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    }),
  };

  return (
    <section
      id="cta"
      className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden bg-gray-50 py-28 md:py-40"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00E87A]/[0.04] via-transparent to-[#00E87A]/[0.04] blur-3xl" />

      {/* Geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={500}
          height={120}
          rotate={-12}
          gradient="from-[#00E87A]/[0.08]"
          className="right-[-5%] top-[20%]"
        />
        <ElegantShape
          delay={0.5}
          width={400}
          height={100}
          rotate={15}
          gradient="from-gray-200/40"
          className="left-[-5%] bottom-[15%]"
        />
        <ElegantShape
          delay={0.7}
          width={200}
          height={60}
          rotate={-20}
          gradient="from-[#00E87A]/[0.06]"
          className="right-[10%] bottom-[10%]"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-serif italic tracking-tight text-gray-900 leading-[1.1] mb-6">
            Stop missing leads
            <br />
            that are right in front of you
          </h2>
        </motion.div>

        <motion.div
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-base md:text-lg text-gray-400 font-sans font-light mb-12 max-w-xl mx-auto">
            Every day you wait, competitors are getting alerts you should have.
          </p>
        </motion.div>

        <motion.div
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex gap-4 justify-center flex-wrap mb-8">
            <a
              href="https://wa.me/918884677054"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#00E87A] text-gray-900 font-semibold rounded-xl hover:bg-[#00E87A]/90 transition-all text-sm tracking-wide font-sans hover:scale-[1.02] active:scale-[0.98]"
            >
              Start Free Trial — No Credit Card
            </a>
            <a
              href="https://wa.me/918884677054"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-gray-600 font-medium rounded-xl border border-gray-200 hover:bg-gray-100 transition-all text-sm font-sans"
            >
              Book a Demo on WhatsApp
            </a>
          </div>

          <p className="text-xs text-gray-400 font-sans">
            Setup in 24 hours · 7-day free trial · Cancel anytime
          </p>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-gray-50/60 pointer-events-none" />
    </section>
  );
}
