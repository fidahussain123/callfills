"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { SparklesText } from "@/components/ui/sparkles-text";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-purple-300/40",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-purple-500/60",
            "shadow-[0_8px_40px_0_rgba(124,58,237,0.22)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.06),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── Floating tool cards on sides ─── */
const leftTools = [
  { label: "Facebook",  logo: "https://cdn.simpleicons.org/facebook/1877F2",       bg: "#1877F2", top: "18%", left: "3%",  rotate: -6,  size: 52 },
  { label: "Reddit",    logo: "https://cdn.simpleicons.org/reddit/FF4500",         bg: "#FF4500", top: "48%", left: "6%",  rotate: 8,   size: 48 },
  { label: "Apify",     logo: null,                                                 bg: "#FF9B00", top: "75%", left: "2%",  rotate: -4,  size: 44 },
  { label: "Google",    logo: "https://cdn.simpleicons.org/googlemaps/4285F4",     bg: "#4285F4", top: "35%", left: "12%", rotate: 12,  size: 40 },
];

const rightTools = [
  { label: "Apollo",    logo: "https://cdn.simpleicons.org/apollographql/6C47FF",  bg: "#6C47FF", top: "20%", right: "4%",  rotate: 6,   size: 50 },
  { label: "n8n",       logo: "https://cdn.simpleicons.org/n8n/EA4B71",           bg: "#EA4B71", top: "50%", right: "7%",  rotate: -8,  size: 44 },
  { label: "Supabase",  logo: "https://cdn.simpleicons.org/supabase/3ECF8E",      bg: "#3ECF8E", top: "72%", right: "2%",  rotate: 5,   size: 46 },
  { label: "X",         logo: "https://cdn.simpleicons.org/x/000000",             bg: "#000",    top: "38%", right: "13%", rotate: -10, size: 38 },
];

function ToolCard({ tool, side, index }: { tool: { label: string; logo: string | null; bg: string; top: string; left?: string; right?: string; rotate: number; size: number }; side: "left" | "right"; index: number }) {
  const [imgErr, setImgErr] = useState(false);
  const pos = side === "left"
    ? { top: tool.top, left: tool.left }
    : { top: tool.top, right: tool.right };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: tool.rotate - 20 }}
      animate={{ opacity: 1, scale: 1, rotate: tool.rotate }}
      transition={{ duration: 1.2, delay: 0.8 + index * 0.15, ease: [0.23, 0.86, 0.39, 0.96] }}
      className="absolute hidden md:flex"
      style={pos}
    >
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [tool.rotate, tool.rotate + 2, tool.rotate] }}
        transition={{ duration: 4 + index * 0.5, repeat: Infinity, ease: "easeInOut" }}
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/80 flex items-center justify-center"
        style={{ width: tool.size, height: tool.size }}
      >
        {tool.logo && !imgErr ? (
          <img
            src={tool.logo}
            alt={tool.label}
            width={tool.size * 0.5}
            height={tool.size * 0.5}
            onError={() => setImgErr(true)}
            style={{ width: tool.size * 0.5, height: tool.size * 0.5, objectFit: "contain" }}
          />
        ) : (
          <div
            className="rounded-lg flex items-center justify-center text-white font-black"
            style={{ width: tool.size * 0.55, height: tool.size * 0.55, background: tool.bg, fontSize: tool.size * 0.22 }}
          >
            {tool.label.slice(0, 2).toUpperCase()}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function HeroGeometric({
  badge = "AI Lead Generation",
  title1 = "Find Every Lead",
  title2 = "Close Every Deal",
  subtitle,
  children,
}: {
  badge?: string;
  title1?: string;
  title2?: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y5 = useTransform(scrollYProgress, [0, 1], [0, -140]);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    }),
  };

  return (
    <div ref={containerRef} className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-transparent to-violet-400/20 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(124,58,237,0.06),transparent_60%)]" />

      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]">
          <ElegantShape delay={0.3} width={600} height={140} rotate={12} gradient="from-purple-600/60" />
        </motion.div>
        <motion.div style={{ y: y2 }} className="absolute right-[-5%] md:right-[0%] top-[70%] md:top-[75%]">
          <ElegantShape delay={0.5} width={500} height={120} rotate={-15} gradient="from-violet-600/50" />
        </motion.div>
        <motion.div style={{ y: y3 }} className="absolute left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]">
          <ElegantShape delay={0.4} width={300} height={80} rotate={-8} gradient="from-purple-500/55" />
        </motion.div>
        <motion.div style={{ y: y4 }} className="absolute right-[15%] md:right-[20%] top-[10%] md:top-[15%]">
          <ElegantShape delay={0.6} width={200} height={60} rotate={20} gradient="from-violet-500/50" />
        </motion.div>
        <motion.div style={{ y: y5 }} className="absolute left-[20%] md:left-[25%] top-[5%] md:top-[10%]">
          <ElegantShape delay={0.7} width={150} height={40} rotate={-25} gradient="from-purple-500/50" />
        </motion.div>
      </div>

      {/* Floating tool cards — left side */}
      {leftTools.map((tool, i) => (
        <ToolCard key={tool.label} tool={tool} side="left" index={i} />
      ))}
      {/* Floating tool cards — right side */}
      {rightTools.map((tool, i) => (
        <ToolCard key={tool.label} tool={tool} side="right" index={i} />
      ))}

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {badge && (
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 mb-8 md:mb-12"
            >
              <Circle className="h-2 w-2 fill-purple-500 text-purple-500" />
              <span className="text-sm text-purple-600 tracking-wide font-sans font-semibold">
                {badge}
              </span>
            </motion.div>
          )}

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-6 md:mb-8"
          >
            <h1 className="text-[2rem] sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[7rem] font-black tracking-tight font-sans leading-[1.04]">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-gray-950 to-gray-600">
                {title1}
              </span>
            </h1>
            <SparklesText
              text={title2}
              className="text-[2rem] sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[7rem] font-black tracking-tight font-sans leading-[1.04] text-purple-600"
              colors={{ first: "#7C3AED", second: "#A855F7" }}
              sparklesCount={8}
            />
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            {subtitle && (
              <p className="text-base sm:text-lg md:text-xl text-gray-500 mb-10 leading-relaxed font-medium tracking-wide max-w-2xl mx-auto font-sans">
                {subtitle}
              </p>
            )}
            {children}
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/60 pointer-events-none" />
    </div>
  );
}

export { ElegantShape };
