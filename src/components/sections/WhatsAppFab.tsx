"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFab() {
  return (
    <motion.a
      href="https://wa.me/918884677054"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-7 right-7 z-50 w-14 h-14 bg-[#00E87A] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      animate={{
        boxShadow: [
          "0 0 0 0 rgba(0, 232, 122, 0.4)",
          "0 0 0 12px rgba(0, 232, 122, 0)",
          "0 0 0 0 rgba(0, 232, 122, 0)",
        ],
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-gray-900" />
    </motion.a>
  );
}
