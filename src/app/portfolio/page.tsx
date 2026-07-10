import { Header } from "@/components/layout/Header";
import { PortfolioList } from "@/components/sections/PortfolioList";
import { PortfolioFooter } from "@/components/sections/PortfolioFooter";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-sand text-[#1a1a1a] selection:bg-accent-red selection:text-white overflow-x-hidden font-sans">
      <Header />
      <main>
        <PortfolioList />
      </main>
      <PortfolioFooter />
    </div>
  );
}
