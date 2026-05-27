"use client";

import { Navbar } from "@/components/layout/Navbar";
import { HeroHeader } from "@/components/profile/HeroHeader";
import { Sidebar } from "@/components/profile/Sidebar";
import { Tabs } from "@/components/profile/Tabs";
import { ContentSections } from "@/components/profile/ContentSections";
import { motion } from "framer-motion";
import { useArtist } from "@/context/ArtistContext";
import { BackToTop } from "@/components/ui/back-to-top";

export default function ArtistProfilePage() {
  const { activeTab, isEditing } = useArtist();

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`flex ${isEditing ? 'flex-col lg:flex-row gap-8' : 'flex-col gap-12'}`}
        >
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            <HeroHeader />
            
            {isEditing && (
              <div className="mt-8">
                <Tabs />
              </div>
            )}

            <ContentSections activeTab={activeTab} />
          </div>

          {/* Sidebar / Bottom Contact Section */}
          <div className={`${isEditing ? 'hidden lg:block' : 'w-full order-last'}`}>
            <Sidebar />
          </div>
          
          {/* Mobile Sidebar (Only in Edit mode) */}
          {isEditing && (
            <div className="lg:hidden mt-8">
              <Sidebar />
            </div>
          )}
        </motion.div>
      </main>
      <BackToTop />
    </>
  );
}
