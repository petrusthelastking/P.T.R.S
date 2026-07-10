import { aboutTags } from "@/data/portfolioData";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export function About() {
  return (
    <section id="about" className="bg-[#f0eee9] border-y border-border-gray py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Column */}
        <ScrollReveal direction="up" delay={0} duration={800}>
          <div className="flex flex-col items-start gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#666] uppercase">
                // ABOUT
              </span>
              <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-[0.9] text-[#1a1a1a] tracking-tight">
                NOT JUST A DEV. <br />
                <span className="text-accent-red">A RESEARCHER.</span>
              </h2>
            </div>

            <div className="border-l-[3px] border-accent-red pl-6 py-1 my-2 text-lg sm:text-xl font-medium italic text-[#1a1a1a] leading-relaxed">
              &ldquo;Saya tidak hanya menulis smart contracts — saya mempelajari mengapa distributed systems gagal, lalu membangun agar tidak terjadi.&rdquo;
            </div>

            {/* Tags Grid */}
            <div className="flex flex-wrap gap-2.5 mt-2">
              {aboutTags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white/60 border border-border-gray/80 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-[#1a1a1a] hover:text-white transition-all cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Right Column */}
        <ScrollReveal direction="up" delay={150} duration={800}>
          <div className="flex flex-col justify-between gap-10">
            <div className="flex flex-col gap-8">
              {/* Who I Am */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold tracking-widest text-accent-red uppercase">
                  // WHO I AM
                </span>
                <p className="text-sm text-[#444] leading-relaxed font-medium">
                  Saya adalah blockchain developer sekaligus peneliti yang fokus pada satu pertanyaan besar: bagaimana kita membangun sistem di mana kepercayaan tidak lagi bergantung pada satu pihak tunggal yang bisa salah, korup, atau gagal?
                </p>
              </div>

              {/* What I Build */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold tracking-widest text-accent-red uppercase">
                  // WHAT I BUILD
                </span>
                <p className="text-sm text-[#444] leading-relaxed font-medium">
                  Proyek-proyek saya bergerak di persimpangan antara kriptografi, sistem terdistribusi, dan antarmuka pengguna — dari protokol notarisasi dokumen (BlockNotary), tokenisasi kredit karbon (VeriChain), hingga sistem audit transaksi immutable (AuditChain). Di luar blockchain, saya juga membangun sistem IoT untuk Smart Farming dan Smart Monitoring.
                </p>
              </div>

              {/* How I'm Different */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold tracking-widest text-accent-red uppercase">
                  // HOW I&apos;M DIFFERENT
                </span>
                <p className="text-sm text-[#444] leading-relaxed font-medium">
                  Sebagian besar blockchain developer berhenti di layer smart contract. Saya bekerja melintasi seluruh stack — dari desain protokol kriptografis, Solidity/Go chaincode, backend Node.js, hingga dashboard frontend yang terhubung langsung ke chain. Satu titik kontak untuk seluruh arsitektur.
                </p>
              </div>
            </div>

            {/* Collaboration pill */}
            <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-800 self-start">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Saat ini open untuk kolaborasi — riset, freelance, maupun proyek jangka panjang.</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
export default About;
