"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

/* ── Animated counter ──────────────────────────────────────── */

function Counter({ target, suffix = "", duration = 1800 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView();
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ── Stat card ─────────────────────────────────────────────── */

const STATS = [
  { value: 127, suffix: "+", label: "Products shipped", sub: "Across 18 countries", color: "#4f8ef7" },
  { value: 98, suffix: "%", label: "Client satisfaction", sub: "Average NPS score 72", color: "#8b5cf6" },
  { value: 6, suffix: "yr", label: "Average tenure", sub: "Our team's experience", color: "#06b6d4" },
  { value: 4, suffix: "x", label: "Average ROI", sub: "For funded startups", color: "#f472b6" },
];

/* ── Why cards ─────────────────────────────────────────────── */

const WHY_CARDS = [
  {
    title: "Engineering-first",
    desc: "We write code we're proud to put our name on. Clean architecture, full test coverage, thorough documentation.",
    icon: "⬡",
    color: "#4f8ef7",
  },
  {
    title: "Radical transparency",
    desc: "Weekly demos. No surprises. You always know exactly where your product stands and what comes next.",
    icon: "◈",
    color: "#8b5cf6",
  },
  {
    title: "Product thinking",
    desc: "We don't just execute requirements — we question assumptions and help you build the right thing.",
    icon: "◎",
    color: "#06b6d4",
  },
  {
    title: "Long-term partners",
    desc: "We stay after launch. Most clients have worked with us for 2+ years across multiple products.",
    icon: "◇",
    color: "#f472b6",
  },
];

export default function WhyUs() {
  const { ref, inView } = useInView();

  return (
    <section id="why-us" className="py-28 px-6" ref={ref as React.RefObject<HTMLElement>}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <motion.p
            className="text-[#4f8ef7] text-xs tracking-[0.2em] uppercase font-medium mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Why Clients Choose Us
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            Software built with{" "}
            <span className="gradient-text-purple">craftsmanship</span>
          </motion.h2>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass rounded-2xl p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              <div
                className="text-4xl md:text-5xl font-bold tabular-nums mb-1"
                style={{ color: stat.color }}
              >
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/60 text-sm font-medium">{stat.label}</div>
              <div className="text-white/25 text-[11px] mt-1">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Why cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {WHY_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              className="glass glass-hover rounded-2xl p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.07 }}
            >
              <div
                className="text-2xl mb-3 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${card.color}12`, color: card.color }}
              >
                {card.icon}
              </div>
              <h4 className="text-white font-semibold mb-2">{card.title}</h4>
              <p className="text-white/35 text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
