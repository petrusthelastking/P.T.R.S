import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analisis Blockchain SUI & Benchmark Move Contract",
  description: "Riset dan benchmark performa blockchain SUI. Analisis gas optimization smart contract Sui Move, latency benchmark, dan chaos testing.",
  openGraph: {
    title: "Analisis Blockchain SUI & Benchmark Move Contract | ptrsdev",
    description: "Riset mendalam performa blockchain SUI dan optimalisasi gas Move smart contract.",
    type: "article",
    url: "https://ptrsdev.com/library/riset-blockchain/analisis-blockchain-sui",
  }
};

export default function SuiResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
