import type { Metadata } from "next";
import { Outfit, Poppins, Inter } from "next/font/google";
import "./globals.css";
import { ArtistProvider } from "@/context/ArtistContext";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-pika-body",
  subsets: ["latin"],
  display: "swap",
});

const interBlack = Inter({
  variable: "--font-pika-display",
  weight: "900",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Artist Profile | Songdew",
  description: "Premium music artist portfolio and discovery platform.",
  icons: {
    icon: "/favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${poppins.variable} ${inter.variable} ${interBlack.variable}`}>
      <body suppressHydrationWarning className="antialiased min-h-[100dvh] flex flex-col bg-songdew-bg">
        <ArtistProvider>
          {children}
        </ArtistProvider>
      </body>
    </html>
  );
}