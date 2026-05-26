"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useArtist } from "@/context/ArtistContext";
import { Plus, Trash2 } from "lucide-react";
import { InputField } from "./shared";

export function PerformancesSection() {
  const { artist, isEditing, addSectionItem, removeSectionItem, showToast } = useArtist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", venue: "", city: "", date: "Jan 01, 2025" });

  const handleAdd = () => {
    if (!newItem.name.trim() || !newItem.venue.trim()) {
      showToast("Event name and venue are required", "error");
      return;
    }
    addSectionItem("performances", newItem);
    setNewItem({ name: "", venue: "", city: "", date: "Jan 01, 2025" });
    setIsModalOpen(false);
    showToast("Performance added", "success");
  };

  return (
    <Card className="p-6 border-none shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-heading font-bold text-xl text-songdew-text">Live Performances</h3>
        {isEditing && (
          <Button size="sm" variant="secondary" onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Performance
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-6">
        {artist.performances.map((perf, i) => (
          <div key={i} className="flex items-start gap-4 group relative">
            <div className="w-16 flex-shrink-0 flex flex-col items-center justify-center bg-[#F2F6FA] rounded-[8px] py-2">
              <span className="font-heading text-xs text-songdew-blue font-bold uppercase">{perf.date.split(" ")[0]}</span>
              <span className="font-heading text-xl text-songdew-text font-bold">{perf.date.split(" ")[1]?.replace(",", "")}</span>
            </div>
            <div className="pt-1">
              <h4 className="font-heading font-semibold text-lg text-songdew-text">{perf.name}</h4>
              <p className="font-body text-sm text-songdew-gray mt-1">{perf.venue}, {perf.city}</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="secondary" size="sm" className="hidden sm:flex">Tickets</Button>
              {isEditing && (
                <button 
                  onClick={() => removeSectionItem("performances", i)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
        {artist.performances.length === 0 && !isEditing && (
          <div className="py-8 text-center text-songdew-gray font-body">No upcoming performances.</div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Live Performance">
        <div className="flex flex-col gap-4">
          <InputField label="Event Name" value={newItem.name} onChange={v => setNewItem({...newItem, name: v})} placeholder="Music Festival Name" />
          <InputField label="Venue" value={newItem.venue} onChange={v => setNewItem({...newItem, venue: v})} placeholder="Stadium or Club Name" />
          <div className="grid grid-cols-2 gap-4">
            <InputField label="City" value={newItem.city} onChange={v => setNewItem({...newItem, city: v})} placeholder="Mumbai" />
            <InputField label="Date" value={newItem.date} onChange={v => setNewItem({...newItem, date: v})} placeholder="Dec 12, 2024" />
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Performance</Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
}
