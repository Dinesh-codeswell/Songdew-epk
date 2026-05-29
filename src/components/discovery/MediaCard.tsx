"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaCardProps {
  title: string;
  subtitle: string;
  type?: "artist" | "album" | "playlist";
  imageUrl?: string;
  theme?: "light" | "dark";
}

export function MediaCard({ title, subtitle, type = "album", imageUrl, theme = "dark" }: MediaCardProps) {
  const isArtist = type === "artist";
  const isDark = theme === "dark";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        "group p-4 rounded-xl transition-all duration-300 cursor-pointer relative",
        isDark ? "bg-[#181818] hover:bg-[#282828]" : "bg-white border border-black/5 hover:shadow-xl hover:shadow-black/5"
      )}
    >
      <div className={cn(
        "aspect-square mb-4 overflow-hidden relative shadow-lg",
        isArtist ? "rounded-full" : "rounded-lg"
      )}>
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className={cn(
            "w-full h-full flex items-center justify-center transition-colors duration-300",
            isDark ? "bg-neutral-800" : "bg-songdew-bg"
          )}>
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-widest",
              isDark ? "text-neutral-500" : "text-songdew-gray"
            )}>{type}</span>
          </div>
        )}
        
        {/* Play Button Overlay */}
        <div className="absolute right-2 bottom-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 active:scale-95",
            isDark ? "bg-[#1DB954] text-black" : "bg-songdew-blue text-white"
          )}>
            <Play className="w-6 h-6 fill-current ml-1" />
          </div>
        </div>
      </div>
      
      <h3 className={cn(
        "font-bold truncate text-[16px] mb-1 font-heading transition-colors duration-300",
        isDark ? "text-white" : "text-songdew-text"
      )}>
        {title}
      </h3>
      <p className={cn(
        "text-[14px] line-clamp-2 font-body transition-colors duration-300",
        isDark ? "text-[#b3b3b3]" : "text-songdew-gray"
      )}>
        {subtitle}
      </p>
    </motion.div>
  );
}

export function ContentSection({ title, children, theme = "dark" }: { title: string; children: React.ReactNode; theme?: "light" | "dark" }) {
  const isDark = theme === "dark";
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className={cn(
          "text-[24px] font-bold font-heading tracking-tight transition-colors duration-300",
          isDark ? "text-white" : "text-songdew-text"
        )}>
          {title}
        </h2>
        <button className={cn(
          "text-[12px] font-bold hover:underline uppercase tracking-wider transition-colors duration-300",
          isDark ? "text-[#b3b3b3]" : "text-songdew-gray"
        )}>
          Show all
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {children}
      </div>
    </section>
  );
}
