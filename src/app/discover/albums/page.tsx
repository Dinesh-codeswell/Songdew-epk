"use client";

import { DiscoveryLayout } from "@/components/discovery/DiscoveryLayout";
import { ContentSection, MediaCard } from "@/components/discovery/MediaCard";
import { Disc, PlayCircle } from "lucide-react";
import { useDiscoveryTheme } from "@/context/DiscoveryThemeContext";
import { cn } from "@/lib/utils";

const albums = [
  { name: "Cold/Mess", artist: "Prateek Kuhad", tracks: 6, year: 2018 },
  { name: "Gul", artist: "Anuv Jain", tracks: 1, year: 2021 },
  { name: "The Bridge", artist: "Raja Kumari", tracks: 9, year: 2023 },
  { name: "Aatish", artist: "The Local Train", tracks: 8, year: 2015 },
  { name: "In Our Honeymoon", artist: "When Chai Met Tally", tracks: 5, year: 2022 },
  { name: "Udd Gaye", artist: "Ritviz", tracks: 1, year: 2017 },
  { name: "Bayaan", artist: "Seedhe Maut", tracks: 12, year: 2018 },
  { name: "Jaago", artist: "Lifafa", tracks: 8, year: 2019 },
];

function AlbumsPageContent() {
  const { theme } = useDiscoveryTheme();
  const isDark = theme === "dark";

  return (
    <div className="p-8 pb-32 max-w-[1440px]">
      <header className={cn(
        "flex flex-col md:flex-row items-end gap-6 mb-12 p-10 rounded-3xl border transition-all duration-300",
        isDark ? "bg-gradient-to-b from-blue-900/20 to-transparent border-white/5" : "bg-gradient-to-b from-blue-50 to-transparent border-black/5"
      )}>
        <div className={cn(
          "w-56 h-56 rounded-lg flex items-center justify-center shadow-2xl border transition-all duration-300 group cursor-pointer relative overflow-hidden",
          isDark ? "bg-[#181818] border-white/10" : "bg-white border-black/5"
        )}>
          <Disc className={cn(
            "w-32 h-32 group-hover:rotate-[30deg] transition-transform duration-700",
            isDark ? "text-white/20" : "text-songdew-blue/10"
          )} />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
            <PlayCircle className="w-16 h-16 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <span className={cn("text-[12px] font-bold uppercase tracking-[0.2em] mb-2 block font-body transition-colors", isDark ? "text-[#b3b3b3]" : "text-songdew-gray")}>Official Releases</span>
          <h1 className={cn("text-8xl font-bold font-heading mb-6 -ml-1 transition-colors", isDark ? "text-white" : "text-songdew-text")}>Albums</h1>
          <div className={cn("flex items-center gap-2 font-body transition-colors", isDark ? "text-white" : "text-songdew-text")}>
            <span className="font-bold">Songdew Artists</span>
            <span className={isDark ? "text-[#b3b3b3]" : "text-songdew-gray"}>•</span>
            <span>{albums.length} verified collections</span>
          </div>
        </div>
      </header>

      <ContentSection title="New & Trending" theme={theme}>
        {albums.map((album, i) => (
          <MediaCard 
            key={i} 
            title={album.name} 
            subtitle={`${album.artist} • ${album.year}`} 
            type="album" 
            theme={theme}
          />
        ))}
      </ContentSection>

      <ContentSection title="Essential Listening" theme={theme}>
        {albums.slice().reverse().map((album, i) => (
          <MediaCard 
            key={i} 
            title={album.name} 
            subtitle={`${album.artist} • ${album.tracks} tracks`} 
            type="album" 
            theme={theme}
          />
        ))}
      </ContentSection>
    </div>
  );
}

export default function AlbumsPage() {
  return <AlbumsPageContent />;
}
