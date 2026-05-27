"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useArtist } from "@/context/ArtistContext";
import { FileUpload } from "@/components/ui/file-upload";
import { Play, Video, Trash2, Plus, Image as ImageIcon } from "lucide-react";
import { EmptyStateCard, InputField } from "./shared";
import { SectionHeader } from "../SectionHeader";

export function GallerySection() {
  const { artist, isEditing, addSectionItem, removeSectionItem, showToast, toggleSectionVisibility } = useArtist();
  
  const isHidden = artist.hiddenSections.includes("Gallery");
  
  // Video State
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [newVideo, setNewVideo] = useState({ title: "", views: "0", duration: "0:00", thumbnailUrl: "", videoUrl: "" });

  // Photo State
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState("");

  const handleAddVideo = () => {
    if (!newVideo.title.trim()) {
      showToast("Video title is required", "error");
      return;
    }
    addSectionItem("videos", newVideo);
    setNewVideo({ title: "", views: "0", duration: "0:00", thumbnailUrl: "", videoUrl: "" });
    setIsVideoModalOpen(false);
    showToast("Video added to gallery", "success");
  };

  const handleAddPhoto = () => {
    if (!newPhotoUrl) {
      showToast("Please upload a photo", "error");
      return;
    }
    addSectionItem("photos", newPhotoUrl);
    setNewPhotoUrl("");
    setIsPhotoModalOpen(false);
    showToast("Photo added to gallery", "success");
  };

  return (
    <div className="flex flex-col gap-12">
      {isEditing && (
        <SectionHeader 
          title="Gallery Management"
          isEditing={isEditing}
          isHidden={isHidden}
          onToggleVisibility={() => toggleSectionVisibility("Gallery")}
          hideEdit={true}
        />
      )}
      
      {/* Videos Subsection */}
      <section>
        <div className="flex justify-between items-center mb-6 px-1">
          <h3 className="font-heading font-bold text-xl text-songdew-text">Videos</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artist.videos.map((video, i) => (
            <Card key={i} hoverLift className="overflow-hidden group cursor-pointer border-none shadow-sm relative bg-white">
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
              onClick={() => setIsVideoModalOpen(true)}
            />
          )}
        </div>
      </section>

      {/* Photos Subsection */}
      <section>
        <div className="flex justify-between items-center mb-6 px-1">
          <h3 className="font-heading font-bold text-xl text-songdew-text">Photos</h3>
        </div>
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
              onClick={() => setIsPhotoModalOpen(true)}
              className="aspect-square rounded-[12px] border border-dashed border-black/10 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-black/5 transition-colors bg-white/50"
            >
              <Plus className="w-6 h-6 text-songdew-gray" />
              <span className="font-body text-sm text-songdew-gray font-medium">Add Photo</span>
            </div>
          )}
        </div>
      </section>

      {/* Modals */}
      
      {/* Add Video Modal */}
      <Modal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} title="Add Video">
        <div className="flex flex-col gap-5">
          <InputField label="Video Title" value={newVideo.title} onChange={v => setNewVideo({...newVideo, title: v})} placeholder="Official Music Video" />
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Views" value={newVideo.views} onChange={v => setNewVideo({...newVideo, views: v})} placeholder="1.2M" />
            <InputField label="Duration" value={newVideo.duration} onChange={v => setNewVideo({...newVideo, duration: v})} placeholder="4:15" />
          </div>
          <FileUpload 
            label="Upload Thumbnail" 
            accept="image/*" 
            onFileSelect={url => setNewVideo({...newVideo, thumbnailUrl: url})} 
            previewUrl={newVideo.thumbnailUrl}
          />
          <FileUpload 
            label="Upload Video File (MP4)" 
            accept="video/*" 
            onFileSelect={url => setNewVideo({...newVideo, videoUrl: url})} 
            previewUrl={newVideo.videoUrl}
          />
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setIsVideoModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddVideo}>Add Video</Button>
          </div>
        </div>
      </Modal>

      {/* Add Photo Modal */}
      <Modal isOpen={isPhotoModalOpen} onClose={() => setIsPhotoModalOpen(false)} title="Add Photo">
        <div className="flex flex-col gap-5">
          <FileUpload 
            label="Upload Photo" 
            accept="image/*" 
            onFileSelect={setNewPhotoUrl} 
            previewUrl={newPhotoUrl}
          />
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setIsPhotoModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddPhoto}>Add Photo</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
