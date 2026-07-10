import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Methodology } from "@/components/sections/Methodology";
import { Projects } from "@/components/sections/Projects";
import { Expertise } from "@/components/sections/Expertise";
import { Evidence } from "@/components/sections/Evidence";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-sand text-[#1a1a1a] selection:bg-accent-red selection:text-white overflow-x-hidden font-sans">
      <Header />
      <main>
        <Hero />
        <About />
        <Methodology />
        <Projects />
        <Expertise />
        <Evidence />
      </main>
      <Footer />
    </div>
  );
}
