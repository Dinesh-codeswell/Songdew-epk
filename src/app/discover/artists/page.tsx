"use client";

import { motion } from "framer-motion";
import { Users, UserPlus } from "lucide-react";
import { useDiscoveryTheme } from "@/context/DiscoveryThemeContext";
import { cn } from "@/lib/utils";

const artists = [
  { name: "Prateek Kuhad", genre: "Indie Folk", followers: "1.2M", id: 1 },
  { name: "Anuv Jain", genre: "Acoustic Pop", followers: "800K", id: 2 },
  { name: "The Local Train", genre: "Rock", followers: "500K", id: 3 },
  { name: "Raja Kumari", genre: "Hiphop", followers: "1M", id: 4 },
  { name: "When Chai Met Tally", genre: "Indie Rock", followers: "300K", id: 5 },
  { name: "Ritviz", genre: "Electronic", followers: "2M", id: 6 },
  { name: "Seedhe Maut", genre: "Desi Hiphop", followers: "900K", id: 7 },
  { name: "Lifafa", genre: "Experimental", followers: "150K", id: 8 },
];

function ArtistsPageContent() {
  const { theme } = useDiscoveryTheme();
  const isDark = theme === "dark";

  return (
    <div className="p-8 pb-32 max-w-[1440px]">
      <header className="flex flex-col md:flex-row items-end gap-6 mb-12 transition-colors duration-300">
        <div className={cn(
          "w-48 h-48 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300",
          isDark ? "bg-gradient-to-br from-[#1DB954] to-blue-900" : "bg-gradient-to-br from-songdew-blue to-blue-300"
        )}>
          <Users className="w-24 h-24 text-white" />
        </div>
        <div className="flex-1">
          <span className={cn("text-[12px] font-bold uppercase tracking-widest mb-2 block", isDark ? "text-white/60" : "text-songdew-gray")}>Verified Catalog</span>
          <h1 className={cn("text-7xl font-bold font-heading mb-6 transition-colors", isDark ? "text-white" : "text-songdew-text")}>Artists</h1>
          <p className={cn("font-body max-w-2xl transition-colors", isDark ? "text-[#b3b3b3]" : "text-songdew-gray")}>
            Explore the complete roster of verified independent artists on Songdew. From rising stars to established legends.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {artists.map((artist, i) => (
          <motion.div
            key={artist.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "p-5 rounded-2xl transition-all duration-300 group cursor-pointer shadow-lg",
              isDark ? "bg-[#181818] hover:bg-[#282828]" : "bg-white border border-black/5 hover:shadow-xl"
            )}
          >
            <div className={cn(
              "aspect-square rounded-full mb-6 overflow-hidden relative shadow-xl transition-colors duration-300",
              isDark ? "bg-neutral-800" : "bg-songdew-bg"
            )}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform hover:scale-105",
                  isDark ? "bg-[#1DB954] text-black" : "bg-songdew-blue text-white"
                )}>
                  <UserPlus className="w-6 h-6" />
                </div>
              </div>
            </div>
            <h3 className={cn("font-bold text-lg mb-1 font-heading group-hover:underline transition-colors", isDark ? "text-white" : "text-songdew-text")}>{artist.name}</h3>
            <p className={cn("text-sm font-body mb-4 transition-colors", isDark ? "text-[#b3b3b3]" : "text-songdew-gray")}>{artist.genre}</p>
            <div className={cn("flex items-center justify-between pt-4 border-t transition-colors", isDark ? "border-white/5" : "border-black/5")}>
              <span className={cn("text-[11px] font-bold uppercase tracking-tighter transition-colors", isDark ? "text-[#b3b3b3]" : "text-songdew-gray")}>{artist.followers} FOLLOWERS</span>
              <span className={cn("w-2 h-2 rounded-full animate-pulse", isDark ? "bg-[#1DB954]" : "bg-songdew-blue")} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function ArtistsPage() {
  return (
    <DiscoveryLayout>
      <ArtistsPageContent />
    </DiscoveryLayout>
  );
}
ntent />;
}
