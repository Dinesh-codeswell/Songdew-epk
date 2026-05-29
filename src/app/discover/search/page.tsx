"use client";

import { ContentSection, MediaCard } from "@/components/discovery/MediaCard";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDiscoveryTheme } from "@/context/DiscoveryThemeContext";
import { cn } from "@/lib/utils";

function SearchPageContent() {
  const { theme } = useDiscoveryTheme();
  const isDark = theme === "dark";

  return (
    <div className="p-8 pb-32 max-w-[1440px]">
      <header className="mb-12">
        <h1 className={cn("text-4xl font-bold font-heading mb-8 transition-colors duration-300", isDark ? "text-white" : "text-songdew-text")}>
          Search Artists & Playlists
        </h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative group">
            <Search className={cn("absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors", isDark ? "text-[#b3b3b3] group-focus-within:text-white" : "text-songdew-gray group-focus-within:text-songdew-blue")} />
            <input 
              type="text" 
              placeholder="What do you want to listen to?" 
              className={cn(
                "w-full h-14 pl-12 pr-4 rounded-full border-none outline-none font-body transition-all",
                isDark ? "bg-[#242424] text-white focus:ring-2 focus:ring-white/20" : "bg-white text-songdew-text shadow-sm border border-black/5 focus:ring-2 focus:ring-songdew-blue/20"
              )}
              autoFocus
            />
          </div>
          <Button variant="outline" className={cn(
            "h-14 px-8 rounded-full font-semibold transition-all",
            isDark ? "border-white/10 bg-transparent text-white hover:bg-white/5" : "border-black/5 bg-white text-songdew-text hover:bg-gray-50 shadow-sm"
          )}>
            <Filter className="w-4 h-4" />
            Scout Filters
          </Button>
        </div>
      </header>

      <ContentSection title="Browse All" theme={theme}>
        {[
          { name: "Indie Pop", color: "bg-purple-600" },
          { name: "Hindi Rock", color: "bg-red-600" },
          { name: "Hip Hop", color: "bg-orange-600" },
          { name: "Folk", color: "bg-green-600" },
          { name: "Electronic", color: "bg-blue-600" },
          { name: "Classical", color: "bg-yellow-600" },
          { name: "Regional", color: "bg-pink-600" },
          { name: "Podcasts", color: "bg-emerald-600" },
        ].map((genre, i) => (
          <div 
            key={i} 
            className={`${genre.color} aspect-square rounded-2xl p-6 relative overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-300 group shadow-lg`}
          >
            <h3 className="text-2xl font-bold text-white font-heading">{genre.name}</h3>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rotate-[25deg] group-hover:rotate-[30deg] transition-transform duration-500 rounded-lg shadow-2xl" />
          </div>
        ))}
      </ContentSection>
    </div>
  );
}

export default function SearchPage() {
  return <SearchPageContent />;
}
