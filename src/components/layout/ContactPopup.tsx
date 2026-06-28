"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type PopupState = "idle" | "submitting" | "success";

const TRIGGER_SCROLL_PCT = 50; // % of page
const TRIGGER_TIME_MS = 15000; // 15 seconds

export default function ContactPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [state, setState] = useState<PopupState>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firedRef = useRef(false);

  const trigger = () => {
    if (firedRef.current || dismissed) return;
    firedRef.current = true;
    setVisible(true);
  };

  useEffect(() => {
    // Time trigger
    timerRef.current = setTimeout(trigger, TRIGGER_TIME_MS);

    // Scroll trigger
    const onScroll = () => {
      const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrolled >= TRIGGER_SCROLL_PCT) trigger();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener("scroll", onScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dismissed]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    firedRef.current = true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setState("submitting");
    await new Promise((r) => setTimeout(r, 1500));
    setState("success");
  };

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          key="contact-popup"
          className="fixed bottom-6 right-6 z-[9000] w-[340px] max-w-[calc(100vw-3rem)]"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Card */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "rgba(14,14,18,0.95)",
              border: "1px solid rgba(255,255,255,0.09)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            {/* Top gradient accent */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(79,142,247,0.6), rgba(139,92,246,0.5), transparent)",
              }}
            />

            {/* Header row */}
            <div className="flex items-center justify-between px-5 pt-4 pb-0">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#4f8ef7] animate-pulse" />
                <span className="text-white/60 text-xs tracking-wide font-medium uppercase">
                  Start a project
                </span>
              </div>
              <div className="flex items-center gap-1">
                {/* Minimise */}
                <button
                  onClick={() => setMinimised(!minimised)}
                  className="w-6 h-6 rounded-md flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/[0.05] transition-all"
                  aria-label="Minimise"
                >
                  <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none">
                    <path d="M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                {/* Close */}
                <button
                  onClick={handleDismiss}
                  className="w-6 h-6 rounded-md flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/[0.05] transition-all"
                  aria-label="Close"
                >
                  <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none">
                    <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Body — collapsible */}
            <AnimatePresence initial={false}>
              {!minimised && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pt-3 pb-5">
                    <AnimatePresence mode="wait">
                      {state === "success" ? (
                        <motion.div
                          key="success"
                          className="flex flex-col items-center justify-center py-6 text-center"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                            style={{
                              background: "rgba(79,142,247,0.12)",
                              border: "1px solid rgba(79,142,247,0.3)",
                            }}
                          >
                            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                              <motion.path
                                d="M5 12l4.5 4.5L19 7"
                                stroke="#4f8ef7"
                                strokeWidth="2"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                              />
                            </svg>
                          </div>
                          <p className="text-white font-semibold text-sm">Message sent!</p>
                          <p className="text-white/35 text-xs mt-1">We&apos;ll reply within 24 hours.</p>
                        </motion.div>
                      ) : (
                        <motion.form
                          key="form"
                          onSubmit={handleSubmit}
                          className="space-y-3"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {/* Headline */}
                          <div className="mb-4">
                            <h3
                              className="text-white font-bold text-lg leading-tight"
                              style={{ fontFamily: "var(--font-syne)" }}
                            >
                              Got a project in mind?
                            </h3>
                            <p className="text-white/35 text-xs mt-1">
                              Drop us a note — no commitment.
                            </p>
                          </div>

                          {/* Name */}
                          <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                            placeholder="Your name"
                            className="w-full text-sm text-white placeholder:text-white/25 px-3.5 py-2.5 rounded-xl transition-colors focus:outline-none"
                            style={{
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "rgba(79,142,247,0.5)")}
                            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                          />

                          {/* Email */}
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                            placeholder="Work email"
                            className="w-full text-sm text-white placeholder:text-white/25 px-3.5 py-2.5 rounded-xl transition-colors focus:outline-none"
                            style={{
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "rgba(79,142,247,0.5)")}
                            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                          />

                          {/* Message */}
                          <textarea
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            placeholder="Briefly describe your project..."
                            rows={2}
                            className="w-full text-sm text-white placeholder:text-white/25 px-3.5 py-2.5 rounded-xl resize-none focus:outline-none transition-colors"
                            style={{
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "rgba(79,142,247,0.5)")}
                            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                          />

                          {/* Submit */}
                          <motion.button
                            type="submit"
                            disabled={state === "submitting"}
                            className="w-full py-2.5 rounded-xl text-sm font-semibold text-[#080808] transition-opacity disabled:opacity-60"
                            style={{ background: "linear-gradient(135deg, #fff 0%, #c7d9ff 100%)" }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {state === "submitting" ? (
                              <span className="flex items-center justify-center gap-2">
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

                          <p className="text-white/20 text-[10px] text-center">
                            We reply within 24 hours · No spam
                          </p>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
