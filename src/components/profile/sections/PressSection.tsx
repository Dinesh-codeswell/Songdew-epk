"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useArtist } from "@/context/ArtistContext";
import { FileUpload } from "@/components/ui/file-upload";
import { Plus, Trash2 } from "lucide-react";
import { InputField } from "./shared";

export function PressSection() {
  const { artist, isEditing, addSectionItem, removeSectionItem, showToast } = useArtist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", logoUrl: "" });

  const handleAdd = () => {
    if (!newItem.name.trim() || !newItem.logoUrl) {
      showToast("Publication name and logo are required", "error");
      return;
    }
    addSectionItem("press", newItem);
    setNewItem({ name: "", logoUrl: "" });
    setIsModalOpen(false);
    showToast("Press mention added", "success");
  };

  return (
    <Card className="p-8 relative border-none shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-heading font-bold text-xl text-songdew-text">In Press</h3>
        {isEditing && (
          <Button size="sm" variant="secondary" onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Publication
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-12 items-center justify-center">
        {artist.press.map((p, i) => (
          <div key={i} className="relative group flex items-center justify-center">
            <img src={p.logoUrl} alt={p.name} className="h-8 object-contain opacity-50 hover:opacity-100 transition-opacity grayscale" />
            {isEditing && (
              <button 
                onClick={() => removeSectionItem("press", i)}
                className="absolute -top-4 -right-4 p-1.5 bg-red-500 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}
        {artist.press.length === 0 && !isEditing && (
          <div className="py-4 text-center text-songdew-gray font-body">No press mentions yet.</div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Press Publication">
        <div className="flex flex-col gap-5">
          <InputField label="Publication Name" value={newItem.name} onChange={v => setNewItem({...newItem, name: v})} placeholder="Rolling Stone" />
          <FileUpload 
            label="Upload Publication Logo" 
            accept="image/*" 
            onFileSelect={url => setNewItem({...newItem, logoUrl: url})} 
            previewUrl={newItem.logoUrl}
          />
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Publication</Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
}
