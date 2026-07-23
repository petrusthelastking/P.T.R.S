import type { Metadata } from "next";
import { Big_Shoulders, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  adjustFontFallback: false,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ptrsdev.com"),
  title: {
    default: "ptrsdev | Blockchain Developer & Researcher",
    template: "%s | ptrsdev"
  },
  description: "Portofolio profesional Petrus Rosario (ptrsdev) - Blockchain Developer & Researcher. Ahli dalam merancang smart contracts, protokol kriptografi, enterprise distributed systems, dan dashboard dApp.",
  keywords: [
    "ptrsdev",
    "Petrus Rosario",
    "Petrus Tyang Agung Rosario",
    "Blockchain Developer Indonesia",
    "Blockchain Researcher",
    "Smart Contract Developer",
    "Solidity Developer",
    "Web3 Developer",
    "IoT Engineer Indonesia",
    "SUI Blockchain Research",
    "Distributed Systems Specialist"
  ],
  authors: [{ name: "Petrus Tyang Agung Rosario", url: "https://ptrsdev.com" }],
  creator: "Petrus Tyang Agung Rosario",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "ptrsdev | Blockchain Developer & Researcher",
    description: "Portofolio profesional Petrus Rosario (ptrsdev) - Blockchain Developer & Researcher. Spesialisasi dalam smart contracts, protokol kriptografi, dan IoT.",
    url: "https://ptrsdev.com",
    siteName: "ptrsdev Portfolio",
    images: [
      {
        url: "/logo.png",
        width: 500,
        height: 500,
        alt: "ptrsdev Logo",
      }
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ptrsdev | Blockchain Developer & Researcher",
    description: "Portofolio profesional Petrus Rosario (ptrsdev)",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${bigShoulders.variable} ${plusJakartaSans.variable} font-sans min-h-screen bg-sand antialiased text-[#1a1a1a]`}>
        {children}
      </body>
    </html>
  );
}
