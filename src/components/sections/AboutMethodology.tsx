"use client";

import { methodologySteps } from "@/data/portfolioData";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export function AboutMethodology() {
  return (
    <section className="bg-dark-bg text-white py-24 px-6 border-b border-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* Header Row */}
        <ScrollReveal direction="up" duration={800}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end pb-16 border-b border-zinc-800 mb-16">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold tracking-[0.2em] text-accent-red uppercase">
                // METHODOLOGY
              </span>
              <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-[0.9] text-white tracking-tight uppercase">
                HOW I <br />
                <span className="text-accent-red">WORK</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-zinc-400 max-w-md lg:justify-self-end">
              Dari riset hingga mainnet &mdash; setiap tahap punya output terukur, bukan sekadar progress.
            </p>
          </div>
        </ScrollReveal>

        {/* Phases Rows */}
        <div className="flex flex-col border-t border-zinc-800">
          {methodologySteps.map((step, index) => {
            const isPhase4 = step.num === "04";
            
            return (
              <ScrollReveal
                key={step.num}
                direction="up"
                delay={index * 80}
                duration={700}
                className="w-full"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-10 border-b border-zinc-800 hover:bg-zinc-900/20 transition-all duration-300 items-start group">
                  {/* Left Column: Number, Badge, Title */}
                  <div className="lg:col-span-5 flex items-start gap-6">
                    <span className="font-mono text-xs font-bold text-zinc-650 pt-1 shrink-0 select-none">
                      {step.num}
                    </span>
                    <div className="flex flex-col gap-2">
                      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-extrabold tracking-wider uppercase self-start border ${
                        isPhase4 
                          ? "bg-accent-red/10 border-accent-red/20 text-accent-red" 
                          : "bg-zinc-900 border-zinc-800 text-zinc-400"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isPhase4 ? "bg-accent-red" : "bg-zinc-400"
                        }`}></span>
                        <span>{step.phase}</span>
                      </div>
                      <h3 className="font-sans text-sm sm:text-base font-extrabold text-white tracking-wider uppercase group-hover:text-accent-red transition-colors duration-300">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Right Column: Description & Output */}
                  <div className="lg:col-span-7 flex flex-col gap-3">
                    <p className="text-xs sm:text-[13px] text-zinc-450 leading-relaxed font-medium">
                      {step.desc}
                    </p>
                    <div className="flex items-start gap-1 text-[10px] text-zinc-550 font-bold tracking-wide uppercase select-none">
                      <span className="text-zinc-600">output:</span>
                      <span className="text-zinc-400">{step.out}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Why This Process Matters Container */}
        <ScrollReveal direction="up" duration={800} delay={100}>
          <div className="mt-20 border border-zinc-800/80 rounded-3xl p-8 sm:p-10 bg-zinc-950/20">
            <span className="text-xs font-bold tracking-[0.2em] text-accent-red uppercase block mb-4">
              // WHY THIS PROCESS MATTERS
            </span>
            <p className="text-xs sm:text-sm text-zinc-450 leading-relaxed font-medium">
              Smart contract tidak seperti perangkat lunak biasa &mdash; tidak bisa ditarik setelah dideploy dan bisa menguras seluruh dana protokol dalam satu transaksi. Proses ini ada karena saya pernah membaca post-mortem dari protokol yang kehilangan jutaan dolar akibat re-entrancy attack sederhana yang seharusnya tertangkap di tahap audit.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
