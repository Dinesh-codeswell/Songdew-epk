"use client";

import { motion } from "framer-motion";

interface IdentityToggleProps {
  mode: "artist" | "discovery";
  setMode: (mode: "artist" | "discovery") => void;
}

export function IdentityToggle({ mode, setMode }: IdentityToggleProps) {
  return (
    <div className="flex flex-col items-center mb-16">
      <p className="text-songdew-gray font-medium mb-4 tracking-wide uppercase text-[12px]">
        Choose Your Path
      </p>
      <div 
        className="relative bg-[#E2E8F0] p-1 rounded-full flex items-center w-[320px] h-[56px] cursor-pointer"
        onClick={() => setMode(mode === "artist" ? "discovery" : "artist")}
      >
        <motion.div
          className="absolute h-[48px] w-[154px] bg-white rounded-full shadow-sm"
          animate={{ x: mode === "artist" ? 0 : 158 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <div className={`z-10 w-1/2 text-center text-[15px] font-semibold transition-colors duration-300 ${mode === "artist" ? "text-songdew-text" : "text-songdew-gray"}`}>
          FOR ARTISTS
        </div>
        <div className={`z-10 w-1/2 text-center text-[15px] font-semibold transition-colors duration-300 ${mode === "discovery" ? "text-songdew-text" : "text-songdew-gray"}`}>
          FOR INDUSTRY
        </div>
      </div>
    </div>
  );
}
