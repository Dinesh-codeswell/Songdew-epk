"use client";

import { Heart, Play, Clock, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { useDiscoveryTheme } from "@/context/DiscoveryThemeContext";
import { cn } from "@/lib/utils";

const likedSongs = [
  { title: "Midnight City", artist: "M83", album: "Hurry Up, We're Dreaming", dateAdded: "2 days ago", duration: "4:03" },
  { title: "Cold/Mess", artist: "Prateek Kuhad", album: "Cold/Mess", dateAdded: "5 days ago", duration: "3:42" },
  { title: "Dil Mere", artist: "The Local Train", album: "Aalas Ka Pedh", dateAdded: "1 week ago", duration: "3:14" },
  { title: "Udd Gaye", artist: "Ritviz", album: "Udd Gaye", dateAdded: "2 weeks ago", duration: "3:02" },
  { title: "Gul", artist: "Anuv Jain", album: "Gul", dateAdded: "1 month ago", duration: "4:12" },
];

function LikedSongsPageContent() {
  const { theme } = useDiscoveryTheme();
  const isDark = theme === "dark";

  return (
    <div className="p-8 pb-32 max-w-[1440px]">
      {/* Immersive Header */}
      <header className={cn(
        "flex flex-col md:flex-row items-end gap-8 mb-8 -mx-8 -mt-8 p-12 pt-20 transition-all duration-500",
        isDark ? "bg-gradient-to-b from-[#5038a0] to-transparent" : "bg-gradient-to-b from-purple-100 to-transparent"
      )}>
        <div className="w-60 h-64 bg-gradient-to-br from-[#450af5] to-[#8e8ee5] rounded-xl flex items-center justify-center shadow-[0_25px_50px_rgba(0,0,0,0.5)]">
          <Heart className="w-32 h-32 text-white fill-white" />
        </div>
        <div className="flex-1">
          <span className={cn("text-[12px] font-bold uppercase tracking-widest mb-4 block transition-colors", isDark ? "text-white" : "text-songdew-gray")}>Playlist</span>
          <h1 className={cn("text-8xl font-bold font-heading mb-8 -ml-1 transition-colors", isDark ? "text-white" : "text-songdew-text")}>Liked Songs</h1>
          <div className={cn("flex items-center gap-2 font-body text-sm transition-colors", isDark ? "text-white" : "text-songdew-text")}>
            <span className="font-bold">User Name</span>
            <span className={isDark ? "text-white/60" : "text-songdew-gray"}>•</span>
            <span>128 songs</span>
          </div>
        </div>
      </header>

      {/* Action Bar */}
      <div className="flex items-center gap-8 mb-8 px-4">
        <button className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all",
          isDark ? "bg-[#1DB954] text-black" : "bg-songdew-blue text-white"
        )}>
          <Play className="w-6 h-6 fill-current ml-1" />
        </button>
        <MoreHorizontal className={cn("w-8 h-8 cursor-pointer transition-colors", isDark ? "text-[#b3b3b3] hover:text-white" : "text-songdew-gray hover:text-songdew-text")} />
      </div>

      {/* Tracks Table */}
      <div className="px-4">
        <div className={cn(
          "grid grid-cols-[16px_4fr_3fr_2fr_1fr] gap-4 py-2 border-b text-[12px] font-bold uppercase tracking-wider mb-4 px-4 transition-colors",
          isDark ? "border-white/10 text-[#b3b3b3]" : "border-black/5 text-songdew-gray"
        )}>
          <div className="text-center">#</div>
          <div>Title</div>
          <div>Album</div>
          <div>Date Added</div>
          <div className="flex justify-end"><Clock className="w-4 h-4" /></div>
        </div>

        <div className="space-y-1">
          {likedSongs.map((song, i) => (
            <motion.div 
              key={i}
              whileHover={{ backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.03)" }}
              className="grid grid-cols-[16px_4fr_3fr_2fr_1fr] gap-4 py-3 px-4 rounded-md group transition-colors cursor-pointer items-center"
            >
              <div className={cn("text-center font-body text-sm transition-colors", isDark ? "text-[#b3b3b3] group-hover:text-white" : "text-songdew-gray group-hover:text-songdew-text")}>{i + 1}</div>
              <div className="flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded flex-shrink-0 transition-colors", isDark ? "bg-neutral-800" : "bg-gray-100")} />
                <div>
                  <div className={cn(
                    "font-semibold text-[15px] transition-colors",
                    isDark ? "text-white group-hover:text-[#1DB954]" : "text-songdew-text group-hover:text-songdew-blue"
                  )}>{song.title}</div>
                  <div className={cn("text-[13px] transition-colors", isDark ? "text-[#b3b3b3] group-hover:text-white" : "text-songdew-gray group-hover:text-songdew-text")}>{song.artist}</div>
                </div>
              </div>
              <div className={cn("text-sm font-body truncate transition-colors", isDark ? "text-[#b3b3b3]" : "text-songdew-gray")}>{song.album}</div>
              <div className={cn("text-sm font-body transition-colors", isDark ? "text-[#b3b3b3]" : "text-songdew-gray")}>{song.dateAdded}</div>
              <div className={cn("text-sm font-body text-right transition-colors", isDark ? "text-[#b3b3b3]" : "text-songdew-gray")}>{song.duration}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LikedSongsPage() {
  return <LikedSongsPageContent />;
}
