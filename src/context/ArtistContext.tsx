"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ARTIST_DATA } from '@/lib/mock-data';

type ArtistData = typeof ARTIST_DATA;

interface ArtistContextType {
  artist: ArtistData;
  isEditing: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  toggleEditMode: () => void;
  updateArtist: (updates: Partial<ArtistData>) => void;
  updateSectionItem: (section: keyof ArtistData, index: number, item: any) => void;
  addSectionItem: (section: keyof ArtistData, item: any) => void;
  removeSectionItem: (section: keyof ArtistData, index: number) => void;
  toggleSectionVisibility: (sectionName: string) => void;
  profileStrength: number;
  toast: { message: string; type: 'success' | 'error' | null };
  showToast: (message: string, type: 'success' | 'error') => void;
}

const STORAGE_KEY = 'songdew_artist_profile';

const ArtistContext = createContext<ArtistContextType | undefined>(undefined);

export function ArtistProvider({ children }: { children: ReactNode }) {
  const [artist, setArtist] = useState<ArtistData>(ARTIST_DATA);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("Story");
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null });

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Ensure hiddenSections exists
        if (!parsed.hiddenSections) {
          parsed.hiddenSections = [];
        }
        setArtist(parsed);
      } catch (e) {
        console.error("Failed to parse saved artist data", e);
      }
    }
  }, []);

  // Save to localStorage on updates
  useEffect(() => {
    if (artist !== ARTIST_DATA) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(artist));
    }
  }, [artist]);

  const toggleEditMode = () => setIsEditing(!isEditing);

  const updateArtist = (updates: Partial<ArtistData>) => {
    setArtist(prev => ({ ...prev, ...updates }));
    showToast("Profile updated successfully", "success");
  };

  const updateSectionItem = (section: keyof ArtistData, index: number, item: any) => {
    setArtist(prev => {
      const currentSection = prev[section];
      if (!Array.isArray(currentSection)) return prev;
      const newSection = [...currentSection];
      newSection[index] = item;
      return { ...prev, [section]: newSection };
    });
    showToast("Item updated", "success");
  };

  const addSectionItem = (section: keyof ArtistData, item: any) => {
    setArtist(prev => {
      const currentSection = prev[section];
      if (!Array.isArray(currentSection)) return prev;
      return {
        ...prev,
        [section]: [item, ...currentSection]
      };
    });
    showToast(`New ${section.toString().replace(/s$/, '')} added`, "success");
  };

  const removeSectionItem = (section: keyof ArtistData, index: number) => {
    setArtist(prev => {
      const currentSection = prev[section];
      if (!Array.isArray(currentSection)) return prev;
      const newSection = currentSection.filter((_, i) => i !== index);
      return { ...prev, [section]: newSection };
    });
    showToast("Item removed", "success");
  };

  const toggleSectionVisibility = (sectionName: string) => {
    let isNowHidden = false;
    setArtist(prev => {
      const hiddenSections = prev.hiddenSections || [];
      const isHidden = hiddenSections.includes(sectionName);
      isNowHidden = !isHidden;
      const newHiddenSections = isHidden
        ? hiddenSections.filter(s => s !== sectionName)
        : [...hiddenSections, sectionName];
      
      return { ...prev, hiddenSections: newHiddenSections };
    });
    showToast(`Section ${isNowHidden ? 'hidden' : 'visible'}`, "success");
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: null }), 3000);
  };

  // Profile Strength Calculation
  const calculateProfileStrength = () => {
    let score = 0;
    if (artist.bannerUrl && !artist.bannerUrl.includes('placeholder')) score += 10;
    if (artist.avatarUrl && !artist.avatarUrl.includes('placeholder')) score += 10;
    if (artist.story.excerpt && artist.story.excerpt.length > 50) score += 20;
    if (artist.releases.length >= 1) score += 15;
    if (artist.videos.length >= 1) score += 15;
    if (artist.photos.length >= 3) score += 15;
    if (artist.socials.length >= 3) score += 15;
    return score;
  };

  return (
    <ArtistContext.Provider value={{ 
      artist, 
      isEditing, 
      activeTab,
      setActiveTab,
      toggleEditMode, 
      updateArtist, 
      updateSectionItem, 
      addSectionItem,
      removeSectionItem,
      toggleSectionVisibility,
      profileStrength: calculateProfileStrength(),
      toast,
      showToast
    }}>
      {children}
      
      {/* Basic Toast UI */}
      {toast.type && (
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-full shadow-2xl font-body font-medium text-white transition-all transform animate-in fade-in slide-in-from-bottom-4 ${
          toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {toast.message}
        </div>
      )}
    </ArtistContext.Provider>
  );
}

export const useArtist = () => {
  const context = useContext(ArtistContext);
  if (!context) throw new Error('useArtist must be used within an ArtistProvider');
  return context;
};
