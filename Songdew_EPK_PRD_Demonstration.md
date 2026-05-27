# PRD: Songdew Artist EPK (Electronic Press Kit)

**Author:** Gemini CLI PM
**Team:** Product & Engineering

| Product Manager  | Gemini CLI |
| :---- | :---- |
| Engineering Lead | Pilot Engineering |
| Designer | Impeccable Design |
| Approvers/Sign-Off | Songdew Leadership |

PM Epic: [EPK-PILOT-001]
Status of PRD: Draft / Demonstration

# One Pager

## Overview
Songdew is India's leading music distribution and promotion platform, empowering over 70,000 independent artists. The **Songdew Artist EPK** is a premium, artist-first digital identity platform designed to bridge the gap between a creative portfolio (Behance) and a professional music identity (Spotify). It serves as the primary "CV" for musicians, enabling them to showcase their story, music, videos, and achievements to industry stakeholders (labels, festival curators, brand managers) in a high-fidelity, editorial format.

## Problem
Independent artists struggle to maintain a professional, unified digital presence. Current solutions are either too fragmented (Social Media), too generic (Linktrees), or lack the aesthetic polish required to impress industry professionals. Industry stakeholders need a single, credible source of truth to evaluate an artist's "bookability" and career trajectory without sifting through multiple platforms.

## Objectives
1. **Professional Identity**: Provide artists with a "gallery-grade" digital identity that reflects their brand's premium nature.
2. **Efficiency for Stakeholders**: Enable labels and curators to quickly evaluate an artist through structured data (achievements, stats, music, and press).
3. **Direct Booking Flow**: Facilitate business enquiries and asset downloads (riders, press kits) directly through the profile.
4. **Platform Synergy**: Integrate seamlessly with Songdew’s distribution and "Music Business Administration" (MBA) suite.

## Constraints
1. **Mobile First**: Most industry scouting happens on the go; performance and responsiveness are critical.
2. **Data Integrity**: Profiles must be stable even with partial data (e.g., if an artist has no press links yet).
3. **Legacy Migration**: Must accommodate existing Songdew artist data while allowing for new premium metadata fields.

## Persona
| Key Persona | Description |
| :---- | :---- |
| **Independent Artist** | Primary user. Needs to manage their public image, toggle section visibility, and update releases frequently. |
| **Festival Curator / Label A&R** | Secondary user. Needs to see booking info, view count, and "read full story" in under 60 seconds. |
| **Brand Manager** | Tertiary user. Looking for collaboration potential (Social links, "In Press" features). |

## Use Cases

### **Scenario 1: The Pitch**
An artist is pitching for a slot at NH7 Weekender. Instead of a PDF attachment, they send a single Songdew EPK link. The curator opens it on mobile, scrolls through the single-page layout, listens to the top track, and checks the "Live Performances" section to verify stage experience.

### **Scenario 2: Profile Management**
An artist releases a new album. They switch to "Edit Mode," add a new release to the "Music" section, and toggle off the "Gallery" section because they are currently updating their press photos. They see their "Profile Strength" increase to 95%.

### **Scenario 3: Booking/Enquiry**
A brand manager finds an artist's EPK. They scroll to the bottom, find the horizontal "Contact Info" grid, and click "Send Enquiry" to start a collaboration discussion.

# PRD

## Features In

* ### **Dual-Mode Interface (Edit vs. View)**
  * **Description**: A global toggle that switches between a management view (tabs, edit icons, strength indicators) and a portfolio view (clean, single-page scroll).
  * **Goal**: Separate management complexity from public presentation.

* ### **Single-Page Portfolio Layout**
  * **Description**: A vertical, editorial-style layout for the public view.
  * **Order**: Hero (Banner/Avatar) -> Story -> Achievements -> Business Enquiry -> Music -> Gallery -> Quote -> Live Performances -> In Press -> Assets.

* ### **Section Visibility Management**
  * **Description**: Ability for artists to hide specific sections (e.g., "In Press") from the public view without deleting the data.
  * **Importance**: Allows for "work-in-progress" sections while maintaining a professional facade.

* ### **Dynamic Profile Strength**
  * **Description**: A gamified progress bar that incentivizes artists to complete their bio, upload high-res photos, and connect social links.
  * **Use Case**: Improves overall platform content quality.

* ### **Fluid Responsive Design**
  * **Description**: Using `clamp()` and adaptive grids to ensure the EPK looks like a premium digital magazine on 4K monitors and iPhones alike.

## Features Out

* ### **Direct Music Uploads (Internal)**
  * **Reason**: Handled by the core Songdew Distribution engine; the EPK links to existing releases to avoid duplicate storage.
* ### **Social Feed Aggregator**
  * **Reason**: To maintain the "Premium/Editorial" feel, we avoid the cluttered look of live social feeds (Twitter/Instagram embeds), preferring curated social links.

## Design
* **Atmosphere**: Premium, gallery-like feel.
* **Palette**: Songdew Blue (#007BFF), Ink Black (#222222), Canvas BG (#F9F9F9).
* **Typography**: Outfit (Headings), Poppins (Body).
* **Reference**: Behance-meets-Spotify.

## Technical Considerations
* **Framework**: Next.js 16+ (Turbopack) for high-speed performance.
* **Animations**: Framer Motion for staggered entry and spring-based layout transitions.
* **Persistence**: LocalStorage for draft states; Songdew API for live data.

## Success Metrics
1. **Completion Rate**: % of artists reaching 100% Profile Strength.
2. **Booking Conversion**: Number of "Business Enquiry" clicks per 1,000 profile views.
3. **Curator Engagement**: Average time spent on "View Mode" profiles vs. standard profiles.

## GTM Approach
Songdew EPK will be marketed as the "Fast Lane for your Music Career." It will be bundled with **Songdew Pro**, leveraging the 70k+ existing artist base. Launch campaign: "Your EPK is your Passport to the Stage."

## Open Issues
* **Performance with 4K Assets**: Need to implement automatic image optimization for massive "Asset" downloads to ensure page load stays under 2s.

## Q&A

| Asked by | Question | Answer |
| :---- | :---- | :---- |
| Engineering | Should we allow custom CSS? | No, to maintain the "Premium/Editorial" brand consistency, we enforce a strict design system. |
| Product | Can fans comment? | No, the EPK is a professional tool, not a social network. Interaction is focused on "Booking" and "Enquiries." |

## Feature Timeline and Phasing

| Feature | Status | Dates |
| :---- | :---- | :---- |
| Single-Page Layout | Shipped | May 27, 2026 |
| Visibility Toggles | Shipped | May 27, 2026 |
| Contact Bottom Grid | Shipped | May 27, 2026 |
| Mobile Fluid Typography | Shipped | May 27, 2026 |
| Real-time API Sync | Backlog | June 2026 |
