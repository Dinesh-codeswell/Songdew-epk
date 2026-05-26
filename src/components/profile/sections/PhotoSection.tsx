"use client";

import React, { useState } from "react";
import { useArtist } from "@/context/ArtistContext";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { Trash2, Plus } from "lucide-react";

export function PhotoSection() {
  const { artist, isEditing, addSectionItem, removeSectionItem, showToast } = useArtist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUrl, setNewUrl] = useState("");

  const handleAdd = () => {
    if (!newUrl) {
      showToast("Please upload a photo", "error");
      return;
    }
    addSectionItem("photos", newUrl);
    setNewUrl("");
    setIsModalOpen(false);
    showToast("Photo added to gallery", "success");
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {artist.photos.map((photo, i) => (
        <div key={i} className="aspect-square rounded-[12px] overflow-hidden group cursor-pointer relative shadow-sm">
          <img src={photo} alt="Gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          {isEditing && (
            <button 
              onClick={(e) => { e.stopPropagation(); removeSectionItem("photos", i); }}
              className="absolute top-2 right-2 z-30 p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-50 transition-colors shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
      {isEditing && (
        <div 
          onClick={() => setIsModalOpen(true)}
          className="aspect-square rounded-[12px] border border-dashed border-black/10 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-black/5 transition-colors"
        >
          <Plus className="w-6 h-6 text-songdew-gray" />
          <span className="font-body text-sm text-songdew-gray font-medium">Add Photo</span>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Photo">
        <div className="flex flex-col gap-5">
          <FileUpload 
            label="Upload Photo" 
            accept="image/*" 
            onFileSelect={setNewUrl} 
            previewUrl={newUrl}
          />
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Photo</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
