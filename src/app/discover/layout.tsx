"use client";

import { DiscoveryLayout } from "@/components/discovery/DiscoveryLayout";

export default function RootDiscoveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DiscoveryLayout>
      {children}
    </DiscoveryLayout>
  );
}
