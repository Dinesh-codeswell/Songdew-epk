"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Music, Search, CalendarCheck } from "lucide-react";
import Link from "next/link";

export function DiscoveryHero() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.4 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="text-center"
    >
      <motion.h1 
        variants={itemVariants}
        className="text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-[1.1] font-heading text-songdew-text"
      >
        Discover. Listen. <br/><span className="text-[#1DB954]">Book.</span>
      </motion.h1>
      
      <motion.p 
        variants={itemVariants}
        className="text-xl text-songdew-gray max-w-2xl mx-auto mb-12 font-body"
      >
        "Like Spotify for Listening, but with Industry-grade Discovery." Find India's top independent talent and access verified press kits.
      </motion.p>

      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-16"
      >
        <div className="bg-white border border-black/5 rounded-3xl p-8 hover:shadow-xl hover:shadow-black/5 transition-all duration-300">
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-6 text-[#1DB954]">
            <Music className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3 font-heading text-songdew-text">Discovery Feed</h3>
          <p className="text-songdew-gray font-body leading-relaxed">
            A fluid, music-first experience to discover trending artists, new releases, and curated playlists.
          </p>
        </div>

        <div className="bg-white border border-black/5 rounded-3xl p-8 hover:shadow-xl hover:shadow-black/5 transition-all duration-300">
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-6 text-[#1DB954]">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3 font-heading text-songdew-text">Industry-Grade Search</h3>
          <p className="text-songdew-gray font-body leading-relaxed">
            Filter talent by genre, stage experience, press mentions, and verified industry achievements.
          </p>
        </div>

        <div className="bg-white border border-black/5 rounded-3xl p-8 hover:shadow-xl hover:shadow-black/5 transition-all duration-300">
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-6 text-[#1DB954]">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3 font-heading text-songdew-text">Direct Booking</h3>
          <p className="text-songdew-gray font-body leading-relaxed">
            Send business enquiries and download high-res press kit assets with a single click.
          </p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/discover">
          <Button size="lg" className="h-14 px-12 rounded-full text-lg bg-[#1DB954] hover:bg-[#1ab04c] border-none shadow-xl shadow-[#1DB954]/20">
            Enter Discovery Feed
          </Button>
        </Link>
        <Button variant="ghost" size="lg" className="h-14 px-10 rounded-full text-lg">
          Industry Solutions
        </Button>
      </motion.div>
    </motion.div>
  );
}
