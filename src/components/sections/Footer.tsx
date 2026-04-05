"use client";

export default function Footer() {
  return (
    <footer className="relative py-8 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-1">
            <span className="text-base font-sans font-semibold text-gray-900 tracking-tight">
              LeadPilot
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E87A]" />
          </a>

          {/* Center */}
          <p className="text-xs text-gray-400 font-sans font-light text-center">
            Built by a team of AI and automation specialists · India
          </p>

          {/* Right */}
          <p className="text-xs text-gray-400 font-sans">
            © 2026 LeadPilot
          </p>
        </div>
      </div>
    </footer>
  );
}
