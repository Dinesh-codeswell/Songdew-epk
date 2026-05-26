import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import { useArtist } from '@/context/ArtistContext';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the useArtist hook
vi.mock('@/context/ArtistContext', () => ({
  useArtist: vi.fn(),
}));

describe('Sidebar', () => {
  const mockArtist = {
    name: 'Test Artist',
    contact: {
      email: 'test@example.com',
      phone: '+1 234 567 890',
      website: 'www.testartist.com',
    },
  };

  const mockUpdateArtist = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders contact information correctly', () => {
    (useArtist as any).mockReturnValue({
      artist: mockArtist,
      isEditing: false,
      updateArtist: mockUpdateArtist,
    });

    render(<Sidebar />);

    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('+1 234 567 890')).toBeInTheDocument();
    expect(screen.getByText('www.testartist.com')).toBeInTheDocument();
  });

  it('shows edit contact button only in edit mode', () => {
    // When not in edit mode
    (useArtist as any).mockReturnValue({
      artist: mockArtist,
      isEditing: false,
      updateArtist: mockUpdateArtist,
    });

    const { rerender } = render(<Sidebar />);
    
    let editButton = screen.queryByLabelText(/edit contact info/i);
    expect(editButton).not.toBeInTheDocument();

    // When in edit mode
    (useArtist as any).mockReturnValue({
      artist: mockArtist,
      isEditing: true,
      updateArtist: mockUpdateArtist,
    });

    rerender(<Sidebar />);
    
    editButton = screen.getByLabelText(/edit contact info/i);
    expect(editButton).toBeInTheDocument();
  });

  it('opens contact modal when edit button is clicked', () => {
    (useArtist as any).mockReturnValue({
      artist: mockArtist,
      isEditing: true,
      updateArtist: mockUpdateArtist,
    });

    render(<Sidebar />);

    const editButton = screen.getByLabelText(/edit contact info/i);
    fireEvent.click(editButton);

    expect(screen.getByText('Edit Contact Info')).toBeInTheDocument();
    
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('+1 234 567 890')).toBeInTheDocument();
    expect(screen.getByDisplayValue('www.testartist.com')).toBeInTheDocument();
  });

  it('updates contact info when saved', () => {
    (useArtist as any).mockReturnValue({
      artist: mockArtist,
      isEditing: true,
      updateArtist: mockUpdateArtist,
    });

    render(<Sidebar />);

    const editButton = screen.getByLabelText(/edit contact info/i);
    fireEvent.click(editButton);

    const emailInput = screen.getByDisplayValue('test@example.com');
    fireEvent.change(emailInput, { target: { value: 'new@example.com' } });
    
    const saveButton = screen.getByText('Save Changes');
    fireEvent.click(saveButton);

    expect(mockUpdateArtist).toHaveBeenCalledWith({
      contact: {
        email: 'new@example.com',
        phone: '+1 234 567 890',
        website: 'www.testartist.com',
      }
    });
  });
});
