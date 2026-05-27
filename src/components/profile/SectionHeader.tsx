"use client";

import React from 'react';
import { Eye, EyeOff, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SectionHeaderProps {
  title: string;
  isEditing: boolean;
  isHidden: boolean;
  onToggleVisibility: () => void;
  onEdit?: () => void;
  hideEdit?: boolean;
}

export function SectionHeader({
  title,
  isEditing,
  isHidden,
  onToggleVisibility,
  onEdit,
  hideEdit = false
}: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        <h3 className="font-heading text-2xl font-bold text-songdew-text">{title}</h3>
        {isEditing && isHidden && (
          <span className="px-2 py-0.5 bg-black/5 text-black/40 text-xs font-medium rounded uppercase tracking-wider">
            Hidden
          </span>
        )}
      </div>

      {isEditing && (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleVisibility}
            className={`h-9 px-3 gap-2 ${isHidden ? 'text-songdew-blue bg-songdew-blue/5' : 'text-songdew-gray hover:text-songdew-text'}`}
            title={isHidden ? "Show Section" : "Hide Section"}
          >
            {isHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span className="text-xs font-medium">{isHidden ? 'Hidden' : 'Visible'}</span>
          </Button>
          
          {!hideEdit && onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              className="h-9 px-3 gap-2 text-songdew-gray hover:text-songdew-text hover:bg-black/5"
            >
              <Edit2 className="w-4 h-4" />
              <span className="text-xs font-medium">Edit</span>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
