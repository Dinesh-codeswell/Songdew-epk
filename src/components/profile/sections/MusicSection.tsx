"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useArtist } from "@/context/ArtistContext";
import { FileUpload } from "@/components/ui/file-upload";
import { Play, Music, Trash2 } from "lucide-react";
import { EmptyStateCard, InputField } from "./shared";

export function MusicSection() {
  const { artist, isEditing, addSectionItem, removeSectionItem, showToast } = useArtist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ title: "", type: "Single", year: "2024", coverUrl: "", audioUrl: "" });

  const handleAdd = () => {
    if (!newItem.title.trim()) {
      showToast("Title is required", "error");
      return;
    }
    if (!newItem.coverUrl && !newItem.audioUrl) {
      showToast("Please upload at least one file", "error");
      return;
    }
    addSectionItem("releases", newItem);
    setNewItem({ title: "", type: "Single", year: "2024", coverUrl: "", audioUrl: "" });
    setIsModalOpen(false);
    showToast("Release added successfully", "success");
  };

  return (
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
          <div className="p-4">
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
          onClick={() => setIsModalOpen(true)}
        />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Music Release">
        <div className="flex flex-col gap-5">
          <InputField label="Release Title" value={newItem.title} onChange={v => setNewItem({...newItem, title: v})} placeholder="Track or Album Name" />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-heading font-semibold text-songdew-text">Type</label>
              <select 
                value={newItem.type} 
                onChange={e => setNewItem({...newItem, type: e.target.value})}
                className="h-12 px-4 rounded-[12px] border border-black/10 outline-none font-body text-[15px] bg-white"
              >
                <option>Single</option>
                <option>EP</option>
                <option>Album</option>
              </select>
            </div>
            <InputField label="Year" value={newItem.year} onChange={v => setNewItem({...newItem, year: v})} placeholder="2024" />
          </div>

          <FileUpload 
            label="Upload Cover Art" 
            accept="image/*" 
            onFileSelect={url => setNewItem({...newItem, coverUrl: url})} 
            previewUrl={newItem.coverUrl}
          />

          <FileUpload 
            label="Upload Audio File (MP3)" 
            accept="audio/*" 
            onFileSelect={url => setNewItem({...newItem, audioUrl: url})} 
            previewUrl={newItem.audioUrl}
          />

          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Release</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
