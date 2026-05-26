"use client";

import { motion } from "framer-motion";

export const TABS = [
  "Story",
  "Achievements",
  "Music",
  "Popular Tracks",
  "Video",
  "Photo",
  "Live Performances",
  "In Press",
  "Assets",
];

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Tabs({ activeTab, setActiveTab }: TabsProps) {
  return (
    <div className="w-full h-[64px] border-b border-black/5 flex items-center gap-8 overflow-x-auto scrollbar-hide">
      {TABS.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative h-full px-2 font-heading font-medium text-[16px] whitespace-nowrap transition-colors ${
              isActive ? "text-songdew-blue" : "text-songdew-gray hover:text-songdew-text"
            }`}
          >
            {tab}
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
