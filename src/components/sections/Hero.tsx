"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { specialties } from "@/data/portfolioData";

export function Hero() {
  const [activeSpecialty, setActiveSpecialty] = useState("DeFi Protocol Design");

  return (
    <section
      id="home"
      className="relative flex flex-col justify-between min-h-[calc(100vh-80px)] pt-10 pb-8 px-6 max-w-7xl mx-auto overflow-visible"
    >
      {/* Giant Hero Title in Background */}
      <div className="w-full text-center z-0 select-none pointer-events-none mt-4 md:mt-8">
        <h1 className="font-bebas text-[10vw] sm:text-[10.5vw] md:text-[10.2vw] leading-[1] tracking-tight text-[#d92525] font-extrabold uppercase w-full flex justify-center items-center gap-x-[1.5vw] whitespace-nowrap">
          <span>BLOCKCHAIN</span>
          <span>DEVELOPER</span>
        </h1>
      </div>

      {/* Center Developer Image with Floating Badges */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[280px] h-[340px] sm:w-[350px] sm:h-[420px] md:w-[460px] md:h-[550px] lg:w-[500px] lg:h-[600px] z-10 pointer-events-none">
        <div className="relative w-full h-full">
          <Image
            src="/developer_portrait.png?v=2"
            alt="P.T.R.S - Blockchain Developer & Researcher"
            fill
            unoptimized
            sizes="(max-width: 1024px) 100vw, 500px"
            className="object-contain object-bottom pointer-events-auto"
            priority
          />

          {/* Floating Badges */}
          {/* 1. Next.js */}
          <div className="absolute top-[24%] -left-[5%] md:-left-[12%] lg:-left-[16%] xl:-left-[20%] z-20 flex items-center gap-3 px-4 py-3 bg-white border border-border-gray shadow-md rounded-2xl w-[170px] sm:w-[190px] transition-transform hover:-translate-y-1 hover:scale-105 duration-300 pointer-events-auto">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold text-sm shrink-0">
              N
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#1a1a1a]">Next.js</span>
              <span className="text-[9px] text-[#666] uppercase tracking-wider font-semibold">
                Full-Stack Framework
              </span>
            </div>
          </div>

          {/* 2. Web3.js */}
          <div className="absolute bottom-[36%] -left-[8%] md:-left-[16%] lg:-left-[20%] xl:-left-[24%] z-20 flex items-center gap-3 px-4 py-3 bg-white border border-border-gray shadow-md rounded-2xl w-[170px] sm:w-[190px] transition-transform hover:-translate-y-1 hover:scale-105 duration-300 pointer-events-auto">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
              W
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#1a1a1a]">Web3.js</span>
              <span className="text-[9px] text-[#666] uppercase tracking-wider font-semibold">
                Ethereum API
              </span>
            </div>
          </div>

          {/* 3. Hyperledger */}
          <div className="absolute bottom-[15%] -left-[3%] md:-left-[8%] lg:-left-[10%] xl:-left-[12%] z-20 flex items-center gap-3 px-4 py-3 bg-white border border-border-gray shadow-md rounded-2xl w-[170px] sm:w-[190px] transition-transform hover:-translate-y-1 hover:scale-105 duration-300 pointer-events-auto">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-sm shrink-0">
              H
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#1a1a1a]">Hyperledger</span>
              <span className="text-[9px] text-[#666] uppercase tracking-wider font-semibold">
                Enterprise Fabric
              </span>
            </div>
          </div>

          {/* 4. Blockchain */}
          <div className="absolute top-[28%] -right-[5%] md:-right-[12%] lg:-right-[16%] xl:-right-[20%] z-20 flex items-center gap-3 px-4 py-3 bg-white border border-border-gray shadow-md rounded-2xl w-[170px] sm:w-[190px] transition-transform hover:-translate-y-1 hover:scale-105 duration-300 pointer-events-auto">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
              B
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#1a1a1a]">Blockchain</span>
              <span className="text-[9px] text-[#666] uppercase tracking-wider font-semibold">
                DLT Protocol
              </span>
            </div>
          </div>

          {/* 5. Solidity */}
          <div className="absolute bottom-[28%] -right-[8%] md:-right-[16%] lg:-right-[20%] xl:-right-[24%] z-20 flex items-center gap-3 px-4 py-3 bg-white border border-border-gray shadow-md rounded-2xl w-[170px] sm:w-[190px] transition-transform hover:-translate-y-1 hover:scale-105 duration-300 pointer-events-auto">
            <div className="w-8 h-8 rounded-full bg-[#3c3c3d] flex items-center justify-center text-white shrink-0">
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
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#1a1a1a]">Solidity</span>
              <span className="text-[9px] text-[#666] uppercase tracking-wider font-semibold">
                Smart Contracts
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Footer Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-auto pt-16 z-20 pb-4">
        {/* Left Column */}
        <div className="flex flex-col justify-end items-start gap-6 md:pb-4 pointer-events-auto">
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
        </div>

        {/* Center Column - Placeholder to reserve space for the absolute developer image */}
        <div className="hidden md:block pointer-events-none" />

        {/* Right Column */}
        <div className="flex flex-col justify-end items-start md:items-end gap-2 md:pb-4 pointer-events-auto">
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
        </div>
      </div>
    </section>
  );
}
export default Hero;
