"use client";
import { useEffect, useRef, useState } from "react";

const TABS = [
  { id: "sources", label: "Sources" },
  { id: "detect", label: "Detect" },
  { id: "filter", label: "Filter" },
  { id: "enrich", label: "Enrich" },
  { id: "deliver", label: "Deliver" },
  { id: "followup", label: "Follow Up" },
];

export default function TabNav() {
  const [active, setActive] = useState("sources");
  const [stuck, setStuck] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Sticky sentinel
  useEffect(() => {
    const sentinel = document.getElementById("tab-nav-sentinel");
    if (!sentinel) return;
    const obs = new IntersectionObserver(
      ([e]) => setStuck(!e.isIntersecting),
      { threshold: 1 }
    );
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, []);

  // Scroll spy via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    TABS.forEach(({ id }) => {
      const el = document.getElementById(`hiw-${id}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(`hiw-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div id="tab-nav-sentinel" className="h-px" />
      <div
        ref={navRef}
        className={`sticky top-0 z-40 bg-white transition-shadow ${stuck ? "shadow-sm" : ""}`}
      >
        {/* Tab bar — browser-tab style */}
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="flex items-end border-b-2 border-black overflow-x-auto scrollbar-hide">
            {TABS.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  style={{
                    marginBottom: isActive ? "-2px" : "0px",
                    borderRadius: 0,
                  }}
                  className={`
                    flex-shrink-0 px-4 md:px-6 py-2.5 text-[12px] md:text-[13px] font-sans font-semibold
                    border-2 border-black whitespace-nowrap transition-colors duration-150
                    ${isActive
                      ? "bg-black text-white border-b-0"
                      : "bg-transparent text-gray-500 hover:text-gray-900 border-b-2 border-black"
                    }
                  `}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
