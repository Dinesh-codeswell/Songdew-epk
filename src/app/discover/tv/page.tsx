"use client";

import { DiscoveryLayout } from "@/components/discovery/DiscoveryLayout";
import { Radio, PlayCircle, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useDiscoveryTheme } from "@/context/DiscoveryThemeContext";
import { cn } from "@/lib/utils";

const programs = [
  { title: "Indie Spotlight", host: "RJ Divya", category: "Interviews", color: "bg-blue-600" },
  { title: "Songdew Unplugged", host: "Songdew Team", category: "Live Sessions", color: "bg-purple-600" },
  { title: "The Next Big Thing", host: "Industry Scouts", category: "Talent Hunt", color: "bg-red-600" },
  { title: "Behind the Beat", host: "Producers", category: "Documentary", color: "bg-amber-600" },
];

function SongdewTVPageContent() {
  const { theme } = useDiscoveryTheme();
  const isDark = theme === "dark";

  return (
    <div className="p-8 pb-32 max-w-[1440px]">
      <header className="mb-12 relative h-[400px] rounded-3xl overflow-hidden group shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://songdewnetwork.com/sgmedia/assets/images/homeogimage.jpg')] bg-cover bg-center transition-transform duration-[2s] group-hover:scale-110" />
        <div className={cn(
          "absolute inset-0 transition-colors duration-500",
          isDark ? "bg-gradient-to-t from-black via-black/40 to-transparent" : "bg-gradient-to-t from-white/90 via-white/20 to-transparent"
        )} />
        <div className="relative h-full flex flex-col justify-end p-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-bold rounded-sm animate-pulse flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-white rounded-full" /> LIVE
            </span>
            <span className={cn("text-sm font-bold uppercase tracking-widest transition-colors", isDark ? "text-white/60" : "text-songdew-gray")}>Songdew TV Originals</span>
          </div>
          <h1 className={cn("text-7xl font-bold font-heading mb-6 transition-colors", isDark ? "text-white" : "text-songdew-text")}>India&apos;s First <br/>Indie Channel.</h1>
          <div className="flex gap-4">
            <button className={cn(
              "px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-xl",
              isDark ? "bg-white text-black" : "bg-songdew-blue text-white"
            )}>
              <PlayCircle className="w-5 h-5" /> Watch Now
            </button>
            <button className={cn(
              "backdrop-blur-md border px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2",
              isDark ? "bg-white/10 text-white border-white/10 hover:bg-white/20" : "bg-black/5 text-songdew-text border-black/5 hover:bg-black/10"
            )}>
              Schedule
            </button>
          </div>
        </div>
      </header>

      <section className="mb-16">
        <h2 className={cn("text-2xl font-bold font-heading mb-8 transition-colors", isDark ? "text-white" : "text-songdew-text")}>Popular Shows</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((show, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className={cn(
                "rounded-2xl p-6 border transition-all cursor-pointer group shadow-lg",
                isDark ? "bg-[#181818] border-white/5 hover:border-[#1DB954]/50" : "bg-white border-black/5 hover:border-songdew-blue/50"
              )}
            >
              <div className={`${show.color} w-full aspect-video rounded-xl mb-6 flex items-center justify-center relative overflow-hidden shadow-xl`}>
                <Radio className="w-12 h-12 text-white/40 group-hover:scale-125 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
              <h3 className={cn("font-bold text-lg mb-1 font-heading transition-colors", isDark ? "text-white" : "text-songdew-text")}>{show.title}</h3>
              <p className={cn("text-sm mb-4 font-body transition-colors", isDark ? "text-[#b3b3b3]" : "text-songdew-gray")}>{show.host}</p>
              <div className={cn(
                "flex items-center gap-2 text-[10px] font-bold uppercase tracking-tighter transition-colors",
                isDark ? "text-[#1DB954]" : "text-songdew-blue"
              )}>
                <Star className="w-3 h-3 fill-current" /> {show.category}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function SongdewTVPage() {
  return (
    <DiscoveryLayout>
      <SongdewTVPageContent />
    </DiscoveryLayout>
  );
}
