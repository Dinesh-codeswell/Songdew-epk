# Design Spec: Songdew EPK Edit System

## 1. Overview
The Edit System allows artists to manage their profile data end-to-end. It utilizes a "Global Edit Mode" toggle to switch between viewing and managing states.

## 2. Architecture: Centralized Data Layer
- **`ArtistContext`**: A React Context provider wrapping the application.
- **State**: Initialized from `ARTIST_DATA` (mock-data.ts), but managed in local state for reactive updates.
- **Actions**:
  - `toggleEditMode()`: Switches the global `isEditing` flag.
  - `updateArtist(data)`: Updates specific profile fields.
  - `addItem(section, item)` / `removeItem(section, id)`: Manages array-based data (Music, Photos, etc.).

## 3. UI Interactions (Global Edit Mode)
- **Navbar Toggle**: A "Switch to Edit Mode" button in the Top Navigation.
- **Visual Overlays**:
  - **Banner/Avatar**: A semi-transparent overlay with a camera icon appears.
  - **Text Sections**: A pencil icon button appears in the top-right corner of cards.
  - **Media Grids**: An "Add New" card remains permanently visible or is highlighted with a primary CTA.
- **Modals**:
  - **Design**: Blurred backdrop (`backdrop-blur-md`), centered card, clear "Save" and "Cancel" actions.
  - **Form Fields**: Styled according to `DESIGN.md` (rounded inputs, focused blue rings).

## 4. Section-Specific Implementation
- **Banner**: Image URL input or placeholder upload trigger.
- **Socials**: A list-editor modal allowing users to toggle and update URLs for Instagram, YouTube, etc.
- **Story**: A larger text area modal.
- **Music/Video/Photo**: Modals for adding new items (Title, URL, Cover Image).
- **Sidebar**: Inline editing triggers for Contact and About sections.

## 5. Backend Readiness
- All save actions will go through a central `handleSave` function.
- Currently, this updates the Context state (optimistic UI).
- A commented-out `fetch` block will be provided in the `ArtistProvider` to demonstrate where the real API call should be placed.

## 6. Success Criteria
- [ ] User can toggle Edit Mode on/off.
- [ ] UI elements (icons/buttons) react to the toggle state.
- [ ] Changes made in modals persist in the UI session.
- [ ] All sections (Banner, Socials, Story, Music, Videos, Photos, Achievements, Performances, Contact) have edit triggers.
