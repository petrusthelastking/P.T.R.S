import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutMethodology } from "@/components/sections/AboutMethodology";
import { AboutPrinciples } from "@/components/sections/AboutPrinciples";
import { AboutFooter } from "@/components/sections/AboutFooter";

export const metadata: Metadata = {
  title: "About",
  description: "Pelajari metodologi riset dan prinsip-prinsip Petrus Rosario (ptrsdev) dalam merancang arsitektur blockchain terdistribusi dan sistem yang aman.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-sand text-[#1a1a1a] selection:bg-accent-red selection:text-white overflow-x-hidden font-sans">
      <Header />
      <main>
        <AboutHero />
        <AboutMethodology />
        <AboutPrinciples />
      </main>
      <AboutFooter />
    </div>
  );
}
