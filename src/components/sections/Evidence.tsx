import { HelpCircle } from "lucide-react";
import { stats, principles } from "@/data/portfolioData";

export function Evidence() {
  return (
    <section id="library" className="py-24 px-6 bg-[#f0eee9] border-b border-border-gray">
      <div className="max-w-7xl mx-auto">
        {/* Header Row */}
        <div className="flex flex-col gap-2 pb-16 border-b border-border-gray mb-16">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#666] uppercase">
            // EVIDENCE
          </span>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-none text-[#1a1a1a] tracking-tight uppercase">
            TRACK RECORD
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pb-16 border-b border-border-gray/80">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-2 p-6 rounded-2xl bg-white/40 border border-border-gray/60 hover:bg-white transition-all duration-300"
            >
              <span className="font-bebas text-5xl sm:text-6xl text-accent-red font-black leading-none">
                {stat.num === "∞" ? <span dangerouslySetInnerHTML={{ __html: "&infin;" }} /> : stat.num}
              </span>
              <span className="text-[10px] font-bold text-[#1a1a1a] uppercase tracking-wider">
                {stat.label}
              </span>
              <span className="text-[9px] text-[#666]">
                {stat.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Lower Grid (Focus & Working Principle) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16 pb-16 border-b border-border-gray/80">
          {/* Research Focus */}
          <div className="flex flex-col gap-4">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#666] uppercase">
              // RESEARCH FOCUS
            </span>
            <h3 className="font-bold text-lg text-[#1a1a1a]">
              Blockchain for Data Integrity & Real-World Asset Tokenization
            </h3>
            <p className="text-sm text-[#555] leading-relaxed font-medium">
              Riset saya mengeksplorasi bagaimana distributed ledger technology dapat menggantikan sistem verifikasi berbasis kepercayaan — dari dokumen notarisasi (BlockNotary) hingga pasar karbon sukarela (VeriChain). Benang merahnya: jadikan korupsi tidak mungkin secara kriptografis, bukan sekadar dilarang secara organisasi.
            </p>
          </div>

          {/* Working Principle */}
          <div className="flex flex-col gap-4">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#666] uppercase">
              // WORKING PRINCIPLE
            </span>
            <div className="flex flex-col gap-6">
              {principles.map((p) => (
                <div key={p.title} className="flex flex-col gap-1.5 pl-4 border-l-2 border-accent-red">
                  <h4 className="text-sm font-bold text-[#1a1a1a]">
                    {p.title}
                  </h4>
                  <p className="text-xs text-[#555] font-medium">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial Quote Banner */}
        <div className="mt-16 bg-white/40 border border-border-gray/80 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white hover:shadow-md transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full border border-border-gray bg-white flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5 text-accent-red" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-[#444] italic font-medium leading-relaxed max-w-2xl">
                &ldquo;Testimonial dari kolaborator, supervisor, atau klien akan muncul di sini — kutipan langsung yang memvalidasi kualitas dan dampak pekerjaan.&rdquo;
              </p>
              <span className="text-[10px] font-bold text-[#888] uppercase tracking-widest mt-2">
                NAMA · ROLE · INSTITUSI
              </span>
            </div>
          </div>
          <span className="text-[10px] font-black text-[#888] tracking-widest border border-dashed border-[#888] px-3.5 py-1.5 rounded-lg whitespace-nowrap self-start md:self-auto uppercase">
            COMING SOON
          </span>
        </div>
      </div>
    </section>
  );
}
export default Evidence;
