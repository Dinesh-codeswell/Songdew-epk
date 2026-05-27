"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useArtist } from "@/context/ArtistContext";
import { StorySection } from "./sections/StorySection";
import { MusicSection } from "./sections/MusicSection";
import { GallerySection } from "./sections/GallerySection";
import { PerformancesSection } from "./sections/PerformancesSection";
import { AchievementsSection } from "./sections/AchievementsSection";
import { PressSection } from "./sections/PressSection";
import { AssetsSection } from "./sections/AssetsSection";
import { QuoteSection } from "./sections/QuoteSection";
import { BusinessEnquiriesSection } from "./sections/BusinessEnquiriesSection";

interface ContentSectionsProps {
  activeTab: string;
}

export function ContentSections({ activeTab }: ContentSectionsProps) {
  const { artist, isEditing } = useArtist();

  if (isEditing) {
    const isHidden = artist.hiddenSections.includes(activeTab);
    return (
      <div className="w-full mt-8 relative min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`w-full ${isHidden && isEditing ? "grayscale opacity-50" : ""}`}
          >
            {activeTab === "Story" && <StorySection />}
            {activeTab === "Music" && <MusicSection />}
            {activeTab === "Gallery" && <GallerySection />}
            {activeTab === "Quote" && <QuoteSection />}
            {activeTab === "Business Enquiries" && <BusinessEnquiriesSection />}
            {activeTab === "Live Performances" && <PerformancesSection />}
            {activeTab === "Achievements" && <AchievementsSection />}
            {activeTab === "In Press" && <PressSection />}
            {activeTab === "Assets" && <AssetsSection />}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // Single Page View (Portfolio Mode)
  const sections = [
    { name: "Story", component: <StorySection /> },
    { name: "Achievements", component: <AchievementsSection /> },
    { name: "Business Enquiries", component: <BusinessEnquiriesSection /> },
    { name: "Music", component: <MusicSection /> },
    { name: "Gallery", component: <GallerySection /> },
    { name: "Quote", component: <QuoteSection /> },
    { name: "Live Performances", component: <PerformancesSection /> },
    { name: "In Press", component: <PressSection /> },
    { name: "Assets", component: <AssetsSection /> },
  ];

  return (
    <div className="w-full mt-8 flex flex-col gap-8">
      {sections.map((section) => {
        if (artist.hiddenSections.includes(section.name)) return null;
        return (
          <motion.div
            key={section.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            {section.component}
          </motion.div>
        );
      })}
    </div>
  );
}
