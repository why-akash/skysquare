"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMouseParallax } from "@/hooks/useMouseParallax";

/* ── Floating UI mock components ──────────────────────────── */

function BrowserWindow({
  style,
  className,
  delay = 0,
}: {
  style?: React.CSSProperties;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`glass rounded-xl overflow-hidden shadow-2xl ${className ?? ""}`}
      style={style}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {/* Browser chrome */}
      <div className="bg-white/[0.04] px-3 py-2.5 flex items-center gap-1.5 border-b border-white/[0.06]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <div className="ml-2 flex-1 bg-white/[0.06] rounded-full h-4 px-3 flex items-center">
          <span className="text-white/20 text-[9px] font-mono">https://dashboard.skysquare.studio</span>
        </div>
      </div>
      {/* Mock dashboard content */}
      <div className="p-4 space-y-3">
        <div className="flex gap-2">
          {["#4f8ef7", "#8b5cf6", "#06b6d4"].map((c, i) => (
            <div
              key={i}
              className="flex-1 rounded-lg p-3"
              style={{ background: `${c}12`, border: `1px solid ${c}25` }}
            >
              <div className="w-6 h-1 rounded-full mb-2" style={{ background: c }} />
              <div className="text-white text-lg font-semibold leading-none">
                {["98%", "4.2x", "2.1s"][i]}
              </div>
              <div className="text-white/30 text-[9px] mt-1">
                {["Uptime", "ROI growth", "Load time"][i]}
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-1.5">
          {[70, 45, 85, 55].map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-10 h-1.5 rounded-full bg-white/[0.06]" />
              <div
                className="h-1.5 rounded-full"
                style={{
                  width: `${w}%`,
                  background: i % 2 === 0 ? "rgba(79,142,247,0.4)" : "rgba(139,92,246,0.4)",
                }}
              />
            </div>
          ))}
        </div>
        <div className="h-16 relative overflow-hidden rounded-lg bg-white/[0.02]">
          {/* Sparkline */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f8ef7" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#4f8ef7" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 40 C20 35, 40 20, 60 25 S100 10, 120 15 S160 5, 200 8 S240 20, 280 12 L280 64 L0 64 Z"
              fill="url(#chartGrad)"
            />
            <path
              d="M0 40 C20 35, 40 20, 60 25 S100 10, 120 15 S160 5, 200 8 S240 20, 280 12"
              fill="none"
              stroke="#4f8ef7"
              strokeWidth="1.5"
              strokeOpacity="0.8"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

function PhoneMockup({
  className,
  delay = 0,
  style,
}: {
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={`relative ${className ?? ""}`}
      style={style}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {/* Phone frame */}
      <div
        className="relative rounded-[2rem] overflow-hidden"
        style={{
          width: 120,
          height: 240,
          background: "rgba(20,20,25,0.9)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-2 bg-black/80 rounded-full z-10" />
        {/* Screen content */}
        <div className="pt-8 px-2.5 pb-2.5 space-y-2">
          <div className="h-14 rounded-xl bg-gradient-to-br from-[#4f8ef7]/20 to-[#8b5cf6]/20 border border-white/[0.07] flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-[#4f8ef7]/40 border border-[#4f8ef7]/60" />
          </div>
          {[80, 60, 70].map((w, i) => (
            <div key={i} className="space-y-1">
              <div
                className="h-1.5 rounded-full bg-white/[0.06]"
                style={{ width: `${w}%` }}
              />
              <div className="h-1.5 rounded-full bg-white/[0.04] w-full" />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            {["#4f8ef7", "#8b5cf6", "#06b6d4", "#f472b6"].map((c, i) => (
              <div
                key={i}
                className="h-8 rounded-lg"
                style={{ background: `${c}20`, border: `1px solid ${c}30` }}
              />
            ))}
          </div>
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/20" />
      </div>
    </motion.div>
  );
}

function CodePanel({
  className,
  delay = 0,
  style,
}: {
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const lines = [
    { indent: 0, tokens: [{ t: "const", c: "code-kw" }, { t: " api = ", c: "" }, { t: "createAPI", c: "code-fn" }, { t: "({", c: "code-op" }] },
    { indent: 1, tokens: [{ t: "base", c: "" }, { t: ": ", c: "code-op" }, { t: '"https://api.skysquare.studio"', c: "code-str" }, { t: ",", c: "code-op" }] },
    { indent: 1, tokens: [{ t: "auth", c: "" }, { t: ": ", c: "code-op" }, { t: '"Bearer "', c: "code-str" }, { t: " + key", c: "" }] },
    { indent: 0, tokens: [{ t: "})", c: "code-op" }] },
    { indent: 0, tokens: [] },
    { indent: 0, tokens: [{ t: "// Deploy to production", c: "code-cm" }] },
    { indent: 0, tokens: [{ t: "await ", c: "code-kw" }, { t: "deploy", c: "code-fn" }, { t: "(app, {", c: "code-op" }] },
    { indent: 1, tokens: [{ t: "region", c: "" }, { t: ": ", c: "code-op" }, { t: '"us-east-1"', c: "code-str" }] },
    { indent: 0, tokens: [{ t: "})", c: "code-op" }] },
  ];

  return (
    <motion.div
      className={`glass rounded-xl overflow-hidden shadow-2xl ${className ?? ""}`}
      style={style}
      initial={{ opacity: 0, x: 30, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {/* Editor chrome */}
      <div className="bg-white/[0.04] px-4 py-2.5 flex items-center gap-2 border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          {["bg-red-500/50", "bg-yellow-500/50", "bg-green-500/50"].map((c, i) => (
            <span key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
          ))}
        </div>
        <span className="ml-2 text-white/20 text-[10px] font-mono">deploy.ts</span>
      </div>
      <div className="p-4 font-mono text-[10px] leading-relaxed space-y-0.5">
        {lines.map((line, i) => (
          <div key={i} className="flex">
            <span className="text-white/15 w-5 mr-3 text-right select-none">{i + 1}</span>
            <span style={{ paddingLeft: line.indent * 14 }}>
              {line.tokens.map((tok, j) =>
                tok.c ? (
                  <span key={j} className={tok.c}>
                    {tok.t}
                  </span>
                ) : (
                  <span key={j} className="text-white/70">
                    {tok.t}
                  </span>
                )
              )}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function MetricCard({
  value,
  label,
  color,
  delay,
  className,
  style,
}: {
  value: string;
  label: string;
  color: string;
  delay: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={`glass rounded-xl px-4 py-3 ${className ?? ""}`}
      style={style}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      <div className="text-2xl font-bold" style={{ color }}>
        {value}
      </div>
      <div className="text-white/40 text-xs mt-0.5">{label}</div>
    </motion.div>
  );
}

/* ── Hero ────────────────────────────────────────────────── */

export default function Hero({ loaded }: { loaded: boolean }) {
  const mouse = useMouseParallax();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 80]);

  const px = (depth: number) => mouse.x * depth * 28;
  const py = (depth: number) => mouse.y * depth * 28;

  const words = ["WE BUILD", "DIGITAL PRODUCTS", "THAT GROW", "BUSINESSES"];

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      ref={containerRef}
    >
      {/* Background gradient mesh */}
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 dot-grid opacity-40" />

      {/* Subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 800,
          height: 600,
          background:
            "radial-gradient(ellipse at center, rgba(79,142,247,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Floating elements layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        {/* Browser window — left */}
        <div
          className="absolute top-[12%] left-[3%] w-72 float-a"
          style={{ transform: `translate(${px(0.3)}px, ${py(0.3)}px)` }}
        >
          <BrowserWindow delay={0.6} />
        </div>

        {/* Code panel — right */}
        <div
          className="absolute top-[18%] right-[4%] w-64 float-b"
          style={{ transform: `translate(${px(-0.2)}px, ${py(-0.2)}px)` }}
        >
          <CodePanel delay={0.8} />
        </div>

        {/* Phone — right lower */}
        <div
          className="absolute bottom-[18%] right-[8%] float-c"
          style={{ transform: `translate(${px(-0.4)}px, ${py(0.3)}px)` }}
        >
          <PhoneMockup delay={1.0} />
        </div>

        {/* Metric cards */}
        <div
          className="absolute bottom-[28%] left-[5%] float-a"
          style={{
            animationDelay: "1.5s",
            transform: `translate(${px(0.5)}px, ${py(0.5)}px)`,
          }}
        >
          <MetricCard value="127+" label="Products shipped" color="#4f8ef7" delay={1.1} />
        </div>

        <div
          className="absolute bottom-[12%] left-[20%] float-b"
          style={{
            animationDelay: "2s",
            transform: `translate(${px(0.2)}px, ${py(-0.3)}px)`,
          }}
        >
          <MetricCard value="98%" label="Client satisfaction" color="#8b5cf6" delay={1.2} />
        </div>

        <div
          className="absolute top-[40%] right-[25%] float-c"
          style={{ transform: `translate(${px(-0.3)}px, ${py(0.4)}px)` }}
        >
          <MetricCard value="4.2x" label="Avg. ROI boost" color="#06b6d4" delay={1.3} />
        </div>

        {/* Second browser — bottom center-right */}
        <div
          className="absolute bottom-[8%] right-[22%] w-56 float-b opacity-60"
          style={{
            animationDelay: "3s",
            transform: `translate(${px(-0.15)}px, ${py(-0.15)}px)`,
          }}
        >
          <BrowserWindow delay={1.4} />
        </div>
      </motion.div>

      {/* Hero copy */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        {/* Tag line */}
        <motion.div
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 glass rounded-full"
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#4f8ef7] animate-pulse" />
          <span className="text-white/50 text-xs tracking-widest uppercase font-medium">
            Premium Software Studio
          </span>
        </motion.div>

        {/* Main headline */}
        <h1 className="overflow-hidden">
          {words.map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.div
                className={`block text-[clamp(2.8rem,7vw,7rem)] font-bold leading-[0.92] tracking-tight ${
                  i === 1 ? "gradient-text-blue" : "text-white"
                }`}
                initial={{ y: "110%" }}
                animate={loaded ? { y: "0%" } : { y: "110%" }}
                transition={{
                  duration: 0.85,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.35 + i * 0.1,
                }}
              >
                {word}
              </motion.div>
            </div>
          ))}
        </h1>

        {/* Sub copy */}
        <motion.p
          className="mt-8 text-white/45 text-lg max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          We partner with ambitious startups and businesses to design and engineer
          digital products that are fast, beautiful, and built to scale.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative px-7 py-3.5 bg-white text-[#080808] rounded-full text-sm font-semibold overflow-hidden"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10">Start Your Project</span>
            <motion.div
              className="absolute inset-0 bg-[#4f8ef7]"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.span className="absolute inset-0 flex items-center justify-center text-white font-semibold z-20 opacity-0 group-hover:opacity-100 transition-opacity">
              Start Your Project
            </motion.span>
          </motion.a>

          <motion.a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-7 py-3.5 border border-white/20 text-white/80 hover:text-white hover:border-white/40 rounded-full text-sm font-medium transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            View Our Work
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
        >
          <span className="text-white/20 text-[10px] tracking-widest uppercase">Scroll</span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
