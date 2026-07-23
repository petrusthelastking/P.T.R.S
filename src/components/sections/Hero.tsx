"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { specialties } from "@/data/portfolioData";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { TiltCard } from "@/components/common/TiltCard";

export function Hero() {
  const [activeSpecialty, setActiveSpecialty] = useState("DeFi Protocol Design");

  const techBadges = [
    { name: "Next.js", sub: "Full-Stack Framework", icon: "N", bg: "bg-black" },
    { name: "Blockchain", sub: "DLT Protocol", icon: "B", bg: "bg-amber-500" },
    { name: "Web3.js", sub: "Ethereum API", icon: "W", bg: "bg-indigo-600" },
    { name: "Solidity", sub: "Smart Contracts", isSvg: true, bg: "bg-[#3c3c3d]" },
    { name: "Hyperledger", sub: "Enterprise Fabric", icon: "H", bg: "bg-slate-800" },
  ];

  return (
    <section
      id="home"
      className="relative flex flex-col justify-between min-h-0 md:min-h-[calc(100vh-80px)] pt-6 md:pt-10 pb-8 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden md:overflow-visible gap-6 md:gap-0"
    >
      {/* Giant Hero Title */}
      <ScrollReveal direction="down" duration={1000} delay={0} className="w-full text-center z-0 select-none pointer-events-none mt-1 md:mt-8">
        <h1 className="font-bebas text-6xl xs:text-7xl sm:text-8xl md:text-[10.2vw] leading-[0.88] md:leading-[1] tracking-tight text-[#d92525] font-extrabold uppercase w-full flex justify-center items-center gap-x-3 md:gap-x-[1.5vw] flex-wrap md:flex-nowrap">
          <span>BLOCKCHAIN</span>
          <span>DEVELOPER</span>
        </h1>
      </ScrollReveal>

      {/* MOBILE CONTENT LAYOUT (< md) */}
      <div className="flex flex-col md:hidden items-center gap-5 z-10 w-full">
        {/* Developer Image with Bottom Mask Fade */}
        <div className="relative w-[260px] h-[310px] sm:w-[290px] sm:h-[350px] mx-auto [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]">
          <Image
            src="/developer_portrait.png?v=2"
            alt="P.T.R.S - Blockchain Developer & Researcher"
            fill
            unoptimized
            sizes="(max-width: 768px) 290px, 500px"
            className="object-contain object-bottom pointer-events-auto"
            priority
          />
        </div>

        {/* Tech Stack Pills Bar */}
        <div className="flex flex-wrap justify-center gap-2 w-full max-w-md px-2 -mt-2">
          {techBadges.map((badge) => (
            <div
              key={badge.name}
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-border-gray shadow-sm rounded-xl text-xs"
            >
              <div className={`w-5 h-5 rounded-full ${badge.bg} flex items-center justify-center text-white font-bold text-[10px] shrink-0`}>
                {badge.isSvg ? (
                  <svg className="w-2.5 h-2.5" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="10" strokeLinejoin="round" strokeLinecap="round">
                    <polygon points="50,10 90,50 50,90 10,50" />
                    <polygon points="50,30 70,50 50,70 30,50" />
                  </svg>
                ) : (
                  badge.icon
                )}
              </div>
              <span className="font-bold text-[#1a1a1a] text-xs leading-tight">{badge.name}</span>
            </div>
          ))}
        </div>

        {/* Description & CTA */}
        <div className="flex flex-col items-center text-center gap-3 w-full px-4 pt-1">
          <p className="text-base sm:text-lg text-[#1a1a1a] leading-relaxed font-bold max-w-sm">
            Building the decentralized future with enterprise blockchain solutions and Web3 applications at scale.
          </p>
          <div className="group inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#1a1a1a] hover:text-accent-red transition-all duration-300 pt-1">
            <span className="text-[#888] font-normal mr-1.5">//</span>
            <Link
              href="#contact"
              className="underline underline-offset-4 decoration-1 hover:text-accent-red hover:decoration-accent-red"
            >
              HIRE ME &rarr;
            </Link>
          </div>
        </div>

        {/* Specialties Chips */}
        <div className="flex flex-wrap justify-center gap-2 pt-3 border-t border-border-gray/60 w-full max-w-md">
          {specialties.map((item) => (
            <button
              key={item}
              onClick={() => setActiveSpecialty(item)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-300 ${
                activeSpecialty === item
                  ? "bg-[#1a1a1a] text-white border-[#1a1a1a] font-bold"
                  : "bg-white/80 text-[#666] border-border-gray font-semibold hover:text-[#1a1a1a]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* DESKTOP CENTER DEVELOPER PORTRAIT & FLOATING BADGES (>= md) */}
      <div className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 w-[460px] h-[550px] lg:w-[500px] lg:h-[600px] z-10 pointer-events-none">
        <div className="relative w-full h-full">
          <ScrollReveal direction="up" duration={1000} delay={200} distance="50px" className="w-full h-full relative">
            <Image
              src="/developer_portrait.png?v=2"
              alt="P.T.R.S - Blockchain Developer & Researcher"
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 500px"
              className="object-contain object-bottom pointer-events-auto"
              priority
            />
          </ScrollReveal>

          {/* Floating Badges with 3D Tilt */}
          {/* 1. Next.js */}
          <ScrollReveal
            direction="fade"
            duration={500}
            delay={700}
            className="absolute top-[24%] -left-[12%] lg:-left-[16%] xl:-left-[20%] z-20 pointer-events-auto"
          >
            <TiltCard maxTilt={15} scale={1.05} enableGlare={true} className="rounded-2xl">
              <div className="flex items-center gap-3 px-4 py-3 bg-white border border-border-gray shadow-md rounded-2xl w-[170px] sm:w-[190px] transform-gpu [transform-style:preserve-3d]">
                <div style={{ transform: "translateZ(15px)" }} className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold text-sm shrink-0 transform-gpu">
                  N
                </div>
                <div style={{ transform: "translateZ(10px)" }} className="flex flex-col transform-gpu">
                  <span className="text-xs font-bold text-[#1a1a1a]">Next.js</span>
                  <span className="text-[9px] text-[#666] uppercase tracking-wider font-semibold">
                    Full-Stack Framework
                  </span>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* 2. Web3.js */}
          <ScrollReveal
            direction="fade"
            duration={500}
            delay={850}
            className="absolute bottom-[36%] -left-[16%] lg:-left-[20%] xl:-left-[24%] z-20 pointer-events-auto"
          >
            <TiltCard maxTilt={15} scale={1.05} enableGlare={true} className="rounded-2xl">
              <div className="flex items-center gap-3 px-4 py-3 bg-white border border-border-gray shadow-md rounded-2xl w-[170px] sm:w-[190px] transform-gpu [transform-style:preserve-3d]">
                <div style={{ transform: "translateZ(15px)" }} className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shrink-0 transform-gpu">
                  W
                </div>
                <div style={{ transform: "translateZ(10px)" }} className="flex flex-col transform-gpu">
                  <span className="text-xs font-bold text-[#1a1a1a]">Web3.js</span>
                  <span className="text-[9px] text-[#666] uppercase tracking-wider font-semibold">
                    Ethereum API
                  </span>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* 3. Hyperledger */}
          <ScrollReveal
            direction="fade"
            duration={500}
            delay={1000}
            className="absolute bottom-[15%] -left-[8%] lg:-left-[10%] xl:-left-[12%] z-20 pointer-events-auto"
          >
            <TiltCard maxTilt={15} scale={1.05} enableGlare={true} className="rounded-2xl">
              <div className="flex items-center gap-3 px-4 py-3 bg-white border border-border-gray shadow-md rounded-2xl w-[170px] sm:w-[190px] transform-gpu [transform-style:preserve-3d]">
                <div style={{ transform: "translateZ(15px)" }} className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-sm shrink-0 transform-gpu">
                  H
                </div>
                <div style={{ transform: "translateZ(10px)" }} className="flex flex-col transform-gpu">
                  <span className="text-xs font-bold text-[#1a1a1a]">Hyperledger</span>
                  <span className="text-[9px] text-[#666] uppercase tracking-wider font-semibold">
                    Enterprise Fabric
                  </span>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* 4. Blockchain */}
          <ScrollReveal
            direction="fade"
            duration={500}
            delay={1150}
            className="absolute top-[28%] -right-[12%] lg:-right-[16%] xl:-right-[20%] z-20 pointer-events-auto"
          >
            <TiltCard maxTilt={15} scale={1.05} enableGlare={true} className="rounded-2xl">
              <div className="flex items-center gap-3 px-4 py-3 bg-white border border-border-gray shadow-md rounded-2xl w-[170px] sm:w-[190px] transform-gpu [transform-style:preserve-3d]">
                <div style={{ transform: "translateZ(15px)" }} className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm shrink-0 transform-gpu">
                  B
                </div>
                <div style={{ transform: "translateZ(10px)" }} className="flex flex-col transform-gpu">
                  <span className="text-xs font-bold text-[#1a1a1a]">Blockchain</span>
                  <span className="text-[9px] text-[#666] uppercase tracking-wider font-semibold">
                    DLT Protocol
                  </span>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* 5. Solidity */}
          <ScrollReveal
            direction="fade"
            duration={500}
            delay={1300}
            className="absolute bottom-[28%] -right-[16%] lg:-right-[20%] xl:-right-[24%] z-20 pointer-events-auto"
          >
            <TiltCard maxTilt={15} scale={1.05} enableGlare={true} className="rounded-2xl">
              <div className="flex items-center gap-3 px-4 py-3 bg-white border border-border-gray shadow-md rounded-2xl w-[170px] sm:w-[190px] transform-gpu [transform-style:preserve-3d]">
                <div style={{ transform: "translateZ(15px)" }} className="w-8 h-8 rounded-full bg-[#3c3c3d] flex items-center justify-center text-white shrink-0 transform-gpu">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 100 100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  >
                    <polygon points="50,10 90,50 50,90 10,50" />
                    <polygon points="50,30 70,50 50,70 30,50" />
                  </svg>
                </div>
                <div style={{ transform: "translateZ(10px)" }} className="flex flex-col transform-gpu">
                  <span className="text-xs font-bold text-[#1a1a1a]">Solidity</span>
                  <span className="text-[9px] text-[#666] uppercase tracking-wider font-semibold">
                    Smart Contracts
                  </span>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        </div>
      </div>

      {/* DESKTOP FOOTER COLUMNS (>= md) */}
      <div className="hidden md:grid grid-cols-3 gap-8 w-full mt-auto pt-16 z-20 pb-4">
        {/* Left Column */}
        <ScrollReveal direction="up" duration={800} delay={450} className="flex flex-col justify-end items-start gap-6 md:pb-4 pointer-events-auto">
          <p className="text-sm sm:text-base text-[#333] leading-relaxed max-w-[280px] sm:max-w-xs font-semibold">
            Building the decentralized future with enterprise blockchain solutions and Web3 applications at scale.
          </p>
          <div className="group inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#1a1a1a] hover:text-accent-red transition-all duration-300">
            <span className="text-[#888] font-normal mr-1.5">//</span>
            <Link
              href="#contact"
              className="underline underline-offset-4 decoration-1 hover:text-accent-red hover:decoration-accent-red"
            >
              HIRE ME &rarr;
            </Link>
          </div>
        </ScrollReveal>

        {/* Center Column - Placeholder to reserve space for the absolute developer image */}
        <div className="hidden md:block pointer-events-none" />

        {/* Right Column */}
        <ScrollReveal direction="up" duration={800} delay={550} className="flex flex-col justify-end items-start md:items-end gap-2 md:pb-4 pointer-events-auto w-full">
          <div className="flex flex-col gap-2.5 w-full md:max-w-[240px]">
            {specialties.map((item) => (
              <button
                key={item}
                onClick={() => setActiveSpecialty(item)}
                className={`text-left md:text-right text-sm sm:text-base transition-all duration-300 ${
                  activeSpecialty === item
                    ? "text-[#1a1a1a] font-bold"
                    : "text-[#999] hover:text-[#1a1a1a] font-semibold"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default Hero;
