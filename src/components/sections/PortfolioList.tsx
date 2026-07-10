"use client";

import { Zap } from "lucide-react";
import { blockchainProjects, beyondBlockchainProjects } from "@/data/portfolioData";
import { PortfolioCard } from "@/components/ui/PortfolioCard";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { TiltCard } from "@/components/common/TiltCard";

export function PortfolioList() {
  return (
    <div className="w-full">
      {/* Light Section (Header & Blockchain) */}
      <section className="bg-sand pt-16 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Row */}
          <ScrollReveal direction="up" duration={800}>
            <div className="flex flex-col items-start pb-12 border-b border-border-gray mb-16">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#666] uppercase">
                // PORTFOLIO
              </span>
              <h1 className="font-bebas text-6xl sm:text-7xl md:text-8xl font-black text-[#1a1a1a] tracking-tight uppercase leading-none mt-2 select-none">
                ALL WORK
              </h1>
              <p className="text-sm sm:text-base text-[#555] max-w-2xl mt-4 leading-relaxed font-medium">
                5 proyek lintas blockchain dan IoT. Klik tiap proyek untuk melihat studi kasus lengkap — arsitektur, tantangan teknis, dan keputusan desain di baliknya.
              </p>
            </div>
          </ScrollReveal>

          {/* Blockchain & Research Title */}
          <ScrollReveal direction="up" duration={600} delay={100}>
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#666] uppercase block mb-8">
              // BLOCKCHAIN & RESEARCH — 3 PROJECTS
            </span>
          </ScrollReveal>

          {/* Blockchain Projects Cards */}
          <div className="flex flex-col gap-8">
            {blockchainProjects.map((project, index) => (
              <ScrollReveal 
                key={project.num} 
                direction="up" 
                delay={index * 120} 
                duration={800} 
                className="w-full"
              >
                <PortfolioCard project={project} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dark Section (Beyond Blockchain) */}
      <section className="bg-[#0c0c0c] text-white py-24 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <ScrollReveal direction="up" duration={600}>
            <span className="text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase block mb-12 select-none">
              // BEYOND BLOCKCHAIN — 2 PROJECTS
            </span>
          </ScrollReveal>

          {/* IoT Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {beyondBlockchainProjects.map((project, index) => {
              const isFarming = project.title === "SMART FARMING";
              return (
                <ScrollReveal 
                  key={project.title} 
                  direction="up" 
                  delay={index * 150} 
                  duration={800}
                >
                  <TiltCard className="h-full rounded-2xl" maxTilt={6} scale={1.02} enableGlare={true}>
                    <div className="group bg-[#141414] border border-zinc-900/60 p-8 md:p-10 rounded-2xl hover:bg-[#1a1a1a] hover:border-zinc-800 transition-all duration-300 flex flex-col justify-between gap-6 h-full transform-gpu [transform-style:preserve-3d]">
                      
                      <div className="flex flex-col gap-4 [transform-style:preserve-3d]">
                        {/* Top Row: Icon & Status */}
                        <div 
                          className="flex items-center justify-between [transform-style:preserve-3d]"
                          style={{ transform: "translateZ(25px)" }}
                        >
                          <div 
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 duration-500 shadow-md ${
                              isFarming ? "bg-emerald-600" : "bg-amber-600"
                            }`}
                          >
                            <Zap className="w-5 h-5 text-white fill-white" />
                          </div>
                          
                          <span 
                            className={`px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded-full border ${
                              isFarming 
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : "bg-zinc-800 text-zinc-300 border-zinc-700"
                            }`}
                          >
                            {isFarming ? "IN PROGRESS" : "COMPLETED"}
                          </span>
                        </div>

                        {/* Title & Subtitle */}
                        <div 
                          className="flex flex-col gap-1.5 [transform-style:preserve-3d] mt-2" 
                          style={{ transform: "translateZ(20px)" }}
                        >
                          <h4 className="font-bebas text-2xl text-white tracking-wide uppercase transition-colors group-hover:text-accent-red duration-300">
                            {project.title}
                          </h4>
                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                            {project.role}
                          </span>
                        </div>

                        {/* Description */}
                        <p 
                          className="text-xs text-zinc-400 leading-relaxed font-medium mt-1 [transform-style:preserve-3d]"
                          style={{ transform: "translateZ(15px)" }}
                        >
                          {project.desc}
                        </p>
                      </div>

                      {/* Tech Tags */}
                      <div 
                        className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-900 mt-4 [transform-style:preserve-3d]"
                        style={{ transform: "translateZ(10px)" }}
                      >
                        {project.tech.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-[9px] font-bold bg-zinc-900/60 text-zinc-400 border border-zinc-850 rounded uppercase tracking-wider hover:bg-zinc-850 hover:text-white transition-colors duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                    </div>
                  </TiltCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default PortfolioList;
