"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ARTIST_DATA } from '@/lib/mock-data';

type ArtistData = typeof ARTIST_DATA;

interface ArtistContextType {
  artist: ArtistData;
  isEditing: boolean;
  toggleEditMode: () => void;
  updateArtist: (updates: Partial<ArtistData>) => void;
  updateSectionItem: (section: keyof ArtistData, index: number, item: any) => void;
  addSectionItem: (section: keyof ArtistData, item: any) => void;
  removeSectionItem: (section: keyof ArtistData, index: number) => void;
}

const ArtistContext = createContext<ArtistContextType | undefined>(undefined);

export function ArtistProvider({ children }: { children: ReactNode }) {
  const [artist, setArtist] = useState<ArtistData>(ARTIST_DATA);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditMode = () => setIsEditing(!isEditing);

  const updateArtist = (updates: Partial<ArtistData>) => {
    setArtist(prev => ({ ...prev, ...updates }));
  };

  const updateSectionItem = (section: keyof ArtistData, index: number, item: any) => {
    setArtist(prev => {
      const currentSection = prev[section];
      if (!Array.isArray(currentSection)) return prev;
      const newSection = [...currentSection];
      newSection[index] = item;
      return { ...prev, [section]: newSection };
    });
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
  };

  const removeSectionItem = (section: keyof ArtistData, index: number) => {
    setArtist(prev => {
      const currentSection = prev[section];
      if (!Array.isArray(currentSection)) return prev;
      const newSection = currentSection.filter((_, i) => i !== index);
      return { ...prev, [section]: newSection };
    });
  };

  return (
    <ArtistContext.Provider value={{ 
      artist, 
      isEditing, 
      toggleEditMode, 
      updateArtist, 
      updateSectionItem, 
      addSectionItem,
      removeSectionItem
    }}>
      {children}
    </ArtistContext.Provider>
  );
}

export const useArtist = () => {
  const context = useContext(ArtistContext);
  if (!context) throw new Error('useArtist must be used within an ArtistProvider');
  return context;
};
