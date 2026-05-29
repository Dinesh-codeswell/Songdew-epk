"use client";

import { Home, Search, Library, PlusSquare, Heart, Music2, Users, Mic2, Radio, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const mainNav = [
  { name: "Home", icon: Home, href: "/discover" },
  { name: "Search", icon: Search, href: "/discover/search" },
  { name: "Your Library", icon: Library, href: "/discover/library" },
];

const secondaryNav = [
  { name: "Create Playlist", icon: PlusSquare, href: "/discover/playlists/new" },
  { name: "Liked Songs", icon: Heart, href: "/discover/liked" },
];

const categories = [
  { name: "Artists", icon: Users, href: "/discover/artists" },
  { name: "Albums", icon: Music2, href: "/discover/albums" },
  { name: "Podcasts", icon: Mic2, href: "/discover/podcasts" },
  { name: "Songdew TV", icon: Radio, href: "/discover/tv" },
];

interface DiscoverySidebarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export function DiscoverySidebar({ theme, toggleTheme }: DiscoverySidebarProps) {
  const pathname = usePathname();
  const isDark = theme === "dark";

  return (
    <aside className={cn(
      "w-[240px] h-screen sticky top-0 flex flex-col p-6 overflow-y-auto shrink-0 transition-colors duration-300",
      isDark ? "bg-black text-white" : "bg-white text-songdew-text border-r border-black/5"
    )}>
      <div className="mb-8 flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl tracking-tighter flex items-center">
          SONGDEW<span className={cn(isDark ? "text-[#1DB954]" : "text-songdew-blue")}>.</span>
        </Link>
        <button 
          onClick={toggleTheme}
          className={cn(
            "p-2 rounded-full transition-colors",
            isDark ? "hover:bg-white/10 text-[#b3b3b3]" : "hover:bg-black/5 text-songdew-gray"
          )}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <nav className="space-y-6">
        <div className="space-y-3">
          {mainNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-4 text-[14px] font-bold transition-colors duration-200 py-1",
                pathname === item.href 
                  ? (isDark ? "text-white" : "text-songdew-blue") 
                  : (isDark ? "text-[#b3b3b3] hover:text-white" : "text-songdew-gray hover:text-songdew-text")
              )}
            >
              <item.icon className="w-6 h-6" />
              {item.name}
            </Link>
          ))}
        </div>

        <div className={cn("pt-4 border-t space-y-3", isDark ? "border-white/10" : "border-black/5")}>
          <p className={cn("text-[12px] font-bold uppercase tracking-wider mb-4", isDark ? "text-[#b3b3b3]" : "text-songdew-gray")}>Your Music</p>
          {secondaryNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-4 text-[14px] font-bold transition-colors duration-200 py-1 group",
                isDark ? "text-[#b3b3b3] hover:text-white" : "text-songdew-gray hover:text-songdew-text"
              )}
            >
              <div className={cn(
                "w-6 h-6 rounded-sm flex items-center justify-center transition-colors",
                item.name === "Create Playlist" 
                  ? (isDark ? "bg-white text-black" : "bg-songdew-bg border border-black/5 text-songdew-text") 
                  : "bg-gradient-to-br from-indigo-700 to-blue-300 text-white"
              )}>
                <item.icon className="w-4 h-4" />
              </div>
              {item.name}
            </Link>
          ))}
        </div>

        <div className={cn("pt-4 border-t space-y-3", isDark ? "border-white/10" : "border-black/5")}>
          <p className={cn("text-[12px] font-bold uppercase tracking-wider mb-4", isDark ? "text-[#b3b3b3]" : "text-songdew-gray")}>Browse</p>
          {categories.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-4 text-[14px] font-bold transition-colors duration-200 py-1",
                pathname === item.href 
                  ? (isDark ? "text-white" : "text-songdew-blue") 
                  : (isDark ? "text-[#b3b3b3] hover:text-white" : "text-songdew-gray hover:text-songdew-text")
              )}
            >
              <item.icon className="w-6 h-6" />
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      <div className="mt-auto pt-8">
        <Link href="/dashboard" className={cn("text-[12px] font-bold hover:underline", isDark ? "text-[#b3b3b3]" : "text-songdew-gray")}>
          Switch to Artist Mode
        </Link>
      </div>
    </aside>
  );
}
