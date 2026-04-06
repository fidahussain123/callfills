"use client";
import { motion } from "framer-motion";

const words = ["Exactly", "how", "Callfills", "finds", "your", "next", "customer"];

export default function PageHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block text-[11px] font-sans font-bold tracking-[0.25em] uppercase text-gray-400 mb-8 border border-gray-200 px-4 py-1.5"
        >
          The System
        </motion.span>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight font-sans leading-[1.05] mb-6">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
              className={`inline-block mr-[0.22em] ${
                word === "Callfills"
                  ? "text-purple-600"
                  : i < 4
                  ? "text-gray-900"
                  : "text-gray-900"
              }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="text-base sm:text-lg md:text-xl text-gray-400 font-sans font-light max-w-2xl mx-auto leading-relaxed"
        >
          From a social media post to a WhatsApp alert in your pocket —<br className="hidden md:block" />
          here is every step in between.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.4, 0.25, 1] }}
          className="w-16 h-[3px] bg-black mx-auto mt-10 origin-left"
        />
      </div>
    </section>
  );
}
