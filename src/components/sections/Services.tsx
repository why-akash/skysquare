"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const SERVICES = [
  {
    id: "web",
    index: "01",
    title: "Web Development",
    subtitle: "Full-stack, fast, production-grade.",
    description:
      "We engineer performant web applications with meticulous attention to architecture, code quality, and user experience. From marketing sites to complex SaaS platforms.",
    tags: ["Next.js", "React", "TypeScript", "Node.js"],
    color: "#4f8ef7",
    visual: <WebVisual />,
  },
  {
    id: "mobile",
    index: "02",
    title: "Mobile App Development",
    subtitle: "Native-quality. Cross-platform.",
    description:
      "React Native and Swift/Kotlin apps that feel right on any device. We obsess over performance, gestures, and the tactile feel of mobile interactions.",
    tags: ["React Native", "iOS", "Android", "Expo"],
    color: "#8b5cf6",
    visual: <MobileVisual />,
  },
  {
    id: "saas",
    index: "03",
    title: "SaaS Product Development",
    subtitle: "From zero to scalable product.",
    description:
      "Full product lifecycle — from problem definition and architecture to launch and iteration. We've helped teams go from napkin sketch to paying customers.",
    tags: ["Architecture", "Auth", "Billing", "Analytics"],
    color: "#06b6d4",
    visual: <SaasVisual />,
  },
  {
    id: "design",
    index: "04",
    title: "UI/UX Design",
    subtitle: "Design that converts and delights.",
    description:
      "Pixel-perfect interfaces built in Figma. We design with engineering constraints in mind, so what ships matches what was designed.",
    tags: ["Figma", "Design Systems", "Prototypes", "Research"],
    color: "#f472b6",
    visual: <DesignVisual />,
  },
  {
    id: "backend",
    index: "05",
    title: "Backend & API Development",
    subtitle: "Reliable, scalable infrastructure.",
    description:
      "RESTful and GraphQL APIs, microservices, serverless functions, and database design. We build backends that handle scale without complexity.",
    tags: ["FastAPI", "PostgreSQL", "Redis", "Docker"],
    color: "#fb923c",
    visual: <BackendVisual />,
  },
  {
    id: "ai",
    index: "06",
    title: "AI Automation",
    subtitle: "Intelligent workflows, not buzzwords.",
    description:
      "LLM integrations, intelligent pipelines, and AI-powered features that add genuine value. We cut through the hype and ship automation that actually works.",
    tags: ["LLMs", "RAG", "Pipelines", "Integrations"],
    color: "#a3e635",
    visual: <AIVisual />,
  },
];

/* ── Service visuals ───────────────────────────────────────── */

function WebVisual() {
  return (
    <div className="p-4 space-y-2">
      <div className="flex gap-1.5 mb-3">
        <div className="w-2 h-2 rounded-full bg-red-500/50" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
        <div className="w-2 h-2 rounded-full bg-green-500/50" />
        <div className="flex-1 bg-white/[0.05] rounded h-2 ml-2" />
      </div>
      {[90, 60, 80, 45].map((w, i) => (
        <div key={i} className="flex gap-2 items-center">
          <div className="w-8 h-1.5 rounded bg-white/[0.08]" />
          <motion.div
            className="h-1.5 rounded"
            style={{ background: "#4f8ef7", opacity: 0.5 + i * 0.1 }}
            initial={{ width: 0 }}
            animate={{ width: `${w}%` }}
            transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      ))}
    </div>
  );
}

function MobileVisual() {
  return (
    <div className="flex justify-center py-2">
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          width: 80,
          height: 140,
          background: "rgba(15,15,20,0.9)",
          border: "1px solid rgba(139,92,246,0.3)",
          boxShadow: "0 0 30px rgba(139,92,246,0.15)",
        }}
      >
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-black/80 rounded-full" />
        <div className="pt-7 px-2 space-y-1.5">
          <div className="h-10 rounded-lg bg-gradient-to-br from-[#8b5cf6]/25 to-[#4f8ef7]/15 border border-[#8b5cf6]/20" />
          {[75, 50, 65].map((w, i) => (
            <div key={i} className="h-1 rounded-full bg-white/[0.07]" style={{ width: `${w}%` }} />
          ))}
          <div className="grid grid-cols-2 gap-1 pt-1">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-7 rounded-lg"
                style={{
                  background: i % 2 === 0 ? "rgba(139,92,246,0.15)" : "rgba(79,142,247,0.15)",
                  border: `1px solid ${i % 2 === 0 ? "rgba(139,92,246,0.2)" : "rgba(79,142,247,0.2)"}`,
                }}
              />
            ))}
          </div>
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-white/20" />
      </div>
    </div>
  );
}

function SaasVisual() {
  return (
    <div className="p-3 space-y-2">
      {[
        { label: "Users", val: 2847, pct: 85 },
        { label: "Revenue", val: 12400, pct: 68 },
        { label: "Churn", val: 1.2, pct: 12 },
      ].map((row, i) => (
        <div key={i} className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-white/40 text-[10px]">{row.label}</span>
            <span className="text-[#06b6d4] text-[10px] font-mono">{row.val.toLocaleString()}</span>
          </div>
          <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "#06b6d4", opacity: 0.6 - i * 0.1 }}
              initial={{ width: 0 }}
              animate={{ width: `${row.pct}%` }}
              transition={{ duration: 1.2, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function DesignVisual() {
  return (
    <div className="p-3 space-y-2">
      <div className="flex gap-2">
        {["#f472b6", "#8b5cf6", "#4f8ef7"].map((c, i) => (
          <div
            key={i}
            className="flex-1 h-12 rounded-lg border"
            style={{ background: `${c}15`, borderColor: `${c}30` }}
          />
        ))}
      </div>
      <div className="space-y-1.5">
        <div className="h-2 rounded-full bg-white/10 w-3/4" />
        <div className="h-1 rounded-full bg-white/[0.05] w-full" />
        <div className="h-1 rounded-full bg-white/[0.05] w-2/3" />
      </div>
      <div className="flex gap-1.5">
        {[24, 32, 20, 28].map((s, i) => (
          <div
            key={i}
            className="rounded-md border border-white/[0.08] bg-white/[0.03]"
            style={{ width: s, height: s }}
          />
        ))}
      </div>
    </div>
  );
}

function BackendVisual() {
  return (
    <div className="p-3 space-y-2">
      {[
        { method: "GET", path: "/api/users", ms: "12ms", ok: true },
        { method: "POST", path: "/api/auth", ms: "8ms", ok: true },
        { method: "GET", path: "/api/data", ms: "45ms", ok: true },
      ].map((req, i) => (
        <motion.div
          key={i}
          className="flex items-center gap-2 text-[10px] font-mono py-1 border-b border-white/[0.04]"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.2 + 0.3 }}
        >
          <span
            className="px-1.5 py-0.5 rounded text-[9px] font-bold"
            style={{
              background: req.method === "GET" ? "rgba(79,142,247,0.2)" : "rgba(6,182,212,0.2)",
              color: req.method === "GET" ? "#4f8ef7" : "#06b6d4",
            }}
          >
            {req.method}
          </span>
          <span className="text-white/40 flex-1">{req.path}</span>
          <span className="text-[#fb923c] opacity-70">{req.ms}</span>
          <span className="text-green-400/70">200</span>
        </motion.div>
      ))}
    </div>
  );
}

function AIVisual() {
  return (
    <div className="p-3 space-y-2">
      {/* Node flow */}
      <svg viewBox="0 0 200 80" className="w-full" fill="none">
        {[
          { x: 20, y: 40, label: "Input" },
          { x: 90, y: 20, label: "LLM" },
          { x: 90, y: 60, label: "RAG" },
          { x: 160, y: 40, label: "Output" },
        ].map((node, i) => (
          <g key={i}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={12}
              fill="rgba(163,230,53,0.1)"
              stroke="#a3e635"
              strokeWidth={0.8}
              strokeOpacity={0.5}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.15 + 0.2 }}
            />
            <text
              x={node.x}
              y={node.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgba(163,230,53,0.7)"
              fontSize={6}
              fontFamily="monospace"
            >
              {node.label}
            </text>
          </g>
        ))}
        {/* Edges */}
        {[
          { x1: 32, y1: 35, x2: 78, y2: 22 },
          { x1: 32, y1: 45, x2: 78, y2: 58 },
          { x1: 102, y1: 22, x2: 148, y2: 38 },
          { x1: 102, y1: 58, x2: 148, y2: 42 },
        ].map((e, i) => (
          <motion.line
            key={i}
            x1={e.x1}
            y1={e.y1}
            x2={e.x2}
            y2={e.y2}
            stroke="rgba(163,230,53,0.25)"
            strokeWidth={0.8}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: i * 0.1 + 0.5, duration: 0.5 }}
          />
        ))}
      </svg>
      <div className="h-6 rounded bg-white/[0.04] border border-white/[0.06] flex items-center px-3 gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#a3e635]/60 animate-pulse" />
        <div className="text-[9px] text-white/30 font-mono">Processing 847 requests / min</div>
      </div>
    </div>
  );
}

/* ── Service card ──────────────────────────────────────────── */

function ServiceCard({
  service,
  index,
  inView,
}: {
  service: (typeof SERVICES)[number];
  index: number;
  inView: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="glass glass-hover rounded-2xl cursor-pointer overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      onClick={() => setExpanded(!expanded)}
      whileHover={{ y: -3 }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <span
              className="text-[10px] font-mono tracking-widest"
              style={{ color: service.color, opacity: 0.7 }}
            >
              {service.index}
            </span>
            <h3 className="text-white font-semibold text-lg mt-1 leading-tight">{service.title}</h3>
            <p className="text-white/35 text-sm mt-0.5">{service.subtitle}</p>
          </div>
          <motion.div
            className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center mt-1 flex-shrink-0"
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
              <path d="M6 1v10M1 6h10" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
            </svg>
          </motion.div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-white/[0.06]">
                {/* Visual */}
                <div
                  className="rounded-xl mb-4 border border-white/[0.06]"
                  style={{ background: `${service.color}08` }}
                >
                  {service.visual}
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{service.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-[11px] font-medium"
                      style={{
                        background: `${service.color}12`,
                        color: service.color,
                        border: `1px solid ${service.color}25`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom accent line */}
      <div
        className="h-px w-full"
        style={{
          background: `linear-gradient(to right, transparent, ${service.color}40, transparent)`,
        }}
      />
    </motion.div>
  );
}

/* ── Section ───────────────────────────────────────────────── */

export default function Services() {
  const { ref, inView } = useInView();

  return (
    <section
      id="services"
      className="py-16 md:py-24 lg:py-28 px-4 md:px-6"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 max-w-xl">
          <motion.p
            className="text-[#4f8ef7] text-xs tracking-[0.2em] uppercase font-medium mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            Our Services
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            Everything you need to{" "}
            <span className="gradient-text-blue">ship great software</span>
          </motion.h2>
          <motion.p
            className="text-white/40 mt-4 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            From idea to deployment, we cover the full stack of digital product development.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
