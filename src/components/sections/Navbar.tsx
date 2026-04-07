"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Sources", href: "#sources" },
  { label: "Pricing", href: "#pricing" },
  { label: "Industries", href: "#industries" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setScrolled(currentScrollY > 20);
    setVisible(currentScrollY < lastScrollY || currentScrollY < 100);
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -80 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className={`mx-auto max-w-5xl px-4 transition-all duration-300 ${scrolled ? "pt-2" : "pt-4"}`}>
          <div className={`flex items-center justify-between rounded-2xl px-5 h-14 transition-all duration-300 ${
            scrolled
              ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-black/[0.04] border border-gray-200/60"
              : "bg-white/60 backdrop-blur-sm border border-transparent"
          }`}>
            {/* Logo */}
            <a href="#" className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-gray-900 font-sans">
                Callfills
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3.5 py-1.5 text-[13px] text-gray-500 hover:text-gray-900 hover:bg-gray-100/80 rounded-lg transition-all duration-200 font-sans font-semibold"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:block">
              <a
                href="#cta"
                className="px-4 py-2 bg-gray-900 text-white text-[13px] font-bold rounded-lg hover:bg-gray-800 transition-all duration-200 font-sans"
              >
                Get Started
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-1.5 text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-20 z-40 bg-white/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-6"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-xl text-gray-500 hover:text-gray-900 transition-colors font-sans font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cta"
              onClick={() => setMobileOpen(false)}
              className="px-6 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-lg font-sans"
            >
              Get Started
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
