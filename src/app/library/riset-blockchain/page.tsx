import { Header } from "@/components/layout/Header";
import { LibraryContent } from "@/components/sections/LibraryContent";
import { AboutFooter } from "@/components/sections/AboutFooter";

export default function RisetBlockchainPage() {
  return (
    <div className="min-h-screen bg-sand text-[#1a1a1a] selection:bg-accent-red selection:text-white overflow-x-hidden font-sans">
      <Header />
      <main>
        <LibraryContent />
      </main>
      <AboutFooter />
    </div>
  );
}
