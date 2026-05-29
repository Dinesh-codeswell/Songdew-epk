"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LandingNavbarProps {
  mode: "artist" | "discovery";
}

export function LandingNavbar({ mode }: LandingNavbarProps) {
  const isArtist = mode === "artist";
  const brandColor = isArtist ? "text-songdew-blue" : "text-[#1DB954]";
  const buttonBg = isArtist ? "bg-songdew-blue" : "bg-[#1DB954]";
  const buttonShadow = isArtist ? "shadow-songdew-blue/20" : "shadow-[#1DB954]/20";

  return (
    <nav className="flex items-center justify-between px-12 py-6 border-b border-black/5 bg-white sticky top-0 z-50 transition-colors duration-500">
      <div className="flex items-center gap-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="font-bold text-2xl tracking-tighter text-songdew-text flex items-center">
            SONGDEW
            <motion.span 
              animate={{ color: isArtist ? "#007BFF" : "#1DB954" }}
              className="ml-0.5"
            >
              .
            </motion.span>
          </div>
        </Link>
        
        <div className="hidden md:flex gap-8 text-[15px] font-medium text-songdew-gray">
          <Link href="#" className="hover:text-songdew-text transition-colors">Features</Link>
          <Link href="#" className="hover:text-songdew-text transition-colors">Showcase</Link>
          <Link href="#" className="hover:text-songdew-text transition-colors">About</Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/signin">
          <Button variant="ghost" className="font-semibold text-songdew-gray hover:text-songdew-text">
            Sign In
          </Button>
        </Link>
        <Link href="/signup">
          <motion.div
            animate={{ backgroundColor: isArtist ? "#007BFF" : "#1DB954" }}
            className={`rounded-full shadow-lg ${buttonShadow} overflow-hidden`}
          >
            <Button className="bg-transparent hover:bg-transparent px-8 py-2.5 font-semibold text-white border-none h-auto">
              Join Free
            </Button>
          </motion.div>
        </Link>
      </div>
    </nav>
  );
}
