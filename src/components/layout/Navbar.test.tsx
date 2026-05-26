import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from './Navbar';
import { ArtistProvider } from '@/context/ArtistContext';
import { describe, it, expect } from 'vitest';

describe('Navbar Edit Toggle', () => {
  it('renders the edit toggle button', () => {
    render(
      <ArtistProvider>
        <Navbar />
      </ArtistProvider>
    );

    // Initial state: View mode, should show "Edit Profile"
    expect(screen.getByText(/Edit Profile/i)).toBeDefined();
  });

  it('toggles to view profile when clicked', () => {
    render(
      <ArtistProvider>
        <Navbar />
      </ArtistProvider>
    );

    const toggleBtn = screen.getByText(/Edit Profile/i);
    fireEvent.click(toggleBtn);

    // After click: Edit mode, should show "View Profile"
    expect(screen.getByText(/View Profile/i)).toBeDefined();
  });
});
