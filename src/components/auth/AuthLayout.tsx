"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-body bg-songdew-bg selection:bg-songdew-blue selection:text-white">
      
      {/* Left Pane (Visual/Brand) - 60% */}
      <div className="w-full md:w-[60%] bg-[#0B1021] p-8 md:p-16 flex flex-col justify-between relative overflow-hidden text-white">
        {/* Background decorative element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-songdew-blue/20 rounded-full blur-[120px] -mr-40 -mt-40" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 space-y-12"
        >
          {/* Logo */}
          <Link href="/" className="inline-block">
            <img src="/logo.png" alt="Songdew" className="h-10 object-contain invert brightness-0 invert-0" style={{ filter: 'brightness(0) invert(1)' }} />
          </Link>

          <div className="space-y-6">
            <h1 className="font-heading text-[54px] leading-[1.1] font-bold tracking-tight max-w-[600px]">
              Your artist profile is waiting to be <span className="text-songdew-blue">discovered.</span>
            </h1>
            <p className="font-body text-[18px] leading-relaxed max-w-[480px] text-white/70">
              The premium ecosystem for independent music creators. Build your identity, showcase your craft, and get discovered by the world.
            </p>
          </div>
        </motion.div>

        {/* Feature list */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative z-10 grid grid-cols-2 gap-8 pt-12 border-t border-white/10"
        >
          <div>
            <h4 className="font-heading font-bold text-lg mb-1">Portfolio</h4>
            <p className="text-sm text-white/50">Industry-grade electronic press kits.</p>
          </div>
          <div>
            <h4 className="font-heading font-bold text-lg mb-1">Discovery</h4>
            <p className="text-sm text-white/50">Get noticed by labels and festival curators.</p>
          </div>
        </motion.div>
      </div>

      {/* Right Pane (Interactive) - 40% */}
      <div className="w-full md:w-[40%] bg-white p-8 md:p-16 flex flex-col justify-center relative shadow-[-20px_0_40px_rgba(0,0,0,0.02)]">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-[400px] mx-auto space-y-8"
        >
          <div className="space-y-2 text-center md:text-left">
            <h2 className="font-heading font-bold text-[32px] text-songdew-text leading-tight tracking-tight">
              {title || "Welcome back"}
            </h2>
            <p className="text-songdew-gray font-body text-[16px]">
              {subtitle || "Please enter your details to continue."}
            </p>
          </div>

          {children}
        </motion.div>

        {/* Footer links */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 text-[13px] font-medium text-songdew-gray">
          <Link href="#" className="hover:text-songdew-blue transition-colors">Terms</Link>
          <Link href="#" className="hover:text-songdew-blue transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-songdew-blue transition-colors">Help</Link>
        </div>
      </div>
    </div>
  );
}

export function SongdewButton({ 
  children, 
  variant = "primary", 
  className, 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "social" }) {
  return (
    <button 
      className={cn(
        "w-full flex items-center justify-center gap-3 h-[48px] px-6 rounded-[8px] text-[16px] font-semibold font-body transition-all active:scale-[0.98]",
        variant === "primary" && "bg-songdew-blue text-white hover:bg-blue-600 shadow-sm",
        variant === "secondary" && "bg-white text-songdew-blue border border-[#DDE3EA] hover:bg-songdew-bg",
        variant === "social" && "bg-white text-songdew-text border border-black/10 hover:border-songdew-blue/30 hover:bg-songdew-bg",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function SongdewInput({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-[14px] font-semibold text-songdew-text font-heading">{label}</label>}
      <input 
        className="w-full h-[48px] px-4 bg-songdew-bg border border-black/5 rounded-[8px] text-songdew-text placeholder:text-songdew-gray focus:outline-none focus:border-songdew-blue/50 focus:ring-1 focus:ring-songdew-blue/20 transition-all font-body text-[15px]"
        {...props}
      />
    </div>
  );
}
