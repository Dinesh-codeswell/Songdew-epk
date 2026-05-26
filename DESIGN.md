# Design System: Songdew EPK

## 1. Visual Theme & Atmosphere
A premium, editorial-style interface with a focus on visual storytelling. It combines the clean structure of Behance with the interactive vibrancy of Spotify. The atmosphere is sophisticated yet creator-friendly, using airy whitespace and high-contrast typography.

## 2. Color Palette & Roles
- **Canvas BG** (#F9F9F9) — Main page background.
- **Pure Surface** (#FFFFFF) — Card and container backgrounds.
- **Songdew Blue** (#007BFF) — Primary action color, active tabs, buttons.
- **Ink Black** (#222222) — Primary headings and body text.
- **Muted Steel** (#6C757D) — Secondary text and metadata.
- **Accent Red** (#F44336) — Sparse alerts or highlights.

## 3. Typography Rules
- **Headlines**: `Outfit` — Bold, tracking-tight, weight-driven hierarchy.
- **Body**: `Poppins` — Professional, readable, relaxed leading.
- **Banned**: Inter, Arial, system-default sans-serifs.

## 4. Component Stylings
- **Cards**: 16px radius, `shadow-neumorphic` (soft dual-shadow). 
- **Buttons**: 8px radius, tactile push feedback (-1px Y on active).
- **Tabs**: 64px height, blue underline for active state.
- **Modals (New)**: Center-aligned, backdrop blur, rounded corners matching cards.

## 5. Layout Principles
- **Grid**: 1440px max-width container, 12-column grid system.
- **Sidebar**: 320px fixed width on desktop, stacks below on mobile.
- **Spacing**: 24px default gutter between modules.

## 6. Motion & Interaction
- **Tab Transitions**: Spring-based layout animations (Framer Motion).
- **Hover States**: 4px vertical lift on interactive cards.
- **Entry**: Staggered fade-in for section content.

## 7. Anti-Patterns (Banned)
- No emojis in professional metadata.
- No oversaturated gradients.
- No sharp 0px corners.
- No generic "AI-style" purple/blue glows.
