"use client";

import { DiscoveryLayout } from "@/components/discovery/DiscoveryLayout";
import { ContentSection, MediaCard } from "@/components/discovery/MediaCard";
import { Mic2, Play, Info } from "lucide-react";
import { motion } from "framer-motion";
import { useDiscoveryTheme } from "@/context/DiscoveryThemeContext";
import { cn } from "@/lib/utils";

const podcasts = [
  { title: "The Indie Journey", creator: "Songdew Originals", type: "podcast" },
  { title: "Rhythm & Business", creator: "Music Industry News", type: "podcast" },
  { title: "Artist Masterclass", creator: "Expert Series", type: "podcast" },
  { title: "Desi Beats Talk", creator: "Cultural Hub", type: "podcast" },
  { title: "Production Secrets", creator: "Studio sessions", type: "podcast" },
  { title: "Marketing for Musicians", creator: "Growth Lab", type: "podcast" },
];

function PodcastsPageContent() {
  const { theme } = useDiscoveryTheme();
  const isDark = theme === "dark";

  return (
    <div className="p-8 pb-32 max-w-[1440px]">
      <header className="mb-12 relative h-[350px] rounded-3xl overflow-hidden group shadow-2xl transition-all duration-500">
        <div className={cn(
          "absolute inset-0 transition-colors duration-500",
          isDark ? "bg-[#3E3E3E]" : "bg-gray-100"
        )} />
        <div className={cn(
          "absolute inset-0 transition-colors duration-500",
          isDark ? "bg-gradient-to-r from-black/80 to-transparent" : "bg-gradient-to-r from-white/90 to-transparent"
        )} />
        <div className="relative h-full flex flex-col justify-end p-12">
          <div className="flex items-center gap-2 mb-4">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-lg",
              isDark ? "bg-[#1DB954] text-black" : "bg-songdew-blue text-white"
            )}>
              <Mic2 className="w-4 h-4" />
            </div>
            <span className={cn("font-bold uppercase tracking-widest text-[10px] transition-colors", isDark ? "text-white" : "text-songdew-gray")}>Podcast of the Week</span>
          </div>
          <h1 className={cn("text-6xl font-bold font-heading mb-6 transition-colors", isDark ? "text-white" : "text-songdew-text")}>The Indie <br/>Blueprint.</h1>
          <p className={cn("font-body max-w-lg mb-8 leading-relaxed transition-colors", isDark ? "text-white/60" : "text-songdew-gray")}>
            Join the biggest names in the Indian independent scene as they share their journey, struggles, and success strategies.
          </p>
          <div className="flex gap-4">
            <button className={cn(
              "px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-xl",
              isDark ? "bg-white text-black" : "bg-songdew-blue text-white"
            )}>
              <Play className="w-5 h-5 fill-current" /> Listen Now
            </button>
            <button className={cn(
              "backdrop-blur-md border px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2",
              isDark ? "bg-white/10 text-white border-white/20 hover:bg-white/20" : "bg-black/5 text-songdew-text border-black/5 hover:bg-black/10"
            )}>
              <Info className="w-5 h-5" /> Details
            </button>
          </div>
        </div>
        <div className="absolute right-12 bottom-12 w-64 h-64 bg-white/5 rounded-2xl rotate-12 blur-2xl group-hover:rotate-[20deg] transition-transform duration-700" />
      </header>

      <ContentSection title="Top Podcasts" theme={theme}>
        {podcasts.map((podcast, i) => (
          <MediaCard 
            key={i} 
            title={podcast.title} 
            subtitle={podcast.creator} 
            type="album" 
            theme={theme}
          />
        ))}
      </ContentSection>

      <ContentSection title="Music Industry & Business" theme={theme}>
        {podcasts.slice().reverse().map((podcast, i) => (
          <MediaCard 
            key={i} 
            title={podcast.title} 
            subtitle={podcast.creator} 
            type="album" 
            theme={theme}
          />
        ))}
      </ContentSection>
    </div>
  );
}

export default function PodcastsPage() {
  return (
    <DiscoveryLayout>
      <PodcastsPageContent />
    </DiscoveryLayout>
  );
}
