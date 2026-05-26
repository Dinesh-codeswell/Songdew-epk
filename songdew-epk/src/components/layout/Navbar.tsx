"use client";
import { Search, Bell, Menu, Edit3, Eye } from "lucide-react";
import { Button as UIButton } from "@/components/ui/button";
import { useArtist } from "@/context/ArtistContext";
import Link from "next/link";

export function Navbar() {
  const { isEditing, toggleEditMode } = useArtist();

  return (
    <header className="sticky top-0 z-50 w-full h-[72px] bg-white border-b border-black/5 flex items-center justify-between px-6 lg:px-8">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Songdew" className="h-8 object-contain" />
        </Link>
        
        <div className="hidden md:flex items-center bg-[#F2F6FA] h-12 rounded-full px-4 w-[320px]">
          <Search className="w-5 h-5 text-songdew-gray" />
          <input 
            type="text" 
            placeholder="Search artists, tracks..." 
            className="bg-transparent border-none outline-none ml-3 w-full font-body text-[15px] placeholder:text-songdew-gray"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors">
          <Bell className="w-5 h-5 text-songdew-text" />
        </button>
        <div className="hidden md:block w-[1px] h-8 bg-black/10 mx-2" />
        
        <Link href="/signin" className="hidden md:flex">
          <UIButton variant="ghost">Sign In</UIButton>
        </Link>
        
        <UIButton 
          variant={isEditing ? "default" : "secondary"} 
          onClick={toggleEditMode}
          className="hidden sm:flex items-center gap-2"
        >
          {isEditing ? <Eye className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
          {isEditing ? "View Profile" : "Edit Profile"}
        </UIButton>

        <Link href="/signup">
          <UIButton>Join Free</UIButton>
        </Link>
        <button className="md:hidden flex items-center justify-center w-10 h-10">
          <Menu className="w-6 h-6 text-songdew-text" />
        </button>
      </div>
    </header>
  );
}
