"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Star } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "₹2,499",
    credits: "500 credits",
    highlighted: false,
    features: [
      "500 lead views/mo",
      "3 source platforms",
      "Email support",
      "Basic dashboard",
    ],
  },
  {
    name: "Growth",
    price: "₹7,999",
    credits: "2,000 credits",
    highlighted: true,
    features: [
      "2,000 lead views/mo",
      "All 6 platforms",
      "Priority support",
      "Advanced dashboard",
      "WhatsApp alerts",
      "Team access (3 users)",
    ],
  },
  {
    name: "Agency",
    price: "₹29,999",
    credits: "10,000 credits",
    highlighted: false,
    features: [
      "10,000 lead views/mo",
      "All 6 platforms",
      "Dedicated account manager",
      "Custom integrations",
      "API access",
      "Unlimited team",
    ],
  },
];

function CreditCounter() {
  const [credits, setCredits] = useState(485);
  const [animate, setAnimate] = useState(false);

  const deduct = (amount: number) => {
    if (credits < amount) return;
    setCredits((c) => c - amount);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 400);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
      <span className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-purple-400 mb-6 block">
        Your Dashboard
      </span>

      <div className="text-center mb-8">
        <p className="text-sm text-gray-400 font-sans mb-2">Available Credits</p>
        <motion.p
          animate={animate ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.3 }}
          className="text-5xl md:text-6xl font-sans font-bold text-gray-900"
        >
          {credits}
        </motion.p>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => deduct(1)}
          className="w-full py-3 bg-purple-50 text-purple-600 rounded-xl text-sm font-sans font-semibold hover:bg-purple-100 transition-colors border border-purple-200"
        >
          Get Email — 1 credit
        </button>
        <button
          onClick={() => deduct(10)}
          className="w-full py-3 bg-gray-50 text-gray-600 rounded-xl text-sm font-sans font-medium hover:bg-gray-100 transition-colors border border-gray-200"
        >
          Get Phone — 10 credits
        </button>
      </div>

      <div className="mt-6 pt-5 border-t border-gray-200 space-y-2">
        <div className="flex justify-between text-xs font-sans">
          <span className="text-gray-400">1 credit</span>
          <span className="text-gray-600">= 1 verified email</span>
        </div>
        <div className="flex justify-between text-xs font-sans">
          <span className="text-gray-400">10 credits</span>
          <span className="text-gray-600">= 1 verified mobile number</span>
        </div>
        <div className="flex justify-between text-xs font-sans">
          <span className="text-gray-400">Charged</span>
          <span className="text-purple-600">only on success</span>
        </div>
      </div>
    </div>
  );
}

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="relative py-16 md:py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block text-xs font-sans font-medium tracking-[0.2em] uppercase text-purple-400 mb-4">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-sans font-bold tracking-tight text-gray-900 leading-[1.1] mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-base md:text-lg text-gray-400 font-sans font-light max-w-lg mx-auto">
            View leads for free. Pay only when you want contact details.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className={`relative rounded-2xl p-6 md:p-7 border transition-all duration-500 ${
                  tier.highlighted
                    ? "bg-white border-purple-300 shadow-[0_0_40px_rgba(124,58,237,0.08)]"
                    : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-violet-500 text-white text-[10px] font-sans font-bold tracking-wider uppercase rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3" /> Most Popular
                    </span>
                  </div>
                )}

                <h3 className="text-lg font-sans font-semibold text-gray-900 mb-1">
                  {tier.name}
                </h3>
                <p className="text-xs text-gray-400 font-sans mb-4">
                  {tier.credits}
                </p>

                <div className="mb-6">
                  <span className="text-3xl font-sans font-bold text-gray-900">
                    {tier.price}
                  </span>
                  <span className="text-sm text-gray-400 font-sans">/mo</span>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-gray-500 font-sans font-light"
                    >
                      <Check className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-xl text-sm font-sans font-semibold transition-all ${
                    tier.highlighted
                      ? "bg-gradient-to-r from-purple-600 to-violet-500 text-white hover:opacity-90 shadow-md shadow-purple-500/20"
                      : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <CreditCounter />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
