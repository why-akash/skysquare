"use client";
import { motion } from "framer-motion";

const LINKS = {
  Services: [
    "Web Development",
    "Mobile Apps",
    "SaaS Products",
    "UI/UX Design",
    "Backend & API",
    "AI Automation",
  ],
  Company: ["About", "Our Work", "Process", "Blog", "Careers"],
  Connect: ["hello@skysquare.studio", "Twitter / X", "LinkedIn", "GitHub"],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7">
                <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
                  <path
                    d="M4 23V5L14 18V5M14 18V23H24V5"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-white font-medium text-sm tracking-[0.14em] uppercase" style={{ fontFamily: "var(--font-syne)" }}>
                Skysquare
              </span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              A premium software development studio by Akash Kumar &amp; Akash Raj, building digital products that grow businesses.
            </p>
            <div className="flex gap-3 mt-6">
              {["Twitter", "LinkedIn", "GitHub"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-full glass border border-white/[0.07] flex items-center justify-center text-white/30 hover:text-white hover:border-white/20 transition-all duration-200 text-[10px] font-medium"
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white/50 text-xs tracking-widest uppercase font-medium mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/30 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © 2025 Skysquare Studio. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((link) => (
              <a key={link} href="#" className="text-white/20 hover:text-white/50 text-xs transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
