"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useArtist } from "@/context/ArtistContext";
import { FileUpload } from "@/components/ui/file-upload";
import { Plus, Trash2, Download, Image as ImageIcon, FileText } from "lucide-react";
import { InputField } from "./shared";

export function AssetsSection() {
  const { artist, isEditing, addSectionItem, removeSectionItem, showToast } = useArtist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", size: "", type: "image", fileUrl: "" });

  const handleAdd = () => {
    if (!newItem.name.trim() || !newItem.fileUrl) {
      showToast("Asset name and file are required", "error");
      return;
    }
    addSectionItem("assets", newItem);
    setNewItem({ name: "", size: "", type: "image", fileUrl: "" });
    setIsModalOpen(false);
    showToast("Asset added to kit", "success");
  };

  const assets = artist.assets || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {assets.map((asset: any, i: number) => (
        <Card key={i} hoverLift className="p-6 flex items-center gap-4 relative group border-none shadow-sm">
          <div className="w-12 h-12 rounded-[12px] bg-[#F2F6FA] flex items-center justify-center flex-shrink-0">
            {asset.type === "image" ? <ImageIcon className="w-5 h-5 text-songdew-blue" /> : <FileText className="w-5 h-5 text-songdew-blue" />}
          </div>
          <div className="flex-1 overflow-hidden text-left">
            <h4 className="font-heading font-semibold text-[16px] text-songdew-text truncate">{asset.name}</h4>
            <p className="font-body text-[13px] text-songdew-gray mt-0.5">{asset.size}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-songdew-gray hover:text-songdew-blue transition-colors">
              <Download className="w-4 h-4" />
            </button>
            {isEditing && (
              <button 
                onClick={() => removeSectionItem("assets", i)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </Card>
      ))}
      
      {isEditing && (
        <button 
          onClick={() => setIsModalOpen(true)}
          className="p-6 rounded-[16px] border border-dashed border-black/10 flex flex-col items-center justify-center gap-2 hover:bg-black/5 transition-colors min-h-[88px]"
        >
          <Plus className="w-6 h-6 text-songdew-gray" />
          <span className="font-body text-sm text-songdew-gray font-medium">Add Asset</span>
        </button>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Asset">
        <div className="flex flex-col gap-5">
          <InputField label="File Name" value={newItem.name} onChange={v => setNewItem({...newItem, name: v})} placeholder="Press Kit.pdf" />
          <InputField label="File Size" value={newItem.size} onChange={v => setNewItem({...newItem, size: v})} placeholder="2.4 MB" />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-heading font-semibold text-songdew-text">Type</label>
            <select 
              value={newItem.type} 
              onChange={e => setNewItem({...newItem, type: e.target.value})}
              className="h-12 px-4 rounded-[12px] border border-black/10 outline-none font-body text-[15px] bg-white"
            >
              <option value="image">Image / Zip</option>
              <option value="document">Document / PDF</option>
            </select>
          </div>
          <FileUpload 
            label="Upload File" 
            accept="*/*" 
            onFileSelect={url => setNewItem({...newItem, fileUrl: url})} 
            previewUrl={newItem.fileUrl}
          />
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Asset</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
