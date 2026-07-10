import { stackMatrix } from "@/data/portfolioData";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export function Expertise() {
  return (
    <section className="bg-sand border-y border-border-gray py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Row */}
        <ScrollReveal direction="up" duration={800}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end pb-16 border-b border-border-gray mb-16">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#666] uppercase">
                // EXPERTISE
              </span>
              <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-[0.9] text-[#1a1a1a] tracking-tight uppercase">
                STACK <br />
                <span className="text-accent-red">MATRIX</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#555] max-w-sm lg:justify-self-end leading-relaxed">
              Tools dikelompokkan per disiplin — bukan berdasarkan estetika logo.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Columns Grid Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-border-gray divide-y md:divide-y-0 md:divide-x divide-border-gray bg-white/20">
          {stackMatrix.map((category, index) => (
            <ScrollReveal
              key={category.title}
              direction="up"
              delay={index * 100}
              duration={700}
              className="h-full"
            >
              <div
                className="flex flex-col gap-4 p-8 hover:bg-white transition-all duration-300 h-full"
              >
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-accent-red"></div>
                  <h3 className="text-xs font-bold tracking-widest text-[#1a1a1a] uppercase">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="border-b border-border-gray hover:border-[#1a1a1a] py-0.5 text-xs text-[#555] hover:text-[#1a1a1a] transition-all cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Why it Matters Row */}
        <ScrollReveal direction="up" duration={800} delay={150}>
          <div className="mt-16 pt-10 border-t border-border-gray grid grid-cols-1 lg:grid-cols-4 gap-8">
            <span className="text-xs font-bold tracking-[0.2em] text-[#666] uppercase">
              // WHY THIS MATTERS
            </span>
            <p className="lg:col-span-3 text-xs sm:text-sm text-[#555] leading-relaxed font-medium">
              Sebagian besar blockchain developer hanya beroperasi di layer smart contract. Saya melintasi desain protokol kriptografis, enterprise distributed systems, dan consumer-facing UI — artinya saya bisa merancang sistem, menulis kontrak, membangun dashboard, dan mengamankan server yang menjalankannya.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
export default Expertise;
