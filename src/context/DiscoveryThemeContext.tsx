"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Theme = "light" | "dark";

interface DiscoveryThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const DiscoveryThemeContext = createContext<DiscoveryThemeContextType | undefined>(undefined);

export function DiscoveryThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  return (
    <DiscoveryThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </DiscoveryThemeContext.Provider>
  );
}

export const useDiscoveryTheme = () => {
  const context = useContext(DiscoveryThemeContext);
  if (!context) throw new Error('useDiscoveryTheme must be used within a DiscoveryThemeProvider');
  return context;
};
