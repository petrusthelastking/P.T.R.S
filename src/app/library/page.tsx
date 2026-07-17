import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { LibraryIntro } from "@/components/sections/LibraryIntro";
import { AboutFooter } from "@/components/sections/AboutFooter";

export const metadata: Metadata = {
  title: "Library & Research Hub",
  description: "Perpustakaan riset blockchain, analisis protokol kriptografi, keamanan smart contract, dan dokumentasi teknis mendalam dari Petrus Rosario (ptrsdev).",
};

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-sand text-[#1a1a1a] selection:bg-accent-red selection:text-white overflow-x-hidden font-sans">
      <Header />
      <main>
        <LibraryIntro />
      </main>
      <AboutFooter />
    </div>
  );
}
