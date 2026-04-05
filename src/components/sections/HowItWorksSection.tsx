"use client";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

const livePosts = [
  {
    source: "Facebook",
    color: "#4267B2",
    text: '"Does anyone know a good plumber in Houston? Pipe burst this morning"',
    time: "0:00:12 ago",
  },
  {
    source: "Reddit r/houston",
    color: "#FF4500",
    text: '"AC completely died need emergency HVAC repair ASAP"',
    time: "0:00:34 ago",
  },
  {
    source: "Craigslist",
    color: "#8a2be2",
    text: '"Need licensed plumber for water heater replacement"',
    time: "0:01:02 ago",
  },
];

const processingSteps = [
  "Post detected — Facebook Group",
  'Keyword match: "plumber" + "Houston"',
  "AI confirms buying intent: 94% confidence",
  "Contact details extracted",
  "WhatsApp alert sent → Mike's Plumbing Co.",
];

function MockDashboard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [visiblePosts, setVisiblePosts] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const postTimers = livePosts.map((_, i) =>
      setTimeout(() => setVisiblePosts(i + 1), 800 + i * 1200)
    );

    const stepTimers = processingSteps.map((_, i) =>
      setTimeout(
        () => setVisibleSteps(i + 1),
        800 + livePosts.length * 1200 + i * 600
      )
    );

    return () => {
      postTimers.forEach(clearTimeout);
      stepTimers.forEach(clearTimeout);
    };
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 p-3 md:p-0"
    >
      {/* Left panel — Live Feed */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 md:p-5 overflow-hidden">
        <div className="flex items-center gap-2 mb-5">
          <span className="w-2 h-2 rounded-full bg-[#00E87A] animate-pulse" />
          <span className="text-xs font-sans font-semibold tracking-[0.15em] uppercase text-gray-400">
            Live Feed
          </span>
        </div>
        <div className="space-y-3">
          {livePosts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={
                i < visiblePosts ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
              }
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-white border border-gray-200 rounded-lg p-3 md:p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-[10px] font-sans font-bold tracking-wide uppercase px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: post.color + "15",
                    color: post.color,
                  }}
                >
                  {post.source}
                </span>
                <span className="text-[10px] text-gray-400 font-sans font-mono">
                  {post.time}
                </span>
              </div>
              <p className="text-xs md:text-sm text-gray-600 font-sans font-light leading-relaxed italic">
                {post.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right panel — AI Processing */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 md:p-5 overflow-hidden">
        <div className="flex items-center gap-2 mb-5">
          <Loader2
            className={`w-3 h-3 text-[#00E87A] ${
              visibleSteps < processingSteps.length ? "animate-spin" : ""
            }`}
          />
          <span className="text-xs font-sans font-semibold tracking-[0.15em] uppercase text-gray-400">
            LeadPilot AI Processing
          </span>
        </div>
        <div className="space-y-3">
          {processingSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={
                i < visibleSteps ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-start gap-3"
            >
              <CheckCircle2
                className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                  i < visibleSteps ? "text-[#00E87A]" : "text-gray-300"
                }`}
              />
              <span
                className={`text-xs md:text-sm font-sans font-light ${
                  i < visibleSteps ? "text-gray-600" : "text-gray-300"
                }`}
              >
                {step}
              </span>
            </motion.div>
          ))}

          {/* Final alert */}
          {visibleSteps >= processingSteps.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-4 bg-[#00E87A]/10 border border-[#00E87A]/20 rounded-lg p-3 text-center"
            >
              <span className="text-xs font-sans font-semibold text-[#00E87A] tracking-wide">
                Lead delivered in 47 seconds
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative bg-white">
      <ContainerScroll
        titleComponent={
          <div className="mb-6">
            <span className="inline-block text-xs font-sans font-medium tracking-[0.2em] uppercase text-gray-400 mb-6">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif italic tracking-tight text-gray-900 leading-[1.1]">
              From post to your phone
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00E87A] to-[#00E87A]/60">
                — in under 60 seconds
              </span>
            </h2>
          </div>
        }
      >
        <MockDashboard />
      </ContainerScroll>
    </section>
  );
}
