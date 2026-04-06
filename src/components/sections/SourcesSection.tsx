"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Users2,
  MessageCircle,
  ShoppingBag,
  Home,
  AtSign,
  Bell,
} from "lucide-react";

const sources = [
  {
    icon: Users2,
    name: "Facebook Groups",
    desc: "People post 'need a plumber' constantly. We read every post, every 30 minutes.",
  },
  {
    icon: MessageCircle,
    name: "Reddit Local Subs",
    desc: "r/houston, r/dallas, r/chicago. Hyper-local, high intent. Real people needing real services.",
  },
  {
    icon: ShoppingBag,
    name: "Craigslist",
    desc: "Services Wanted section. Old school but still massive. Thousands of requests daily.",
  },
  {
    icon: Home,
    name: "Nextdoor",
    desc: "Hyper-local neighborhood app. 'Anyone recommend a good HVAC tech?' — these convert highest.",
  },
  {
    icon: AtSign,
    name: "Twitter / X",
    desc: "Real-time. 'pipe burst this morning' — we catch it in seconds and alert you.",
  },
  {
    icon: Bell,
    name: "Google Alerts",
    desc: "Set and forget. We monitor your keywords across the entire Google index.",
  },
];

export default function SourcesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="sources" className="relative py-16 md:py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-sans font-bold tracking-tight text-gray-900 leading-[1.1]">
            We watch everywhere.
            <br />
            <span className="text-gray-400">24 hours. 7 days.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {sources.map((source, i) => {
            const Icon = source.icon;
            return (
              <motion.div
                key={source.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                className="group relative bg-white border border-gray-200 rounded-2xl p-7 md:p-8 hover:border-purple-300 transition-all duration-500 cursor-default shadow-sm"
              >
                <div className="absolute inset-0 rounded-2xl bg-purple-50/0 group-hover:bg-purple-50/50 transition-colors duration-500" />

                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center mb-5 group-hover:border-purple-300 group-hover:bg-purple-50 transition-colors duration-500">
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-500" />
                  </div>
                  <h3 className="text-lg font-sans font-semibold text-gray-900 mb-3">
                    {source.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-sans font-light leading-relaxed">
                    {source.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
