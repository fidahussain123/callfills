"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, MessageSquare, Mail } from "lucide-react";

const COLUMNS = [
  {
    day: "Day 1 — Immediate",
    icon: Phone,
    title: "Lead delivered instantly",
    points: [
      "You call within 5 minutes",
      "If no answer — automatic follow-up begins",
    ],
    mockup: null,
    accent: "text-purple-600",
  },
  {
    day: "Day 3",
    icon: MessageSquare,
    title: "Automatic WhatsApp follow-up",
    points: [
      "AI writes a personalised message",
      "References their original post naturally",
    ],
    mockup: {
      type: "whatsapp",
      text: "Hi Sarah, following up on your plumbing request from Monday — are you still looking for help? We can come out today.",
    },
    accent: "text-green-600",
  },
  {
    day: "Day 7",
    icon: Mail,
    title: "Email follow-up sent",
    points: [
      "Different angle — different message",
      "No response after Day 7 → marked as Cold",
    ],
    mockup: {
      type: "email",
      subject: "Re: Plumbing help in Houston",
      preview: "Just wanted to reach out one more time...",
    },
    accent: "text-blue-600",
  },
];

export default function FollowUpSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="hiw-followup" className="py-20 md:py-28 bg-gray-50 border-t-2 border-black" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <span className="inline-block text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-gray-400 mb-3">06 — Follow Up</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 leading-[1.05] mb-3">
            What if they don't answer?
          </h2>
          <p className="text-base text-gray-400 font-sans font-light max-w-xl">
            We handle that too. Automatically.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-l-2 border-t-2 border-black mb-14">
          {COLUMNS.map((col, i) => {
            const Icon = col.icon;
            return (
              <motion.div
                key={col.day}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="border-r-2 border-b-2 border-black p-6 flex flex-col gap-4"
              >
                <div>
                  <p className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase mb-3">{col.day}</p>
                  <div className={`w-9 h-9 border-2 border-black flex items-center justify-center mb-3 ${i === 0 ? "bg-black" : "bg-white"}`}>
                    <Icon className={`w-4 h-4 ${i === 0 ? "text-white" : "text-black"}`} />
                  </div>
                  <p className="text-base font-black font-sans text-gray-900 mb-3">{col.title}</p>
                  <ul className="space-y-1.5">
                    {col.points.map((p) => (
                      <li key={p} className="text-xs text-gray-500 font-sans flex items-start gap-2">
                        <span className="text-gray-300 mt-0.5">—</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>

                {col.mockup && col.mockup.type === "whatsapp" && (
                  <div className="mt-auto bg-[#ECE5DD] border border-gray-200 rounded-xl p-3">
                    <div className="bg-white rounded-xl rounded-tl-none p-2.5 max-w-[90%]">
                      <p className="text-[11px] text-gray-700 font-sans leading-relaxed">{col.mockup.text}</p>
                      <p className="text-[9px] text-gray-400 font-sans text-right mt-1">Callfills AI — Sent</p>
                    </div>
                  </div>
                )}

                {col.mockup && col.mockup.type === "email" && (
                  <div className="mt-auto border-2 border-black p-3 bg-white">
                    <p className="text-[10px] font-mono text-gray-400 mb-1">SUBJECT:</p>
                    <p className="text-xs font-bold font-sans text-gray-900 mb-2">{col.mockup.subject}</p>
                    <p className="text-[10px] text-gray-400 font-sans">{col.mockup.preview}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Stat */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-2 border-black p-8 text-center"
        >
          <p className="text-2xl sm:text-3xl md:text-4xl font-black font-sans text-gray-900 mb-2">
            Businesses that follow up within 5 minutes are{" "}
            <span className="text-purple-600">21× more likely</span> to close the job.
          </p>
          <p className="text-xs text-gray-400 font-sans mt-3">Source: Harvard Business Review</p>
        </motion.div>
      </div>
    </section>
  );
}
