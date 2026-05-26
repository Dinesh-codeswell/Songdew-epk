"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useArtist } from "@/context/ArtistContext";
import { Plus, Trash2, MapPin, Calendar } from "lucide-react";
import { InputField } from "./shared";

export function PerformancesSection() {
  const { artist, isEditing, addSectionItem, removeSectionItem, showToast } = useArtist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ event: "", country: "", venue: "", date: "" });

  const handleAdd = () => {
    if (!newItem.event.trim() || !newItem.country.trim() || !newItem.venue.trim() || !newItem.date.trim()) {
      showToast("Please fill in all required fields", "error");
      return;
    }
    addSectionItem("performances", newItem);
    setNewItem({ event: "", country: "", venue: "", date: "" });
    setIsModalOpen(false);
    showToast("Event added to performances", "success");
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center px-1">
        <h3 className="font-heading font-bold text-xl text-songdew-text">Live Performances</h3>
        {isEditing && (
          <Button size="sm" variant="secondary" onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add event
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {artist.performances.map((perf, i) => (
          <Card key={i} className="p-6 relative group border-none shadow-sm bg-white flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 flex-shrink-0 flex flex-col items-center justify-center bg-[#F2F6FA] rounded-[12px] border border-black/5">
                <span className="font-heading text-xs text-songdew-blue font-bold uppercase">{perf.date.split(" ")[0]}</span>
                <span className="font-heading text-2xl text-songdew-text font-bold">{perf.date.split(" ")[1]?.replace(",", "")}</span>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-heading font-bold text-xl text-songdew-text">{perf.event}</h4>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-songdew-gray font-body text-sm">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-songdew-blue" />
                    <span>{perf.venue}, {perf.country}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-songdew-blue" />
                    <span>{perf.date}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
               <Button variant="secondary" size="sm" className="hidden sm:flex font-bold">Tickets</Button>
               {isEditing && (
                <button 
                  onClick={() => removeSectionItem("performances", i)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Delete Event"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {artist.performances.length === 0 && !isEditing && (
        <div className="py-12 text-center text-songdew-gray font-body italic">
          No upcoming performances listed.
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Live Performance">
        <div className="flex flex-col gap-5">
          <InputField label="Event*" value={newItem.event} onChange={v => setNewItem({...newItem, event: v})} placeholder="Event name" />
          <InputField label="Country*" value={newItem.country} onChange={v => setNewItem({...newItem, country: v})} placeholder="Country name" />
          <InputField label="Venue*" value={newItem.venue} onChange={v => setNewItem({...newItem, venue: v})} placeholder="Venue" />
          <InputField label="Date*" value={newItem.date} onChange={v => setNewItem({...newItem, date: v})} placeholder="Dec 12, 2024" />
          
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add event</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
