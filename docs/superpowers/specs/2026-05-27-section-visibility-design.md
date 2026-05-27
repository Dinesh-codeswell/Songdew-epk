# Design Spec: Section Visibility (Hide/Unhide) Feature

## 1. Overview
This feature allows artists to selectively hide or unhide sections of their EPK. Hidden sections are removed from the public profile (View Mode) but remain visible with a distinct "disabled" style in Edit Mode, allowing the artist to manage them.

## 2. Data Model
The `ArtistData` object in `ArtistContext` will be extended to include a new field:
- `hiddenSections: string[]`: An array of section names (e.g., `["Music", "Assets"]`) that are currently hidden.

## 3. State Management (`ArtistContext`)
- **Action**: `toggleSectionVisibility(sectionName: string)`
  - Adds the section to `hiddenSections` if it's not there.
  - Removes it if it is already there.
  - Persists to `localStorage` along with other artist data.

## 4. UI Implementation: Filtering Logic
### 4.1 Navigation (`Tabs.tsx`)
- **View Mode (`isEditing: false`)**: The `TABS` array is filtered: `TABS.filter(tab => !hiddenSections.includes(tab))`.
- **Edit Mode (`isEditing: true`)**: All `TABS` are shown. Tabs that are in `hiddenSections` will display a "Hidden" indicator (e.g., an "eye-off" icon).

### 4.2 Content Area (`ContentSections.tsx`)
- When a section is hidden and the user is in **Edit Mode**:
  - The section container will apply a `grayscale opacity-50` CSS filter/style.
  - A persistent "This section is hidden from public" banner or badge will be visible at the top of the section.

## 5. User Interactions
### 5.1 Section-Level Toggle (Option B)
- In Edit Mode, every section header will include a "Visibility" button next to the "Edit" button.
- Iconography: `Eye` (Visible) / `EyeOff` (Hidden).

### 5.2 Manage Sections Modal (Option C)
- A "Manage Sections" button will be added to the profile interface in Edit Mode (likely near the Tabs or Sidebar).
- This modal displays a list of all available sections with a toggle switch for each.
- Provides a centralized way to audit what is public and what is private.

## 6. Success Criteria
- [ ] Hidden sections are completely absent from the navigation and page when `isEditing` is false.
- [ ] Hidden sections are visible but desaturated/transparent when `isEditing` is true.
- [ ] Toggling visibility in a section header immediately updates the `hiddenSections` state.
- [ ] The Manage Sections modal correctly reflects and updates the visibility state.
- [ ] The state persists after a page reload.
