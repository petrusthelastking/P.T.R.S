"use client";

import { Mail, Download } from "lucide-react";
import { aboutTags } from "@/data/portfolioData";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export function AboutHero() {
  const filteredTags = aboutTags.filter(tag => tag !== "Open to Collaboration");

  return (
    <section className="bg-sand border-b border-border-gray py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Column */}
        <ScrollReveal direction="up" delay={0} duration={800} className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#888] uppercase">
              // ABOUT
            </span>
            <h1 className="font-bebas text-6xl sm:text-7xl md:text-8xl leading-[0.9] text-[#1a1a1a] tracking-tight uppercase">
              NOT JUST A DEV.<br />
              <span className="text-accent-red">A RESEARCHER.</span>
            </h1>
          </div>

          {/* Quote */}
          <div className="border-l-[3px] border-accent-red pl-6 py-1 text-lg sm:text-xl font-medium italic text-[#1a1a1a] leading-relaxed">
            &ldquo;Saya tidak hanya menulis smart contracts — saya mempelajari mengapa distribusi/desentralisasi sistem gagal, lalu membangun agar tidak terjadi.&rdquo;
          </div>

          {/* Stats Box Container */}
          <div className="bg-white/40 border border-border-gray/60 rounded-3xl p-8 grid grid-cols-2 gap-x-12 gap-y-8">
            <div className="flex flex-col gap-1.5">
              <span className="font-bebas text-5xl sm:text-6xl text-accent-red font-black leading-none">
                5+
              </span>
              <span className="text-[10px] font-bold text-[#1a1a1a] uppercase tracking-wider">
                Years in Web3
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="font-bebas text-5xl sm:text-6xl text-accent-red font-black leading-none">
                3
              </span>
              <span className="text-[10px] font-bold text-[#1a1a1a] uppercase tracking-wider">
                Blockchain Projects
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="font-bebas text-5xl sm:text-6xl text-accent-red font-black leading-none">
                2
              </span>
              <span className="text-[10px] font-bold text-[#1a1a1a] uppercase tracking-wider">
                IoT Systems Built
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="font-bebas text-5xl sm:text-6xl text-accent-red font-black leading-none">
                &infin;
              </span>
              <span className="text-[10px] font-bold text-[#1a1a1a] uppercase tracking-wider">
                Tamper-proof Logs
              </span>
            </div>
          </div>

          {/* Tags Grid */}
          <div className="flex flex-wrap gap-2.5 mt-2">
            {filteredTags.map((tag) => (
              <span
                key={tag}
                className="bg-white/60 border border-border-gray/80 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-[#1a1a1a] hover:text-white transition-all cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </ScrollReveal>

        {/* Right Column */}
        <ScrollReveal direction="up" delay={150} duration={800} className="flex flex-col justify-between gap-12 lg:pt-6">
          <div className="flex flex-col gap-8">
            {/* Who I Am */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#888] uppercase">
                // WHO I AM
              </span>
              <p className="text-sm text-[#444] leading-relaxed font-medium">
                Saya adalah blockchain developer sekaligus peneliti yang fokus pada satu pertanyaan besar: bagaimana kita membangun sistem di mana kepercayaan tidak lagi bergantung pada satu pihak tunggal yang bisa salah, korup, atau gagal?
              </p>
            </div>

            {/* What I Build */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#888] uppercase">
                // WHAT I BUILD
              </span>
              <p className="text-sm text-[#444] leading-relaxed font-medium">
                Proyek-proyek saya bergerak di persimpangan antara kriptografi, sistem terdistribusi, dan antarmuka pengguna — dari protokol notarisasi dokumen (BlockNotary), tokenisasi kredit karbon (VeriChain), hingga sistem audit transaksi immutable (AuditChain). Di luar blockchain, saya juga membangun sistem IoT untuk Smart Farming dan Smart Monitoring.
              </p>
            </div>

            {/* How I'm Different */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#888] uppercase">
                // HOW I&apos;M DIFFERENT
              </span>
              <p className="text-sm text-[#444] leading-relaxed font-medium">
                Sebagian besar blockchain developer berhenti di layer smart contract. Saya bekerja melintasi seluruh stack — dari desain protokol kriptografis, Solidity/Go chaincode, backend Node.js, hingga dashboard frontend yang terhubung langsung ke chain. Satu titik kontak untuk seluruh arsitektur.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Collaboration pill */}
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-800 self-start">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              <span>Open untuk kolaborasi &mdash; riset, freelance, atau proyek jangka panjang</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row flex-wrap gap-4">
              <a
                href="mailto:hello@ptrs.dev"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] hover:bg-accent-red text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-350 shadow-md hover:shadow-lg active:scale-95 shrink-0 group"
              >
                <Mail className="w-4 h-4" />
                <span>Hubungi Saya</span>
              </a>
              <a
                href="/cv-ptrs.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 border border-border-gray hover:border-[#1a1a1a] text-[#1a1a1a] font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-350 active:scale-95 shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
