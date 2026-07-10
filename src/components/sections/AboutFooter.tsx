"use client";

import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export function AboutFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <section className="bg-dark-bg text-white py-20 px-6 border-t border-zinc-900 select-none">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-10 pb-16">
        <ScrollReveal direction="up" duration={700}>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-none text-white tracking-tight uppercase">
            TERTARIK BERKOLABORASI?
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100} duration={700}>
          <div className="flex flex-row flex-wrap gap-4 items-center">
            {/* Email Langsung Button */}
            <a
              href="mailto:hello@ptrs.dev"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#1a1a1a] hover:bg-[#eae8e4] font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 shrink-0 group"
            >
              <Mail className="w-4 h-4 text-accent-red" />
              <span>Email Langsung</span>
            </a>

            {/* Lihat Proyek Button */}
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300 active:scale-95 shrink-0 group"
            >
              <span>Lihat Proyek</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors duration-300" />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* Clean Copyright Line */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-bold text-zinc-600 tracking-wider uppercase">
        <span>
          &copy; {currentYear} P<span className="text-accent-red">.</span>T<span className="text-accent-red">.</span>R<span className="text-accent-red">.</span>S &mdash; Blockchain Developer & Researcher.
        </span>
        <div className="flex items-center gap-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}
export default AboutFooter;
