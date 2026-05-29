"use client";

import { motion } from "framer-motion";
import { Play, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Maximize2, ListMusic } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlayerProps {
  theme?: "light" | "dark";
}

export function Player({ theme = "dark" }: PlayerProps) {
  const isDark = theme === "dark";

  return (
    <footer className={cn(
      "h-[90px] px-4 flex items-center justify-between sticky bottom-0 z-50 border-t transition-colors duration-300",
      isDark ? "bg-black border-white/10" : "bg-white border-black/5"
    )}>
      {/* Current Track Info */}
      <div className="flex items-center gap-4 w-[30%]">
        <div className={cn(
          "w-14 h-14 rounded-md overflow-hidden shadow-lg",
          isDark ? "bg-neutral-800" : "bg-songdew-bg border border-black/5"
        )}>
          <div className={cn(
            "w-full h-full bg-gradient-to-br",
            isDark ? "from-neutral-700 to-neutral-900" : "from-gray-200 to-white"
          )} />
        </div>
        <div className="flex flex-col">
          <h4 className={cn(
            "text-[14px] font-semibold hover:underline cursor-pointer transition-colors duration-300",
            isDark ? "text-white" : "text-songdew-text"
          )}>Midnight City</h4>
          <p className={cn(
            "text-[11px] hover:underline cursor-pointer transition-colors duration-300",
            isDark ? "text-[#b3b3b3] hover:text-white" : "text-songdew-gray hover:text-songdew-blue"
          )}>M83</p>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center max-w-[40%] w-full gap-2">
        <div className="flex items-center gap-6">
          <Shuffle className={cn("w-4 h-4 cursor-pointer transition-colors", isDark ? "text-[#b3b3b3] hover:text-white" : "text-songdew-gray hover:text-songdew-blue")} />
          <SkipBack className={cn("w-5 h-5 cursor-pointer fill-current transition-colors", isDark ? "text-[#b3b3b3] hover:text-white" : "text-songdew-gray hover:text-songdew-blue")} />
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md",
            isDark ? "bg-white text-black" : "bg-songdew-blue text-white"
          )}>
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
          <SkipForward className={cn("w-5 h-5 cursor-pointer fill-current transition-colors", isDark ? "text-[#b3b3b3] hover:text-white" : "text-songdew-gray hover:text-songdew-blue")} />
          <Repeat className={cn("w-4 h-4 cursor-pointer transition-colors", isDark ? "text-[#b3b3b3] hover:text-white" : "text-songdew-gray hover:text-songdew-blue")} />
        </div>
        
        <div className="flex items-center gap-2 w-full max-w-[500px]">
          <span className={cn("text-[11px] min-w-[30px] text-right font-body transition-colors", isDark ? "text-[#b3b3b3]" : "text-songdew-gray")}>2:14</span>
          <div className={cn("flex-1 h-1 rounded-full relative group cursor-pointer", isDark ? "bg-neutral-700" : "bg-gray-200")}>
            <div className={cn(
              "absolute h-full rounded-full w-[60%]",
              isDark ? "bg-white group-hover:bg-[#1DB954]" : "bg-songdew-blue"
            )} />
            <div className="absolute w-3 h-3 bg-white rounded-full top-1/2 -translate-y-1/2 left-[60%] opacity-0 group-hover:opacity-100 shadow-xl border border-black/5" />
          </div>
          <span className={cn("text-[11px] min-w-[30px] font-body transition-colors", isDark ? "text-[#b3b3b3]" : "text-songdew-gray")}>4:03</span>
        </div>
      </div>

      {/* Volume & Misc Controls */}
      <div className="flex items-center justify-end gap-3 w-[30%]">
        <ListMusic className={cn("w-4 h-4 cursor-pointer transition-colors", isDark ? "text-[#b3b3b3] hover:text-white" : "text-songdew-gray hover:text-songdew-blue")} />
        <Volume2 className={cn("w-4 h-4 cursor-pointer transition-colors", isDark ? "text-[#b3b3b3] hover:text-white" : "text-songdew-gray hover:text-songdew-blue")} />
        <div className={cn("w-[93px] h-1 rounded-full relative group cursor-pointer", isDark ? "bg-neutral-700" : "bg-gray-200")}>
          <div className={cn(
            "absolute h-full rounded-full w-[70%]",
            isDark ? "bg-white group-hover:bg-[#1DB954]" : "bg-songdew-blue"
          )} />
        </div>
        <Maximize2 className={cn("w-4 h-4 cursor-pointer transition-colors", isDark ? "text-[#b3b3b3] hover:text-white" : "text-songdew-gray hover:text-songdew-blue")} />
      </div>
    </footer>
  );
}
