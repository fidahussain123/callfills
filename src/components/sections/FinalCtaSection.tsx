"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ElegantShape } from "@/components/ui/shape-landing-hero";
import { ArrowRight, Zap, Shield, Clock, Users, TrendingUp, CheckCircle2 } from "lucide-react";

const stats = [
  { icon: Users, value: 2400, suffix: "+", label: "Active users" },
  { icon: TrendingUp, value: 98, suffix: "%", label: "Lead accuracy" },
  { icon: Clock, value: 24, suffix: "hr", label: "Setup time" },
];

const guarantees = [
  "7-day free trial",
  "No credit card required",
  "Cancel anytime",
  "24hr setup guarantee",
];

function AnimatedCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span className="font-black text-3xl md:text-4xl tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function FinalCtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gray-50 py-12 md:py-16"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-transparent to-violet-400/20 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(124,58,237,0.08),transparent_60%)]" />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape delay={0.3} width={500} height={120} rotate={-12} gradient="from-purple-600/55" className="right-[-5%] top-[15%]" />
        <ElegantShape delay={0.5} width={400} height={100} rotate={15} gradient="from-violet-500/45" className="left-[-5%] bottom-[20%]" />
        <ElegantShape delay={0.7} width={200} height={60} rotate={-20} gradient="from-purple-500/40" className="right-[10%] bottom-[5%]" />
        <ElegantShape delay={0.9} width={150} height={45} rotate={25} gradient="from-violet-400/35" className="left-[15%] top-[10%]" />
      </div>

      {/* Animated grid dots */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle, #7c3aed 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
        {/* Stats row */}
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center gap-6 md:gap-12 mb-14"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-purple-100 text-purple-600 mb-2">
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-purple-700">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={isInView} />
              </div>
              <div className="text-xs text-gray-500 font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Main CTA card */}
        <motion.div
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Card background with gradient border */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-violet-600 to-purple-700 rounded-3xl" />
          <div className="absolute inset-[1px] bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 rounded-3xl" />

          {/* Inner glow effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,58,237,0.15),transparent_60%)]" />

          <div className="relative px-6 py-14 md:px-16 md:py-20 text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8"
            >
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-sm text-purple-300 font-semibold tracking-wide">Limited Time Offer</span>
            </motion.div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-sans font-black tracking-tight text-white leading-[1.08] mb-5">
              Stop missing leads
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-violet-300 to-purple-400">
                that are right in front of you
              </span>
            </h2>

            <p className="text-base md:text-lg text-gray-400 font-sans font-medium mb-10 max-w-xl mx-auto leading-relaxed">
              Every day you wait, competitors are getting alerts you should have.
              Join 2,400+ businesses already winning with Callfills.
            </p>

            {/* CTA buttons */}
            <div className="flex gap-4 justify-center flex-wrap mb-10">
              <motion.a
                href="https://wa.me/918884677054"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-500 text-white font-bold rounded-xl transition-all text-sm tracking-wide font-sans shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="https://wa.me/918884677054"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 transition-all text-sm font-sans backdrop-blur-sm"
              >
                <Shield className="w-4 h-4 text-purple-400" />
                Book a Demo
              </motion.a>
            </div>

            {/* Guarantee pills */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-5">
              {guarantees.map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className="flex items-center gap-1.5 text-xs text-gray-400 font-medium"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-gray-50/40 pointer-events-none" />
    </section>
  );
}
