"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useArtist } from "@/context/ArtistContext";
import { FileUpload } from "@/components/ui/file-upload";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import { InputField } from "./shared";

export function PressSection() {
  const { artist, isEditing, addSectionItem, removeSectionItem, showToast } = useArtist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ 
    title: "", 
    description: "", 
    source: "", 
    date: "", 
    link: "", 
    logoUrl: "" 
  });

  const handleAdd = () => {
    if (!newItem.title.trim() || !newItem.description.trim() || !newItem.source.trim() || !newItem.date.trim()) {
      showToast("Please fill in all required fields", "error");
      return;
    }
    addSectionItem("press", newItem);
    setNewItem({ title: "", description: "", source: "", date: "", link: "", logoUrl: "" });
    setIsModalOpen(false);
    showToast("Press article added", "success");
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center px-1">
        <h3 className="font-heading font-bold text-xl text-songdew-text">In Press</h3>
        {isEditing && (
          <Button size="sm" variant="secondary" onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add article
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {artist.press.map((p, i) => (
          <Card key={i} className="p-6 relative group border-none shadow-sm bg-white flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <span className="text-[12px] font-heading font-bold uppercase tracking-wider text-songdew-blue">{p.source}</span>
                <h4 className="font-heading font-bold text-lg leading-tight text-songdew-text">{p.title}</h4>
                <span className="text-[12px] text-songdew-gray">{p.date}</span>
              </div>
              {p.logoUrl && (
                <img src={p.logoUrl} alt={p.source} className="h-8 w-auto object-contain grayscale opacity-60" />
              )}
            </div>
            
            <p className="font-body text-[14px] text-songdew-gray italic leading-relaxed">
              &ldquo;{p.description}&rdquo;
            </p>

            <div className="mt-auto pt-2 flex items-center justify-between">
              {p.link && (
                <a 
                  href={p.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-songdew-blue font-body text-sm font-semibold flex items-center gap-1.5 hover:underline"
                >
                  Read Full Article <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {isEditing && (
                <button 
                  onClick={() => removeSectionItem("press", i)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {artist.press.length === 0 && !isEditing && (
        <div className="py-12 text-center text-songdew-gray font-body italic">
          No press mentions yet.
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Press Article">
        <div className="flex flex-col gap-5">
          <InputField label="Title*" value={newItem.title} onChange={v => setNewItem({...newItem, title: v})} placeholder="Enter title" />
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-heading font-semibold text-songdew-text">Description*</label>
            <textarea
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="w-full h-24 p-4 rounded-[12px] border border-black/10 focus:border-songdew-blue focus:ring-1 focus:ring-songdew-blue outline-none font-body text-[15px] resize-none"
              placeholder="Quote any part from the article you want to showcase on your profile!"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField label="Source*" value={newItem.source} onChange={v => setNewItem({...newItem, source: v})} placeholder="Enter source" />
            <InputField label="Date*" value={newItem.date} onChange={v => setNewItem({...newItem, date: v})} placeholder="Oct 12, 2023" />
          </div>

          <InputField label="Link" value={newItem.link} onChange={v => setNewItem({...newItem, link: v})} placeholder="Enter link" />
          
          <FileUpload 
            label="Publication Logo (Optional)" 
            accept="image/*" 
            onFileSelect={url => setNewItem({...newItem, logoUrl: url})} 
            previewUrl={newItem.logoUrl}
          />

          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add article</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
