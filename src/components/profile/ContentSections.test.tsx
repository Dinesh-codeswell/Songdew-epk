import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ContentSections } from './ContentSections';
import { useArtist } from '@/context/ArtistContext';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the useArtist hook
vi.mock('@/context/ArtistContext', () => ({
  useArtist: vi.fn(),
}));

describe('ContentSections - StorySection', () => {
  const mockArtist = {
    name: 'Test Artist',
    story: {
      excerpt: 'This is a test bio.',
    },
  };

  const mockUpdateArtist = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders story content correctly', () => {
    (useArtist as any).mockReturnValue({
      artist: mockArtist,
      isEditing: false,
      updateArtist: mockUpdateArtist,
    });

    render(<ContentSections activeTab="Story" />);

    expect(screen.getByText('About Test Artist')).toBeInTheDocument();
    expect(screen.getByText('This is a test bio.')).toBeInTheDocument();
  });

  it('shows edit bio button only in edit mode', () => {
    // When not in edit mode
    (useArtist as any).mockReturnValue({
      artist: mockArtist,
      isEditing: false,
      updateArtist: mockUpdateArtist,
    });

    const { rerender } = render(<ContentSections activeTab="Story" />);
    
    let editButton = screen.queryByLabelText(/edit bio/i);
    expect(editButton).not.toBeInTheDocument();

    // When in edit mode
    (useArtist as any).mockReturnValue({
      artist: mockArtist,
      isEditing: true,
      updateArtist: mockUpdateArtist,
    });

    rerender(<ContentSections activeTab="Story" />);
    
    editButton = screen.getByLabelText(/edit bio/i);
    expect(editButton).toBeInTheDocument();
  });

  it('updates bio when saved', () => {
    (useArtist as any).mockReturnValue({
      artist: mockArtist,
      isEditing: true,
      updateArtist: mockUpdateArtist,
    });

    render(<ContentSections activeTab="Story" />);

    const editButton = screen.getByLabelText(/edit bio/i);
    fireEvent.click(editButton);

    expect(screen.getByText('Edit Artist Bio')).toBeInTheDocument();
    
    const textarea = screen.getByDisplayValue('This is a test bio.');
    fireEvent.change(textarea, { target: { value: 'This is a new bio.' } });
    
    const saveButton = screen.getByText('Save Changes');
    fireEvent.click(saveButton);

    expect(mockUpdateArtist).toHaveBeenCalledWith({
      story: { excerpt: 'This is a new bio.' }
    });
  });
});
