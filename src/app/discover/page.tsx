"use client";

import { MediaCard, ContentSection } from "@/components/discovery/MediaCard";
import { motion } from "framer-motion";
import { useDiscoveryTheme } from "@/context/DiscoveryThemeContext";

const mockArtists = [
  { name: "Prateek Kuhad", genre: "Indie Folk • Delhi", type: "artist" },
  { name: "Anuv Jain", genre: "Acoustic Pop • Ludhiana", type: "artist" },
  { name: "Raja Kumari", genre: "Hiphop • California", type: "artist" },
  { name: "When Chai Met Tally", genre: "Indie Rock • Kochi", type: "artist" },
  { name: "The Local Train", genre: "Hindi Rock • Delhi", type: "artist" },
];

const mockAlbums = [
  { name: "Cold/Mess", artist: "Prateek Kuhad", type: "album" },
  { name: "Gul", artist: "Anuv Jain", type: "album" },
  { name: "The Bridge", artist: "Raja Kumari", type: "album" },
  { name: "Aatish", artist: "The Local Train", type: "album" },
  { name: "In Our Honeymoon", artist: "When Chai Met Tally", type: "album" },
];

function DiscoveryPageContent() {
  const { theme } = useDiscoveryTheme();
  const isDark = theme === "dark";

  return (
    <div className="p-8 pb-32 max-w-[1440px]">
      {/* Top Discovery Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-[280px] rounded-2xl overflow-hidden mb-12 group cursor-pointer shadow-2xl"
      >
        <div className={`absolute inset-0 transition-transform duration-700 group-hover:scale-105 ${
          isDark ? 'bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-black' : 'bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-white'
        }`} />
        <div className="relative h-full flex flex-col justify-end p-12">
          <span className={`text-[12px] font-bold uppercase tracking-[0.2em] mb-3 ${isDark ? 'text-white/60' : 'text-songdew-gray'}`}>Featured Identity</span>
          <h1 className={`text-6xl font-bold font-heading tracking-tight mb-6 group-hover:tracking-normal transition-all duration-500 ${isDark ? 'text-white' : 'text-songdew-text'}`}>
            India&apos;s Indie <br/>Revolution<span className={isDark ? 'text-[#1DB954]' : 'text-songdew-blue'}>.</span>
          </h1>
          <p className={`max-w-xl font-body leading-relaxed transition-colors duration-300 ${isDark ? 'text-[#b3b3b3] group-hover:text-white' : 'text-songdew-gray group-hover:text-songdew-text'}`}>
            Discover the artists redefining the sound of the independent circuit. 
            Explore verified EPKs and book talent for your next project.
          </p>
        </div>
      </motion.div>

      {/* Content Sections */}
      <ContentSection title="Trending Artists" theme={theme}>
        {mockArtists.map((artist, i) => (
          <MediaCard 
            key={i} 
            title={artist.name} 
            subtitle={artist.genre} 
            type="artist" 
            theme={theme}
          />
        ))}
      </ContentSection>

      <ContentSection title="New Releases" theme={theme}>
        {mockAlbums.map((album, i) => (
          <MediaCard 
            key={i} 
            title={album.name} 
            subtitle={album.artist} 
            type="album" 
            theme={theme}
          />
        ))}
      </ContentSection>

      <ContentSection title="Curated for Industry Scouts" theme={theme}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <MediaCard 
            key={i} 
            title={`Festival Picks Vol. ${i}`} 
            subtitle="Curated by Songdew Network" 
            type="playlist" 
            theme={theme}
          />
        ))}
      </ContentSection>
    </div>
  );
}

export default function DiscoveryPage() {
  return (
    <DiscoveryLayout>
      <DiscoveryPageContent />
    </DiscoveryLayout>
  );
}
ntent />;
}
