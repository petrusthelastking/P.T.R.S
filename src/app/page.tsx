import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Methodology } from "@/components/sections/Methodology";
import { Projects } from "@/components/sections/Projects";
import { Expertise } from "@/components/sections/Expertise";
import { Evidence } from "@/components/sections/Evidence";
import { LibraryHighlight } from "@/components/sections/LibraryHighlight";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/common/JsonLd";

export default function Home() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://ptrsdev.com/#person",
        "name": "Petrus Tyang Agung Rosario",
        "alternateName": "ptrsdev",
        "jobTitle": "Blockchain Developer & Researcher",
        "url": "https://ptrsdev.com",
        "image": "https://ptrsdev.com/LOGO%20SAYA.png",
        "sameAs": [
          "https://github.com/petrusthelastking",
          "https://linkedin.com"
        ],
        "knowsAbout": [
          "Blockchain Development",
          "Smart Contracts",
          "Solidity",
          "Ethereum",
          "SUI Blockchain",
          "Hyperledger Fabric",
          "Distributed Systems",
          "Cryptography",
          "Internet of Things",
          "Next.js",
          "React",
          "Node.js"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://ptrsdev.com/#website",
        "url": "https://ptrsdev.com",
        "name": "ptrsdev - Portfolio & Blockchain Research Hub",
        "description": "Portofolio profesional Petrus Rosario (ptrsdev) - Blockchain Developer & Researcher.",
        "publisher": {
          "@id": "https://ptrsdev.com/#person"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-sand text-[#1a1a1a] selection:bg-accent-red selection:text-white overflow-x-hidden font-sans">
      <JsonLd data={jsonLdData} />
      <Header />
      <main>
        <Hero />
        <About />
        <Methodology />
        <Projects />
        <LibraryHighlight />
        <Expertise />
        <Evidence />
      </main>
      <Footer />
    </div>
  );
}
