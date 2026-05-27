import React from 'react';
import { render, screen } from '@testing-library/react';
import { Tabs, TABS } from './Tabs';
import { useArtist } from '@/context/ArtistContext';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the useArtist hook
vi.mock('@/context/ArtistContext', () => ({
  useArtist: vi.fn(),
}));

describe('Tabs', () => {
  const mockArtist = {
    hiddenSections: ['Achievements', 'Gallery'],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all tabs when none are hidden and not editing', () => {
    (useArtist as any).mockReturnValue({
      artist: { hiddenSections: [] },
      isEditing: false,
      activeTab: 'Story',
      setActiveTab: vi.fn(),
    });

    render(<Tabs />);

    TABS.forEach(tab => {
      expect(screen.getByText(tab)).toBeInTheDocument();
    });
  });

  it('filters out hidden sections in view mode', () => {
    (useArtist as any).mockReturnValue({
      artist: mockArtist,
      isEditing: false,
      activeTab: 'Story',
      setActiveTab: vi.fn(),
    });

    render(<Tabs />);

    expect(screen.getByText('Story')).toBeInTheDocument();
    expect(screen.queryByText('Achievements')).not.toBeInTheDocument();
    expect(screen.queryByText('Gallery')).not.toBeInTheDocument();
    expect(screen.getByText('Music')).toBeInTheDocument();
  });

  it('shows all tabs in edit mode even if hidden', () => {
    (useArtist as any).mockReturnValue({
      artist: mockArtist,
      isEditing: true,
      activeTab: 'Story',
      setActiveTab: vi.fn(),
    });

    render(<Tabs />);

    TABS.forEach(tab => {
      expect(screen.getByText(tab)).toBeInTheDocument();
    });
  });

  it('shows hidden indicator for hidden tabs in edit mode', () => {
    (useArtist as any).mockReturnValue({
      artist: mockArtist,
      isEditing: true,
      activeTab: 'Story',
      setActiveTab: vi.fn(),
    });

    render(<Tabs />);

    // Check for Achievements and Gallery having the hidden indicator
    // The indicator is an EyeOff icon. We can look for it by its data-testid if we add one, 
    // or just check if the icon component is rendered if we mock it.
    // For now, let's assume we'll use a specific class or aria-label for the icon.
    
    const achievementsTab = screen.getByText('Achievements').closest('button');
    const galleryTab = screen.getByText('Gallery').closest('button');
    const storyTab = screen.getByText('Story').closest('button');

    // We'll add an aria-label "hidden" to the EyeOff icon
    expect(achievementsTab?.querySelector('[aria-label="hidden"]')).toBeInTheDocument();
    expect(galleryTab?.querySelector('[aria-label="hidden"]')).toBeInTheDocument();
    expect(storyTab?.querySelector('[aria-label="hidden"]')).not.toBeInTheDocument();
  });
});
