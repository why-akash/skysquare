"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";

/* ── Data ────────────────────────────────────────────────── */

const CATEGORIES = ["All", "Frontend", "Backend", "Mobile", "Database", "DevOps", "Cloud"] as const;
type Category = (typeof CATEGORIES)[number];

const TECHS: {
  name: string;
  category: Exclude<Category, "All">;
  color: string;
  bg: string;
  description: string;
}[] = [
  { name: "React", category: "Frontend", color: "#61dafb", bg: "rgba(97,218,251,0.1)", description: "UI components" },
  { name: "Next.js", category: "Frontend", color: "#ffffff", bg: "rgba(255,255,255,0.06)", description: "Full-stack React" },
  { name: "TypeScript", category: "Frontend", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", description: "Type-safe JS" },
  { name: "Tailwind CSS", category: "Frontend", color: "#38bdf8", bg: "rgba(56,189,248,0.1)", description: "Utility CSS" },
  { name: "Framer Motion", category: "Frontend", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", description: "Animations" },
  { name: "React Native", category: "Mobile", color: "#61dafb", bg: "rgba(97,218,251,0.08)", description: "Cross-platform" },
  { name: "Expo", category: "Mobile", color: "#ffffff", bg: "rgba(255,255,255,0.06)", description: "Native toolchain" },
  { name: "Swift", category: "Mobile", color: "#fa7343", bg: "rgba(250,115,67,0.1)", description: "iOS native" },
  { name: "Node.js", category: "Backend", color: "#68a063", bg: "rgba(104,160,99,0.1)", description: "JS runtime" },
  { name: "FastAPI", category: "Backend", color: "#009688", bg: "rgba(0,150,136,0.1)", description: "Python APIs" },
  { name: "Python", category: "Backend", color: "#3776ab", bg: "rgba(55,118,171,0.1)", description: "Language" },
  { name: "GraphQL", category: "Backend", color: "#e535ab", bg: "rgba(229,53,171,0.1)", description: "API query" },
  { name: "Prisma", category: "Backend", color: "#5a67d8", bg: "rgba(90,103,216,0.1)", description: "ORM layer" },
  { name: "PostgreSQL", category: "Database", color: "#336791", bg: "rgba(51,103,145,0.1)", description: "Relational DB" },
  { name: "MongoDB", category: "Database", color: "#47a248", bg: "rgba(71,162,72,0.1)", description: "Document DB" },
  { name: "Redis", category: "Database", color: "#dc382d", bg: "rgba(220,56,45,0.1)", description: "In-memory cache" },
  { name: "Supabase", category: "Database", color: "#3ecf8e", bg: "rgba(62,207,142,0.1)", description: "BaaS platform" },
  { name: "Firebase", category: "Database", color: "#ffca28", bg: "rgba(255,202,40,0.1)", description: "Realtime DB" },
  { name: "Docker", category: "DevOps", color: "#2496ed", bg: "rgba(36,150,237,0.1)", description: "Containerisation" },
  { name: "GitHub Actions", category: "DevOps", color: "#ffffff", bg: "rgba(255,255,255,0.06)", description: "CI/CD pipeline" },
  { name: "Terraform", category: "DevOps", color: "#7b42bc", bg: "rgba(123,66,188,0.1)", description: "Infra as code" },
  { name: "AWS", category: "Cloud", color: "#ff9900", bg: "rgba(255,153,0,0.1)", description: "Cloud platform" },
  { name: "Vercel", category: "Cloud", color: "#ffffff", bg: "rgba(255,255,255,0.06)", description: "Edge deploy" },
  { name: "GCP", category: "Cloud", color: "#4285f4", bg: "rgba(66,133,244,0.1)", description: "Google cloud" },
];

/* ── SVG letter-mark icon ─────────────────────────────────── */

function TechBadge({
  tech,
  index,
  inView,
}: {
  tech: (typeof TECHS)[number];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.04,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="relative rounded-2xl p-4 cursor-default border overflow-hidden flex flex-col gap-3"
        style={{
          background: hovered ? tech.bg : "rgba(255,255,255,0.02)",
          borderColor: hovered ? `${tech.color}40` : "rgba(255,255,255,0.06)",
        }}
        animate={{
          y: hovered ? -4 : 0,
          boxShadow: hovered
            ? `0 12px 40px ${tech.color}18, 0 0 0 1px ${tech.color}25`
            : "none",
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Icon circle */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
          style={{
            background: tech.bg,
            color: tech.color,
            border: `1px solid ${tech.color}30`,
            fontFamily: "var(--font-syne)",
          }}
        >
          {tech.name.substring(0, 2).toUpperCase()}
        </div>

        {/* Text */}
        <div>
          <p
            className="text-sm font-semibold leading-tight"
            style={{ color: hovered ? tech.color : "rgba(255,255,255,0.8)" }}
          >
            {tech.name}
          </p>
          <p className="text-[11px] text-white/30 mt-0.5">{tech.description}</p>
        </div>

        {/* Category chip */}
        <div
          className="inline-flex self-start px-2 py-0.5 rounded-full text-[9px] tracking-wider uppercase font-medium"
          style={{
            background: `${tech.color}10`,
            color: `${tech.color}90`,
            border: `1px solid ${tech.color}20`,
          }}
        >
          {tech.category}
        </div>

        {/* Shimmer on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background: `radial-gradient(circle at 50% 0%, ${tech.color}12 0%, transparent 70%)`,
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ── Animated background blobs ────────────────────────────── */

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Moving gradient orbs */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(79,142,247,0.07) 0%, transparent 70%)",
          top: "-10%",
          left: "20%",
          animation: "blob-drift-a 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          top: "40%",
          right: "10%",
          animation: "blob-drift-b 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)",
          bottom: "5%",
          left: "5%",
          animation: "blob-drift-c 16s ease-in-out infinite",
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glowing intersections overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 50%, rgba(79,142,247,0.06) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}

/* ── Section ───────────────────────────────────────────────── */

export default function TechStack() {
  const { ref, inView } = useInView();
  const [activeFilter, setActiveFilter] = useState<Category>("All");

  const filtered =
    activeFilter === "All" ? TECHS : TECHS.filter((t) => t.category === activeFilter);

  return (
    <>
      {/* Inject blob keyframes */}
      <style jsx global>{`
        @keyframes blob-drift-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, -40px) scale(1.08); }
          66% { transform: translate(-30px, 30px) scale(0.95); }
        }
        @keyframes blob-drift-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(-80px, 50px) scale(1.1); }
          70% { transform: translate(40px, -30px) scale(0.92); }
        }
        @keyframes blob-drift-c {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, -60px) scale(1.06); }
        }
      `}</style>

      <section
        className="py-28 px-6 relative overflow-hidden"
        ref={ref as React.RefObject<HTMLElement>}
      >
        <AnimatedBackground />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="mb-14">
            <motion.p
              className="text-[#4f8ef7] text-xs tracking-[0.2em] uppercase font-medium mb-4"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
            >
              Technology Stack
            </motion.p>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-white leading-tight"
                style={{ fontFamily: "var(--font-syne)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                Built with the{" "}
                <span className="gradient-text-blue">right tools</span>
              </motion.h2>

              {/* Stats */}
              <motion.div
                className="flex gap-6 flex-shrink-0"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
              >
                {[
                  { v: "24+", l: "Technologies" },
                  { v: "7+", l: "Years avg. exp." },
                ].map((s) => (
                  <div key={s.l} className="text-right">
                    <div className="text-2xl font-bold text-white">{s.v}</div>
                    <div className="text-white/30 text-xs mt-0.5">{s.l}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.p
              className="text-white/40 mt-4 max-w-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              We choose technologies that fit the product — not the hype cycle. Battle-tested
              stacks, modern tooling, zero bloat.
            </motion.p>
          </div>

          {/* Filter tabs */}
          <motion.div
            className="flex flex-wrap gap-2 mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35 }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="relative px-4 py-1.5 rounded-full text-xs font-medium transition-colors duration-200"
                style={{
                  color: activeFilter === cat ? "#fff" : "rgba(255,255,255,0.35)",
                  background:
                    activeFilter === cat
                      ? "rgba(79,142,247,0.2)"
                      : "rgba(255,255,255,0.04)",
                  border: `1px solid ${activeFilter === cat ? "rgba(79,142,247,0.45)" : "rgba(255,255,255,0.07)"}`,
                }}
              >
                {cat}
                {activeFilter === cat && (
                  <motion.div
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "rgba(79,142,247,0.15)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {filtered.map((tech, i) => (
                <TechBadge key={tech.name} tech={tech} index={i} inView={inView} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Bottom note */}
          <motion.p
            className="text-white/20 text-xs mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            We pick the best tool for each job — not the trendiest.
          </motion.p>
        </div>
      </section>
    </>
  );
}
