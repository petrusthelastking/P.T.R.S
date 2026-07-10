"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function PortfolioFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <section className="bg-sand border-t border-border-gray py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
        <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-[#1a1a1a] tracking-tight max-w-2xl uppercase leading-[0.95] select-none">
          TERTARIK BERKOLABORASI DI PROYEK BERIKUTNYA?
        </h2>
        <Link
          href="/#contact"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1a1a1a] hover:bg-accent-red text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-full transition-all duration-350 shadow-md hover:shadow-lg active:scale-95 shrink-0 group"
        >
          <span>Hubungi Saya</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300" />
        </Link>
      </div>
      
      {/* Small copyright disclaimer */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-border-gray/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-bold text-zinc-400 tracking-wider uppercase select-none">
        <span>
          &copy; {currentYear} P<span className="text-accent-red">.</span>T<span className="text-accent-red">.</span>R<span className="text-accent-red">.</span>S &mdash; Blockchain Developer & Researcher.
        </span>
      </div>
    </section>
  );
}

export default PortfolioFooter;
