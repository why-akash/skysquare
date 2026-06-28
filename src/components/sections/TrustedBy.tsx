"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const CLIENTS = [
  { name: "Meridian", tagline: "FinTech" },
  { name: "Praxis", tagline: "SaaS" },
  { name: "Orion Labs", tagline: "Deep Tech" },
  { name: "Velox", tagline: "E-Commerce" },
  { name: "Luminary", tagline: "EdTech" },
  { name: "Strata", tagline: "PropTech" },
  { name: "Axiom", tagline: "Analytics" },
  { name: "Crest", tagline: "Healthcare" },
  { name: "Nomad", tagline: "Travel" },
  { name: "Foundry", tagline: "Startup" },
];

function LogoItem({ name, tagline }: { name: string; tagline: string }) {
  return (
    <div className="flex items-center gap-3 px-8 group cursor-default select-none">
      {/* Abstract logo mark */}
      <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-white/20 group-hover:bg-white/[0.07] transition-all duration-300">
        <span className="text-white/60 text-[11px] font-bold group-hover:text-white/90 transition-colors">
          {name[0]}
        </span>
      </div>
      <div>
        <div className="text-white/50 text-sm font-medium group-hover:text-white/80 transition-colors">
          {name}
        </div>
        <div className="text-white/20 text-[10px] leading-none">{tagline}</div>
      </div>
    </div>
  );
}

export default function TrustedBy() {
  const { ref, inView } = useInView();

  return (
    <section
      className="py-20 border-t border-b border-white/[0.04] overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-white/25 text-xs tracking-[0.2em] uppercase font-medium">
          Trusted by founders and teams at
        </p>
      </motion.div>

      {/* Marquee row 1 */}
      <div className="relative">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#080808] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#080808] to-transparent pointer-events-none" />

        <div className="flex overflow-hidden py-2">
          <div className="marquee-track flex items-center whitespace-nowrap">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <LogoItem key={i} name={c.name} tagline={c.tagline} />
            ))}
          </div>
        </div>
      </div>

      {/* Marquee row 2 — reversed */}
      <div className="relative mt-2">
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#080808] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#080808] to-transparent pointer-events-none" />

        <div className="flex overflow-hidden py-2">
          <div
            className="flex items-center whitespace-nowrap"
            style={{ animation: "marquee 40s linear infinite reverse" }}
          >
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <LogoItem key={i} name={c.name} tagline={c.tagline} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
