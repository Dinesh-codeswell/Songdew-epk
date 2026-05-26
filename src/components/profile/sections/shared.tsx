"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function EmptyStateCard({ 
  icon, 
  title, 
  cta, 
  onClick 
}: { 
  icon: React.ReactNode, 
  title: string, 
  cta: string,
  onClick?: () => void
}) {
  return (
    <Card className="flex flex-col items-center justify-center gap-4 p-8 border border-dashed border-black/10 bg-transparent shadow-none h-full min-h-[200px]">
      <div className="w-12 h-12 rounded-full bg-[#F2F6FA] flex items-center justify-center">
        {icon}
      </div>
      <div className="text-center">
        <h4 className="font-heading font-semibold text-songdew-text">{title}</h4>
        <p className="font-body text-sm text-songdew-gray mt-1">Nothing here yet</p>
      </div>
      <Button variant="secondary" size="sm" className="mt-2" onClick={onClick}>{cta}</Button>
    </Card>
  );
}

export function InputField({ label, value, onChange, placeholder, type = "text" }: { label: string, value: string, onChange: (v: string) => void, placeholder: string, type?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-heading font-semibold text-songdew-text">{label}</label>
      <input 
        type={type} 
        value={value} 
        onChange={e => onChange(e.target.value)}
        className="h-12 px-4 rounded-[12px] border border-black/10 focus:border-songdew-blue focus:ring-1 focus:ring-songdew-blue outline-none font-body text-[15px]" 
        placeholder={placeholder}
      />
    </div>
  );
}
