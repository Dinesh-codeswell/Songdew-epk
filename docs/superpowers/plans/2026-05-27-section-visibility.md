# Section Visibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a global feature to hide/unhide sections in the EPK, with visual differentiation in Edit Mode and removal in View Mode.

**Architecture:** Extend `ArtistContext` with `hiddenSections` state. Filter `Tabs` based on this state. Apply CSS filters (grayscale, opacity) in `ContentSections` for hidden items in Edit Mode. Implement both inline toggles and a centralized management modal.

**Tech Stack:** React, TypeScript, Tailwind CSS, Lucide React (icons), Framer Motion.

---

### Task 1: Update ArtistContext Data Model

**Files:**
- Modify: `src/context/ArtistContext.tsx`
- Modify: `src/lib/mock-data.ts`

- [ ] **Step 1: Add `hiddenSections` to ArtistData type**
In `src/context/ArtistContext.tsx`, update the `ArtistData` type (if defined explicitly) or ensure it handles the new property.
In `src/lib/mock-data.ts`, add `hiddenSections: []` to `ARTIST_DATA`.

- [ ] **Step 2: Update `ArtistContextType` interface**
Add `toggleSectionVisibility: (sectionName: string) => void;` to the interface.

- [ ] **Step 3: Implement `toggleSectionVisibility`**
In `src/context/ArtistContext.tsx`, implement the logic to add/remove section names from `artist.hiddenSections`.

- [ ] **Step 4: Commit**
```bash
git add src/context/ArtistContext.tsx src/lib/mock-data.ts
git commit -m "feat: add hiddenSections state to ArtistContext"
```

### Task 2: Filter Navigation Tabs

**Files:**
- Modify: `src/components/profile/Tabs.tsx`

- [ ] **Step 1: Filter tabs in View Mode**
In `src/components/profile/Tabs.tsx`, use `hiddenSections` from `useArtist()` to filter the `TABS` array when `isEditing` is false.

- [ ] **Step 2: Add "Hidden" indicators in Edit Mode**
Show an `EyeOff` icon next to tab names that are hidden when `isEditing` is true.

- [ ] **Step 3: Commit**
```bash
git add src/components/profile/Tabs.tsx
git commit -m "feat: filter tabs based on hiddenSections state"
```

### Task 3: Apply Visual Differentiating Styles

**Files:**
- Modify: `src/components/profile/ContentSections.tsx`

- [ ] **Step 1: Wrap sections with visibility styles**
In `src/components/profile/ContentSections.tsx`, check if the `activeTab` is in `hiddenSections`. If so and `isEditing` is true, wrap the content in a div with `grayscale opacity-50 pointer-events-none` (except for toggles).

- [ ] **Step 2: Commit**
```bash
git add src/components/profile/ContentSections.tsx
git commit -m "feat: apply desaturation to hidden sections in edit mode"
```

### Task 4: Create Reusable Section Header with Toggle

**Files:**
- Create: `src/components/profile/SectionHeader.tsx`

- [ ] **Step 1: Implement SectionHeader component**
Create a component that takes `title`, `isEditing`, `isHidden`, `onToggleVisibility`, and `onEdit`.

- [ ] **Step 2: Commit**
```bash
git add src/components/profile/SectionHeader.tsx
git commit -m "feat: add reusable SectionHeader with visibility toggle"
```

### Task 5: Implement Manage Sections Modal

**Files:**
- Create: `src/components/profile/ManageSectionsModal.tsx`
- Modify: `src/components/profile/Sidebar.tsx` (to add trigger)

- [ ] **Step 1: Create ManageSectionsModal**
A modal listing all `TABS` with toggle switches.

- [ ] **Step 2: Add "Manage Sections" button to Sidebar**
Add a button in the Sidebar that only appears in Edit Mode to open the modal.

- [ ] **Step 3: Commit**
```bash
git add src/components/profile/ManageSectionsModal.tsx src/components/profile/Sidebar.tsx
git commit -m "feat: add Manage Sections modal for bulk visibility control"
```

### Task 6: Integrate SectionHeader into Sections

**Files:**
- Modify: `src/components/profile/sections/*.tsx` (StorySection, MusicSection, etc.)

- [ ] **Step 1: Update individual sections to use SectionHeader**
Replace existing hardcoded headers with the new `SectionHeader` component.

- [ ] **Step 2: Commit**
```bash
git add src/components/profile/sections/
git commit -m "feat: integrate SectionHeader across all profile sections"
```
