"use client";

import { ScrollReveal } from "@/components/common/ScrollReveal";

export function AboutPrinciples() {
  const principles = [
    {
      title: "Security over convenience",
      desc: "Setiap arsitektur desain dimulai dari asumsi adversarial. Apa yang terjadi jika pengguna ini jahat?",
    },
    {
      title: "Onchain bukan selalu jawabannya",
      desc: "Saya memilih layer kepercayaan yang tepat untuk setiap komponen &mdash; bukan memaksakan segalanya on-chain.",
    },
    {
      title: "UI adalah bagian dari protokol",
      desc: "Antarmuka yang membingungkan adalah celah keamanan. Pengguna yang bingung membuat keputusan yang salah.",
    },
  ];

  return (
    <section className="bg-[#fcfcfa]/50 py-24 px-6 border-b border-border-gray">
      <div className="max-w-7xl mx-auto">
        {/* Header Row */}
        <ScrollReveal direction="up" duration={800}>
          <div className="flex flex-col gap-2 pb-12">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#888] uppercase">
              // PRINCIPLES
            </span>
            <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-none text-[#1a1a1a] tracking-tight uppercase">
              HOW I <br className="sm:hidden" /> THINK
            </h2>
          </div>
        </ScrollReveal>

        {/* Principles Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
          {principles.map((principle, index) => (
            <ScrollReveal
              key={principle.title}
              direction="up"
              delay={index * 100}
              duration={700}
              className="h-full"
            >
              <div className="flex flex-col gap-5 p-8 rounded-3xl bg-white/40 border border-border-gray/60 hover:bg-white hover:shadow-md transition-all duration-300 h-full relative overflow-hidden group">
                {/* Red Accent Arrow */}
                <div className="text-accent-red font-bold text-lg select-none translate-y-0.5 transform transition-transform group-hover:translate-x-1 duration-300">
                  &rarr;
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-sans text-base sm:text-lg font-bold text-[#1a1a1a] tracking-wide">
                    {principle.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#555] font-medium leading-relaxed">
                    {principle.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
