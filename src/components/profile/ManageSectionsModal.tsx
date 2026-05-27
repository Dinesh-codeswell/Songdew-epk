"use client";

import React from 'react';
import { useArtist } from '@/context/ArtistContext';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

export const TABS = [
  "Story",
  "Achievements",
  "Music",
  "Gallery",
  "Quote",
  "Business Enquiries",
  "Live Performances",
  "In Press",
  "Assets",
];

interface ManageSectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ManageSectionsModal({ isOpen, onClose }: ManageSectionsModalProps) {
  const { artist, toggleSectionVisibility } = useArtist();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Manage Profile Sections"
      description="Toggle which sections are visible on your public EPK."
    >
      <div className="space-y-4 py-4">
        {TABS.map((tab) => {
          const isHidden = (artist.hiddenSections || []).includes(tab);
          return (
            <div key={tab} className="flex items-center justify-between p-3 rounded-xl border border-black/5 hover:bg-black/[0.02] transition-colors">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isHidden ? 'bg-black/5 text-black/20' : 'bg-songdew-blue/10 text-songdew-blue'}`}>
                  {isHidden ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-heading font-medium text-songdew-text">{tab}</h4>
                  <p className="text-xs text-songdew-gray">
                    {isHidden ? 'Currently hidden from public view' : 'Visible on public profile'}
                  </p>
                </div>
              </div>
              
              <Button
                variant={isHidden ? "outline" : "default"}
                size="sm"
                onClick={() => toggleSectionVisibility(tab)}
                className={`min-w-[80px] ${isHidden ? 'border-songdew-blue text-songdew-blue hover:bg-songdew-blue/5' : 'bg-songdew-blue hover:bg-songdew-blue/90'}`}
              >
                {isHidden ? 'Show' : 'Hide'}
              </Button>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-end pt-4">
        <Button onClick={onClose} variant="default" className="bg-songdew-text text-white">
          Done
        </Button>
      </div>
    </Modal>
  );
}
