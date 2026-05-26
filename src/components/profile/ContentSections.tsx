"use client";

import { motion, AnimatePresence } from "framer-motion";
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
  return (
    <div className="w-full mt-8 relative min-h-[400px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="w-full"
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
