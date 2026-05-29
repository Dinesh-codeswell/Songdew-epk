"use client";

import { ContentSection, MediaCard } from "@/components/discovery/MediaCard";
import { Library, Clock, Music } from "lucide-react";
import { useDiscoveryTheme } from "@/context/DiscoveryThemeContext";
import { cn } from "@/lib/utils";

function LibraryPageContent() {
  const { theme } = useDiscoveryTheme();
  const isDark = theme === "dark";

  return (
    <div className="p-8 pb-32 max-w-[1440px]">
      <header className="mb-12">
        <h1 className={cn("text-4xl font-bold font-heading mb-8 flex items-center gap-4 transition-colors", isDark ? "text-white" : "text-songdew-text")}>
          <Library className={cn("w-10 h-10 transition-colors", isDark ? "text-[#1DB954]" : "text-songdew-blue")} />
          Your Library
        </h1>
        
        <div className="flex gap-4 mb-12">
          {["Playlists", "Artists", "Albums", "Podcasts"].map((tab) => (
            <button 
              key={tab}
              className={cn(
                "px-6 py-2 rounded-full text-[14px] font-bold transition-all duration-300",
                isDark ? "bg-[#242424] text-white hover:bg-[#2a2a24]" : "bg-white text-songdew-text border border-black/5 hover:bg-gray-50 shadow-sm"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {/* Liked Songs Card */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-gradient-to-br from-[#450af5] to-[#8e8ee5] rounded-2xl p-8 relative overflow-hidden group cursor-pointer shadow-2xl">
          <div className="relative z-10 h-full flex flex-col justify-end">
            <h2 className="text-4xl font-bold text-white font-heading mb-4">Liked Songs</h2>
            <p className="text-white/80 font-body">128 songs</p>
          </div>
          <div className={cn(
            "absolute right-8 bottom-8 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300",
            isDark ? "bg-[#1DB954] text-black" : "bg-white text-songdew-blue"
          )}>
            <Music className="w-6 h-6 fill-current" />
          </div>
        </div>

        <div className={cn(
          "rounded-2xl p-8 flex flex-col items-center justify-center text-center border transition-colors duration-300",
          isDark ? "bg-[#181818] border-white/5 border-dashed" : "bg-white border-black/5 border-dashed"
        )}>
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors",
            isDark ? "bg-neutral-800" : "bg-songdew-bg"
          )}>
            <Clock className={cn("w-8 h-8 transition-colors", isDark ? "text-[#b3b3b3]" : "text-songdew-gray")} />
          </div>
          <h3 className={cn("font-bold mb-2 transition-colors", isDark ? "text-white" : "text-songdew-text")}>Recently Played</h3>
          <p className={cn("text-sm transition-colors", isDark ? "text-[#b3b3b3]" : "text-songdew-gray")}>Your listening history will appear here.</p>
        </div>
      </div>

      <ContentSection title="Playlists for You" theme={theme}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <MediaCard 
            key={i} 
            title={`My Playlist #${i}`} 
            subtitle="By You" 
            type="playlist" 
            theme={theme}
          />
        ))}
      </ContentSection>
    </div>
  );
}

export default function LibraryPage() {
  return <LibraryPageContent />;
}
