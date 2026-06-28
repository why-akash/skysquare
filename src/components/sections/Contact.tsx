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

const BUDGETS = [
  "< $10k",
  "$10k – $30k",
  "$30k – $80k",
  "$80k – $200k",
  "$200k+",
];

type FormState = "idle" | "submitting" | "success";

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
    <section id="contact" className="py-28 px-6 relative overflow-hidden" ref={ref as React.RefObject<HTMLElement>}>
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(79,142,247,0.07) 0%, transparent 60%)",
        }}
      />
      <div className="dot-grid absolute inset-0 opacity-30" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            className="text-[#4f8ef7] text-xs tracking-[0.2em] uppercase font-medium mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Start a Project
          </motion.p>
          <motion.h2
            className="text-5xl md:text-7xl font-bold text-white leading-[0.95] tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            Let&apos;s build
            <br />
            <span className="gradient-text-blue">something great</span>
          </motion.h2>
          <motion.p
            className="text-white/40 mt-6 max-w-md mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Tell us about your project. We reply to every serious enquiry within 24 hours.
          </motion.p>
        </div>

        {/* Form card */}
        <motion.div
          className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {/* Shimmer line */}
          <div className="shimmer-line absolute top-0 left-0 right-0 h-px" />

          <AnimatePresence mode="wait">
            {formState === "success" ? (
              <motion.div
                key="success"
                className="flex flex-col items-center justify-center py-16 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-16 h-16 rounded-full bg-[#4f8ef7]/15 border border-[#4f8ef7]/30 flex items-center justify-center mb-6">
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
                <h3 className="text-white text-2xl font-bold mb-2">Message received!</h3>
                <p className="text-white/40">
                  We&apos;ll review your project and get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Project type */}
                <div>
                  <label className="block text-white/50 text-xs tracking-widest uppercase mb-3">
                    Project Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PROJECT_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedType(type === selectedType ? null : type)}
                        className="px-4 py-2 rounded-full text-sm border transition-all duration-200"
                        style={{
                          borderColor:
                            selectedType === type
                              ? "rgba(79,142,247,0.6)"
                              : "rgba(255,255,255,0.08)",
                          background:
                            selectedType === type
                              ? "rgba(79,142,247,0.12)"
                              : "transparent",
                          color:
                            selectedType === type
                              ? "#4f8ef7"
                              : "rgba(255,255,255,0.45)",
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/40 text-xs tracking-widest uppercase mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      placeholder="Alex Johnson"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#4f8ef7]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 text-xs tracking-widest uppercase mb-2">
                      Work Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      placeholder="alex@company.com"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#4f8ef7]/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-white/50 text-xs tracking-widest uppercase mb-3">
                    Budget Range
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSelectedBudget(b === selectedBudget ? null : b)}
                        className="px-4 py-2 rounded-full text-sm border transition-all duration-200"
                        style={{
                          borderColor:
                            selectedBudget === b
                              ? "rgba(139,92,246,0.6)"
                              : "rgba(255,255,255,0.08)",
                          background:
                            selectedBudget === b ? "rgba(139,92,246,0.12)" : "transparent",
                          color:
                            selectedBudget === b ? "#8b5cf6" : "rgba(255,255,255,0.45)",
                        }}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-white/40 text-xs tracking-widest uppercase mb-2">
                    Tell us about your project
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={4}
                    placeholder="Describe what you're building, who it's for, and any specific requirements..."
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#4f8ef7]/50 transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <div className="flex items-center justify-between pt-2">
                  <p className="text-white/25 text-xs">
                    No commitment. We reply within 24 hours.
                  </p>
                  <motion.button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="relative px-7 py-3.5 bg-white text-[#080808] rounded-full text-sm font-semibold overflow-hidden disabled:opacity-70"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {formState === "submitting" ? (
                      <span className="flex items-center gap-2">
                        <motion.span
                          className="w-3.5 h-3.5 border-2 border-[#080808]/30 border-t-[#080808] rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </span>
                    ) : (
                      "Send Message →"
                    )}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Contact links */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          {/* Founders */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
            {[
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
            ].map((founder) => (
              <div
                key={founder.name}
                className="flex-1 glass rounded-2xl p-5 flex items-start gap-4"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: `${founder.color}20`, color: founder.color, border: `1px solid ${founder.color}30` }}
                >
                  {founder.initials}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{founder.name}</p>
                  <p className="text-white/35 text-xs">{founder.role}</p>
                  <div className="mt-2 space-y-1">
                    <a
                      href={`tel:${founder.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs transition-colors"
                    >
                      <svg viewBox="0 0 14 14" className="w-3 h-3" fill="none">
                        <path d="M2 3a1 1 0 0 1 1-1h1.5a.5.5 0 0 1 .48.36l.7 2.4a.5.5 0 0 1-.14.52L4.7 5.8a7.5 7.5 0 0 0 3.5 3.5l.52-.86a.5.5 0 0 1 .52-.14l2.4.7a.5.5 0 0 1 .36.48V11a1 1 0 0 1-1 1C5.4 12 2 8.6 2 3z" stroke="currentColor" strokeWidth="1" />
                      </svg>
                      {founder.phone}
                    </a>
                    <a
                      href={`mailto:${founder.email}`}
                      className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs transition-colors"
                    >
                      <svg viewBox="0 0 14 14" className="w-3 h-3" fill="none">
                        <rect x="1" y="3" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1" />
                        <path d="M1 4l6 4 6-4" stroke="currentColor" strokeWidth="1" />
                      </svg>
                      {founder.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div className="flex flex-wrap justify-center gap-6 text-white/30 text-sm">
            {[
              { label: "hello@skysquare.studio", href: "mailto:hello@skysquare.studio" },
              { label: "Twitter / X", href: "#" },
              { label: "LinkedIn", href: "#" },
            ].map((link) => (
              <a key={link.label} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
