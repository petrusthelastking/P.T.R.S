"use client";

import { ArrowUpRight, FlaskConical, ShieldAlert, Cpu, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export function LibraryHighlight() {
  return (
    <section className="bg-[#0c0c0c] text-white py-24 px-6 border-y border-zinc-900 relative overflow-hidden select-none">
      {/* Background Subtle Gradient */}
      <div className="absolute left-1/4 top-1/4 w-[500px] h-[500px] bg-accent-red/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Column - Information & Title */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          <ScrollReveal direction="up" duration={800}>
            <span className="text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
              // KNOWLEDGE REPOSITORY
            </span>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={100} duration={800}>
            <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-[0.95] text-white tracking-tight uppercase">
              DOKUMENTASI RISET <br />
              <span className="text-accent-red">&amp; ANALISIS BLOCKCHAIN.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200} duration={800}>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium max-w-2xl mt-2">
              Selain membangun smart contracts dan sistem produksi, saya aktif melakukan riset mendalam tentang keamanan protokol Web3, mekanisme konsensus, dan arsitektur tokenisasi aset nyata (Real-World Assets). Library ini berisi repositori pengetahuan terbuka untuk mendokumentasikan temuan teknis secara empiris.
            </p>
          </ScrollReveal>

          {/* Quick Pillars Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-4">
            <ScrollReveal direction="up" delay={300} duration={800}>
              <div className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800/80 rounded-xl">
                <FlaskConical className="w-4 h-4 text-accent-red shrink-0" />
                <span className="text-[10px] font-extrabold tracking-wider text-zinc-300 uppercase">01. RISET AKADEMIS</span>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={350} duration={800}>
              <div className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800/80 rounded-xl">
                <ShieldAlert className="w-4 h-4 text-accent-red shrink-0" />
                <span className="text-[10px] font-extrabold tracking-wider text-zinc-300 uppercase">02. AUDIT KEAMANAN</span>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={400} duration={800}>
              <div className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800/80 rounded-xl">
                <Cpu className="w-4 h-4 text-accent-red shrink-0" />
                <span className="text-[10px] font-extrabold tracking-wider text-zinc-300 uppercase">03. TEKNIS SISTEM</span>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Right Column - Large Interactive CTA Card */}
        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
          <ScrollReveal direction="up" delay={250} duration={800} className="w-full max-w-sm">
            <a
              href="/library"
              target="_blank"
              rel="noopener noreferrer"
              className="block group bg-white text-[#1a1a1a] p-8 sm:p-10 rounded-3xl border border-border-gray hover:border-[#1a1a1a] shadow-lg hover:shadow-2xl hover:shadow-white/5 transition-all duration-350 transform hover:-translate-y-1 relative overflow-hidden text-left"
            >
              {/* Card BG Glow Effect */}
              <div className="absolute right-0 top-0 w-32 h-32 bg-accent-red/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div className="flex flex-col justify-between h-56 relative z-10">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-[#f5f4f0] border border-border-gray group-hover:border-accent-red/20 group-hover:bg-accent-red/10 rounded-2xl transition-colors duration-300">
                    <Sparkles className="w-6 h-6 text-accent-red" />
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-zinc-400 group-hover:text-[#1a1a1a] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" />
                </div>

                <div>
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-accent-red block mb-2">
                    // JELAJAHI SEKARANG
                  </span>
                  <h3 className="font-bebas text-4xl sm:text-5xl leading-none tracking-wide text-[#1a1a1a] uppercase">
                    BUKA REPOSITORI <br />
                    <span className="text-accent-red">P.T.R.S LIBRARY</span>
                  </h3>
                  <p className="text-[10px] text-zinc-500 font-medium mt-3 leading-normal">
                    Klik untuk membuka landing page Library di tab baru dan akses puluhan artikel riset blockchain secara gratis.
                  </p>
                </div>
              </div>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default LibraryHighlight;
