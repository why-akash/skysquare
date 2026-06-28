"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const STEPS = [
  {
    index: "01",
    title: "Discovery",
    description:
      "We dig deep into your business, users, and competitive landscape. This shapes everything that follows.",
    deliverables: ["Scope doc", "User research", "Architecture brief"],
    duration: "1–2 weeks",
    color: "#4f8ef7",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    index: "02",
    title: "Design",
    description:
      "High-fidelity Figma designs, interactive prototypes, and a component-driven design system built to scale.",
    deliverables: ["Figma designs", "Design system", "Prototype"],
    duration: "2–3 weeks",
    color: "#8b5cf6",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    index: "03",
    title: "Development",
    description:
      "Clean, type-safe, documented code. Weekly demos. Continuous integration from day one.",
    deliverables: ["Weekly sprints", "Code reviews", "CI/CD pipeline"],
    duration: "4–12 weeks",
    color: "#06b6d4",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    index: "04",
    title: "Testing",
    description:
      "End-to-end testing, performance profiling, accessibility audits, and real-device QA before anything ships.",
    deliverables: ["Test coverage", "Perf audit", "Accessibility"],
    duration: "1–2 weeks",
    color: "#f472b6",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    index: "05",
    title: "Deployment",
    description:
      "Zero-downtime launches, infrastructure-as-code, monitoring dashboards, and alerting from the first deploy.",
    deliverables: ["Live deployment", "Monitoring", "Documentation"],
    duration: "1 week",
    color: "#fb923c",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 12.34a19.81 19.81 0 0 1-3.07-8.67A2 2 0 0 1 3.41 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6 6l.72-.72a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 16.5a2 2 0 0 1 .5.42z" />
      </svg>
    ),
  },
  {
    index: "06",
    title: "Growth",
    description:
      "Iterative releases, analytics-driven decisions, and a long-term partner who stays invested in your success.",
    deliverables: ["Analytics", "Retainer", "Roadmap"],
    duration: "Ongoing",
    color: "#a3e635",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
];

function StepCard({
  step,
  index,
  inView,
}: {
  step: (typeof STEPS)[number];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      className="flex-shrink-0 w-72 md:w-80"
      initial={{ opacity: 0, x: 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
    >
      <div className="glass rounded-2xl p-6 h-full glass-hover relative overflow-hidden">
        {/* Step number watermark */}
        <div
          className="absolute -top-4 -right-4 text-8xl font-bold pointer-events-none select-none"
          style={{ color: `${step.color}06` }}
        >
          {step.index}
        </div>

        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
          style={{ background: `${step.color}12`, color: step.color }}
        >
          {step.icon}
        </div>

        {/* Index + title */}
        <div className="mb-3">
          <span
            className="text-[10px] font-mono tracking-widest uppercase"
            style={{ color: step.color, opacity: 0.6 }}
          >
            {step.index}
          </span>
          <h3 className="text-white text-xl font-bold mt-0.5">{step.title}</h3>
        </div>

        <p className="text-white/40 text-sm leading-relaxed mb-4">{step.description}</p>

        {/* Deliverables */}
        <div className="space-y-1.5 mb-4">
          {step.deliverables.map((d) => (
            <div key={d} className="flex items-center gap-2">
              <div
                className="w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: step.color, opacity: 0.7 }}
              />
              <span className="text-white/35 text-xs">{d}</span>
            </div>
          ))}
        </div>

        {/* Duration pill */}
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium"
          style={{
            background: `${step.color}10`,
            color: step.color,
            border: `1px solid ${step.color}20`,
          }}
        >
          <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
            <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1" />
            <path d="M5 3v2l1.5 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
          {step.duration}
        </div>

        {/* Connector arrow for non-last */}
        {index < STEPS.length - 1 && (
          <div
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 flex items-center justify-center z-10"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function BuildProcess() {
  const { ref, inView } = useInView();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="process"
      className="py-28 overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.p
          className="text-[#4f8ef7] text-xs tracking-[0.2em] uppercase font-medium mb-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          Our Process
        </motion.p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white leading-tight max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            How we build{" "}
            <span className="gradient-text-cyan">world-class</span> software
          </motion.h2>
          <motion.p
            className="text-white/35 text-sm max-w-xs leading-relaxed"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            A structured process that reduces risk and maximises quality at every stage.
          </motion.p>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="h-scroll-container flex gap-6 px-6 md:px-[max(1.5rem,calc((100vw-80rem)/2))] pb-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {STEPS.map((step, i) => (
          <div key={step.index} style={{ scrollSnapAlign: "start" }}>
            <StepCard step={step} index={i} inView={inView} />
          </div>
        ))}
        {/* End spacer */}
        <div className="flex-shrink-0 w-6" />
      </div>

      {/* Scroll hint */}
      <motion.div
        className="flex items-center justify-center gap-3 mt-8 text-white/20 text-xs"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="tracking-widest uppercase text-[10px]">Scroll to explore</span>
      </motion.div>
    </section>
  );
}
