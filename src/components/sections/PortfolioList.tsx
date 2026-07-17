"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Shield, 
  Layout, 
  Settings, 
  Zap, 
  Activity, 
  Sprout, 
  Cpu, 
  RefreshCw,
  Palette,
  Flame,
  Laptop,
  ArrowUpRight
} from "lucide-react";
import { 
  blockchainProjects, 
  uiProjects, 
  generalProjects 
} from "@/data/portfolioData";
import { PortfolioCard } from "@/components/ui/PortfolioCard";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { TiltCard } from "@/components/common/TiltCard";

type TabId = "blockchain" | "ui" | "general";

export function PortfolioList() {
  const [activeTab, setActiveTab] = useState<TabId>("blockchain");

  const tabs = [
    { id: "blockchain" as const, label: "Blockchain", count: blockchainProjects.length, icon: Shield },
    { id: "ui" as const, label: "UI & Interface", count: uiProjects.length, icon: Layout },
    { id: "general" as const, label: "General & IoT", count: generalProjects.length, icon: Settings }
  ];

  const getProjectIcon = (title: string) => {
    switch (title) {
      case "MOONTES STEAK HOUSE":
        return <Palette className="w-5 h-5 text-white" />;
      case "GOGO FRIED CHICKEN":
        return <Flame className="w-5 h-5 text-white" />;
      case "SERVICE COMPUTER":
        return <Laptop className="w-5 h-5 text-white" />;
      case "SMART MONITORING":
        return <Activity className="w-5 h-5 text-white animate-pulse" />;
      case "SMART FARMING":
        return <Sprout className="w-5 h-5 text-white" />;
      case "ARBITRAGE BOT":
        return <Cpu className="w-5 h-5 text-white" />;
      default:
        return <Zap className="w-5 h-5 text-white" />;
    }
  };

  const getProjectIconBg = (title: string) => {
    switch (title) {
      case "MOONTES STEAK HOUSE":
        return "bg-amber-700"; // Warm/Gold color matching the brand
      case "GOGO FRIED CHICKEN":
        return "bg-[#d92525]"; // Red accent matching the theme
      case "SERVICE COMPUTER":
        return "bg-sky-600";   // Professional tech blue
      case "SMART MONITORING":
        return "bg-indigo-600";
      case "SMART FARMING":
        return "bg-emerald-600";
      case "ARBITRAGE BOT":
        return "bg-zinc-800";
      default:
        return "bg-zinc-700";
    }
  };

  return (
    <div className="w-full bg-sand">
      {/* Unified Section */}
      <section className="bg-sand pt-16 pb-24 px-6 min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          {/* Header Row */}
          <ScrollReveal direction="up" duration={800}>
            <div className="flex flex-col items-start pb-12 border-b border-border-gray mb-12">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#666] uppercase">
                // PORTFOLIO
              </span>
              <h1 className="font-bebas text-6xl sm:text-7xl md:text-8xl font-black text-[#1a1a1a] tracking-tight uppercase leading-none mt-2 select-none">
                ALL WORK
              </h1>
              <p className="text-sm sm:text-base text-[#555] max-w-2xl mt-4 leading-relaxed font-medium">
                Pilih kategori di bawah untuk menyaring proyek saya — mulai dari sistem smart contract blockchain, antarmuka frontend (UI), hingga sistem integrasi IoT dan automasi backend.
              </p>
            </div>
          </ScrollReveal>

          {/* Premium Tab Selector */}
          <ScrollReveal direction="up" duration={600} delay={100}>
            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-16 border-b border-[#eae8e4] pb-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group relative px-5 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2.5 cursor-pointer outline-none select-none ${
                      isActive
                        ? "bg-[#1a1a1a] text-white shadow-md shadow-[#1a1a1a]/10"
                        : "bg-[#eae8e4]/50 text-[#666] hover:bg-[#eae8e4] hover:text-[#1a1a1a]"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110 ${
                      isActive ? "text-accent-red" : "text-[#888] group-hover:text-[#1a1a1a]"
                    }`} />
                    <span>{tab.label}</span>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono font-extrabold transition-colors duration-300 ${
                      isActive
                        ? "bg-accent-red text-white"
                        : "bg-border-gray text-[#555] group-hover:bg-[#d5d4d0]"
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Dynamic Content Container */}
          <div key={activeTab} className="w-full">
            {/* Blockchain Tab */}
            {activeTab === "blockchain" && (
              <div className="flex flex-col gap-8">
                {blockchainProjects.map((project, index) => (
                  <ScrollReveal 
                    key={project.num} 
                    direction="up" 
                    delay={index * 100} 
                    duration={800} 
                    className="w-full"
                  >
                    <PortfolioCard project={project} />
                  </ScrollReveal>
                ))}
              </div>
            )}

            {/* UI Tab */}
            {activeTab === "ui" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {uiProjects.map((project, index) => {
                  const status = project.status;
                  const isCompleted = status === "COMPLETED";
                  
                  const CardContent = () => (
                    <div className="group bg-white/70 border border-border-gray p-8 md:p-10 rounded-2xl hover:bg-white hover:border-[#1a1a1a]/30 transition-all duration-300 flex flex-col justify-between gap-6 h-full transform-gpu [transform-style:preserve-3d]">
                      
                      <div className="flex flex-col gap-4 [transform-style:preserve-3d]">
                        {/* Top Row: Icon & Status */}
                        <div className="flex items-center justify-between" style={{ transform: "translateZ(25px)" }}>
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-6 duration-500 shadow-sm ${getProjectIconBg(project.title)}`}>
                            {getProjectIcon(project.title)}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded-full border ${
                                isCompleted 
                                  ? "bg-[#eae8e4]/60 text-zinc-700 border-[#e2e2e0]"
                                  : "bg-emerald-500/10 text-emerald-700 border-emerald-500/15"
                              }`}
                            >
                              {status}
                            </span>
                            {project.link && (
                              <span className="w-6 h-6 rounded-full bg-[#eae8e4]/60 group-hover:bg-[#eae8e4] group-hover:text-accent-red border border-[#e2e2e0] flex items-center justify-center text-[#555] transition-all duration-300">
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title & Subtitle */}
                        <div className="flex flex-col gap-1.5 mt-2" style={{ transform: "translateZ(20px)" }}>
                          <h4 className="font-bebas text-2xl text-[#1a1a1a] tracking-wide uppercase transition-colors group-hover:text-accent-red duration-300">
                            {project.title}
                          </h4>
                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                            {project.role}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-[#555] leading-relaxed font-medium mt-1" style={{ transform: "translateZ(15px)" }}>
                          {project.desc}
                        </p>
                      </div>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#eae8e4] mt-4" style={{ transform: "translateZ(10px)" }}>
                        {project.tech.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-[9px] font-bold bg-[#eae8e4] text-[#555] rounded uppercase tracking-wider hover:bg-[#e2e2e0] hover:text-[#1a1a1a] transition-colors duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                    </div>
                  );

                  return (
                    <ScrollReveal 
                      key={project.title} 
                      direction="up" 
                      delay={index * 120} 
                      duration={800}
                    >
                      <TiltCard className="h-full rounded-2xl animate-fade-in" maxTilt={6} scale={1.02} enableGlare={true}>
                        {project.link ? (
                          <Link href={project.link} className="block h-full cursor-pointer">
                            <CardContent />
                          </Link>
                        ) : (
                          <CardContent />
                        )}
                      </TiltCard>
                    </ScrollReveal>
                  );
                })}
              </div>
            )}

            {/* General Tab */}
            {activeTab === "general" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {generalProjects.map((project, index) => {
                  const status = project.status;
                  const isCompleted = status === "COMPLETED";

                  const CardContent = () => (
                    <div className="group bg-white/70 border border-border-gray p-8 md:p-10 rounded-2xl hover:bg-white hover:border-[#1a1a1a]/30 transition-all duration-300 flex flex-col justify-between gap-6 h-full transform-gpu [transform-style:preserve-3d]">
                      
                      <div className="flex flex-col gap-4 [transform-style:preserve-3d]">
                        {/* Top Row: Icon & Status */}
                        <div className="flex items-center justify-between" style={{ transform: "translateZ(25px)" }}>
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-6 duration-500 shadow-sm ${getProjectIconBg(project.title)}`}>
                            {getProjectIcon(project.title)}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded-full border ${
                                isCompleted 
                                  ? "bg-[#eae8e4]/60 text-zinc-700 border-[#e2e2e0]"
                                  : "bg-emerald-500/10 text-emerald-700 border-emerald-500/15"
                              }`}
                            >
                              {status}
                            </span>
                            {project.link && (
                              <span className="w-6 h-6 rounded-full bg-[#eae8e4]/60 group-hover:bg-[#eae8e4] group-hover:text-accent-red border border-[#e2e2e0] flex items-center justify-center text-[#555] transition-all duration-300">
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title & Subtitle */}
                        <div className="flex flex-col gap-1.5 mt-2" style={{ transform: "translateZ(20px)" }}>
                          <h4 className="font-bebas text-2xl text-[#1a1a1a] tracking-wide uppercase transition-colors group-hover:text-accent-red duration-300">
                            {project.title}
                          </h4>
                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                            {project.role}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-[#555] leading-relaxed font-medium mt-1" style={{ transform: "translateZ(15px)" }}>
                          {project.desc}
                        </p>
                      </div>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#eae8e4] mt-4" style={{ transform: "translateZ(10px)" }}>
                        {project.tech.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-[9px] font-bold bg-[#eae8e4] text-[#555] rounded uppercase tracking-wider hover:bg-[#e2e2e0] hover:text-[#1a1a1a] transition-colors duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                    </div>
                  );

                  return (
                    <ScrollReveal 
                      key={project.title} 
                      direction="up" 
                      delay={index * 120} 
                      duration={800}
                    >
                      <TiltCard className="h-full rounded-2xl animate-fade-in" maxTilt={6} scale={1.02} enableGlare={true}>
                        {project.link ? (
                          <Link href={project.link} className="block h-full cursor-pointer">
                            <CardContent />
                          </Link>
                        ) : (
                          <CardContent />
                        )}
                      </TiltCard>
                    </ScrollReveal>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default PortfolioList;
