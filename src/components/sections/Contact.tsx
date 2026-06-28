"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const PROJECT_TYPES = [
  "Web Application",
  "Mobile App",
  "SaaS Product",
  "UI/UX Design",
  "Backend / API",
  "AI Automation",
];

const BUDGETS = ["< $10k", "$10k – $30k", "$30k – $80k", "$80k – $200k", "$200k+"];

type FormState = "idle" | "submitting" | "success";

const FOUNDERS = [
  {
    name: "Akash Kumar",
    role: "Co-founder",
    phone: "+91 78560 37431",
    email: "akashkr.developer@gmail.com",
    initials: "AK",
    color: "#4f8ef7",
  },
  {
    name: "Akash Raj",
    role: "Co-founder",
    phone: "+91 91356 01036",
    email: "rajaakash220@gmail.com",
    initials: "AR",
    color: "#8b5cf6",
  },
];

/* ── Input ──────────────────────────────────────────────────── */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-white/35 text-[11px] tracking-[0.15em] uppercase font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors";

/* ── Section ───────────────────────────────────────────────── */
export default function Contact() {
  const { ref, inView } = useInView();
  const [formState, setFormState] = useState<FormState>("idle");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", description: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setFormState("submitting");
    await new Promise((r) => setTimeout(r, 1800));
    setFormState("success");
  };

  return (
    <section
      id="contact"
      className="py-28 px-6 relative overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(79,142,247,0.06) 0%, transparent 65%)",
        }}
      />
      <div className="dot-grid absolute inset-0 opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section label */}
        <motion.p
          className="text-[#4f8ef7] text-xs tracking-[0.2em] uppercase font-medium mb-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          Start a Project
        </motion.p>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Left: headline + info ── */}
          <div>
            <motion.h2
              className="text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-[0.92] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-syne)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              Let&apos;s build
              <br />
              <span className="gradient-text-blue">something</span>
              <br />
              <span className="text-white/30">great.</span>
            </motion.h2>

            <motion.p
              className="text-white/40 leading-relaxed mb-10 max-w-sm"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              Tell us about your project and we&apos;ll get back to you within 24 hours.
              No commitment, no pressure.
            </motion.p>

            {/* Divider */}
            <motion.div
              className="w-12 h-px bg-white/10 mb-10"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ transformOrigin: "left" }}
            />

            {/* Founders */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              <p className="text-white/25 text-xs tracking-[0.15em] uppercase mb-5">
                Talk directly with the founders
              </p>
              {FOUNDERS.map((f) => (
                <div
                  key={f.name}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
                >
                  {/* Avatar */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{
                      background: `${f.color}15`,
                      color: f.color,
                      border: `1px solid ${f.color}25`,
                      fontFamily: "var(--font-syne)",
                    }}
                  >
                    {f.initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm">{f.name}</p>
                    <p className="text-white/30 text-xs">{f.role}</p>
                  </div>

                  <div className="flex flex-col items-end gap-1 text-[11px]">
                    <a
                      href={`tel:${f.phone.replace(/\s/g, "")}`}
                      className="text-white/40 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <svg viewBox="0 0 14 14" className="w-3 h-3 flex-shrink-0" fill="none">
                        <path
                          d="M2 3a1 1 0 0 1 1-1h1.5a.5.5 0 0 1 .48.36l.7 2.4a.5.5 0 0 1-.14.52L4.7 5.8a7.5 7.5 0 0 0 3.5 3.5l.52-.86a.5.5 0 0 1 .52-.14l2.4.7a.5.5 0 0 1 .36.48V11a1 1 0 0 1-1 1C5.4 12 2 8.6 2 3z"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                      </svg>
                      {f.phone}
                    </a>
                    <a
                      href={`mailto:${f.email}`}
                      className="text-white/40 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <svg viewBox="0 0 14 14" className="w-3 h-3 flex-shrink-0" fill="none">
                        <rect x="1" y="3" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1" />
                        <path d="M1 4l6 4 6-4" stroke="currentColor" strokeWidth="1" />
                      </svg>
                      {f.email}
                    </a>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Social */}
            <motion.div
              className="flex gap-5 mt-8"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              {[
                { label: "hello@skysquare.studio", href: "mailto:hello@skysquare.studio" },
                { label: "Twitter", href: "#" },
                { label: "LinkedIn", href: "#" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-white/25 hover:text-white/70 text-xs transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div
              className="rounded-3xl p-7 md:p-8 relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Top shine */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 40%, rgba(79,142,247,0.3) 60%, transparent 100%)",
                }}
              />

              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center py-20 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                      style={{
                        background: "rgba(79,142,247,0.1)",
                        border: "1px solid rgba(79,142,247,0.25)",
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
                        <motion.path
                          d="M5 12l4.5 4.5L19 7"
                          stroke="#4f8ef7"
                          strokeWidth="2"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        />
                      </svg>
                    </div>
                    <h3
                      className="text-white text-2xl font-bold mb-2"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      Message received!
                    </h3>
                    <p className="text-white/40 max-w-xs leading-relaxed">
                      We&apos;ll review your project details and reply within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Project type */}
                    <Field label="What are you building?">
                      <div className="flex flex-wrap gap-2 pt-1">
                        {PROJECT_TYPES.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() =>
                              setSelectedType(type === selectedType ? null : type)
                            }
                            className="px-3.5 py-1.5 rounded-full text-xs border transition-all duration-200"
                            style={{
                              borderColor:
                                selectedType === type
                                  ? "rgba(79,142,247,0.5)"
                                  : "rgba(255,255,255,0.07)",
                              background:
                                selectedType === type
                                  ? "rgba(79,142,247,0.1)"
                                  : "transparent",
                              color:
                                selectedType === type
                                  ? "#4f8ef7"
                                  : "rgba(255,255,255,0.4)",
                            }}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </Field>

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Your Name">
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          required
                          placeholder="Alex Johnson"
                          className={inputCls}
                        />
                      </Field>
                      <Field label="Work Email">
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          required
                          placeholder="alex@company.com"
                          className={inputCls}
                        />
                      </Field>
                    </div>

                    {/* Budget */}
                    <Field label="Budget Range">
                      <div className="flex flex-wrap gap-2 pt-1">
                        {BUDGETS.map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() =>
                              setSelectedBudget(b === selectedBudget ? null : b)
                            }
                            className="px-3.5 py-1.5 rounded-full text-xs border transition-all duration-200"
                            style={{
                              borderColor:
                                selectedBudget === b
                                  ? "rgba(139,92,246,0.5)"
                                  : "rgba(255,255,255,0.07)",
                              background:
                                selectedBudget === b
                                  ? "rgba(139,92,246,0.1)"
                                  : "transparent",
                              color:
                                selectedBudget === b
                                  ? "#8b5cf6"
                                  : "rgba(255,255,255,0.4)",
                            }}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </Field>

                    {/* Description */}
                    <Field label="Tell us about your project">
                      <textarea
                        value={form.description}
                        onChange={(e) =>
                          setForm({ ...form, description: e.target.value })
                        }
                        rows={4}
                        placeholder="What are you building, who is it for, and when do you need it?"
                        className={`${inputCls} resize-none`}
                      />
                    </Field>

                    {/* Submit row */}
                    <div className="flex items-center justify-between pt-1 gap-4">
                      <p className="text-white/20 text-[11px]">
                        We reply within 24 hours.
                      </p>
                      <motion.button
                        type="submit"
                        disabled={formState === "submitting"}
                        className="flex-shrink-0 px-7 py-3 bg-white text-[#080808] rounded-full text-sm font-semibold overflow-hidden disabled:opacity-60 relative"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {formState === "submitting" ? (
                          <span className="flex items-center gap-2">
                            <motion.span
                              className="w-3.5 h-3.5 border-2 border-[#080808]/30 border-t-[#080808] rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            />
                            Sending…
                          </span>
                        ) : (
                          "Send Message →"
                        )}
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
