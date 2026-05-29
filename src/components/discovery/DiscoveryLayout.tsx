"use client";

import { DiscoverySidebar } from "@/components/discovery/DiscoverySidebar";
import { Player } from "@/components/discovery/Player";
import { Search, Bell, User, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DiscoveryThemeProvider, useDiscoveryTheme } from "@/context/DiscoveryThemeContext";

interface DiscoveryLayoutContentProps {
  children: React.ReactNode;
}

function DiscoveryLayoutContent({ children }: DiscoveryLayoutContentProps) {
  const { theme, toggleTheme } = useDiscoveryTheme();
  const isDark = theme === "dark";

  return (
    <div className={cn(
      "flex h-screen overflow-hidden selection:bg-[#1DB954]/30 transition-colors duration-300",
      isDark ? "bg-black text-white" : "bg-songdew-bg text-songdew-text"
    )}>
      {/* Sidebar */}
      <DiscoverySidebar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Sticky Header */}
        <header className={cn(
          "h-[64px] px-8 flex items-center justify-between sticky top-0 z-40 border-b transition-colors duration-300",
          isDark 
            ? "bg-[#121212]/95 backdrop-blur-md border-white/5" 
            : "bg-white/95 backdrop-blur-md border-black/5"
        )}>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                isDark ? "bg-black/40 text-white/60 hover:text-white" : "bg-black/5 text-songdew-gray hover:text-songdew-text"
              )}>
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                isDark ? "bg-black/40 text-white/60 hover:text-white" : "bg-black/5 text-songdew-gray hover:text-songdew-text"
              )}>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative group ml-2">
              <Search className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors",
                isDark ? "text-[#b3b3b3] group-focus-within:text-white" : "text-songdew-gray group-focus-within:text-songdew-blue"
              )} />
              <input 
                type="text" 
                placeholder="Search artists, tracks..." 
                className={cn(
                  "h-10 w-[300px] lg:w-[400px] rounded-full pl-10 pr-4 text-[14px] font-body border-none outline-none focus:ring-2 transition-all",
                  isDark ? "bg-[#242424] text-white focus:ring-white/20" : "bg-[#F2F6FA] text-songdew-text focus:ring-songdew-blue/20"
                )}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className={cn(
              "text-[14px] font-bold transition-all mr-4 uppercase tracking-wider hover:scale-105",
              isDark ? "text-[#b3b3b3] hover:text-white" : "text-songdew-gray hover:text-songdew-blue"
            )}>
              Explore Pro
            </button>
            <button className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-colors relative",
              isDark ? "bg-black text-[#b3b3b3] hover:text-white" : "bg-black/5 text-songdew-gray hover:text-songdew-text"
            )}>
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-black" />
            </button>
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer border",
              isDark ? "bg-neutral-800 text-white border-white/5 hover:scale-105" : "bg-white text-songdew-text border-black/10 hover:shadow-lg"
            )}>
              <User className="w-5 h-5" />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className={cn(
          "flex-1 overflow-y-auto custom-scrollbar transition-colors duration-300",
          isDark ? "bg-[#121212]" : "bg-songdew-bg"
        )}>
          {children}
        </main>

        {/* Floating Player */}
        <Player theme={theme} />
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          border-radius: 6px;
          border: 4px solid ${isDark ? 'black' : '#F9F9F9'};
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
        }
      `}</style>
    </div>
  );
}

export function DiscoveryLayout({ children }: { children: React.ReactNode }) {
  return (
    <DiscoveryThemeProvider>
      <DiscoveryLayoutContent>
        {children}
      </DiscoveryLayoutContent>
    </DiscoveryThemeProvider>
  );
}
