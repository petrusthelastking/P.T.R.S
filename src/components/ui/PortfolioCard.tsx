"use client";

import Link from "next/link";
import { Shield, Leaf, FileText, ArrowUpRight } from "lucide-react";
import { Project } from "@/data/portfolioData";
import { TiltCard } from "@/components/common/TiltCard";

interface PortfolioCardProps {
  project: Project;
}

export function PortfolioCard({ project }: PortfolioCardProps) {
  const isCompleted = project.status === "COMPLETED";

  // Map icons based on project number/id
  const getIcon = () => {
    switch (project.num) {
      case "01":
        return <Shield className="w-7 h-7 text-white transition-transform group-hover:scale-110 duration-500" />;
      case "02":
        return <Leaf className="w-7 h-7 text-white transition-transform group-hover:scale-110 duration-500" />;
      case "03":
        return <FileText className="w-7 h-7 text-white transition-transform group-hover:scale-110 duration-500" />;
      default:
        return <Shield className="w-7 h-7 text-white" />;
    }
  };

  // Map icon container backgrounds
  const getIconBg = () => {
    switch (project.num) {
      case "01":
        return "bg-[#0f2142]"; // Dark Blue
      case "02":
        return "bg-[#0e3b24]"; // Dark Green
      case "03":
        return "bg-[#281140]"; // Dark Purple
      default:
        return "bg-[#1a1a1a]";
    }
  };

  // Hardcoded year data from portfolioData if not present, otherwise fallback
  const getYear = () => {
    if (project.title === "BLOCKNOTARY" || project.title === "VERICHAIN") {
      return "2024";
    }
    return "2023";
  };

  return (
    <TiltCard className="w-full rounded-3xl" maxTilt={5} scale={1.012} enableGlare={true}>
      <div className="group bg-white/70 hover:bg-white border border-border-gray rounded-3xl p-8 md:p-10 transition-all duration-500 shadow-sm hover:shadow-md flex flex-col md:flex-row gap-6 md:gap-8 items-start w-full transform-gpu [transform-style:preserve-3d]">
        
        {/* Left Column: Number & Icon */}
        <div 
          className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-3 shrink-0 select-none [transform-style:preserve-3d]"
          style={{ transform: "translateZ(25px)" }}
        >
          <span className="text-xs font-bold text-[#888] tracking-widest font-mono order-2 md:order-1">
            {project.num}
          </span>
          <div 
            className={`w-14 h-14 rounded-2xl flex items-center justify-center ${getIconBg()} shadow-inner transition-transform group-hover:rotate-6 duration-500 order-1 md:order-2`}
          >
            {getIcon()}
          </div>
        </div>

        {/* Middle Column: Details & Description */}
        <div 
          className="flex-1 flex flex-col items-start [transform-style:preserve-3d]"
          style={{ transform: "translateZ(15px)" }}
        >
          {/* Status and Category */}
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`px-3 py-1 text-[9px] font-extrabold rounded-full border uppercase tracking-wider flex items-center gap-1.5 ${
                isCompleted
                  ? "bg-[#eae8e4]/60 text-zinc-700 border-[#e2e2e0]"
                  : "bg-emerald-500/10 text-emerald-700 border-emerald-500/15"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isCompleted ? "bg-zinc-400" : "bg-emerald-500 animate-pulse"}`}></span>
              {project.status}
            </span>
            <span className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase">
              {project.categories}
            </span>
          </div>

          {/* Title and Subtitle */}
          <h3 className="font-bebas text-3xl sm:text-4xl text-[#1a1a1a] tracking-wide uppercase mt-4 leading-none transition-colors group-hover:text-accent-red duration-300">
            {project.title}
          </h3>
          <span className="text-xs font-bold text-[#888] tracking-wider mt-1">
            {project.subtitle}
          </span>

          {/* Description */}
          <p className="text-sm text-[#555] leading-relaxed max-w-3xl mt-4 font-medium">
            {project.desc}
          </p>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5 mt-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-[9px] font-bold bg-[#eae8e4] text-[#555] rounded-full uppercase tracking-wider hover:bg-[#e2e2e0] hover:text-[#1a1a1a] transition-colors duration-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Year & Action Link */}
        <div 
          className="flex flex-row md:flex-col justify-between items-end shrink-0 w-full md:w-auto md:h-full md:self-stretch min-w-[90px] pt-4 md:pt-0 border-t md:border-t-0 border-border-gray/30 [transform-style:preserve-3d]"
          style={{ transform: "translateZ(20px)" }}
        >
          {/* Year */}
          <span className="text-xs font-bold text-[#888] font-mono md:mb-16">
            {getYear()}
          </span>

          {/* Deep Dive */}
          <Link
            href={project.link}
            className="group/link flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1a1a1a] hover:text-accent-red transition-colors duration-300"
          >
            <span>Deep Dive</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 duration-300" />
          </Link>
        </div>

      </div>
    </TiltCard>
  );
}

export default PortfolioCard;
