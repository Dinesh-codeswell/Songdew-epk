# Task 5: Social Media and Artist Bio Editing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enable editing for Social Media handles and the Artist Bio/Story.

**Architecture:** Use `ArtistContext` for state management. Add edit buttons and modals to `HeroHeader` and `ContentSections` (specifically `StorySection`).

**Tech Stack:** React, TypeScript, Tailwind CSS, Lucide React (icons), Framer Motion (animations).

---

### Task 1: Social Media Editing in HeroHeader

**Files:**
- Modify: `src/components/profile/HeroHeader.tsx`
- Test: `src/components/profile/HeroHeader.test.tsx`

- [ ] **Step 1: Write failing test for Social Edit Button visibility**

```typescript
// In src/components/profile/HeroHeader.test.tsx
// Add test to check if edit button for social links appears in edit mode
it('shows edit social links button only in edit mode', () => {
  const { queryByLabelText, rerender } = render(
    <ArtistProvider value={{ ...mockContext, isEditing: false }}>
      <HeroHeader />
    </ArtistProvider>
  );
  expect(queryByLabelText(/edit social links/i)).not.toBeInTheDocument();

  rerender(
    <ArtistProvider value={{ ...mockContext, isEditing: true }}>
      <HeroHeader />
    </ArtistProvider>
  );
  expect(queryByLabelText(/edit social links/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test src/components/profile/HeroHeader.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement Edit Social Links button and Modal**

Modify `HeroHeader.tsx` to:
1. Add `isSocialModalOpen` state.
2. Add a `Pencil` icon button next to social icons, visible only when `isEditing` is true.
3. Implement `EditSocialModal` using the existing `Modal` component.
4. Add inputs for Instagram, YouTube, Twitter, and Music links.
5. Implement `handleSocialSave` to update the `socials` array in `ArtistContext`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test src/components/profile/HeroHeader.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit changes**

```bash
git add src/components/profile/HeroHeader.tsx src/components/profile/HeroHeader.test.tsx
git commit -m "feat: add social links editing to HeroHeader"
```

### Task 2: Artist Bio Editing in ContentSections

**Files:**
- Modify: `src/components/profile/ContentSections.tsx`
- Test: `src/context/ArtistContext.test.tsx` (or create a new test for ContentSections if needed)

- [ ] **Step 1: Write failing test for StorySection editing**

Create `src/components/profile/ContentSections.test.tsx` (if it doesn't exist) or add to an existing test file.
```typescript
it('shows edit bio button in StorySection in edit mode and updates bio', async () => {
  // Test that edit button exists in edit mode
  // Test that clicking it opens modal
  // Test that saving updates the context
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test src/components/profile/ContentSections.test.tsx`
Expected: FAIL

- [ ] **Step 3: Refactor StorySection and implement editing**

Modify `src/components/profile/ContentSections.tsx` to:
1. Import `useArtist`.
2. Update `StorySection` to use `artist` from `useArtist` instead of `ARTIST_DATA`.
3. Add `isBioModalOpen` state and `tempBio` state.
4. Add a `Pencil` icon button in the top-right of the `StorySection` card, visible only when `isEditing` is true.
5. Implement `EditBioModal` with a `textarea`.
6. Implement `handleBioSave` to update `story.excerpt` in `ArtistContext`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test src/components/profile/ContentSections.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit changes**

```bash
git add src/components/profile/ContentSections.tsx
git commit -m "feat: add artist bio editing to StorySection"
```
