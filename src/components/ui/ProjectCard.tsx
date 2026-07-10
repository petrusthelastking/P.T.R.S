import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Project } from "@/data/portfolioData";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isCompleted = project.status === "COMPLETED";

  return (
    <div className="group bg-white/70 hover:bg-white border border-border-gray rounded-3xl p-8 md:p-12 transition-all duration-300 shadow-sm hover:shadow-md grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Info Column */}
      <div className="lg:col-span-3 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border border-border-gray flex items-center justify-center font-bebas text-xl font-bold text-accent-red group-hover:bg-accent-red group-hover:text-white transition-colors duration-300">
            {project.num}
          </div>
          <div className="flex flex-wrap gap-2">
            <span
              className={`px-3 py-1 text-[10px] font-bold rounded-full border uppercase tracking-wide ${
                isCompleted
                  ? "bg-blue-500/10 text-blue-700 border-blue-500/15"
                  : "bg-emerald-500/10 text-emerald-700 border-emerald-500/15"
              }`}
            >
              • {project.status}
            </span>
            <span className="px-3 py-1 text-[10px] font-bold text-zinc-500 tracking-wider uppercase">
              {project.categories}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bebas text-3xl sm:text-4xl text-[#1a1a1a] tracking-wider uppercase">
            {project.title}
          </h3>
          <span className="text-xs font-bold text-[#666] tracking-wider">
            {project.subtitle}
          </span>
          <p className="text-sm text-[#444] leading-relaxed max-w-2xl mt-2 font-medium">
            {project.desc}
          </p>
        </div>

        <div className="flex items-start gap-3 bg-[#fbfbfa] p-4 rounded-xl border border-border-gray/50 max-w-2xl">
          <div className="w-2.5 h-2.5 rounded-full bg-accent-red mt-1.5 shrink-0"></div>
          <span className="text-xs text-[#555] italic leading-relaxed">
            {project.highlight}
          </span>
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-[10px] font-bold bg-[#f0eee9] text-[#555] rounded"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Role & Link Column */}
      <div className="border-t lg:border-t-0 lg:border-l border-border-gray pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between items-start lg:items-end gap-6">
        <div className="flex flex-col lg:items-end gap-1.5">
          <span className="text-[10px] font-bold text-[#888] uppercase tracking-widest">
            ROLE:
          </span>
          <span className="text-xs font-bold text-[#1a1a1a] lg:text-right">
            {project.role}
          </span>
        </div>

        <Link
          href={project.link}
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1a1a1a] hover:text-accent-red"
        >
          <span>Deep Dive</span>
          <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 duration-300" />
        </Link>
      </div>
    </div>
  );
}
