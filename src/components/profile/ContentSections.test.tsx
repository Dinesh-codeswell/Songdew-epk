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
    hiddenSections: [],
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
      showToast: vi.fn(),
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
      showToast: vi.fn(),
    });

    const { rerender } = render(<ContentSections activeTab="Story" />);
    
    let editButton = screen.queryByLabelText(/edit bio/i);
    expect(editButton).not.toBeInTheDocument();

    // When in edit mode
    (useArtist as any).mockReturnValue({
      artist: mockArtist,
      isEditing: true,
      updateArtist: mockUpdateArtist,
      showToast: vi.fn(),
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
      showToast: vi.fn(),
    });

    render(<ContentSections activeTab="Story" />);

    const editButton = screen.getByLabelText(/edit bio/i);
    fireEvent.click(editButton);

    expect(screen.getByText('Edit Artist Bio')).toBeInTheDocument();
    
    const textarea = screen.getByDisplayValue('This is a test bio.');
    fireEvent.change(textarea, { target: { value: 'This is a new bio that is long enough.' } });
    
    const saveButton = screen.getByText('Save Changes');
    fireEvent.click(saveButton);

    expect(mockUpdateArtist).toHaveBeenCalledWith({
      story: { excerpt: 'This is a new bio that is long enough.' }
    });
  });

  it('applies grayscale and opacity styles when section is hidden in edit mode', () => {
    (useArtist as any).mockReturnValue({
      artist: {
        ...mockArtist,
        hiddenSections: ['Story'],
      },
      isEditing: true,
      updateArtist: mockUpdateArtist,
      showToast: vi.fn(),
    });

    const { container } = render(<ContentSections activeTab="Story" />);
    
    // The wrapper div should have these classes
    const wrapper = container.querySelector('.grayscale.opacity-50');
    expect(wrapper).toBeInTheDocument();
  });

  it('does not apply grayscale and opacity styles when section is visible in edit mode', () => {
    (useArtist as any).mockReturnValue({
      artist: {
        ...mockArtist,
        hiddenSections: [],
      },
      isEditing: true,
      updateArtist: mockUpdateArtist,
      showToast: vi.fn(),
    });

    const { container } = render(<ContentSections activeTab="Story" />);
    
    const wrapper = container.querySelector('.grayscale.opacity-50');
    expect(wrapper).not.toBeInTheDocument();
  });

  it('does not render at all when section is hidden and not in edit mode', () => {
    (useArtist as any).mockReturnValue({
      artist: {
        ...mockArtist,
        hiddenSections: ['Story'],
      },
      isEditing: false,
      updateArtist: mockUpdateArtist,
      showToast: vi.fn(),
    });

    const { container } = render(<ContentSections activeTab="Story" />);
    
    expect(container.firstChild).toBeNull();
  });
});
