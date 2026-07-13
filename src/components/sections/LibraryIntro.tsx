"use client";

import Link from "next/link";
import { FlaskConical, FileText, Notebook, Lightbulb, ArrowRight, BookOpen, ShieldAlert, Cpu, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { libraryArticles, activeResearch } from "@/data/libraryData";

export function LibraryIntro() {
  const featuredArticles = libraryArticles.slice(0, 2);
  
  const libraryPillars = [
    {
      name: "Research",
      icon: FlaskConical,
      desc: "Analisis mendalam seputar teori distributed systems, kriptografi tingkat lanjut, optimasi gas Solidity, dan mekanisme konsensus.",
      count: "01",
      badgeColor: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20"
    },
    {
      name: "Case Study",
      icon: FileText,
      desc: "Studi kasus nyata tentang arsitektur smart contracts, bedah post-mortem kegagalan sistem, dan pola integrasi dApp enterprise.",
      count: "02",
      badgeColor: "bg-blue-500/10 text-blue-700 border-blue-500/20"
    },
    {
      name: "Note",
      icon: Notebook,
      desc: "Catatan teknis singkat, snippet kode praktis, dokumentasi konfigurasi node, serta pemecahan masalah (troubleshooting) sehari-hari.",
      count: "03",
      badgeColor: "bg-amber-500/10 text-amber-700 border-amber-500/20"
    },
    {
      name: "Idea",
      icon: Lightbulb,
      desc: "Eksplorasi konsep eksperimental, core-concept dApp baru, rancangan tokenomics kreatif, dan wacana masa depan ekosistem Web3.",
      count: "04",
      badgeColor: "bg-rose-500/10 text-rose-700 border-rose-500/20"
    }
  ];

  return (
    <div className="bg-sand min-h-screen text-[#1a1a1a]">
      {/* Hero Section */}
      <section className="py-24 px-6 border-b border-border-gray relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-start relative z-10">
          <ScrollReveal direction="up" duration={800}>
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#888] uppercase">
              // WELCOME TO KNOWLEDGE BASE
            </span>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={100} duration={800}>
            <h1 className="font-bebas text-7xl sm:text-8xl md:text-9xl leading-none text-[#1a1a1a] tracking-tight uppercase mt-4">
              P.T.R.S <span className="text-accent-red">LIBRARY</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200} duration={800} className="w-full">
            <p className="text-sm sm:text-base md:text-lg text-[#555] font-medium leading-relaxed mt-6 max-w-3xl">
              Selamat datang di pusat dokumentasi riset terdesentralisasi kami. Library ini dibangun untuk menjadi repositori pengetahuan terbuka—mulai dari analisis mendalam smart contract security hingga arsitektur integrasi sistem blockchain berskala global.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300} duration={800} className="mt-10 flex flex-row flex-wrap gap-4 w-full">
            <Link
              href="/library/riset-blockchain"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a1a1a] hover:bg-accent-red text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 group"
            >
              <span>Jelajahi Riset Blockchain</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Dynamic Background Element */}
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-accent-red/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      </section>

      {/* Focus & Mission Section */}
      <section className="py-24 px-6 bg-[#eae8e4]/50 border-b border-border-gray">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Block */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <ScrollReveal direction="up" duration={700}>
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#888] uppercase">
                // OUR CORE VALUES
              </span>
              <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-none text-[#1a1a1a] tracking-tight uppercase mt-2">
                MISI &amp; <br />
                <span className="text-accent-red">FOKUS UTAMA</span>
              </h2>
              <p className="text-xs sm:text-[13px] text-[#555] font-medium leading-relaxed mt-4">
                Sebagai entitas riset terdesentralisasi, prioritas kami adalah membangun fondasi keilmuan blockchain yang solid dan terverifikasi untuk kemajuan dApp development yang aman dan efisien.
              </p>
            </ScrollReveal>
          </div>

          {/* Right Cards List */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Card 1 */}
            <ScrollReveal direction="up" delay={100} duration={700}>
              <div className="flex gap-6 p-6 bg-white/60 border border-border-gray/50 rounded-2xl">
                <div className="p-3 bg-red-500/10 text-accent-red border border-red-500/10 h-max rounded-xl">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wide text-[#1a1a1a]">Riset Berbasis Bukti (Evidence-Based)</h4>
                  <p className="text-xs text-[#666] leading-relaxed mt-2 font-medium">Setiap analisis didasarkan pada audit empiris and analisis matematis dari smart contract code, bukan sekadar opini pasar spekulatif.</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2 */}
            <ScrollReveal direction="up" delay={200} duration={700}>
              <div className="flex gap-6 p-6 bg-white/60 border border-border-gray/50 rounded-2xl">
                <div className="p-3 bg-red-500/10 text-accent-red border border-red-500/10 h-max rounded-xl">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wide text-[#1a1a1a]">Keamanan Tanpa Kompromi</h4>
                  <p className="text-xs text-[#666] leading-relaxed mt-2 font-medium">Kami memfokuskan sebagian besar materi riset pada aspek pencegahan exploit smart contracts, audit formal verifikasi, dan ketahanan protokol Web3.</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 3 */}
            <ScrollReveal direction="up" delay={300} duration={700}>
              <div className="flex gap-6 p-6 bg-white/60 border border-border-gray/50 rounded-2xl">
                <div className="p-3 bg-red-500/10 text-accent-red border border-red-500/10 h-max rounded-xl">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wide text-[#1a1a1a]">Arsitektur Multilayer & Enterprise</h4>
                  <p className="text-xs text-[#666] leading-relaxed mt-2 font-medium">Menganalisis integrasi horizontal teknologi blockchain ke dalam platform enterprise dan sistem IoT untuk menciptakan ekosistem terpadu.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Active Research Radar Section */}
      <section className="py-24 px-6 bg-dark-bg text-white border-b border-zinc-900 select-none">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Title Grid */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            <ScrollReveal direction="up" duration={700}>
              <span className="text-[11px] font-bold tracking-[0.2em] text-accent-red uppercase">
                // ACTIVE RESEARCH RADAR
              </span>
              <h2 className="font-bebas text-6xl sm:text-7xl font-extrabold leading-[0.85] tracking-tight uppercase flex flex-col mt-2">
                <span>SEDANG</span>
                <span className="text-accent-red">DITELITI</span>
              </h2>
              <p className="text-xs text-zinc-400 font-medium leading-relaxed mt-4">
                Beberapa fokus penelitian berjalan yang sedang diinvestigasi secara mendalam untuk publikasi riset berikutnya.
              </p>
            </ScrollReveal>
          </div>

          {/* Right Listings Grid */}
          <div className="lg:col-span-8 flex flex-col border-t border-zinc-800">
            {activeResearch.map((item, index) => (
              <ScrollReveal
                key={item}
                direction="up"
                delay={index * 100}
                duration={700}
              >
                <div className="flex items-start gap-4 py-8 border-b border-zinc-800/80 hover:bg-zinc-900/10 transition-colors duration-300 group">
                  <span className="font-mono text-xs font-bold text-zinc-700 pt-0.5 shrink-0">
                    {`0${index + 1}`}
                  </span>
                  <div className="flex-1 flex items-center justify-between gap-4">
                    <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed group-hover:text-white transition-colors duration-300">
                      {item}
                    </p>
                    {/* Live pulse indicator */}
                    <span className="flex h-2 w-2 relative shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-red opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-red"></span>
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 px-6 border-b border-border-gray">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up" duration={700}>
            <div className="flex flex-col gap-2 mb-16 max-w-xl">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#888] uppercase">
                // EMPOWERING THROUGH KNOWLEDGE
              </span>
              <h2 className="font-bebas text-5xl sm:text-6xl text-[#1a1a1a] tracking-wide uppercase">
                EMPAT PILAR REPOSITORI
              </h2>
              <p className="text-xs sm:text-[13px] text-[#666] font-medium leading-relaxed">
                Setiap materi riset diklasifikasikan ke dalam salah satu dari empat kategori utama di bawah ini untuk memudahkan penelusuran.
              </p>
            </div>
          </ScrollReveal>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {libraryPillars.map((pillar, index) => {
              const IconComp = pillar.icon;
              return (
                <ScrollReveal
                  key={pillar.name}
                  direction="up"
                  delay={index * 100}
                  duration={750}
                >
                  <div className="group bg-white/40 hover:bg-white border border-border-gray/60 p-8 rounded-3xl transition-all duration-350 hover:shadow-md flex flex-col justify-between gap-8 h-full">
                    <div className="flex flex-col gap-4">
                      {/* Icon & Count */}
                      <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-2xl border ${pillar.badgeColor}`}>
                          <IconComp className="w-6 h-6" />
                        </div>
                        <span className="font-mono text-xs font-bold text-zinc-400">
                          {pillar.count}
                        </span>
                      </div>

                      {/* Header Title */}
                      <h3 className="font-bebas text-3xl sm:text-4xl text-[#1a1a1a] tracking-wide mt-4 uppercase group-hover:text-accent-red transition-colors duration-300">
                        {pillar.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-[13px] text-[#555] font-medium leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>

                    <Link
                      href={`/library/riset-blockchain?category=${pillar.name.toUpperCase()}`}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1a1a1a] hover:text-accent-red transition-colors w-max group-hover:translate-x-1 duration-300"
                    >
                      <span>Lihat Artikel</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Research Section */}
      <section className="py-24 px-6 border-b border-border-gray bg-[#fbfaf6]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up" duration={700}>
            <div className="flex flex-col gap-2 mb-16">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#888] uppercase">
                // FEATURED RESEARCH
              </span>
              <h2 className="font-bebas text-5xl sm:text-6xl text-[#1a1a1a] tracking-wide uppercase">
                RISET &amp; ANALISIS PILIHAN
              </h2>
              <p className="text-xs sm:text-[13px] text-[#666] font-medium leading-relaxed">
                Beberapa riset unggulan yang membahas arsitektur teknis dan analisis mendalam sistem blockchain.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredArticles.map((article, index) => {
              let badgeClass = "";
              if (article.status === "PUBLISHED") {
                badgeClass = "bg-emerald-500/10 border-emerald-500/20 text-emerald-800";
              } else if (article.status === "IN PROGRESS") {
                badgeClass = "bg-blue-500/10 border-blue-500/20 text-blue-800";
              } else {
                badgeClass = "bg-accent-red/10 border-accent-red/20 text-accent-red";
              }

              return (
                <ScrollReveal
                  key={article.title}
                  direction="up"
                  delay={index * 100}
                  duration={750}
                >
                  <Link
                    href={article.link}
                    className="group bg-white/40 hover:bg-white border border-border-gray/60 p-8 sm:p-10 rounded-3xl transition-all duration-350 hover:shadow-md flex flex-col justify-between gap-8 h-full cursor-pointer"
                  >
                    <div>
                      {/* Metadata */}
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase border tracking-wider select-none ${badgeClass}`}>
                          {article.status}
                        </span>
                        <span className="text-[10px] font-bold text-zinc-500 tracking-wider uppercase select-none">
                          {article.category} {article.year}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-bebas text-3xl sm:text-4xl text-[#1a1a1a] tracking-wide mt-4 uppercase leading-none group-hover:text-accent-red transition-colors duration-300">
                        {article.title}
                      </h3>

                      {/* Desc */}
                      <p className="text-xs sm:text-[13px] text-[#555] font-medium leading-relaxed mt-4">
                        {article.desc}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-5">
                        {article.tags.map((t) => (
                          <span
                            key={t}
                            className="bg-[#eae8e4]/50 border border-border-gray/60 px-3 py-1 rounded-full text-[9px] font-extrabold text-gray-500 uppercase tracking-wide select-none"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1a1a1a] group-hover:text-accent-red transition-colors w-max group-hover:translate-x-1 duration-300"
                    >
                      <span>Baca Riset</span>
                      <span>&rarr;</span>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default LibraryIntro;
