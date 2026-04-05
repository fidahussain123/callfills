"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, ExternalLink } from "lucide-react";

export default function NotificationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });

  return (
    <section
      className="relative py-28 md:py-40 bg-gray-50 overflow-hidden"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-xs font-sans font-medium tracking-[0.2em] uppercase text-gray-400 mb-6">
            The Experience
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif italic tracking-tight text-gray-900 leading-[1.1] mb-4">
            This is what you receive
          </h2>
          <p className="text-base md:text-lg text-gray-400 font-sans font-light max-w-lg mx-auto">
            Within 60 seconds of them posting
          </p>
        </motion.div>

        {/* Phone mockup */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="flex justify-center"
        >
          <div className="relative">
            {/* Emerald glow underneath */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-24 bg-[#00E87A]/10 rounded-full blur-3xl" />

            {/* Phone frame */}
            <div className="relative w-[320px] md:w-[380px] bg-white rounded-[40px] border-2 border-gray-200 p-3 shadow-xl">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[26px] bg-white rounded-b-2xl border-b-2 border-x-2 border-gray-200 z-10" />

              {/* Screen */}
              <div className="bg-gray-50 rounded-[28px] overflow-hidden pt-8 pb-4 px-4 min-h-[480px] md:min-h-[540px] flex flex-col">
                {/* Status bar */}
                <div className="flex justify-between items-center text-[10px] text-gray-400 font-sans mb-6 px-1">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <span>●●●●</span>
                    <span>WiFi</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* WhatsApp-style notification */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex-1 flex flex-col"
                >
                  {/* Header */}
                  <div className="bg-gray-50 px-4 py-3 flex items-center gap-3 border-b border-gray-200">
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full bg-[#00E87A]/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-[#00E87A]">
                          LP
                        </span>
                      </div>
                      <motion.span
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#00E87A] border-2 border-gray-50"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-sans font-semibold text-gray-900">
                        LeadPilot
                      </p>
                      <p className="text-[10px] text-[#00E87A] font-sans">
                        New Hot Lead
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-4 py-5 space-y-4 flex-1">
                    <div className="space-y-3">
                      {[
                        { label: "Person", value: "Sarah Johnson" },
                        { label: "Need", value: "AC not cooling, urgent" },
                        { label: "Location", value: "Houston TX 77001" },
                        { label: "Posted", value: "4 minutes ago" },
                        { label: "Source", value: "Facebook Group" },
                      ].map((item, i) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.3, delay: 1.2 + i * 0.15 }}
                          className="flex justify-between items-center"
                        >
                          <span className="text-xs text-gray-400 font-sans">
                            {item.label}
                          </span>
                          <span className="text-xs text-gray-900 font-sans font-medium">
                            {item.value}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Confidence bar */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: 2 }}
                      className="pt-2"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-400 font-sans">
                          Confidence
                        </span>
                        <span className="text-xs text-[#00E87A] font-sans font-bold">
                          96%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: "96%" } : {}}
                          transition={{ duration: 1, delay: 2.2, ease: "easeOut" }}
                          className="h-full bg-[#00E87A] rounded-full"
                        />
                      </div>
                    </motion.div>

                    {/* Divider */}
                    <div className="border-t border-gray-200" />

                    {/* Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 2.5 }}
                      className="flex gap-3 pt-1"
                    >
                      <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#00E87A] text-gray-900 rounded-xl text-xs font-sans font-bold">
                        <Phone className="w-3.5 h-3.5" />
                        Call Now
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-600 border border-gray-200 rounded-xl text-xs font-sans font-medium">
                        <ExternalLink className="w-3.5 h-3.5" />
                        View Full Lead
                      </button>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Bottom bar */}
                <div className="flex justify-center pt-3">
                  <div className="w-32 h-1 bg-gray-300 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
