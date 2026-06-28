"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const PROJECTS = [
  {
    id: "meridian",
    name: "Meridian",
    category: "FinTech · Web App",
    tagline: "Investment dashboard for modern portfolios",
    description:
      "A real-time investment tracking platform with advanced analytics, portfolio visualisation, and automated rebalancing tools.",
    metrics: ["2.4M users", "99.99% uptime", "< 200ms p99"],
    color: "#4f8ef7",
    accentDark: "rgba(79,142,247,0.08)",
    tech: ["Next.js", "D3.js", "PostgreSQL", "Redis"],
    preview: <MeridianPreview />,
  },
  {
    id: "velox",
    name: "Velox",
    category: "E-Commerce · Mobile",
    tagline: "Same-day delivery at city scale",
    description:
      "A logistics-heavy commerce platform with live driver tracking, smart routing, and a merchant dashboard managing thousands of daily orders.",
    metrics: ["47 cities", "3min avg dispatch", "4.9 App Store"],
    color: "#8b5cf6",
    accentDark: "rgba(139,92,246,0.08)",
    tech: ["React Native", "FastAPI", "Postgres", "Mapbox"],
    preview: <VeloxPreview />,
  },
  {
    id: "luminary",
    name: "Luminary",
    category: "EdTech · SaaS",
    tagline: "Adaptive learning at enterprise scale",
    description:
      "AI-assisted corporate learning platform with personalised course paths, skill gap analysis, and manager reporting dashboards.",
    metrics: ["840 companies", "12M lessons served", "91% completion"],
    color: "#06b6d4",
    accentDark: "rgba(6,182,212,0.08)",
    tech: ["React", "Python", "OpenAI", "MongoDB"],
    preview: <LuminaryPreview />,
  },
];

/* ── Project Previews ──────────────────────────────────────── */

function MeridianPreview() {
  return (
    <div className="p-5 space-y-4 h-full">
      <div className="flex items-center justify-between">
        <span className="text-white/50 text-xs font-mono">Portfolio Overview</span>
        <span className="text-[#4f8ef7] text-xs font-mono">+18.4%</span>
      </div>
      <div className="h-28 relative">
        <svg viewBox="0 0 300 120" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f8ef7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4f8ef7" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 90 C30 80, 60 60, 90 55 S130 45, 160 30 S200 20, 230 10 S270 8, 300 5 L300 120 L0 120 Z"
            fill="url(#areaGrad)"
          />
          <path
            d="M0 90 C30 80, 60 60, 90 55 S130 45, 160 30 S200 20, 230 10 S270 8, 300 5"
            fill="none"
            stroke="#4f8ef7"
            strokeWidth="2"
            strokeOpacity="0.8"
          />
          {[90, 75, 55, 42, 32, 18, 8].map((y, i) => (
            <circle key={i} cx={i * 50} cy={y} r="3" fill="#4f8ef7" opacity="0.6" />
          ))}
        </svg>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { l: "BTC", v: "$42,800", d: "+2.3%" },
          { l: "ETH", v: "$2,340", d: "+5.1%" },
          { l: "SPY", v: "$486", d: "-0.4%" },
        ].map((a, i) => (
          <div
            key={i}
            className="rounded-xl p-2.5 border border-white/[0.06]"
            style={{ background: "rgba(79,142,247,0.06)" }}
          >
            <div className="text-white/35 text-[9px]">{a.l}</div>
            <div className="text-white text-xs font-semibold mt-0.5">{a.v}</div>
            <div
              className="text-[9px] mt-0.5"
              style={{ color: a.d.startsWith("+") ? "#4ade80" : "#f87171" }}
            >
              {a.d}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VeloxPreview() {
  return (
    <div className="p-5 space-y-3 h-full">
      <div className="flex items-center justify-between">
        <span className="text-white/50 text-xs font-mono">Live Orders</span>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-[10px]">Live</span>
        </div>
      </div>
      {/* Map mockup */}
      <div
        className="h-24 rounded-xl overflow-hidden relative"
        style={{
          background: "rgba(139,92,246,0.05)",
          border: "1px solid rgba(139,92,246,0.15)",
        }}
      >
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          {[20, 40, 60, 80].map((y) => (
            <line key={y} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="#8b5cf6" strokeWidth="0.5" />
          ))}
          {[20, 40, 60, 80].map((x) => (
            <line key={x} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="#8b5cf6" strokeWidth="0.5" />
          ))}
        </svg>
        {/* Driver dots */}
        {[
          { x: "25%", y: "30%" },
          { x: "60%", y: "55%" },
          { x: "75%", y: "25%" },
          { x: "40%", y: "70%" },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full border-2 border-[#8b5cf6] bg-[#8b5cf6]/40"
            style={{ left: pos.x, top: pos.y, transform: "translate(-50%,-50%)" }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </div>
      <div className="space-y-1.5">
        {[
          { id: "#8421", status: "In transit", t: "3 min" },
          { id: "#8420", status: "Picked up", t: "8 min" },
          { id: "#8419", status: "Delivered", t: "12 min" },
        ].map((o, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-1 border-b border-white/[0.04] text-[10px]"
          >
            <span className="text-white/30 font-mono">{o.id}</span>
            <span
              className={
                o.status === "Delivered" ? "text-green-400/70" : "text-[#8b5cf6]/80"
              }
            >
              {o.status}
            </span>
            <span className="text-white/20">{o.t} ago</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LuminaryPreview() {
  return (
    <div className="p-5 space-y-3 h-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-white/50 text-xs font-mono">Learning Path</span>
        <span className="text-[#06b6d4] text-[10px]">68% complete</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(to right, #06b6d4, #4f8ef7)",
          }}
          initial={{ width: 0 }}
          animate={{ width: "68%" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="space-y-2 mt-2">
        {[
          { name: "Product Strategy", done: true, pct: 100 },
          { name: "Design Thinking", done: true, pct: 100 },
          { name: "React Advanced", done: false, pct: 72 },
          { name: "System Design", done: false, pct: 30 },
        ].map((m, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: m.done ? "rgba(6,182,212,0.2)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${m.done ? "rgba(6,182,212,0.5)" : "rgba(255,255,255,0.08)"}`,
              }}
            >
              {m.done && (
                <svg viewBox="0 0 10 10" className="w-2 h-2">
                  <path d="M2 5l2.5 2.5L8 3" stroke="#06b6d4" strokeWidth="1.5" fill="none" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-white/50 text-[10px]">{m.name}</span>
                <span className="text-white/20 text-[10px]">{m.pct}%</span>
              </div>
              <div className="h-0.5 rounded-full bg-white/[0.05] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${m.pct}%`,
                    background: m.done ? "#06b6d4" : "rgba(6,182,212,0.4)",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Project Card ──────────────────────────────────────────── */

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative rounded-3xl overflow-hidden cursor-pointer group"
      style={{ background: project.accentDark, border: `1px solid ${project.color}15` }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6 }}
    >
      {/* Preview area */}
      <div
        className="h-64 overflow-hidden border-b relative"
        style={{ borderColor: `${project.color}15` }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 80%, ${project.color}12 0%, transparent 70%)`,
          }}
        />
        {project.preview}

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: "rgba(8,8,8,0.7)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="px-5 py-2.5 rounded-full border text-sm font-medium"
                style={{ borderColor: `${project.color}60`, color: project.color }}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                View Case Study →
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs tracking-widest uppercase font-medium" style={{ color: project.color, opacity: 0.7 }}>
              {project.category}
            </p>
            <h3 className="text-white text-xl font-bold mt-1">{project.name}</h3>
            <p className="text-white/40 text-sm mt-1">{project.tagline}</p>
          </div>
          <motion.div
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center"
            animate={{ rotate: hovered ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
              <path d="M2 10L10 2M10 2H4M10 2v6" stroke="white" strokeWidth="1.2" strokeOpacity="0.5" />
            </svg>
          </motion.div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {project.metrics.map((m) => (
            <span
              key={m}
              className="text-[10px] font-mono px-2.5 py-1 rounded-full border"
              style={{
                borderColor: `${project.color}25`,
                color: `${project.color}`,
                background: `${project.color}08`,
              }}
            >
              {m}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tech.map((t) => (
            <span key={t} className="text-[10px] text-white/30">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Section ───────────────────────────────────────────────── */

export default function FeaturedWork() {
  const { ref, inView } = useInView();

  return (
    <section id="work" className="py-28 px-6" ref={ref as React.RefObject<HTMLElement>}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.p
              className="text-[#4f8ef7] text-xs tracking-[0.2em] uppercase font-medium mb-4"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
            >
              Featured Work
            </motion.p>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              Products we&apos;ve <span className="gradient-text-purple">crafted</span>
            </motion.h2>
          </div>
          <motion.a
            href="#contact"
            className="text-white/40 text-sm hover:text-white transition-colors flex items-center gap-2 group"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            See all projects
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
