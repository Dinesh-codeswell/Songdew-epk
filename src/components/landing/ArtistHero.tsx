"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Edit3, BarChart3, Rocket } from "lucide-react";
import Link from "next/link";

export function ArtistHero() {
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
        Your Artist Identity, <br/><span className="text-songdew-blue">Elevated.</span>
      </motion.h1>
      
      <motion.p 
        variants={itemVariants}
        className="text-xl text-songdew-gray max-w-2xl mx-auto mb-12 font-body"
      >
        "Like LinkedIn for Professionals, but built for Music." Create your professional EPK and manage your music workstation with Songdew.
      </motion.p>

      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-16"
      >
        <div className="bg-white border border-black/5 rounded-3xl p-8 hover:shadow-xl hover:shadow-black/5 transition-all duration-300">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-songdew-blue">
            <Edit3 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3 font-heading text-songdew-text">EPK Builder</h3>
          <p className="text-songdew-gray font-body leading-relaxed">
            Build a stunning, industry-ready Electronic Press Kit in minutes with our dual-mode workstation.
          </p>
        </div>

        <div className="bg-white border border-black/5 rounded-3xl p-8 hover:shadow-xl hover:shadow-black/5 transition-all duration-300">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-songdew-blue">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3 font-heading text-songdew-text">Real-time Analytics</h3>
          <p className="text-songdew-gray font-body leading-relaxed">
            Track engagement, view counts, and see exactly which industry power players are scouting you.
          </p>
        </div>

        <div className="bg-white border border-black/5 rounded-3xl p-8 hover:shadow-xl hover:shadow-black/5 transition-all duration-300">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-songdew-blue">
            <Rocket className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3 font-heading text-songdew-text">Promo & Distribution</h3>
          <p className="text-songdew-gray font-body leading-relaxed">
            Take your music to 150+ stores and pitch for Songdew TV and global performance opportunities.
          </p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/dashboard">
          <Button size="lg" className="h-14 px-10 rounded-full text-lg shadow-xl shadow-songdew-blue/20">
            Go to Artist Workstation
          </Button>
        </Link>
        <Button variant="ghost" size="lg" className="h-14 px-10 rounded-full text-lg">
          Watch Demo
        </Button>
      </motion.div>
    </motion.div>
  );
}
