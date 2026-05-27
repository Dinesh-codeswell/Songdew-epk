"use client";

import { motion } from "framer-motion";
import { useArtist } from "@/context/ArtistContext";
import { EyeOff } from "lucide-react";

export const TABS = [
  "Story",
  "Achievements",
  "Music",
  "Gallery",
  "Quote",
  "Business Enquiries",
  "Live Performances",
  "In Press",
  "Assets",
];

export function Tabs() {
  const { activeTab, setActiveTab, isEditing, artist } = useArtist();
  const hiddenSections = artist.hiddenSections || [];

  const visibleTabs = isEditing 
    ? TABS 
    : TABS.filter(tab => !hiddenSections.includes(tab));

  return (
    <div className="w-full h-[64px] border-b border-black/5 flex items-center gap-8 overflow-x-auto scrollbar-hide">
      {visibleTabs.map((tab) => {
        const isActive = activeTab === tab;
        const isHidden = hiddenSections.includes(tab);

        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative h-full px-2 font-heading font-medium text-[16px] whitespace-nowrap transition-colors flex items-center gap-2 ${
              isActive ? "text-songdew-blue" : "text-songdew-gray hover:text-songdew-text"
            }`}
          >
            <span>{tab}</span>
            {isEditing && isHidden && (
              <EyeOff 
                size={14} 
                className="text-songdew-gray/60" 
                aria-label="hidden"
              />
            )}
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-songdew-blue"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
