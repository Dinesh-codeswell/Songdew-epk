import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { HeroHeader } from './HeroHeader';
import { useArtist } from '@/context/ArtistContext';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the useArtist hook
vi.mock('@/context/ArtistContext', () => ({
  useArtist: vi.fn(),
}));

describe('HeroHeader', () => {
  const mockArtist = {
    name: 'Test Artist',
    type: 'Solo Artist',
    location: 'Test City',
    verified: true,
    avatarUrl: 'https://test.com/avatar.jpg',
    bannerUrl: 'https://test.com/banner.jpg',
    socials: [
      { platform: 'Instagram', url: 'https://instagram.com/test' },
      { platform: 'YouTube', url: 'https://youtube.com/test' },
      { platform: 'X', url: 'https://twitter.com/test' },
      { platform: 'Spotify', url: 'https://spotify.com/test' },
    ],
  };

  const mockUpdateArtist = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders artist information correctly', () => {
    (useArtist as any).mockReturnValue({
      artist: mockArtist,
      isEditing: false,
      updateArtist: mockUpdateArtist,
    });

    render(<HeroHeader />);

    expect(screen.getByText('Test Artist')).toBeInTheDocument();
    expect(screen.getByText('Solo Artist')).toBeInTheDocument();
    expect(screen.getByText('Test City')).toBeInTheDocument();
    
    const bannerImg = screen.getByAltText('Artist Banner');
    expect(bannerImg).toHaveAttribute('src', 'https://test.com/banner.jpg');
    
    const avatarImg = screen.getByAltText('Test Artist');
    expect(avatarImg).toHaveAttribute('src', 'https://test.com/avatar.jpg');
  });

  it('does not show camera overlays when not in edit mode', () => {
    (useArtist as any).mockReturnValue({
      artist: mockArtist,
      isEditing: false,
      updateArtist: mockUpdateArtist,
    });

    render(<HeroHeader />);

    const cameraIcons = screen.queryAllByRole('button').filter(button => 
      button.querySelector('svg.lucide-camera')
    );
    expect(cameraIcons.length).toBe(0);
  });

  it('shows camera overlays when in edit mode', () => {
    (useArtist as any).mockReturnValue({
      artist: mockArtist,
      isEditing: true,
      updateArtist: mockUpdateArtist,
    });

    render(<HeroHeader />);

    // In HeroHeader, we added two buttons with Camera icons
    const cameraButtons = screen.getAllByRole('button').filter(button => 
      button.querySelector('svg.lucide-camera')
    );
    expect(cameraButtons.length).toBe(2);
  });

  it('opens banner modal when banner camera is clicked', () => {
    (useArtist as any).mockReturnValue({
      artist: mockArtist,
      isEditing: true,
      updateArtist: mockUpdateArtist,
    });

    render(<HeroHeader />);

    const cameraButtons = screen.getAllByRole('button').filter(button => 
      button.querySelector('svg.lucide-camera')
    );
    
    // First one is banner, second is avatar based on DOM order
    fireEvent.click(cameraButtons[0]);

    expect(screen.getByText('Edit Banner Image')).toBeInTheDocument();
    const input = screen.getByDisplayValue('https://test.com/banner.jpg');
    expect(input).toBeInTheDocument();
  });

  it('updates banner URL when saved', () => {
    (useArtist as any).mockReturnValue({
      artist: mockArtist,
      isEditing: true,
      updateArtist: mockUpdateArtist,
    });

    render(<HeroHeader />);

    const cameraButtons = screen.getAllByRole('button').filter(button => 
      button.querySelector('svg.lucide-camera')
    );
    
    fireEvent.click(cameraButtons[0]);

    const input = screen.getByDisplayValue('https://test.com/banner.jpg');
    fireEvent.change(input, { target: { value: 'https://new-test.com/banner.jpg' } });
    
    const saveButton = screen.getByText('Save Changes');
    fireEvent.click(saveButton);

    expect(mockUpdateArtist).toHaveBeenCalledWith({ bannerUrl: 'https://new-test.com/banner.jpg' });
  });

  it('opens avatar modal when avatar camera is clicked', () => {
    (useArtist as any).mockReturnValue({
      artist: mockArtist,
      isEditing: true,
      updateArtist: mockUpdateArtist,
    });

    render(<HeroHeader />);

    const cameraButtons = screen.getAllByRole('button').filter(button => 
      button.querySelector('svg.lucide-camera')
    );
    
    // Second one is avatar
    fireEvent.click(cameraButtons[1]);

    expect(screen.getByText('Edit Profile Image')).toBeInTheDocument();
    const input = screen.getByDisplayValue('https://test.com/avatar.jpg');
    expect(input).toBeInTheDocument();
  });

  it('updates avatar URL when saved', () => {
    (useArtist as any).mockReturnValue({
      artist: mockArtist,
      isEditing: true,
      updateArtist: mockUpdateArtist,
    });

    render(<HeroHeader />);

    const cameraButtons = screen.getAllByRole('button').filter(button => 
      button.querySelector('svg.lucide-camera')
    );
    
    fireEvent.click(cameraButtons[1]);

    const input = screen.getByDisplayValue('https://test.com/avatar.jpg');
    fireEvent.change(input, { target: { value: 'https://new-test.com/avatar.jpg' } });
    
    const saveButton = screen.getByText('Save Changes');
    fireEvent.click(saveButton);

    expect(mockUpdateArtist).toHaveBeenCalledWith({ avatarUrl: 'https://new-test.com/avatar.jpg' });
  });

  it('shows edit social links button only in edit mode', () => {
    // When not in edit mode
    (useArtist as any).mockReturnValue({
      artist: mockArtist,
      isEditing: false,
      updateArtist: mockUpdateArtist,
    });

    const { rerender } = render(<HeroHeader />);
    
    let editSocialButton = screen.queryByLabelText(/edit social links/i);
    expect(editSocialButton).not.toBeInTheDocument();

    // When in edit mode
    (useArtist as any).mockReturnValue({
      artist: mockArtist,
      isEditing: true,
      updateArtist: mockUpdateArtist,
    });

    rerender(<HeroHeader />);
    
    editSocialButton = screen.getByLabelText(/edit social links/i);
    expect(editSocialButton).toBeInTheDocument();
  });

  it('updates social links when saved', () => {
    (useArtist as any).mockReturnValue({
      artist: mockArtist,
      isEditing: true,
      updateArtist: mockUpdateArtist,
    });

    render(<HeroHeader />);

    const editSocialButton = screen.getByLabelText(/edit social links/i);
    fireEvent.click(editSocialButton);

    expect(screen.getByText('Edit Social Links')).toBeInTheDocument();
    
    const instagramInput = screen.getByDisplayValue('https://instagram.com/test');
    fireEvent.change(instagramInput, { target: { value: 'https://instagram.com/new-test' } });
    
    const saveButton = screen.getByText('Save Changes');
    fireEvent.click(saveButton);

    expect(mockUpdateArtist).toHaveBeenCalledWith({
      socials: expect.arrayContaining([
        expect.objectContaining({ platform: 'Instagram', url: 'https://instagram.com/new-test' })
      ])
    });
  });
});
