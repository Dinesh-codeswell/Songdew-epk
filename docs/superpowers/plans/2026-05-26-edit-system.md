# Songdew EPK Edit System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a comprehensive "Global Edit Mode" that allows artists to edit every section of their profile (Banner, Bio, Music, Photos, Videos, etc.) with backend-ready state management.

**Architecture:** 
- **Centralized State**: Use React Context (`ArtistContext`) to manage profile data and the global `isEditing` toggle.
- **Component Overlays**: Conditionally render "Edit" triggers (pencil icons, upload buttons) when `isEditing` is true.
- **Modular Modals**: A unified dialog system for forms, ensuring visual consistency across all editing tasks.
- **Optimistic Updates**: Context actions provide a clean interface for state updates, easily swappable for API calls.

**Tech Stack:** Next.js (App Router), React Context, Tailwind CSS, Framer Motion, Lucide React.

---

### Task 1: Global State Management (ArtistContext)

**Files:**
- Create: `src/context/ArtistContext.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create the ArtistContext and Provider**
Define the types and initial state based on `ARTIST_DATA`.

```tsx
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
}

const ArtistContext = createContext<ArtistContextType | undefined>(undefined);

export function ArtistProvider({ children }: { children: ReactNode }) {
  const [artist, setArtist] = useState<ArtistData>(ARTIST_DATA);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditMode = () => setIsEditing(!isEditing);

  const updateArtist = (updates: Partial<ArtistData>) => {
    setArtist(prev => ({ ...prev, ...updates }));
    // Backend Hook: fetch('/api/profile', { method: 'PATCH', body: JSON.stringify(updates) })
  };

  const updateSectionItem = (section: keyof ArtistData, index: number, item: any) => {
    setArtist(prev => {
      const newSection = [...(prev[section] as any[])];
      newSection[index] = item;
      return { ...prev, [section]: newSection };
    });
  };

  const addSectionItem = (section: keyof ArtistData, item: any) => {
    setArtist(prev => ({
      ...prev,
      [section]: [item, ...(prev[section] as any[])]
    }));
  };

  return (
    <ArtistContext.Provider value={{ artist, isEditing, toggleEditMode, updateArtist, updateSectionItem, addSectionItem }}>
      {children}
    </ArtistContext.Provider>
  );
}

export const useArtist = () => {
  const context = useContext(ArtistContext);
  if (!context) throw new Error('useArtist must be used within an ArtistProvider');
  return context;
};
```

- [ ] **Step 2: Wrap the App with ArtistProvider**
Modify `src/app/layout.tsx` to include the provider.

```tsx
// ... imports
import { ArtistProvider } from "@/context/ArtistContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${poppins.variable}`}>
      <body className="antialiased min-h-[100dvh] flex flex-col bg-songdew-bg">
        <ArtistProvider>
          {children}
        </ArtistProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Commit Task 1**
`git commit -m "feat: add ArtistContext for global state management"`


### Task 2: Edit Mode Toggle in Navbar

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Implement the Toggle**
Add a button to toggle `isEditing`.

```tsx
"use client";
import { useArtist } from "@/context/ArtistContext";
import { Edit3, Eye } from "lucide-react";

// Inside Navbar component:
const { isEditing, toggleEditMode } = useArtist();

// ... find the "Join Free" button and add before it:
<UIButton 
  variant={isEditing ? "default" : "secondary"} 
  onClick={toggleEditMode}
  className="hidden sm:flex items-center gap-2"
>
  {isEditing ? <Eye className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
  {isEditing ? "View Profile" : "Edit Profile"}
</UIButton>
```

- [ ] **Step 2: Commit Task 2**
`git commit -m "feat: add edit mode toggle to navbar"`


### Task 3: Shared Modal and Form Components

**Files:**
- Create: `src/components/ui/modal.tsx`

- [ ] **Step 1: Create a Reusable Modal**
Use Framer Motion for animations.

```tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "./button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[101] pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-[24px] shadow-2xl w-full max-w-lg overflow-hidden pointer-events-auto"
            >
              <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between bg-songdew-bg/50">
                <h3 className="font-heading font-bold text-xl text-songdew-text">{title}</h3>
                <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                  <X className="w-5 h-5 text-songdew-gray" />
                </button>
              </div>
              <div className="p-6 max-h-[80vh] overflow-y-auto">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Commit Task 3**
`git commit -m "feat: add reusable modal component"`


### Task 4: HeroHeader Editing (Banner & Avatar)

**Files:**
- Modify: `src/components/profile/HeroHeader.tsx`

- [ ] **Step 1: Connect to ArtistContext**
Replace `ARTIST_DATA` with `artist` from context.

- [ ] **Step 2: Add Edit Triggers**
Render camera icons/overlays when `isEditing` is true.

```tsx
const { artist, isEditing, updateArtist } = useArtist();
const [isBannerModalOpen, setBannerModalOpen] = useState(false);
const [isAvatarModalOpen, setAvatarModalOpen] = useState(false);

// For Banner overlay:
{isEditing && (
  <button 
    onClick={() => setBannerModalOpen(true)}
    className="absolute inset-0 bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors group z-20"
  >
    <div className="bg-white/90 p-3 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
      <Camera className="w-6 h-6 text-songdew-blue" />
    </div>
  </button>
)}

// Add Modals at bottom of component for editing URLs
```

- [ ] **Step 3: Commit Task 4**
`git commit -m "feat: implement banner and avatar editing"`


### Task 5: Social Media and Bio Editing

**Files:**
- Modify: `src/components/profile/HeroHeader.tsx` (for Socials)
- Modify: `src/components/profile/ContentSections.tsx` (for Story/Bio)

- [ ] **Step 1: Implement Social Handle Modal**
Allow editing of URLs for each platform.

- [ ] **Step 2: Implement Bio/Story Editor**
Add a "Edit Bio" button in the `StorySection` when `isEditing` is true.

- [ ] **Step 3: Commit Task 5**
`git commit -m "feat: implement social handles and bio editing"`


### Task 6: Media Grids Management (Music, Photos, Videos)

**Files:**
- Modify: `src/components/profile/ContentSections.tsx`

- [ ] **Step 1: Implement "Add New" Logic**
When `isEditing` is true, clicking the `EmptyStateCard` or the dashed "Add" cards should open a creation modal.

- [ ] **Step 2: Implement "Delete" actions**
Add a "Trash" icon on top-right of items when `isEditing` is true.

- [ ] **Step 3: Commit Task 6**
`git commit -m "feat: implement music, photo, and video management"`


### Task 7: Sidebar and Contact Editing

**Files:**
- Modify: `src/components/profile/Sidebar.tsx`

- [ ] **Step 1: Implement Contact Info Editor**
Add pencil icon to the Contact card header. Open modal to edit email, phone, and website.

- [ ] **Step 2: Commit Task 7**
`git commit -m "feat: implement contact info editing"`

---

### Verification Strategy
- **Manual QA**: Toggle Edit Mode and verify all pencil/camera icons appear.
- **Data Persistence**: Edit the Bio, save, toggle Edit Mode off, and verify the new bio is displayed correctly.
- **Media Creation**: Add a new track, verify it appears in the grid, then delete it.
- **Responsiveness**: Verify edit triggers are accessible on mobile (stacking behavior).
