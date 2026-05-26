"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useArtist } from "@/context/ArtistContext";
import { FileUpload } from "@/components/ui/file-upload";
import { Play, Plus, Trash2 } from "lucide-react";
import { InputField } from "./shared";

export function PopularTracksSection() {
  const { artist, isEditing, addSectionItem, removeSectionItem, showToast } = useArtist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ title: "", duration: "", streams: "", coverUrl: "" });

  const handleAdd = () => {
    if (!newItem.title.trim()) {
      showToast("Track title is required", "error");
      return;
    }
    addSectionItem("popularTracks", newItem);
    setNewItem({ title: "", duration: "", streams: "", coverUrl: "" });
    setIsModalOpen(false);
    showToast("Track added to popular list", "success");
  };

  return (
    <Card className="p-6 border-none shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-heading font-bold text-xl text-songdew-text">Popular Tracks</h3>
        {isEditing && (
          <Button size="sm" variant="secondary" onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
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
          <div className="py-8 text-center text-songdew-gray font-body">No popular tracks listed.</div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Popular Track">
        <div className="flex flex-col gap-5">
          <InputField label="Track Title" value={newItem.title} onChange={v => setNewItem({...newItem, title: v})} placeholder="Track Name" />
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Duration" value={newItem.duration} onChange={v => setNewItem({...newItem, duration: v})} placeholder="3:45" />
            <InputField label="Streams" value={newItem.streams} onChange={v => setNewItem({...newItem, streams: v})} placeholder="1.2M" />
          </div>
          <FileUpload 
            label="Upload Cover Image" 
            accept="image/*" 
            onFileSelect={url => setNewItem({...newItem, coverUrl: url})} 
            previewUrl={newItem.coverUrl}
          />
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Track</Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
}
