"use client";

import React, { useRef, useState } from "react";
import { Upload, X, FileIcon, Music, Video, Image as ImageIcon } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (url: string) => void;
  accept: "image/*" | "audio/*" | "video/*" | "*/*";
  label: string;
  className?: string;
  previewUrl?: string;
}

export function FileUpload({ onFileSelect, accept, label, className, previewUrl }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file) return;

    // In a real production app, you would upload to S3/Cloudinary here
    // For this prototype, we'll create a local blob URL for immediate preview
    const localUrl = URL.createObjectURL(file);
    setFileName(file.name);
    onFileSelect(localUrl);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label className="text-sm font-heading font-semibold text-songdew-text">{label}</label>
      
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative h-32 rounded-[16px] border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-2 px-4 text-center",
          isDragging ? "border-songdew-blue bg-songdew-blue/5" : "border-black/10 hover:border-songdew-blue/50 hover:bg-black/5"
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => e.target.files && handleFile(e.target.files[0])}
          accept={accept}
          className="hidden"
        />

        {fileName ? (
          <div className="flex items-center gap-3 text-songdew-text font-medium">
            {accept.includes("audio") ? <Music className="w-5 h-5 text-songdew-blue" /> : 
             accept.includes("video") ? <Video className="w-5 h-5 text-songdew-blue" /> : 
             <ImageIcon className="w-5 h-5 text-songdew-blue" />}
            <span className="text-sm truncate max-w-[200px]">{fileName}</span>
            <button 
              onClick={(e) => { e.stopPropagation(); setFileName(null); }}
              className="p-1 hover:bg-black/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-songdew-gray" />
            </button>
          </div>
        ) : (
          <>
            <div className="w-10 h-10 rounded-full bg-songdew-bg flex items-center justify-center">
              <Upload className="w-5 h-5 text-songdew-gray" />
            </div>
            <div>
              <p className="text-sm font-body text-songdew-text font-medium">Click or drag to upload</p>
              <p className="text-xs font-body text-songdew-gray mt-0.5">
                {accept.includes("image") ? "JPG, PNG, WebP" : 
                 accept.includes("audio") ? "MP3, WAV" : 
                 accept.includes("video") ? "MP4, MOV" : "All file types"}
              </p>
            </div>
          </>
        )}
      </div>

      {previewUrl && !fileName && (
        <div className="mt-2 relative w-full h-20 rounded-[12px] overflow-hidden border border-black/5">
          {accept.includes("image") ? (
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-50" />
          ) : (
            <div className="w-full h-full bg-songdew-bg flex items-center justify-center text-xs text-songdew-gray font-body italic">
              Current file: {previewUrl.split('/').pop()?.substring(0, 20)}...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
