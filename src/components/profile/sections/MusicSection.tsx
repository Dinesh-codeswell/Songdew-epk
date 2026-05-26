"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useArtist } from "@/context/ArtistContext";
import { FileUpload } from "@/components/ui/file-upload";
import { Play, Music, Trash2, Plus } from "lucide-react";
import { EmptyStateCard, InputField } from "./shared";

export function MusicSection() {
  const { artist, isEditing, addSectionItem, removeSectionItem, showToast } = useArtist();
  
  // State for Music Releases Modal
  const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false);
  const [newRelease, setNewRelease] = useState({ title: "", type: "Single", year: "2024", coverUrl: "", audioUrl: "" });

  // State for Popular Tracks Modal
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [newTrack, setNewTrack] = useState({ title: "", duration: "", streams: "", coverUrl: "" });

  const handleAddRelease = () => {
    if (!newRelease.title.trim()) {
      showToast("Title is required", "error");
      return;
    }
    if (!newRelease.coverUrl && !newRelease.audioUrl) {
      showToast("Please upload at least one file", "error");
      return;
    }
    addSectionItem("releases", newRelease);
    setNewRelease({ title: "", type: "Single", year: "2024", coverUrl: "", audioUrl: "" });
    setIsReleaseModalOpen(false);
    showToast("Release added successfully", "success");
  };

  const handleAddTrack = () => {
    if (!newTrack.title.trim()) {
      showToast("Track title is required", "error");
      return;
    }
    addSectionItem("popularTracks", newTrack);
    setNewTrack({ title: "", duration: "", streams: "", coverUrl: "" });
    setIsTrackModalOpen(false);
    showToast("Track added to popular list", "success");
  };

  return (
    <div className="flex flex-col gap-12">
      
      {/* Popular Tracks Subsection */}
      <section>
        <Card className="p-6 border-none shadow-sm bg-white">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-heading font-bold text-xl text-songdew-text">Popular Tracks</h3>
            {isEditing && (
              <Button size="sm" variant="secondary" onClick={() => setIsTrackModalOpen(true)} className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Track
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {artist.popularTracks.map((track, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-[12px] hover:bg-black/5 transition-colors group cursor-pointer relative">
                <div className="w-6 text-center font-body text-songdew-gray text-sm">{i + 1}</div>
                <div className="w-12 h-12 rounded-[8px] overflow-hidden relative">
                  <img src={track.coverUrl} alt={track.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-body font-medium text-songdew-text">{track.title}</h4>
                  <p className="font-body text-xs text-songdew-gray mt-0.5">{track.streams} Streams</p>
                </div>
                <div className="font-body text-sm text-songdew-gray mr-2">{track.duration}</div>
                {isEditing && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeSectionItem("popularTracks", i); }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            {artist.popularTracks.length === 0 && !isEditing && (
              <div className="py-8 text-center text-songdew-gray font-body italic">No popular tracks listed yet.</div>
            )}
          </div>
        </Card>
      </section>

      {/* Music Releases Subsection */}
      <section>
        <div className="flex justify-between items-center mb-6 px-1">
          <h3 className="font-heading font-bold text-xl text-songdew-text">Discography</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artist.releases.map((release, i) => (
            <Card key={i} hoverLift className="overflow-hidden flex flex-col group cursor-pointer border-none shadow-sm relative">
              {isEditing && (
                <button 
                  onClick={(e) => { e.stopPropagation(); removeSectionItem("releases", i); }}
                  className="absolute top-2 right-2 z-30 p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-50 transition-colors shadow-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <div className="aspect-square w-full overflow-hidden relative">
                <img src={release.coverUrl} alt={release.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center pl-1 shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                    <Play className="w-5 h-5 text-songdew-text" />
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white">
                <h4 className="font-heading font-semibold text-lg text-songdew-text line-clamp-1">{release.title}</h4>
                <p className="font-body text-sm text-songdew-gray mt-1">{release.type} • {release.year}</p>
              </div>
            </Card>
          ))}
          {isEditing && (
            <EmptyStateCard 
              icon={<Music className="w-6 h-6 text-songdew-gray" />} 
              title="Add Music" 
              cta="Upload Release" 
              onClick={() => setIsReleaseModalOpen(true)}
            />
          )}
        </div>
      </section>

      {/* Modals */}
      
      {/* Add Track Modal */}
      <Modal isOpen={isTrackModalOpen} onClose={() => setIsTrackModalOpen(false)} title="Add Popular Track">
        <div className="flex flex-col gap-5">
          <InputField label="Track Title" value={newTrack.title} onChange={v => setNewTrack({...newTrack, title: v})} placeholder="Track Name" />
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Duration" value={newTrack.duration} onChange={v => setNewTrack({...newTrack, duration: v})} placeholder="3:45" />
            <InputField label="Streams" value={newTrack.streams} onChange={v => setNewTrack({...newTrack, streams: v})} placeholder="1.2M" />
          </div>
          <FileUpload 
            label="Upload Cover Image" 
            accept="image/*" 
            onFileSelect={url => setNewTrack({...newTrack, coverUrl: url})} 
            previewUrl={newTrack.coverUrl}
          />
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setIsTrackModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddTrack}>Add Track</Button>
          </div>
        </div>
      </Modal>

      {/* Add Release Modal */}
      <Modal isOpen={isReleaseModalOpen} onClose={() => setIsReleaseModalOpen(false)} title="Add Music Release">
        <div className="flex flex-col gap-5">
          <InputField label="Release Title" value={newRelease.title} onChange={v => setNewRelease({...newRelease, title: v})} placeholder="Track or Album Name" />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-heading font-semibold text-songdew-text">Type</label>
              <select 
                value={newRelease.type} 
                onChange={e => setNewRelease({...newRelease, type: e.target.value})}
                className="h-12 px-4 rounded-[12px] border border-black/10 outline-none font-body text-[15px] bg-white"
              >
                <option>Single</option>
                <option>EP</option>
                <option>Album</option>
              </select>
            </div>
            <InputField label="Year" value={newRelease.year} onChange={v => setNewRelease({...newRelease, year: v})} placeholder="2024" />
          </div>

          <FileUpload 
            label="Upload Cover Art" 
            accept="image/*" 
            onFileSelect={url => setNewRelease({...newRelease, coverUrl: url})} 
            previewUrl={newRelease.coverUrl}
          />

          <FileUpload 
            label="Upload Audio File (MP3)" 
            accept="audio/*" 
            onFileSelect={url => setNewRelease({...newRelease, audioUrl: url})} 
            previewUrl={newRelease.audioUrl}
          />

          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setIsReleaseModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddRelease}>Add Release</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
