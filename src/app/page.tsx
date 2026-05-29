"use client";

import { useState } from "react";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { IdentityToggle } from "@/components/landing/IdentityToggle";
import { ArtistHero } from "@/components/landing/ArtistHero";
import { DiscoveryHero } from "@/components/landing/DiscoveryHero";
import { AnimatePresence, motion } from "framer-motion";

export default function LandingPage() {
  const [mode, setMode] = useState<"artist" | "discovery">("artist");

  return (
    <div className="min-h-screen bg-songdew-bg overflow-x-hidden">
      <LandingNavbar mode={mode} />
      
      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        {/* Toggle Section */}
        <IdentityToggle mode={mode} setMode={setMode} />

        {/* Content Section with AnimatePresence for smooth transitions */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {mode === "artist" ? (
              <ArtistHero key="artist" />
            ) : (
              <DiscoveryHero key="discovery" />
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic Background Element */}
        <motion.div 
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[800px] h-[800px] blur-[120px] rounded-full opacity-10 pointer-events-none"
          animate={{ 
            backgroundColor: mode === "artist" ? "#007BFF" : "#1DB954" 
          }}
          transition={{ duration: 1 }}
        />
      </main>

      {/* Footer Placeholder for visual consistency */}
      <footer className="mt-20 py-12 border-t border-black/5 text-center text-songdew-gray text-sm font-body">
        <div className="max-w-[1440px] mx-auto px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-bold tracking-tight text-songdew-text">SONGDEW.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-songdew-text transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-songdew-text transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-songdew-text transition-colors">Contact Us</a>
          </div>
          <div>© 2026 Songdew Network. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
