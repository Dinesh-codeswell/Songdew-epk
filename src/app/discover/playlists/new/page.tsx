"use client";

import { Music2, Plus, Search, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDiscoveryTheme } from "@/context/DiscoveryThemeContext";
import { cn } from "@/lib/utils";

function CreatePlaylistPageContent() {
  const { theme } = useDiscoveryTheme();
  const isDark = theme === "dark";

  return (
    <div className="p-8 pb-32 max-w-[1440px]">
      {/* Empty Playlist Header */}
      <header className={cn(
        "flex flex-col md:flex-row items-end gap-8 mb-12 -mx-8 -mt-8 p-12 pt-20 transition-all duration-500",
        isDark ? "bg-gradient-to-b from-neutral-800 to-transparent" : "bg-gradient-to-b from-gray-200 to-transparent"
      )}>
        <div className={cn(
          "w-60 h-64 rounded-xl flex flex-col items-center justify-center shadow-2xl group cursor-pointer relative overflow-hidden transition-colors duration-300",
          isDark ? "bg-[#282828]" : "bg-white border border-black/5"
        )}>
          <Music2 className={cn("w-24 h-24 transition-colors", isDark ? "text-[#b3b3b3]" : "text-songdew-gray")} />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <Plus className="w-12 h-12 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <span className={cn("text-[12px] font-bold uppercase tracking-widest mb-4 block transition-colors", isDark ? "text-white" : "text-songdew-gray")}>Playlist</span>
          <h1 className={cn("text-8xl font-bold font-heading mb-8 -ml-1 cursor-pointer hover:underline transition-colors", isDark ? "text-white decoration-white/20" : "text-songdew-text decoration-black/20")}>My Playlist #1</h1>
          <div className={cn("flex items-center gap-2 font-body text-sm transition-colors", isDark ? "text-white" : "text-songdew-text")}>
            <span className="font-bold">User Name</span>
          </div>
        </div>
      </header>

      {/* Action Bar */}
      <div className="flex items-center gap-8 mb-12 px-4">
        <MoreHorizontal className={cn("w-8 h-8 cursor-pointer transition-colors", isDark ? "text-[#b3b3b3] hover:text-white" : "text-songdew-gray hover:text-songdew-text")} />
      </div>

      {/* Find Songs Section */}
      <section className="px-4">
        <div className={cn("border-t pt-12 transition-colors", isDark ? "border-white/10" : "border-black/5")}>
          <h2 className={cn("text-2xl font-bold font-heading mb-6 transition-colors", isDark ? "text-white" : "text-songdew-text")}>Let&apos;s find something for your playlist</h2>
          <div className="relative max-w-xl mb-12 group">
            <Search className={cn("absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors", isDark ? "text-[#b3b3b3] group-focus-within:text-white" : "text-songdew-gray group-focus-within:text-songdew-blue")} />
            <input 
              type="text" 
              placeholder="Search for songs or episodes" 
              className={cn(
                "w-full h-12 pl-12 pr-4 rounded border-none outline-none font-body transition-all text-sm",
                isDark ? "bg-[#242424] text-white focus:ring-1 focus:ring-white/20" : "bg-white text-songdew-text border border-black/5 shadow-sm focus:ring-1 focus:ring-songdew-blue/20"
              )}
            />
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 group">
                <div className="flex items-center gap-4">
                  <div className={cn("w-10 h-10 rounded transition-colors", isDark ? "bg-neutral-800" : "bg-gray-100")} />
                  <div>
                    <div className={cn("font-bold text-sm transition-colors", isDark ? "text-white" : "text-songdew-text")}>Recommended Song {i}</div>
                    <div className={cn("text-xs transition-colors", isDark ? "text-[#b3b3b3]" : "text-songdew-gray")}>Recommended Artist</div>
                  </div>
                </div>
                <Button variant="outline" className={cn(
                  "rounded-full text-xs font-bold transition-all h-8 px-6",
                  isDark ? "border-white/20 text-white hover:bg-white/10 hover:border-white" : "border-black/10 text-songdew-text hover:bg-gray-50"
                )}>
                  Add
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function CreatePlaylistPage() {
  return <CreatePlaylistPageContent />;
}
