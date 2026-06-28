"use client";
import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

import Loader from "@/components/layout/Loader";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/layout/CustomCursor";
import Footer from "@/components/layout/Footer";
import ContactPopup from "@/components/layout/ContactPopup";

import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import Services from "@/components/sections/Services";
import FeaturedWork from "@/components/sections/FeaturedWork";
import BuildProcess from "@/components/sections/BuildProcess";
import WhyUs from "@/components/sections/WhyUs";
import TechStack from "@/components/sections/TechStack";
import Contact from "@/components/sections/Contact";

const SmoothScroll = dynamic(() => import("@/components/layout/SmoothScroll"), {
  ssr: false,
});

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => setLoaded(true), []);

  return (
    <>
      <CustomCursor />
      <Loader onComplete={handleLoaded} />
      {loaded && <ContactPopup />}

      <SmoothScroll>
        <div className="bg-[#080808] min-h-screen relative">
          {/* Global animated background — visible on all screen sizes */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
            <div
              className="absolute rounded-full"
              style={{
                width: "clamp(300px, 60vw, 900px)",
                height: "clamp(300px, 60vw, 900px)",
                background: "radial-gradient(circle, rgba(79,142,247,0.10) 0%, transparent 70%)",
                filter: "blur(clamp(40px, 8vw, 120px))",
                top: "-10%",
                left: "5%",
                animation: "blob-drift-a 20s ease-in-out infinite",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: "clamp(250px, 50vw, 750px)",
                height: "clamp(250px, 50vw, 750px)",
                background: "radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 70%)",
                filter: "blur(clamp(40px, 8vw, 100px))",
                top: "35%",
                right: "0%",
                animation: "blob-drift-b 26s ease-in-out infinite",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: "clamp(220px, 45vw, 650px)",
                height: "clamp(220px, 45vw, 650px)",
                background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
                filter: "blur(clamp(40px, 7vw, 90px))",
                bottom: "5%",
                left: "25%",
                animation: "blob-drift-c 18s ease-in-out infinite",
              }}
            />
          </div>
          <Navbar loaded={loaded} />

          <main>
            <Hero loaded={loaded} />
            <TrustedBy />

            <div className="max-w-7xl mx-auto px-6">
              <div className="border-t border-white/[0.04]" />
            </div>

            <Services />

            <div className="max-w-7xl mx-auto px-6">
              <div className="border-t border-white/[0.04]" />
            </div>

            <FeaturedWork />

            <div
              className="relative py-1"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(79,142,247,0.04) 0%, transparent 70%)",
              }}
            >
              <BuildProcess />
            </div>

            <div className="max-w-7xl mx-auto px-6">
              <div className="border-t border-white/[0.04]" />
            </div>

            <WhyUs />

            <div className="max-w-7xl mx-auto px-6">
              <div className="border-t border-white/[0.04]" />
            </div>

            <TechStack />

            <div
              className="relative"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(79,142,247,0.05) 0%, transparent 60%)",
              }}
            >
              <Contact />
            </div>
          </main>

          <Footer />
        </div>
      </SmoothScroll>
    </>
  );
}
