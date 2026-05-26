"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroHeader } from "@/components/profile/HeroHeader";
import { Sidebar } from "@/components/profile/Sidebar";
import { Tabs, TABS } from "@/components/profile/Tabs";
import { ContentSections } from "@/components/profile/ContentSections";
import { motion } from "framer-motion";

export default function ArtistProfilePage() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col lg:flex-row gap-8"
        >
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            <HeroHeader />
            
            <div className="mt-8">
              <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            <ContentSections activeTab={activeTab} />
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          
          {/* Mobile Sidebar (Shows at the bottom on smaller screens) */}
          <div className="lg:hidden mt-8">
            <Sidebar />
          </div>
        </motion.div>
      </main>
    </>
  );
}
