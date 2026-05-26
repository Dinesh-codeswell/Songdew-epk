"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useArtist } from "@/context/ArtistContext";
import { Trophy, Disc, Activity, Plus, Trash2 } from "lucide-react";
import { InputField } from "./shared";

export function AchievementsSection() {
  const { artist, isEditing, addSectionItem, removeSectionItem, showToast } = useArtist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ title: "", organization: "", icon: "trophy" });

  const handleAdd = () => {
    if (!newItem.title.trim() || !newItem.organization.trim()) {
      showToast("Title and organization are required", "error");
      return;
    }
    addSectionItem("achievements", newItem);
    setNewItem({ title: "", organization: "", icon: "trophy" });
    setIsModalOpen(false);
    showToast("Achievement added", "success");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {artist.achievements.map((ach, i) => (
        <Card key={i} hoverLift className="p-6 flex items-start gap-4 relative group border-none shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#F2F6FA] flex items-center justify-center flex-shrink-0">
            {ach.icon === "trophy" && <Trophy className="w-5 h-5 text-songdew-blue" />}
            {ach.icon === "disc" && <Disc className="w-5 h-5 text-songdew-blue" />}
            {ach.icon === "activity" && <Activity className="w-5 h-5 text-songdew-blue" />}
          </div>
          <div className="pr-6 text-left">
            <h4 className="font-heading font-semibold text-[18px] text-songdew-text leading-tight">{ach.title}</h4>
            <p className="font-body text-[14px] text-songdew-gray mt-1">{ach.organization}</p>
          </div>
          {isEditing && (
            <button 
              onClick={() => removeSectionItem("achievements", i)}
              className="absolute top-2 right-2 p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </Card>
      ))}
      {isEditing && (
        <button 
          onClick={() => setIsModalOpen(true)}
          className="p-6 rounded-[16px] border border-dashed border-black/10 flex flex-col items-center justify-center gap-2 hover:bg-black/5 transition-colors min-h-[100px]"
        >
          <Plus className="w-6 h-6 text-songdew-gray" />
          <span className="font-body text-sm text-songdew-gray font-medium">Add Achievement</span>
        </button>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Achievement">
        <div className="flex flex-col gap-4">
          <InputField label="Achievement Title" value={newItem.title} onChange={v => setNewItem({...newItem, title: v})} placeholder="Best Pop Artist" />
          <InputField label="Organization" value={newItem.organization} onChange={v => setNewItem({...newItem, organization: v})} placeholder="GIMA Awards" />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-heading font-semibold text-songdew-text">Icon</label>
            <select 
              value={newItem.icon} 
              onChange={e => setNewItem({...newItem, icon: e.target.value})}
              className="h-12 px-4 rounded-[12px] border border-black/10 outline-none font-body text-[15px] bg-white"
            >
              <option value="trophy">Trophy</option>
              <option value="disc">Vinyl/Disc</option>
              <option value="activity">Waveform/Activity</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Achievement</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
