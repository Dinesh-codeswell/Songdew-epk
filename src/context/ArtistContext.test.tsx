import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { ArtistProvider, useArtist } from './ArtistContext';
import { ARTIST_DATA } from '@/lib/mock-data';
import { describe, it, expect, beforeEach } from 'vitest';

const TestComponent = () => {
  const { 
    artist, 
    isEditing, 
    toggleEditMode, 
    updateArtist, 
    updateSectionItem, 
    addSectionItem, 
    removeSectionItem,
    toggleSectionVisibility
  } = useArtist();

  return (
    <div>
      <div data-testid="artist-name">{artist.name}</div>
      <div data-testid="is-editing">{isEditing.toString()}</div>
      <div data-testid="hidden-sections">{artist.hiddenSections.join(',')}</div>
      <button onClick={toggleEditMode} data-testid="toggle-edit">Toggle Edit</button>
      <button onClick={() => updateArtist({ name: 'New Name' })} data-testid="update-artist">Update Name</button>
      <button onClick={() => updateSectionItem('popularTracks', 0, { ...artist.popularTracks[0], title: 'New Track Title' })} data-testid="update-section">Update Track</button>
      <button onClick={() => addSectionItem('popularTracks', { title: 'Added Track', duration: '3:00', streams: '0', coverUrl: '' })} data-testid="add-section">Add Track</button>
      <button onClick={() => removeSectionItem('popularTracks', 0)} data-testid="remove-section">Remove Track</button>
      <button onClick={() => toggleSectionVisibility('popularTracks')} data-testid="toggle-visibility">Toggle Visibility</button>
      <div data-testid="track-count">{artist.popularTracks.length}</div>
      <div data-testid="first-track-title">{artist.popularTracks[0]?.title}</div>
    </div>
  );
};

describe('ArtistContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides initial artist data and edit mode state', () => {
    render(
      <ArtistProvider>
        <TestComponent />
      </ArtistProvider>
    );

    expect(screen.getByTestId('artist-name')).toHaveTextContent(ARTIST_DATA.name);
    expect(screen.getByTestId('is-editing')).toHaveTextContent('false');
  });

  it('toggles edit mode', () => {
    render(
      <ArtistProvider>
        <TestComponent />
      </ArtistProvider>
    );

    const toggleBtn = screen.getByTestId('toggle-edit');
    act(() => {
      toggleBtn.click();
    });
    expect(screen.getByTestId('is-editing')).toHaveTextContent('true');
  });

  it('updates artist data', () => {
    render(
      <ArtistProvider>
        <TestComponent />
      </ArtistProvider>
    );

    const updateBtn = screen.getByTestId('update-artist');
    act(() => {
      updateBtn.click();
    });
    expect(screen.getByTestId('artist-name')).toHaveTextContent('New Name');
  });

  it('updates section item', () => {
    render(
      <ArtistProvider>
        <TestComponent />
      </ArtistProvider>
    );

    const updateSectionBtn = screen.getByTestId('update-section');
    act(() => {
      updateSectionBtn.click();
    });
    expect(screen.getByTestId('first-track-title')).toHaveTextContent('New Track Title');
  });

  it('adds section item', () => {
    render(
      <ArtistProvider>
        <TestComponent />
      </ArtistProvider>
    );

    const initialCount = ARTIST_DATA.popularTracks.length;
    const addBtn = screen.getByTestId('add-section');
    act(() => {
      addBtn.click();
    });
    expect(screen.getByTestId('track-count')).toHaveTextContent((initialCount + 1).toString());
    expect(screen.getByTestId('first-track-title')).toHaveTextContent('Added Track');
  });

  it('removes section item', () => {
    render(
      <ArtistProvider>
        <TestComponent />
      </ArtistProvider>
    );

    const initialCount = ARTIST_DATA.popularTracks.length;
    const removeBtn = screen.getByTestId('remove-section');
    act(() => {
      removeBtn.click();
    });
    expect(screen.getByTestId('track-count')).toHaveTextContent((initialCount - 1).toString());
  });

  it('toggles section visibility', () => {
    render(
      <ArtistProvider>
        <TestComponent />
      </ArtistProvider>
    );

    const toggleBtn = screen.getByTestId('toggle-visibility');
    
    // Initial state: empty
    expect(screen.getByTestId('hidden-sections')).toHaveTextContent('');

    // Toggle on
    act(() => {
      toggleBtn.click();
    });
    expect(screen.getByTestId('hidden-sections')).toHaveTextContent('popularTracks');

    // Toggle off
    act(() => {
      toggleBtn.click();
    });
    expect(screen.getByTestId('hidden-sections')).toHaveTextContent('');
  });
});
