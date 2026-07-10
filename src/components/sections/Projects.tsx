import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { blockchainProjects, beyondBlockchainProjects } from "@/data/portfolioData";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function Projects() {
  return (
    <section id="portfolio" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end pb-16 border-b border-border-gray mb-16">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#666] uppercase">
              // SELECTED PROJECTS
            </span>
            <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-none text-[#1a1a1a] tracking-tight uppercase">
              CASE STUDIES
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 lg:justify-self-end w-full lg:w-auto">
            <p className="text-xs sm:text-sm text-[#555] max-w-xs leading-relaxed">
              Tiga sistem blockchain dibangun di atas satu prinsip: data yang tidak bisa dikorupsi, dipalsukan, atau diubah diam-diam.
            </p>
            <Link
              href="#"
              className="group flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#1a1a1a] hover:text-accent-red whitespace-nowrap self-start sm:self-auto"
            >
              <span>Lihat semua proyek</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" />
            </Link>
          </div>
        </div>

        {/* Project List */}
        <div className="flex flex-col gap-8">
          {blockchainProjects.map((project) => (
            <ProjectCard key={project.num} project={project} />
          ))}
        </div>

        {/* Beyond Blockchain Sub-Section */}
        <div className="mt-20">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#666] uppercase block mb-8">
            // BEYOND BLOCKCHAIN
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {beyondBlockchainProjects.map((project) => (
              <div
                key={project.title}
                className="group bg-white/50 border border-border-gray p-8 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-6"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center font-bold text-white text-sm">
                      {project.initialLetter}
                    </div>
                    <span className="text-[10px] font-bold text-accent-red uppercase tracking-wider">
                      {project.role}
                    </span>
                  </div>
                  <h4 className="font-bebas text-2xl text-[#1a1a1a] tracking-wide uppercase">
                    {project.title}
                  </h4>
                  <p className="text-xs text-[#555] leading-relaxed font-medium">
                    {project.desc}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border-gray/30">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[9px] font-bold bg-[#f0eee9] text-[#666] rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default Projects;
