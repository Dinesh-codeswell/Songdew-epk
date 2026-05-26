"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useArtist } from "@/context/ArtistContext";
import { FileUpload } from "@/components/ui/file-upload";
import { Play, Video, Trash2 } from "lucide-react";
import { EmptyStateCard, InputField } from "./shared";

export function VideoSection() {
  const { artist, isEditing, addSectionItem, removeSectionItem, showToast } = useArtist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ title: "", views: "0", duration: "0:00", thumbnailUrl: "", videoUrl: "" });

  const handleAdd = () => {
    if (!newItem.title.trim()) {
      showToast("Video title is required", "error");
      return;
    }
    if (!newItem.thumbnailUrl && !newItem.videoUrl) {
      showToast("Please upload a thumbnail or video", "error");
      return;
    }
    addSectionItem("videos", newItem);
    setNewItem({ title: "", views: "0", duration: "0:00", thumbnailUrl: "", videoUrl: "" });
    setIsModalOpen(false);
    showToast("Video added", "success");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {artist.videos.map((video, i) => (
        <Card key={i} hoverLift className="overflow-hidden group cursor-pointer border-none shadow-sm relative">
          {isEditing && (
            <button 
              onClick={(e) => { e.stopPropagation(); removeSectionItem("videos", i); }}
              className="absolute top-2 right-2 z-30 p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-50 transition-colors shadow-sm"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <div className="aspect-video w-full overflow-hidden relative">
            <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center pl-1 shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                <Play className="w-5 h-5 text-songdew-text" />
              </div>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-body px-2 py-1 rounded-[4px] backdrop-blur-md">
              {video.duration}
            </div>
          </div>
          <div className="p-4">
            <h4 className="font-heading font-semibold text-songdew-text line-clamp-2">{video.title}</h4>
            <p className="font-body text-sm text-songdew-gray mt-1">{video.views} Views</p>
          </div>
        </Card>
      ))}
      {isEditing && (
        <EmptyStateCard 
          icon={<Video className="w-6 h-6 text-songdew-gray" />} 
          title="Add Video" 
          cta="Upload Video" 
          onClick={() => setIsModalOpen(true)}
        />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Video">
        <div className="flex flex-col gap-5">
          <InputField label="Video Title" value={newItem.title} onChange={v => setNewItem({...newItem, title: v})} placeholder="Official Music Video" />
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Views" value={newItem.views} onChange={v => setNewItem({...newItem, views: v})} placeholder="1.2M" />
            <InputField label="Duration" value={newItem.duration} onChange={v => setNewItem({...newItem, duration: v})} placeholder="4:15" />
          </div>
          <FileUpload 
            label="Upload Thumbnail" 
            accept="image/*" 
            onFileSelect={url => setNewItem({...newItem, thumbnailUrl: url})} 
            previewUrl={newItem.thumbnailUrl}
          />
          <FileUpload 
            label="Upload Video File (MP4)" 
            accept="video/*" 
            onFileSelect={url => setNewItem({...newItem, videoUrl: url})} 
            previewUrl={newItem.videoUrl}
          />
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Video</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
