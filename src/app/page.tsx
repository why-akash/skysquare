"use client";
import { useState } from "react";
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

  return (
    <>
      <CustomCursor />
      <Loader onComplete={() => setLoaded(true)} />
      {loaded && <ContactPopup />}

      <SmoothScroll>
        <div className="bg-[#080808] min-h-screen">
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
