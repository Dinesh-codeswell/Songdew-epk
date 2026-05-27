"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useArtist } from "@/context/ArtistContext";
import { SectionHeader } from "../SectionHeader";

export function StorySection() {
  const { artist, isEditing, updateArtist, showToast, toggleSectionVisibility } = useArtist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempBio, setTempBio] = useState(artist.story.excerpt);
  
  const isHidden = artist.hiddenSections.includes("Story");

  const handleSave = () => {
    if (tempBio.length < 20) {
      showToast("Bio must be at least 20 characters", "error");
      return;
    }
    updateArtist({
      story: { ...artist.story, excerpt: tempBio }
    });
    setIsModalOpen(false);
    showToast("Story updated", "success");
  };

  return (
    <Card className="p-8 relative border-none shadow-sm">
      <SectionHeader 
        title={`About ${artist.name}`}
        isEditing={isEditing}
        isHidden={isHidden}
        onToggleVisibility={() => toggleSectionVisibility("Story")}
        onEdit={() => {
          setTempBio(artist.story.excerpt);
          setIsModalOpen(true);
        }}
      />
      <p className="font-body text-[16px] text-songdew-text/80 leading-relaxed max-w-3xl">
        {artist.story.excerpt}
      </p>
      <Button variant="link" className="mt-4 px-0">Read full story</Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Artist Bio"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-heading font-semibold text-songdew-text">Bio Excerpt</label>
            <textarea
              value={tempBio}
              onChange={(e) => setTempBio(e.target.value)}
              className="w-full h-40 p-4 rounded-[12px] border border-black/10 focus:border-songdew-blue focus:ring-1 focus:ring-songdew-blue outline-none font-body text-[15px] resize-none"
              placeholder="Tell your story..."
            />
            <p className="text-xs text-songdew-gray text-right">{tempBio.length} characters</p>
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
}
