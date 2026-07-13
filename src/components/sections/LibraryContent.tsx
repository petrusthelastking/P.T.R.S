"use client";

import { useState } from "react";
import Link from "next/link";
import { FlaskConical, FileText, Notebook, Lightbulb } from "lucide-react";
import { libraryArticles, activeResearch, LibraryArticle } from "@/data/libraryData";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export function LibraryContent() {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const filterOptions = [
    { name: "RESEARCH", icon: FlaskConical },
    { name: "CASE STUDY", icon: FileText },
    { name: "NOTE", icon: Notebook },
    { name: "IDEA", icon: Lightbulb },
  ];

  const handleFilterClick = (categoryName: string) => {
    if (activeFilter === categoryName) {
      setActiveFilter("ALL"); // Reset if clicked again
    } else {
      setActiveFilter(categoryName);
    }
  };

  const filteredArticles = activeFilter === "ALL" 
    ? libraryArticles 
    : libraryArticles.filter(art => art.category === activeFilter);

  return (
    <div>
      {/* Light Sand Section for Library list */}
      <section className="bg-sand py-24 px-6 border-b border-border-gray">
        <div className="max-w-7xl mx-auto">
          {/* Header Row */}
          <ScrollReveal direction="up" duration={800}>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-16 border-b border-border-gray mb-16 gap-8">
              <div className="flex flex-col gap-2 max-w-2xl">
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#888] uppercase">
                  // KNOWLEDGE BASE
                </span>
                <h1 className="font-bebas text-6xl sm:text-7xl md:text-8xl leading-none text-[#1a1a1a] tracking-tight uppercase">
                  LIBRARY
                </h1>
                <p className="text-xs sm:text-[13px] text-[#555] font-medium leading-relaxed mt-2">
                  Kumpulan riset, catatan, dan analisis seputar blockchain &mdash; dari smart contract security hingga tokenisasi aset nyata. Diperbarui secara berkala.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-row flex-wrap gap-3 items-center justify-start lg:justify-end select-none">
                {filterOptions.map((opt) => {
                  const IconComponent = opt.icon;
                  const isActive = activeFilter === opt.name;
                  return (
                    <button
                      key={opt.name}
                      onClick={() => handleFilterClick(opt.name)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-[#1a1a1a] border-[#1a1a1a] text-white shadow-sm"
                          : "border-border-gray bg-white/40 text-gray-500 hover:text-[#1a1a1a] hover:border-[#1a1a1a]"
                      }`}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                      <span>{opt.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Articles Listing */}
          <div className="flex flex-col gap-8">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, index) => {
                let badgeClass = "";
                if (article.status === "PUBLISHED") {
                  badgeClass = "bg-emerald-500/10 border-emerald-500/20 text-emerald-800";
                } else if (article.status === "IN PROGRESS") {
                  badgeClass = "bg-blue-500/10 border-blue-500/20 text-blue-800";
                } else {
                  badgeClass = "bg-accent-red/10 border-accent-red/20 text-accent-red";
                }

                return (
                  <ScrollReveal
                    key={article.title}
                    direction="up"
                    delay={index * 100}
                    duration={700}
                  >
                    <div className="flex items-start gap-4 sm:gap-6">
                      {/* Left Index Number */}
                      <span className="font-mono text-xs font-bold text-zinc-400 pt-2 shrink-0 select-none w-6 sm:w-8">
                        {article.index}
                      </span>

                      {/* Content Card Container */}
                      <Link
                        href={article.link}
                        className="flex-1 bg-white/40 border border-border-gray/60 rounded-3xl p-8 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 relative group cursor-pointer"
                      >
                        <div className="flex-1">
                          {/* Metadata row */}
                          <div className="flex items-center gap-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase border tracking-wider select-none ${badgeClass}`}>
                              {article.status}
                            </span>
                            <span className="text-[10px] font-bold text-zinc-500 tracking-wider uppercase select-none">
                              {article.category} {article.year}
                            </span>
                          </div>

                          {/* Title */}
                          <h2 className="font-bebas text-3xl sm:text-4xl text-[#1a1a1a] tracking-wide mt-4 uppercase leading-none group-hover:text-accent-red transition-colors duration-300">
                            {article.title}
                          </h2>

                          {/* Description */}
                          <p className="text-xs sm:text-[13px] text-[#555] font-medium leading-relaxed mt-3 max-w-3xl">
                            {article.desc}
                          </p>

                          {/* Tags Grid */}
                          <div className="flex flex-wrap gap-2 mt-5">
                            {article.tags.map((t) => (
                              <span
                                key={t}
                                className="bg-[#eae8e4]/50 border border-border-gray/60 px-3 py-1 rounded-full text-[9px] font-extrabold text-gray-500 uppercase tracking-wide select-none"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Read link arrow right */}
                        <div
                          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1a1a1a] group-hover:text-accent-red transition-colors shrink-0 select-none self-end md:self-auto group-hover:translate-x-1 transform duration-300"
                        >
                          <span className="border-b-2 border-transparent group-hover:border-current py-0.5">Baca</span>
                          <span className="text-[14px]">&rarr;</span>
                        </div>
                      </Link>
                    </div>
                  </ScrollReveal>
                );
              })
            ) : (
              <div className="text-center py-12 border border-dashed border-border-gray rounded-3xl text-zinc-400 font-bold text-xs uppercase select-none">
                Tidak ada artikel dalam kategori ini.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Dark Active Research Section */}
      <section className="bg-dark-bg text-white py-24 px-6 border-b border-zinc-900 select-none">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Title Grid */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            <ScrollReveal direction="up" duration={700}>
              <span className="text-[11px] font-bold tracking-[0.2em] text-accent-red uppercase">
                // ACTIVE RESEARCH
              </span>
              <h2 className="font-bebas text-6xl sm:text-7xl font-extrabold leading-[0.85] tracking-tight uppercase flex flex-col mt-2">
                <span>SEDANG</span>
                <span className="text-accent-red">DITELITI</span>
              </h2>
            </ScrollReveal>
          </div>

          {/* Right Listings Grid */}
          <div className="lg:col-span-8 flex flex-col border-t border-zinc-800">
            {activeResearch.map((item, index) => (
              <ScrollReveal
                key={item}
                direction="up"
                delay={index * 100}
                duration={700}
              >
                <div className="flex items-start gap-4 py-8 border-b border-zinc-800/80 hover:bg-zinc-900/10 transition-colors duration-300 group">
                  <span className="font-mono text-xs font-bold text-zinc-700 pt-0.5 shrink-0">
                    {`0${index + 1}`}
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed group-hover:text-white transition-colors duration-300">
                    {item}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
export default LibraryContent;
