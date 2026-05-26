"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useArtist } from "@/context/ArtistContext";
import { Pencil, Quote as QuoteIcon } from "lucide-react";
import { InputField } from "./shared";

export function QuoteSection() {
  const { artist, isEditing, updateArtist, showToast } = useArtist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempQuote, setTempQuote] = useState(artist.quote);

  const handleSave = () => {
    if (!tempQuote.text.trim()) {
      showToast("Quote text cannot be empty", "error");
      return;
    }
    updateArtist({
      quote: tempQuote
    });
    setIsModalOpen(false);
    showToast("Quote updated", "success");
  };

  return (
    <Card className="p-12 relative border-none shadow-sm flex flex-col items-center text-center overflow-hidden">
      {/* Decorative Waveform Mockup */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-songdew-blue/5 to-transparent flex items-end justify-around px-12 gap-1 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div 
            key={i} 
            className="w-1 bg-songdew-blue/10 rounded-full" 
            style={{ height: `${Math.random() * 60 + 20}%` }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-2xl">
        <QuoteIcon className="w-12 h-12 text-songdew-blue/20 mb-6 mx-auto" />
        
        <h3 className="font-heading text-[32px] md:text-[40px] leading-tight font-bold text-songdew-text italic">
          &ldquo;{artist.quote.text}&rdquo;
        </h3>
        
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-[1px] w-8 bg-songdew-blue/30" />
          <p className="font-heading font-semibold text-lg text-songdew-gray uppercase tracking-widest">
            {artist.quote.author}
          </p>
          <div className="h-[1px] w-8 bg-songdew-blue/30" />
        </div>
      </div>

      {isEditing && (
        <button
          onClick={() => {
            setTempQuote(artist.quote);
            setIsModalOpen(true);
          }}
          className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full transition-colors text-songdew-blue"
        >
          <Pencil className="w-5 h-5" />
        </button>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Artist Quote"
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-heading font-semibold text-songdew-text">Quote Text</label>
            <textarea
              value={tempQuote.text}
              onChange={(e) => setTempQuote({ ...tempQuote, text: e.target.value })}
              className="w-full h-32 p-4 rounded-[12px] border border-black/10 focus:border-songdew-blue focus:ring-1 focus:ring-songdew-blue outline-none font-body text-[15px] resize-none"
              placeholder="Inspirational words..."
            />
          </div>
          <InputField 
            label="Author" 
            value={tempQuote.author} 
            onChange={(v) => setTempQuote({ ...tempQuote, author: v })} 
            placeholder="Artist Name" 
          />
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Quote</Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
}
