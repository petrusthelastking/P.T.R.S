import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  ArrowRight, 
  Shield, 
  Leaf, 
  FileText, 
  Zap,
  Palette,
  Flame,
  Laptop,
  Sprout,
  Activity,
  Cpu
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { blockchainProjects, uiProjects, generalProjects } from "@/data/portfolioData";
import { ScrollReveal } from "@/components/common/ScrollReveal";

const allProjects = [...blockchainProjects, ...uiProjects, ...generalProjects];

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.desc,
    openGraph: {
      title: `${project.title} | ptrsdev`,
      description: project.desc,
      type: "article",
      url: `https://ptrsdev.com/portfolio/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ptrsdev`,
      description: project.desc,
    }
  };
}

export async function generateStaticParams() {
  return allProjects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const isCompleted = project.status === "COMPLETED";
  const isUi = project.categories.includes("UI");

  // Map icon based on slug/num
  const getIcon = () => {
    switch (project.num) {
      case "01":
        return <Shield className="w-7 h-7 text-white" />;
      case "02":
        return <Leaf className="w-7 h-7 text-white" />;
      case "03":
        return <FileText className="w-7 h-7 text-white" />;
      case "04":
        return <Palette className="w-7 h-7 text-white" />;
      case "05":
        return <Flame className="w-7 h-7 text-white" />;
      case "06":
        return <Laptop className="w-7 h-7 text-white" />;
      case "07":
        return <Sprout className="w-7 h-7 text-white" />;
      case "08":
        return <Activity className="w-7 h-7 text-white" />;
      case "09":
        return <Cpu className="w-7 h-7 text-white" />;
      default:
        return <Shield className="w-7 h-7 text-white" />;
    }
  };

  // Map background class based on slug/num
  const getIconBg = () => {
    switch (project.num) {
      case "01":
        return "bg-[#0f2142]"; // Dark Blue
      case "02":
        return "bg-[#0e3b24]"; // Dark Green
      case "03":
        return "bg-[#281140]"; // Dark Purple
      case "04":
        return "bg-amber-700"; // Gold
      case "05":
        return "bg-[#d92525]"; // Red accent
      case "06":
        return "bg-sky-600"; // Sky Blue
      case "07":
        return "bg-emerald-600"; // Emerald Green
      case "08":
        return "bg-indigo-600"; // Indigo Blue
      case "09":
        return "bg-zinc-800"; // Dark Zinc
      default:
        return "bg-[#1a1a1a]";
    }
  };

  return (
    <div className="min-h-screen bg-sand text-[#1a1a1a] selection:bg-accent-red selection:text-white overflow-x-hidden font-sans">
      <Header />

      <main className="w-full">
        {/* Main Details Section */}
        <section className="bg-sand pt-8 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            <ScrollReveal direction="up" duration={500}>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-xs font-extrabold text-[#888] hover:text-[#1a1a1a] transition-colors select-none mb-8 group"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 duration-300" />
                <span>Kembali ke Portfolio</span>
              </Link>
            </ScrollReveal>

            {/* Grid Layout: Details vs Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start mt-4">
              
              {/* Left Column: Details Block */}
              <div className="lg:col-span-3 flex flex-col items-start">
                <ScrollReveal direction="up" duration={800} delay={50} className="w-full">
                  {/* Category and Status */}
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
                    <span className="text-[10px] font-bold text-zinc-550 tracking-widest uppercase">
                      {project.categories}
                    </span>
                  </div>

                  {/* Icon Block */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mt-6 shadow-inner ${getIconBg()}`}>
                    {getIcon()}
                  </div>

                  {/* Title */}
                  <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl font-black text-[#1a1a1a] tracking-tight uppercase leading-[0.95] mt-6 select-none">
                    {project.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-xs font-bold text-[#888] tracking-widest uppercase mt-2 select-none">
                    {project.subtitle}
                  </p>

                  {/* Short Description */}
                  <p className="text-sm sm:text-base text-[#444] leading-relaxed mt-6 font-medium max-w-2xl">
                    {project.desc}
                  </p>
                </ScrollReveal>
              </div>

              {/* Right Column: Sidebar */}
              <div className="flex flex-col gap-6 w-full">
                {/* 1. Project Info Card */}
                <ScrollReveal direction="up" duration={800} delay={100} className="w-full">
                  <div className="bg-white/50 border border-border-gray p-6 rounded-2xl flex flex-col gap-5">
                    <div>
                      <span className="text-[9px] font-bold text-zinc-400 tracking-widest uppercase block select-none">YEAR</span>
                      <span className="text-xs font-bold text-[#1a1a1a] mt-1 block">{project.year}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-zinc-400 tracking-widest uppercase block select-none">ROLE</span>
                      <span className="text-xs font-bold text-[#1a1a1a] mt-1 block">{project.role}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-zinc-400 tracking-widest uppercase block select-none">STATUS</span>
                      <span className="text-xs font-bold text-[#1a1a1a] mt-1 block">{isCompleted ? "Completed" : "In Progress"}</span>
                    </div>
                  </div>
                </ScrollReveal>

                {/* 2. Key Specs Card */}
                <ScrollReveal direction="up" duration={800} delay={180} className="w-full">
                  <div className="bg-white/50 border border-border-gray p-6 rounded-2xl flex flex-col gap-3">
                    <span className="text-[9px] font-bold text-zinc-400 tracking-widest uppercase block select-none mb-1">KEY SPECS</span>
                    {project.specs.map((spec) => (
                      <div key={spec.label} className="flex justify-between items-center py-2 border-b border-border-gray/30 last:border-b-0">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{spec.label}</span>
                        <span className="text-[10px] font-extrabold text-[#1a1a1a]">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>

            </div>
          </div>
        </section>

        {/* Content Section (Overview, Impact & Challenges) */}
        <section className="bg-sand pb-24 px-6 border-t border-border-gray/40 pt-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              
              {/* Left Column: Overview */}
              <ScrollReveal direction="up" duration={800} className="flex flex-col items-start">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#888] uppercase block mb-2 select-none">
                  // OVERVIEW
                </span>
                <div className="flex flex-col gap-4 mt-2">
                  {project.overview.map((paragraph, index) => (
                    <p key={index} className="text-sm text-[#555] leading-relaxed font-medium">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </ScrollReveal>

              {/* Right Column: Impact & Challenges */}
              <div className="flex flex-col gap-10">
                {/* Impact Highlight */}
                <ScrollReveal direction="up" duration={800} delay={50} className="w-full">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#888] uppercase block select-none">
                    // IMPACT
                  </span>
                  <div className="border-l-2 border-accent-red pl-4 py-1 italic font-semibold text-sm text-[#333] leading-relaxed mt-4">
                    {project.impact}
                  </div>
                </ScrollReveal>

                {/* Technical Challenges */}
                <ScrollReveal direction="up" duration={800} delay={120} className="w-full">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#888] uppercase block select-none">
                    // TECHNICAL CHALLENGES
                  </span>
                  <div className="flex flex-col gap-5 mt-4">
                    {project.challenges.map((challenge, index) => (
                      <div key={index} className="flex gap-4 items-start text-xs text-[#555] font-semibold leading-relaxed">
                        <span className="text-accent-red font-extrabold font-mono shrink-0 select-none">
                          0{index + 1}
                        </span>
                        <p>{challenge}</p>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>

            </div>
          </div>
        </section>

        {/* System Architecture Section */}
        <section className="bg-[#0c0c0c] text-white py-20 px-6 border-y border-zinc-900">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal direction="up" duration={700}>
              <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase block select-none">
                {isUi ? "// DESIGN WORKFLOW" : "// SYSTEM ARCHITECTURE"}
              </span>
              <div className="bg-[#141414] border border-zinc-900 rounded-2xl p-8 mt-6">
                <div className="font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto whitespace-pre-wrap select-all">
                  {project.architecture}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="bg-sand py-20 px-6 border-b border-border-gray/40">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal direction="up" duration={700}>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#888] uppercase block select-none">
                // TECH STACK
              </span>
              <div className="flex flex-wrap gap-2 mt-6">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-white border border-border-gray text-zinc-700 text-xs font-bold rounded-full select-none hover:bg-zinc-50 hover:border-zinc-400 transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Bottom Pagination & Footer Links */}
        <section className="bg-sand py-12 px-6">
          <div className="max-w-7xl mx-auto border-t border-border-gray/60 pt-12 flex items-center justify-between gap-6">
            {/* Next Project Block */}
            <div className="flex flex-col items-start gap-1">
              <span className="text-[10px] font-bold text-zinc-400 tracking-[0.15em] uppercase select-none">
                // NEXT
              </span>
              <Link
                href={`/portfolio/${project.nextSlug}`}
                className="font-bebas text-3xl sm:text-4xl text-[#1a1a1a] hover:text-accent-red transition-colors duration-350 uppercase flex items-center gap-1.5"
              >
                <span>{project.nextTitle}</span>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </Link>
            </div>

            {/* Back to All Projects */}
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-zinc-500 hover:text-[#1a1a1a] transition-colors uppercase group select-none"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 duration-300" />
              <span>Semua Proyek</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
