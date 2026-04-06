"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, Check } from "lucide-react";

const ALL_POSTS = [
  { text: "Just fixed my own AC unit today, feels great!", isLead: false },
  { text: "This heat is insane in Houston right now", isLead: false },
  { text: "Does anyone know a good plumber? Pipe burst this morning — Houston TX", isLead: true },
  { text: "HVAC companies are getting rich this summer lol", isLead: false },
  { text: "Need emergency AC repair ASAP — anyone recommend someone?", isLead: true },
  { text: "My neighbour just became a plumber apparently", isLead: false },
  { text: "Anyone know a reliable electrician in the Heights area?", isLead: true },
  { text: "Water heater completely dead. Need someone today. Houston.", isLead: true },
  { text: "Thinking about learning HVAC as a trade tbh", isLead: false },
];

const SERVICE_KEYWORDS = ["plumber","plumbing","HVAC","AC repair","air conditioning","heating","pipe burst","water heater","drain","leak","furnace","duct","emergency plumber","electrician"];
const INTENT_KEYWORDS = ["need","looking for","recommend","anyone know","help","ASAP","urgent","broken","not working","died","can someone","does anyone"];

function PostFeed() {
  const [posts, setPosts] = useState(ALL_POSTS.slice(0, 4).map((p, i) => ({ ...p, id: i })));
  const [nextId, setNextId] = useState(4);

  useEffect(() => {
    let idx = 4;
    const interval = setInterval(() => {
      const post = ALL_POSTS[idx % ALL_POSTS.length];
      const id = nextId + idx;
      setPosts((prev) => [{ ...post, id }, ...prev.slice(0, 4)]);
      idx++;
      setNextId(id + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-2 overflow-hidden h-[340px]">
      <p className="text-xs font-bold font-sans text-gray-500 uppercase tracking-widest mb-3">Raw posts coming in</p>
      <AnimatePresence initial={false}>
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className={`flex items-start gap-2.5 p-3 border-2 text-xs font-sans leading-relaxed
              ${post.isLead
                ? "border-green-500 bg-green-50 text-gray-800"
                : "border-gray-200 bg-white text-gray-500"}`}
          >
            {post.isLead
              ? <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
              : <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />}
            <span>{post.text}</span>
            {post.isLead && (
              <span className="ml-auto flex-shrink-0 text-[9px] font-bold text-green-700 bg-green-100 border border-green-300 px-1.5 py-0.5 uppercase tracking-wide">
                LEAD
              </span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function KeywordMatcher({ isInView }: { isInView: boolean }) {
  return (
    <div>
      <p className="text-xs font-bold font-sans text-gray-500 uppercase tracking-widest mb-4">Keyword matching engine</p>
      <p className="text-sm font-bold text-gray-900 font-sans mb-3">Watching for these signals</p>

      <div className="mb-4">
        <p className="text-[10px] font-sans text-blue-600 uppercase tracking-widest font-bold mb-2">Service keywords</p>
        <div className="flex flex-wrap gap-1.5">
          {SERVICE_KEYWORDS.map((kw, i) => (
            <motion.span
              key={kw}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.05 * i, duration: 0.3 }}
              className="px-2 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-sans font-medium"
            >
              {kw}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <p className="text-[10px] font-sans text-green-600 uppercase tracking-widest font-bold mb-2">Intent keywords (must match)</p>
        <div className="flex flex-wrap gap-1.5">
          {INTENT_KEYWORDS.map((kw, i) => (
            <motion.span
              key={kw}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + 0.05 * i, duration: 0.3 }}
              className="px-2 py-1 bg-green-50 border border-green-200 text-green-700 text-[11px] font-sans font-medium"
            >
              {kw}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="border-2 border-black p-3 bg-black text-white text-[11px] font-mono leading-relaxed">
        <span className="text-yellow-400">match:</span> ANY service keyword<br />
        <span className="text-yellow-400">+</span> ANY intent keyword<br />
        <span className="text-gray-400">→</span> Candidate lead <span className="text-purple-400">→</span> AI confirmation
      </div>
    </div>
  );
}

export default function DetectSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="hiw-detect" className="py-20 md:py-28 bg-gray-50 border-t-2 border-black" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <span className="inline-block text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-gray-400 mb-3">02 — Detect</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 leading-[1.05] mb-3">
            Finding the needle in the haystack
          </h2>
          <p className="text-base text-gray-400 font-sans font-light max-w-xl">
            Not every post is a lead. We scan thousands and find the ones that actually matter.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
        >
          <PostFeed />
          <KeywordMatcher isInView={isInView} />
        </motion.div>
      </div>
    </section>
  );
}
