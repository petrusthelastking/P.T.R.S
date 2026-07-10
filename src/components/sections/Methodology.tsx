import {
  Search,
  Settings,
  Code,
  ShieldAlert,
  Eye,
  ShieldCheck
} from "lucide-react";
import { methodologySteps } from "@/data/portfolioData";

const iconMap = {
  Search,
  Settings,
  Code,
  ShieldAlert,
  Eye,
  ShieldCheck
};

export function Methodology() {
  return (
    <section className="bg-[#0c0c0c] text-white py-24 px-6 border-b border-zinc-850">
      <div className="max-w-7xl mx-auto">
        {/* Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end pb-16 border-b border-zinc-800 mb-16">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold tracking-[0.2em] text-accent-red uppercase">
              // METHODOLOGY
            </span>
            <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-[0.9] text-white tracking-tight uppercase">
              HOW I <br />
              <span className="text-accent-red">WORK</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-400 max-w-md lg:justify-self-end">
            Dari riset hingga mainnet — setiap tahap punya output yang terukur, bukan sekadar &ldquo;progress&rdquo;.
          </p>
        </div>

        {/* Horizontal rows list (01 to 06 phases) */}
        <div className="flex flex-col border-t border-zinc-800">
          {methodologySteps.map((step) => {
            const StepIcon = iconMap[step.iconName];
            return (
              <div
                key={step.num}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-8 border-b border-zinc-800 hover:bg-zinc-900/10 transition-all duration-300 items-start group"
              >
                {/* Left: Number and Phase/Title */}
                <div className="lg:col-span-4 flex items-start gap-4">
                  <span className="font-bebas text-4xl text-zinc-700 group-hover:text-accent-red transition-colors duration-300">
                    {step.num}
                  </span>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-accent-red tracking-wider uppercase">
                      <StepIcon className="w-3 h-3" />
                      <span>{step.phase}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white tracking-wider group-hover:text-accent-red transition-colors duration-300">
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* Center: Description */}
                <div className="lg:col-span-5 text-xs text-zinc-400 leading-relaxed font-medium">
                  {step.desc}
                </div>

                {/* Right: Output */}
                <div className="lg:col-span-3 flex flex-col gap-1">
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                    Output:
                  </span>
                  <span className="text-[10px] text-zinc-300 font-medium leading-normal">
                    {step.out}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-16 pt-10 border-t border-zinc-800 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <span className="text-xs font-bold tracking-[0.2em] text-accent-red uppercase">
            // WHY THIS PROCESS MATTERS
          </span>
          <p className="lg:col-span-3 text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Smart contract bugs tidak seperti bug software biasa — mereka tidak bisa di-patch setelah deployed dan bisa menguras seluruh dana protokol dalam satu transaksi. Proses ini ada karena saya pernah membaca post-mortems dari protokol yang kehilangan jutaan dolar akibat reentrancy attack sederhana yang seharusnya tertangkap di tahap audit.
          </p>
        </div>
      </div>
    </section>
  );
}
export default Methodology;
