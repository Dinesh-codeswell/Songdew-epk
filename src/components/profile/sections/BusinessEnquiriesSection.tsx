"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useArtist } from "@/context/ArtistContext";
import { CheckCircle2, Plus, Trash2, Briefcase } from "lucide-react";
import { InputField } from "./shared";

export function BusinessEnquiriesSection() {
  const { artist, isEditing, addSectionItem, removeSectionItem, showToast } = useArtist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState("");

  const handleAdd = () => {
    if (!newItem.trim()) {
      showToast("Enquiry type cannot be empty", "error");
      return;
    }
    addSectionItem("businessEnquiries" as any, newItem);
    setNewItem("");
    setIsModalOpen(false);
    showToast("Business enquiry type added", "success");
  };

  const enquiries = artist.businessEnquiries || [];

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-8 border-none shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-songdew-blue/10 flex items-center justify-center text-songdew-blue">
                <Briefcase className="w-5 h-5" />
             </div>
             <h3 className="font-heading font-bold text-xl text-songdew-text">Accepted Enquiries</h3>
          </div>
          {isEditing && (
            <Button size="sm" variant="secondary" onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Type
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enquiries.map((type, i) => (
            <div 
              key={i} 
              className="flex items-center justify-between p-4 rounded-[12px] bg-songdew-bg border border-black/5 group hover:border-songdew-blue/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-songdew-blue" />
                <span className="font-body font-medium text-songdew-text text-[15px]">{type}</span>
              </div>
              {isEditing && (
                <button 
                  onClick={() => removeSectionItem("businessEnquiries" as any, i)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          {enquiries.length === 0 && !isEditing && (
            <div className="col-span-full py-8 text-center text-songdew-gray font-body italic">
              No business enquiry types listed yet.
            </div>
          )}
        </div>
      </Card>

      {/* Instructional Card */}
      <Card className="p-6 bg-[#0B1021] text-white border-none">
        <p className="font-body text-sm text-white/70 leading-relaxed">
          Establishing clear enquiry types helps talent managers and labels understand your availability and professional focus. Ensure your contact information in the sidebar is up to date to receive proposals directly.
        </p>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Business Enquiry Type">
        <div className="flex flex-col gap-4">
          <InputField 
            label="Enquiry Type" 
            value={newItem} 
            onChange={setNewItem} 
            placeholder="e.g. Festival Headlining, Private Events" 
          />
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Type</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
