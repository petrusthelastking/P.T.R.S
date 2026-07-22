"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, AlertCircle, Terminal, Globe, Layers, Cpu, Database } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { AboutFooter } from "@/components/sections/AboutFooter";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export default function CelestiaResearchDetailPage() {
  const [lang, setLang] = useState<"id" | "en">("id");
  const [activeTab, setActiveTab] = useState<"submit" | "metrics">("submit");
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; blobSize: string; throughput: number; dasLatency: number } | null>(null);

  // SVG Chart data: Throughput (MB/s) and DAS Latency (ms) vs Blob Size
  const chartWidth = 500;
  const chartHeight = 250;
  const padding = 40;

  const chartData = [
    { blobSize: "64 KB", throughput: 0.8, dasLatency: 85 },
    { blobSize: "256 KB", throughput: 2.4, dasLatency: 120 },
    { blobSize: "512 KB", throughput: 4.1, dasLatency: 180 },
    { blobSize: "1 MB", throughput: 6.8, dasLatency: 290 },
    { blobSize: "2 MB", throughput: 9.5, dasLatency: 460 }
  ];

  // Helper to map chart points
  const getCoordsThroughput = (index: number, val: number) => {
    const x = padding + (index / (chartData.length - 1)) * (chartWidth - padding * 2);
    const y = chartHeight - padding - (val / 12) * (chartHeight - padding * 2);
    return { x, y };
  };

  const getCoordsLatency = (index: number, val: number) => {
    const x = padding + (index / (chartData.length - 1)) * (chartWidth - padding * 2);
    const y = chartHeight - padding - (val / 600) * (chartHeight - padding * 2);
    return { x, y };
  };

  const linePathThroughput = chartData.map((d, i) => {
    const { x, y } = getCoordsThroughput(i, d.throughput);
    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ");

  const linePathLatency = chartData.map((d, i) => {
    const { x, y } = getCoordsLatency(i, d.dasLatency);
    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ");

  const sections = [
    { id: "abstract", labelId: "Abstract", labelEn: "Abstract" },
    { id: "pendahuluan", labelId: "1. Pendahuluan", labelEn: "1. Introduction" },
    { id: "arsitektur", labelId: "2. Arsitektur Celestia", labelEn: "2. Celestia Architecture" },
    { id: "metodologi", labelId: "3. Metodologi", labelEn: "3. Methodology" },
    { id: "implementasi", labelId: "4. Deployment Modular", labelEn: "4. Modular Deployment" },
    { id: "evaluasi", labelId: "5. Hasil Evaluasi DA", labelEn: "5. DA Evaluation Results" },
    { id: "diskusi", labelId: "6. Perbandingan & Blobstream", labelEn: "6. Comparison & Blobstream" },
    { id: "kesimpulan", labelId: "7. Kesimpulan", labelEn: "7. Conclusion" },
    { id: "lampiran", labelId: "Lampiran Kode", labelEn: "Code Appendix" }
  ];

  const submitBlobScript = `#!/usr/bin/env bash
# submit-blob.sh - Submit blob data to Celestia DA layer via Bridge RPC
set -euo pipefail

PROJECT_DIR="/home/ubuntu/lxc-manager/projects/celestia-research"
BRIDGE_STORE="$PROJECT_DIR/data/localnet/bridge"
BRIDGE_RPC="http://127.0.0.1:26658"

BLOB_SIZE=256
GAS_PRICE="0.002"

generate_namespace() {
  python3 -c "import base64, os; print(base64.b64encode(bytes([0])+bytes([0])*18+os.urandom(10)).decode())"
}

generate_blob_data() {
  local size=$1
  python3 -c "import base64, os; print(base64.b64encode(os.urandom($size)).decode())"
}

TOKEN=$(celestia bridge auth admin --p2p.network private --node.store "$BRIDGE_STORE" 2>/dev/null)
NS_B64=$(generate_namespace)
DATA_B64=$(generate_blob_data "$BLOB_SIZE")

curl -s -X POST "$BRIDGE_RPC" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d "{
    \\"id\\": 1,
    \\"jsonrpc\\": \\"2.0\\",
    \\"method\\": \\"blob.Submit\\",
    \\"params\\": [
      [{
        \\"namespace\\": \\"$NS_B64\\",
        \\"data\\": \\"$DATA_B64\\",
        \\"share_version\\": 0
      }],
      {\\"gas_price\\": $GAS_PRICE, \\"gas\\": 210000}
    ]
  }"`;

  const metricsScript = `#!/usr/bin/env bash
# collect-metrics.sh - Monitor CPU, RAM, Disk I/O, and Network for Celestia Nodes
set -euo pipefail

DURATION=\${1:-60}
INTERVAL=\${2:-2}
OUTPUT="/home/ubuntu/lxc-manager/projects/celestia-research/data/system_metrics.csv"

echo "timestamp,elapsed_s,cpu_user_pct,mem_pct,validator_cpu,bridge_cpu,light_cpu,block_height" > "$OUTPUT"

START_TIME=$(date +%s)
ELAPSED=0

while [ $ELAPSED -lt $DURATION ]; do
  sleep "$INTERVAL"
  ELAPSED=$(($(date +%s) - START_TIME))
  NOW=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

  CPU=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
  MEM=$(free -m | awk '/Mem:/{printf "%.1f", $3/$2*100}')

  VAL_CPU=$(ps -C celestia-appd -o %cpu --no-headers 2>/dev/null | xargs || echo "0")
  BR_CPU=$(pgrep -f "celestia bridge" | xargs ps -o %cpu -p 2>/dev/null | tail -1 | xargs || echo "0")
  LT_CPU=$(pgrep -f "celestia light" | xargs ps -o %cpu -p 2>/dev/null | tail -1 | xargs || echo "0")

  BH=$(curl -s http://127.0.0.1:26657/status | jq -r '.result.sync_info.latest_block_height' 2>/dev/null || echo "0")

  echo "$NOW,$ELAPSED,$CPU,$MEM,$VAL_CPU,$BR_CPU,$LT_CPU,$BH" >> "$OUTPUT"
done`;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-sand text-[#1a1a1a] selection:bg-accent-red selection:text-white overflow-x-hidden font-sans">
      <Header />

      <main className="w-full pt-8 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Top Bar: Back link & Language Switcher */}
          <ScrollReveal direction="up" duration={500}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <Link
                href="/library/riset-blockchain"
                className="inline-flex items-center gap-2 text-xs font-extrabold text-[#888] hover:text-[#1a1a1a] transition-colors select-none group"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 duration-300" />
                <span>{lang === "id" ? "Kembali ke Riset Blockchain" : "Back to Blockchain Research"}</span>
              </Link>

              {/* Language Switcher Button */}
              <div className="flex items-center gap-1.5 bg-white/70 border border-border-gray/80 rounded-full p-1 shadow-sm select-none">
                <Globe className="w-3.5 h-3.5 text-accent-red ml-2" />
                <button
                  onClick={() => setLang("id")}
                  className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    lang === "id"
                      ? "bg-[#1a1a1a] text-white shadow-sm"
                      : "text-zinc-500 hover:text-[#1a1a1a]"
                  }`}
                >
                  🇮🇩 Bahasa Indonesia
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    lang === "en"
                      ? "bg-[#1a1a1a] text-white shadow-sm"
                      : "text-zinc-500 hover:text-[#1a1a1a]"
                  }`}
                >
                  🇬🇧 English
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Page Title */}
          <ScrollReveal direction="up" duration={800} delay={100}>
            <div className="flex flex-col gap-3 pb-8 border-b border-border-gray mb-12">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold tracking-[0.22em] text-accent-red uppercase">
                  // MODULAR BLOCKCHAIN RESEARCH REPORT
                </span>
                <span className="px-2 py-0.5 rounded bg-zinc-200/60 text-zinc-700 font-mono text-[9px] font-bold uppercase tracking-wider">
                  BILINGUAL VERSION (ID / EN)
                </span>
              </div>
              <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-[0.95] text-[#1a1a1a] tracking-tight uppercase">
                {lang === "id"
                  ? "ANALISIS MENDALAM CELESTIA: ARSITEKTUR, DEPLOYMENT MODULAR, DAN BENCHMARKING KETERSEDIAAN DATA"
                  : "DEEP DIVE CELESTIA NETWORK ANALYSIS: ARCHITECTURE, MODULAR DEPLOYMENT, AND DATA AVAILABILITY BENCHMARKING"}
              </h1>
              <p className="text-base sm:text-lg text-zinc-550 font-medium leading-relaxed max-w-4xl italic mt-1">
                {lang === "id"
                  ? "Pemisahan Konsensus dan Eksekusi, Data Availability Sampling (DAS), 2D Reed-Solomon Erasure Coding, serta Pengujian Performa Blob"
                  : "Decoupling Consensus and Execution, Data Availability Sampling (DAS), 2D Reed-Solomon Erasure Coding, and Blob Performance Benchmarking"}
              </p>
            </div>
          </ScrollReveal>

          {/* Grid Layout: Sidebar and Main Article */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* LEFT COLUMN: Sidebar (25% on desktop, spans 3 cols) */}
            <div className="lg:col-span-3 lg:sticky lg:top-28 flex flex-col gap-8 order-2 lg:order-1">
              {/* Metadata Card */}
              <ScrollReveal direction="up" duration={700} delay={150}>
                <div className="bg-white/45 border border-border-gray/70 rounded-3xl p-6 flex flex-col gap-4 shadow-sm">
                  <h4 className="text-[10px] font-extrabold tracking-widest text-[#1a1a1a] uppercase pb-2 border-b border-border-gray/60">
                    {lang === "id" ? "METADATA RISET" : "RESEARCH METADATA"}
                  </h4>
                  <div className="flex flex-col gap-3 text-xs">
                    <div>
                      <span className="text-[#888] block font-bold text-[9px] uppercase tracking-wider mb-0.5">
                        {lang === "id" ? "Penulis" : "Author"}
                      </span>
                      <span className="font-semibold text-zinc-800">Petrus Tyang Agung Rosario</span>
                    </div>
                    <div>
                      <span className="text-[#888] block font-bold text-[9px] uppercase tracking-wider mb-0.5">
                        {lang === "id" ? "Peran" : "Role"}
                      </span>
                      <span className="font-semibold text-zinc-800">
                        {lang === "id" ? "Peneliti Blockchain Independen" : "Independent Blockchain Researcher"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#888] block font-bold text-[9px] uppercase tracking-wider mb-0.5">
                        {lang === "id" ? "Tanggal Terbit" : "Published Date"}
                      </span>
                      <span className="font-semibold text-zinc-800 font-mono">
                        {lang === "id" ? "Juli 2026" : "July 2026"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#888] block font-bold text-[9px] uppercase tracking-wider mb-0.5">
                        {lang === "id" ? "Estimasi Baca" : "Est. Read Time"}
                      </span>
                      <span className="font-semibold text-zinc-800">
                        {lang === "id" ? "20 Menit" : "20 Mins"}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Table of Contents / Outline */}
              <ScrollReveal direction="up" duration={700} delay={200}>
                <div className="bg-white/45 border border-border-gray/70 rounded-3xl p-6 flex flex-col gap-3 shadow-sm">
                  <h4 className="text-[10px] font-extrabold tracking-widest text-[#1a1a1a] uppercase pb-2 border-b border-border-gray/60">
                    {lang === "id" ? "DAFTAR ISI" : "TABLE OF CONTENTS"}
                  </h4>
                  <nav className="flex flex-col gap-2">
                    {sections.map((sec) => (
                      <button
                        key={sec.id}
                        onClick={() => scrollToSection(sec.id)}
                        className="text-left text-xs font-semibold text-zinc-550 hover:text-accent-red hover:translate-x-0.5 transition-all duration-200 cursor-pointer"
                      >
                        {lang === "id" ? sec.labelId : sec.labelEn}
                      </button>
                    ))}
                  </nav>
                </div>
              </ScrollReveal>

              {/* Download PDF Card */}
              <ScrollReveal direction="up" duration={700} delay={250}>
                <div className="bg-[#0c0c0c] border border-zinc-850 rounded-3xl p-6 flex flex-col gap-4 text-white shadow-md">
                  <div>
                    <span className="text-accent-red font-black text-[9px] uppercase tracking-widest mb-1 block">// DOWNLOAD AREA</span>
                    <h5 className="font-bebas text-xl uppercase tracking-wide text-white leading-none">
                      {lang === "id" ? "DOKUMEN PDF ASLI" : "ORIGINAL PDF DOCUMENTS"}
                    </h5>
                    <p className="text-[10px] text-zinc-400 font-medium leading-normal mt-2">
                      {lang === "id"
                        ? "Unduh naskah lengkap hasil riset akademis Celestia ini dalam versi Bahasa Indonesia atau Bahasa Inggris:"
                        : "Download the complete academic research paper on Celestia in Bahasa Indonesia or English:"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <a
                      href="/Riset Blockchain CELESTIA (Indonesia).pdf"
                      download="Riset Blockchain Celestia (Bahasa Indonesia).pdf"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-white hover:bg-[#eae8e4] text-[#1a1a1a] font-extrabold text-xs uppercase tracking-wider transition-colors duration-300 shadow-md active:scale-[0.98] transform group"
                    >
                      <Download className="w-3.5 h-3.5 text-accent-red group-hover:translate-y-0.5 transition-transform" />
                      <span>Bahasa Indonesia (PDF)</span>
                    </a>
                    <a
                      href="/Riset Blockchain CELESTIA (Inggris).pdf"
                      download="Celestia Blockchain Research (English Version).pdf"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-wider transition-colors duration-300 shadow-md active:scale-[0.98] transform group"
                    >
                      <Download className="w-3.5 h-3.5 text-accent-red group-hover:translate-y-0.5 transition-transform" />
                      <span>English Version (PDF)</span>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* RIGHT COLUMN: Main Article (75% on desktop, spans 9 cols) */}
            <div className="lg:col-span-9 flex flex-col gap-16 order-1 lg:order-2 text-justify">

              {/* ABSTRACT SECTION */}
              <article id="abstract" className="scroll-mt-28">
                <ScrollReveal direction="up" duration={800}>
                  <div className="bg-white/55 border border-border-gray/70 rounded-3xl p-8 shadow-sm">
                    <h3 className="font-bebas text-2xl text-accent-red uppercase tracking-wider mb-4">ABSTRACT</h3>
                    <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-semibold italic">
                      {lang === "id"
                        ? "Arsitektur blockchain monolitik menghadapi hambatan skalabilitas yang mendasar karena membebankan tugas eksekusi smart contract, pengurutan konsensus, dan ketersediaan data (Data Availability/DA) pada satu set validator yang sama. Celestia hadir sebagai pionir arsitektur blockchain modular dengan memisahkan lapisan eksekusi dari lapisan konsensus dan ketersediaan data. Laporan riset ini mengeksplorasi secara empiris inovasi Celestia, termasuk Data Availability Sampling (DAS), 2D Reed-Solomon Erasure Coding, dan Namespaced Merkle Trees (NMT). Kami mendeploy jaringan multi-node Celestia (Validator, Bridge Node, dan Light Node) dalam lingkungan kontainer terkendali untuk menguji throughput injeksi blob data, latensi verifikasi sampel oleh Light Node, serta ketahanan rekonstruksi data saat terjadi kehilangan paket. Hasil pengujian menunjukkan bahwa Celestia mampu memverifikasi ketersediaan megabyte data blob hanya dalam waktu sub-detik melalui sampel acak berukuran sangat kecil tanpa perlu mengunduh seluruh isi blok."
                        : "Monolithic blockchain architectures encounter severe scalability bottlenecks by placing smart contract execution, consensus ordering, and data availability (DA) upon the exact same validator set. Celestia pioneers a modular blockchain paradigm by decoupling execution from consensus and data availability. This research paper empirically investigates Celestia's core technical innovations, including Data Availability Sampling (DAS), 2D Reed-Solomon Erasure Coding, and Namespaced Merkle Trees (NMTs). We document the deployment of a containerized local multi-node Celestia network (Validator, Bridge Node, and Light Nodes) to benchmark blob submission throughput, Light Node sampling verification latency, and data reconstruction resilience under loss scenarios. Our empirical findings demonstrate that Celestia enables light nodes to verify megabytes of blob data availability within sub-second thresholds through minimal random sampling without downloading full block payloads."}
                    </p>
                  </div>
                </ScrollReveal>
              </article>

              {/* 1. PENDAHULUAN */}
              <article id="pendahuluan" className="scroll-mt-28 flex flex-col gap-4">
                <ScrollReveal direction="up" duration={800}>
                  <h2 className="font-bebas text-3xl sm:text-4xl text-[#1a1a1a] tracking-wide border-b border-border-gray pb-2 uppercase">
                    {lang === "id" ? "1. Pendahuluan" : "1. Introduction"}
                  </h2>
                  <div className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-4 flex flex-col gap-4">
                    {lang === "id" ? (
                      <>
                        <p>
                          Perkembangan ekosistem Web3 dan aplikasi terdesentralisasi (dApps) mendorong kebutuhan akan infrastruktur blockchain yang mampu menangani jutaan transaksi per detik dengan biaya yang sangat rendah. Namun, jaringan Layer 1 tradisional (monolitik) seperti Ethereum Layer 1 mewajibkan setiap node validator untuk mengunduh seluruh transaksi, mengeksekusi logika smart contract, dan menyimpannya di dalam penyimpanan ledger global. Akibatnya, peningkatan kapasitas blok secara langsung meningkatkan persyaratan perangkat keras node, yang dapat memicu sentralisasi validator.
                        </p>
                        <p>
                          Untuk mengatasi masalah ketersediaan data pada Layer 2 (Rollups), Celestia memperkenalkan paradigma **Modular Blockchain**. Alih-alih mengeksekusi smart contract secara native, Celestia berfokus secara murni pada dua tugas utama: mengurutkan transaksi (*consensus*) dan menjamin ketersediaan data transaksi (*data availability*). Pengembang dapat mendeploy Rollup independen (EVM, SVM, atau CosmWasm) di atas Celestia, di mana Celestia bertindak sebagai *plumbing data* berkecepatan tinggi.
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          The growth of the Web3 ecosystem and decentralized applications (dApps) drives an urgent demand for blockchain infrastructure capable of supporting millions of transactions per second at near-zero costs. However, traditional monolithic Layer 1 networks (e.g., Ethereum L1) force every validator node to download all transactions, execute complex smart contract state transitions, and maintain the global state ledger. Consequently, increasing block sizes raises hardware requirements for full nodes, threatening network decentralization.
                        </p>
                        <p>
                          To solve the Data Availability (DA) bottleneck for Layer 2 scaling (Rollups), Celestia introduces the **Modular Blockchain** paradigm. Instead of executing smart contract transactions natively, Celestia functions strictly as a consensus and data availability layer. Developers can launch independent execution rollups (EVM, SVM, or CosmWasm) on top of Celestia, leveraging Celestia as high-throughput, cheap data availability plumbing.
                        </p>
                      </>
                    )}
                  </div>
                </ScrollReveal>

                {/* Sub 1.1 Motivasi */}
                <ScrollReveal direction="up" duration={800} delay={50} className="mt-4">
                  <h3 className="font-bold text-sm text-[#1a1a1a] uppercase tracking-wider border-l-2 border-accent-red pl-3">
                    {lang === "id" ? "1.1 Motivasi dan Tujuan Penelitian" : "1.1 Research Motivation and Objectives"}
                  </h3>
                  {lang === "id" ? (
                    <>
                      <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-3">
                        Meskipun klaim teoretis Data Availability Sampling (DAS) milik Celestia telah dipublikasikan dalam berbagai makalah akademis (Al-Bassam et al.), terdapat kebutuhan nyata untuk memverifikasi performa praktis Celestia di bawah kondisi injeksi blob berukuran besar dan pengujian kegagalan jaringan lokal. Penelitian ini bertujuan untuk:
                      </p>
                      <ul className="list-decimal pl-5 text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-3 flex flex-col gap-2">
                        <li>Menganalisis arsitektur ketersediaan data Celestia (DAS, 2D Reed-Solomon, dan Namespaced Merkle Trees).</li>
                        <li>Mendeploy jaringan multi-node Celestia (Validator, Bridge Node, dan Light Node) di dalam lingkungan kontainer terkendali.</li>
                        <li>Melakukan benchmark empiris latensi pengiriman blob (`blob.Submit`) dan latensi verifikasi sampel oleh Light Node.</li>
                        <li>Menguji batas rekonstruksi data ketika 50% data share hilang atau mengalami partisi jaringan.</li>
                        <li>Membandingkan arsitektur berpusat pada DA (Celestia) dengan arsitektur berpusat pada eksekusi (Sui).</li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-3">
                        Although theoretical claims regarding Celestia&apos;s Data Availability Sampling (DAS) have been well-documented in literature (Al-Bassam et al.), empirical evaluation under heavy blob submission stress testing in controlled multi-node setups remains essential. The key objectives are to:
                      </p>
                      <ul className="list-decimal pl-5 text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-3 flex flex-col gap-2">
                        <li>Analyze Celestia&apos;s data availability architecture (DAS, 2D Reed-Solomon, and Namespaced Merkle Trees).</li>
                        <li>Deploy a containerized multi-node local Celestia cluster (Validator, Bridge Node, Light Node).</li>
                        <li>Empirically benchmark blob submission latency (`blob.Submit`) and Light Node sample verification times.</li>
                        <li>Verify 2D Reed-Solomon data reconstruction limits under 50% share loss scenarios.</li>
                        <li>Compare DA-centric modular architecture (Celestia) against execution-centric parallel architecture (Sui).</li>
                      </ul>
                    </>
                  )}
                </ScrollReveal>

                {/* Sub 1.2 Pertanyaan Riset */}
                <ScrollReveal direction="up" duration={800} delay={100} className="mt-4">
                  <h3 className="font-bold text-sm text-[#1a1a1a] uppercase tracking-wider border-l-2 border-accent-red pl-3">
                    {lang === "id" ? "1.2 Pertanyaan Penelitian" : "1.2 Research Questions"}
                  </h3>
                  <div className="flex flex-col gap-4 mt-4">
                    <div className="bg-white/35 border border-border-gray/50 p-4 rounded-xl flex gap-3">
                      <AlertCircle className="w-5 h-5 text-accent-red shrink-0" />
                      <div>
                        <span className="font-mono text-xs font-bold text-[#1a1a1a] block mb-1">RQ1</span>
                        <p className="text-xs text-[#555] font-semibold italic">
                          {lang === "id"
                            ? "Bagaimana peningkatan ukuran blob data (64 KB hingga 2 MB) mempengaruhi latensi pengiriman blob dan waktu verifikasi Data Availability Sampling (DAS) oleh Light Node?"
                            : "How does scaling data blob payload size (64 KB to 2 MB) impact blob submission latency and Light Node Data Availability Sampling (DAS) verification time?"}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/35 border border-border-gray/50 p-4 rounded-xl flex gap-3">
                      <AlertCircle className="w-5 h-5 text-accent-red shrink-0" />
                      <div>
                        <span className="font-mono text-xs font-bold text-[#1a1a1a] block mb-1">RQ2</span>
                        <p className="text-xs text-[#555] font-semibold italic">
                          {lang === "id"
                            ? "Seberapa tangguh kombinasi 2D Reed-Solomon Erasure Coding dan Namespaced Merkle Trees dalam merekonstruksi data blok ketika terjadi kehilangan paket data share hingga 50%?"
                            : "How resilient is the combination of 2D Reed-Solomon Erasure Coding and Namespaced Merkle Trees in reconstructing block data under up to 50% packet share loss?"}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/35 border border-border-gray/50 p-4 rounded-xl flex gap-3">
                      <AlertCircle className="w-5 h-5 text-accent-red shrink-0" />
                      <div>
                        <span className="font-mono text-xs font-bold text-[#1a1a1a] block mb-1">RQ3</span>
                        <p className="text-xs text-[#555] font-semibold italic">
                          {lang === "id"
                            ? "Bagaimana pemanfaatan sumber daya hardware (CPU/RAM/Disk I/O) pada Celestia Bridge Node dan Light Node jika dibandingkan dengan full node validator monolitik?"
                            : "How does hardware resource consumption (CPU/RAM/Disk I/O) across Celestia Bridge and Light Nodes compare against traditional monolithic full nodes?"}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </article>

              {/* 2. ARSITEKTUR CELESTIA */}
              <article id="arsitektur" className="scroll-mt-28 flex flex-col gap-4">
                <ScrollReveal direction="up" duration={800}>
                  <h2 className="font-bebas text-3xl sm:text-4xl text-[#1a1a1a] tracking-wide border-b border-border-gray pb-2 uppercase">
                    {lang === "id" ? "2. Gambaran Teknis Arsitektur Celestia" : "2. Celestia Technical Architecture Overview"}
                  </h2>
                  <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-4">
                    {lang === "id"
                      ? "Arsitektur Celestia dibangun di atas tiga pilar teknologi utama: pemisahan eksekusi dari konsensus, 2D Reed-Solomon Erasure Coding dengan DAS, serta Namespaced Merkle Trees."
                      : "Celestia's design rests upon three core architectural pillars: decoupling execution from consensus, 2D Reed-Solomon Erasure Coding with DAS, and Namespaced Merkle Trees (NMTs)."}
                  </p>
                </ScrollReveal>

                {/* Sub 2.1 Monolithic vs Modular */}
                <ScrollReveal direction="up" duration={800} delay={50} className="mt-4">
                  <h3 className="font-bold text-sm text-[#1a1a1a] uppercase tracking-wider border-l-2 border-accent-red pl-3 mb-3">
                    {lang === "id" ? "2.1 Pemisahan Konsensus dan Eksekusi (Monolitik vs Modular)" : "2.1 Decoupling Consensus & Execution (Monolithic vs Modular)"}
                  </h3>
                  <div className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium flex flex-col gap-3">
                    {lang === "id" ? (
                      <p>
                        Pada blockchain monolitik, lapisan Eksekusi, Konsensus, dan Ketersediaan Data berada dalam satu bundel ketat. Celestia memutus keterikatan ini dengan mengalokasikan tugas Eksekusi ke Rollups (misalnya Optimistic Rollups atau ZK-Rollups), sementara Celestia hanya mengurusi **Ordering (CometBFT)** dan **Data Availability (Blobspace)**.
                      </p>
                    ) : (
                      <p>
                        Monolithic blockchains bundle Execution, Consensus, and Data Availability together tightly. Celestia separates these layers by delegating Execution entirely to external Rollups (e.g., Optimistic or ZK Rollups), allowing Celestia to strictly handle **Ordering (CometBFT)** and **Data Availability (Blobspace)**.
                      </p>
                    )}
                  </div>
                </ScrollReveal>

                {/* Diagram Monolithic vs Modular */}
                <ScrollReveal direction="up" duration={800} delay={100} className="my-6">
                  <div className="bg-[#eae8e4]/60 border border-border-gray rounded-3xl p-6 sm:p-8 flex flex-col items-center">
                    <span className="text-[10px] font-extrabold uppercase text-[#888] tracking-widest block mb-6">
                      {lang === "id"
                        ? "DIAGRAM: ARSITEKTUR MONOLITIK VS MODULAR CELESTIA"
                        : "DIAGRAM: MONOLITHIC VS CELESTIA MODULAR ARCHITECTURE"}
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl text-xs font-semibold">
                      {/* Monolithic Box */}
                      <div className="bg-white/80 border border-border-gray p-5 rounded-2xl flex flex-col gap-3">
                        <span className="text-xs font-extrabold text-zinc-700 uppercase tracking-wider">// MONOLITHIC BLOCKCHAIN</span>
                        <div className="bg-zinc-100 p-2.5 rounded-xl border border-zinc-200 text-center">Execution (Smart Contracts)</div>
                        <div className="bg-zinc-100 p-2.5 rounded-xl border border-zinc-200 text-center">Consensus (Ordering)</div>
                        <div className="bg-zinc-100 p-2.5 rounded-xl border border-zinc-200 text-center">Data Availability (Storage)</div>
                        <span className="text-[10px] text-zinc-500 italic text-center mt-1">Single Full Node does ALL 3 layers</span>
                      </div>

                      {/* Modular Box */}
                      <div className="bg-white/80 border border-accent-red/30 p-5 rounded-2xl flex flex-col gap-3">
                        <span className="text-xs font-extrabold text-accent-red uppercase tracking-wider">// CELESTIA MODULAR STACK</span>
                        <div className="bg-blue-50 border border-blue-200 p-2.5 rounded-xl text-center text-blue-900 font-bold">Execution Layer (Rollups: EVM / SVM)</div>
                        <div className="bg-accent-red/10 border border-accent-red/20 p-2.5 rounded-xl text-center text-accent-red font-bold">Consensus (CometBFT Ordering)</div>
                        <div className="bg-accent-red/10 border border-accent-red/20 p-2.5 rounded-xl text-center text-accent-red font-bold">Data Availability (DAS & 2D RS)</div>
                        <span className="text-[10px] text-accent-red font-semibold italic text-center mt-1">Celestia = Dedicated DA & Consensus</span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Sub 2.2 DAS & Erasure Coding */}
                <ScrollReveal direction="up" duration={800} delay={100} className="mt-4">
                  <h3 className="font-bold text-sm text-[#1a1a1a] uppercase tracking-wider border-l-2 border-accent-red pl-3 mb-3">
                    {lang === "id" ? "2.2 Data Availability Sampling (DAS) & 2D Reed-Solomon Coding" : "2.2 Data Availability Sampling (DAS) & 2D Reed-Solomon Coding"}
                  </h3>
                  <div className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium flex flex-col gap-3">
                    {lang === "id" ? (
                      <>
                        <p>
                          Inovasi terpenting Celestia adalah **Data Availability Sampling (DAS)**. Tanpa perlu mengunduh seluruh isi blok (yang dapat mencapai 8 MB hingga 64 MB di masa depan), sebuah **Light Node** Celestia hanya mengunduh sampel acak kecil dari *shares* data.
                        </p>
                        <p>
                          Untuk menjamin bahwa validator jahat tidak menyembunyikan sebagian data blok, Celestia menerapkan **2D Reed-Solomon Erasure Coding**. Data blok disusun dalam matriks $k \times k$ dan diperluas menjadi $2k \times 2k$. Dengan properti matematis erasure coding 2D ini, jika setidaknya **25% + 1** sampel berhasil diverifikasi secara acak, Light Node memiliki kepastian statistik hingga **99.999%** bahwa seluruh blok data 100% tersedia dan dapat direkonstruksi sepenuhnya.
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          Celestia&apos;s flagship innovation is **Data Availability Sampling (DAS)**. Instead of downloading full block bodies, Celestia **Light Nodes** randomly sample small shares of data from the block matrix.
                        </p>
                        <p>
                          To prevent malicious validators from withholding data, Celestia applies **2D Reed-Solomon Erasure Coding**. Original block data arranged in a $k \times k$ matrix is extended into a $2k \times 2k$ matrix. Thanks to 2D erasure coding math, if a light node successfully samples at least **25% + 1** of random shares, it achieves **99.999% statistical confidence** that the full block data is available and reconstructible.
                        </p>
                      </>
                    )}
                  </div>
                </ScrollReveal>
              </article>

              {/* 3. METODOLOGI PENELITIAN */}
              <article id="metodologi" className="scroll-mt-28 flex flex-col gap-4">
                <ScrollReveal direction="up" duration={800}>
                  <h2 className="font-bebas text-3xl sm:text-4xl text-[#1a1a1a] tracking-wide border-b border-border-gray pb-2 uppercase">
                    {lang === "id" ? "3. Metodologi Penelitian" : "3. Research Methodology"}
                  </h2>
                  <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-4">
                    {lang === "id"
                      ? "Metodologi pengujian dirancang untuk mengukur secara persis performa lapisan Data Availability Celestia pada cluster localnet terkontrol."
                      : "The testing methodology was configured to measure exact performance metrics of Celestia's Data Availability layer on a controlled localnet cluster."}
                  </p>
                </ScrollReveal>

                <ScrollReveal direction="up" duration={800} delay={50} className="mt-2 text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium flex flex-col gap-4">
                  <div>
                    <h4 className="font-bold text-[#1a1a1a] uppercase text-[11px] tracking-wider mb-1">
                      {lang === "id" ? "3.1 Setup Cluster Kontainer Localnet" : "3.1 Containerized Localnet Setup"}
                    </h4>
                    <p>
                      {lang === "id"
                        ? "Jaringan terdiri dari 1 Validator Node (celestia-appd), 1 Bridge Node (celestia bridge RPC), dan 3 Light Nodes (celestia light DAS samplers). Pengujian dilakukan pada server Ubuntu 22.04 LTS (8 vCPU Intel Xeon, 31 GB RAM, NVMe SSD)."
                        : "The network topology consists of 1 Validator Node (`celestia-appd`), 1 Bridge Node (`celestia bridge`), and 3 Light Nodes (`celestia light` samplers). Benchmarks were executed on an Ubuntu 22.04 LTS host (8 vCPU Intel Xeon, 31 GB RAM, NVMe SSD)."}
                    </p>
                  </div>
                </ScrollReveal>
              </article>

              {/* 4. IMPLEMENTASI SISTEM */}
              <article id="implementasi" className="scroll-mt-28 flex flex-col gap-4">
                <ScrollReveal direction="up" duration={800}>
                  <h2 className="font-bebas text-3xl sm:text-4xl text-[#1a1a1a] tracking-wide border-b border-border-gray pb-2 uppercase">
                    {lang === "id" ? "4. Implementasi Sistem dan Deployment" : "4. System Implementation & Deployment"}
                  </h2>
                  <div className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-4 flex flex-col gap-4">
                    {lang === "id" ? (
                      <p>
                        Inisialisasi jaringan lokal Celestia dikelola melalui skrip otomatisasi yang membuat genesis state, mengalokasikan token TIA untuk akun pengirim blob, serta mengonfigurasi endpoint RPC Bridge pada port `26658` dan P2P port `2121`.
                      </p>
                    ) : (
                      <p>
                        Initialization of the local Celestia devnet cluster was driven by bash automation scripts generating genesis states, seeding test TIA tokens for blob submitters, and setting up Bridge RPC endpoints at port `26658`.
                      </p>
                    )}
                  </div>
                </ScrollReveal>
              </article>

              {/* 5. EVALUASI DAN HASIL */}
              <article id="evaluasi" className="scroll-mt-28 flex flex-col gap-4">
                <ScrollReveal direction="up" duration={800}>
                  <h2 className="font-bebas text-3xl sm:text-4xl text-[#1a1a1a] tracking-wide border-b border-border-gray pb-2 uppercase">
                    {lang === "id" ? "5. Evaluasi EksperIMENTAL DAN HASIL" : "5. Experimental Evaluation & Results"}
                  </h2>
                  <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-4">
                    {lang === "id"
                      ? "Bagian ini menyajikan data kuantitatif dari pengujian injeksi blob data dan sampling Light Node."
                      : "This section presents quantitative empirical data from blob submission stress tests and light node sampling."}
                  </p>
                </ScrollReveal>

                {/* Sub 5.1 & Table 1 */}
                <ScrollReveal direction="up" duration={800} delay={50} className="mt-2 text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium flex flex-col gap-4">
                  <div>
                    <h4 className="font-bold text-[#1a1a1a] uppercase text-[11px] tracking-wider mb-2">
                      {lang === "id" ? "5.1 S1 & S2: Latensi Pengiriman Blob & Sampling Light Node" : "5.1 S1 & S2: Blob Submission Latency & Light Node Sampling"}
                    </h4>
                    <p className="mb-4">
                      {lang === "id"
                        ? "Tabel 1 menunjukkan hasil pengukuran latensi metode `blob.Submit` melalui Bridge Node RPC serta waktu verifikasi Data Availability Sampling (DAS) oleh Light Node untuk berbagai ukuran muatan blob:"
                        : "Table 1 presents measured RPC latency for `blob.Submit` via the Bridge Node and corresponding Light Node DAS sampling verification times across blob sizes:"}
                    </p>

                    {/* Table 1 */}
                    <div className="overflow-x-auto border border-border-gray rounded-2xl bg-white/30">
                      <table className="min-w-full divide-y divide-border-gray text-left text-xs font-semibold text-zinc-800">
                        <thead className="bg-[#eae8e4]/50">
                          <tr>
                            <th className="px-6 py-4">{lang === "id" ? "Ukuran Blob" : "Blob Payload Size"}</th>
                            <th className="px-6 py-4">{lang === "id" ? "Estimasi Biaya Gas" : "Gas Cost (utia)"}</th>
                            <th className="px-6 py-4">{lang === "id" ? "Latensi Submit RPC" : "Submit RPC Latency"}</th>
                            <th className="px-6 py-4">{lang === "id" ? "Waktu DAS Light Node" : "Light Node DAS Time"}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border-gray">
                          <tr>
                            <td className="px-6 py-3.5 font-bold font-mono">64 KB</td>
                            <td className="px-6 py-3.5 font-mono">420.000</td>
                            <td className="px-6 py-3.5">180ms</td>
                            <td className="px-6 py-3.5 text-emerald-600 font-bold">85ms</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-3.5 font-bold font-mono">256 KB</td>
                            <td className="px-6 py-3.5 font-mono">1.250.000</td>
                            <td className="px-6 py-3.5">240ms</td>
                            <td className="px-6 py-3.5 text-emerald-600 font-bold">120ms</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-3.5 font-bold font-mono">512 KB</td>
                            <td className="px-6 py-3.5 font-mono">2.480.000</td>
                            <td className="px-6 py-3.5">380ms</td>
                            <td className="px-6 py-3.5 text-emerald-600 font-bold">180ms</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-3.5 font-bold font-mono">1 MB</td>
                            <td className="px-6 py-3.5 font-mono">4.920.000</td>
                            <td className="px-6 py-3.5">620ms</td>
                            <td className="px-6 py-3.5 text-emerald-600 font-bold">290ms</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-3.5 font-bold font-mono">2 MB</td>
                            <td className="px-6 py-3.5 font-mono">9.800.000</td>
                            <td className="px-6 py-3.5">1.150ms</td>
                            <td className="px-6 py-3.5 text-emerald-600 font-bold">460ms</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Sub 5.2 SVG Performance Chart */}
                <ScrollReveal direction="up" duration={800} delay={100} className="mt-6">
                  <h4 className="font-bold text-[#1a1a1a] uppercase text-[11px] tracking-wider mb-2">
                    {lang === "id" ? "5.2 S3: Benchmark Throughput Blob Data (MB/s) vs Latensi DAS" : "5.2 S3: Data Availability Throughput (MB/s) vs DAS Latency"}
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mb-6">
                    {lang === "id"
                      ? "Grafik di bawah ini mengilustrasikan kenaikan throughput ketersediaan data (MB/s) serta kestabilan latensi verifikasi DAS pada Light Node seiring membesarnya ukuran blob muatan."
                      : "The SVG chart below illustrates the scaling of data availability throughput (MB/s) against Light Node DAS sampling verification latency across payload tiers."}
                  </p>

                  {/* INTERACTIVE SVG CHART CARD */}
                  <div className="bg-[#eae8e4]/60 border border-border-gray rounded-3xl p-6 flex flex-col items-center relative">
                    <span className="text-[10px] font-extrabold uppercase text-[#888] tracking-widest block mb-4">
                      {lang === "id"
                        ? "GRAFIK PERFORMA: THROUGHPUT BLOB (MB/S) & LATENSI SAMPLING DAS (MS)"
                        : "PERFORMANCE CHART: BLOB THROUGHPUT (MB/S) & DAS SAMPLING LATENCY (MS)"}
                    </span>

                    {/* SVG Element */}
                    <svg
                      width="100%"
                      height="100%"
                      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                      className="max-w-md w-full bg-white/70 border border-border-gray/50 rounded-2xl p-4 shadow-sm"
                    >
                      {/* Grid Lines */}
                      {[2, 4, 6, 8, 10].map((val) => {
                        const y = chartHeight - padding - (val / 12) * (chartHeight - padding * 2);
                        return (
                          <g key={val}>
                            <line x1={padding} y1={y} x2={chartWidth - padding} y2={y} stroke="#e2e2e0" strokeWidth="1" strokeDasharray="3 3" />
                            <text x={padding - 8} y={y + 4} textAnchor="end" fontSize="9" fontWeight="bold" fill="#888">{val}M</text>
                          </g>
                        );
                      })}
                      {/* Bottom axis labels */}
                      {chartData.map((d, i) => {
                        const x = padding + (i / (chartData.length - 1)) * (chartWidth - padding * 2);
                        return (
                          <g key={d.blobSize}>
                            <line x1={x} y1={chartHeight - padding} x2={x} y2={padding} stroke="#e2e2e0" strokeWidth="1" strokeDasharray="3 3" />
                            <text x={x} y={chartHeight - padding + 16} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#888">{d.blobSize}</text>
                          </g>
                        );
                      })}

                      {/* X and Y Axes */}
                      <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="#1a1a1a" strokeWidth="1.5" />
                      <line x1={padding} y1={padding} x2={padding} y2={chartHeight - padding} stroke="#1a1a1a" strokeWidth="1.5" />

                      {/* Line 1: Throughput (MB/s) */}
                      <path d={linePathThroughput} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />

                      {/* Line 2: DAS Latency (ms) */}
                      <path d={linePathLatency} fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />

                      {/* Points */}
                      {chartData.map((d, i) => {
                        const ptT = getCoordsThroughput(i, d.throughput);
                        const isHovered = hoveredPoint?.blobSize === d.blobSize;
                        return (
                          <circle
                            key={`t-${i}`}
                            cx={ptT.x}
                            cy={ptT.y}
                            r={isHovered ? 6 : 4}
                            fill="#10b981"
                            stroke="#fff"
                            strokeWidth="1.5"
                            className="cursor-pointer transition-all"
                            onMouseEnter={() => setHoveredPoint({ x: ptT.x, y: ptT.y, blobSize: d.blobSize, throughput: d.throughput, dasLatency: d.dasLatency })}
                            onMouseLeave={() => setHoveredPoint(null)}
                          />
                        );
                      })}
                    </svg>

                    {/* Chart Legend */}
                    <div className="flex gap-6 mt-4 text-[10px] font-extrabold tracking-wider uppercase select-none">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-1 bg-[#10b981] rounded"></span>
                        <span className="text-emerald-600">
                          {lang === "id" ? "Throughput DA (MB/s)" : "DA Throughput (MB/s)"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-1 bg-[#ef4444] rounded"></span>
                        <span className="text-red-500">
                          {lang === "id" ? "Latensi DAS Light Node (ms)" : "Light Node DAS Latency (ms)"}
                        </span>
                      </div>
                    </div>

                    {/* Tooltip */}
                    {hoveredPoint && (
                      <div
                        className="absolute p-3 bg-zinc-900 border border-zinc-800 text-white rounded-xl text-[10px] font-semibold flex flex-col gap-1 shadow-md pointer-events-none z-20"
                        style={{
                          left: `${hoveredPoint.x + 20}px`,
                          top: `${hoveredPoint.y - 20}px`
                        }}
                      >
                        <span className="text-accent-red font-bold text-[8px] uppercase tracking-wider">Blob Size: {hoveredPoint.blobSize}</span>
                        <span>Throughput: {hoveredPoint.throughput} MB/s</span>
                        <span>DAS Verification: {hoveredPoint.dasLatency} ms</span>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              </article>

              {/* 6. DISKUSI DAN PERBANDINGAN */}
              <article id="diskusi" className="scroll-mt-28 flex flex-col gap-4">
                <ScrollReveal direction="up" duration={800}>
                  <h2 className="font-bebas text-3xl sm:text-4xl text-[#1a1a1a] tracking-wide border-b border-border-gray pb-2 uppercase">
                    {lang === "id" ? "6. Perbandingan Arsitektur: Celestia vs Sui" : "6. Comparative Analysis: Celestia vs Sui"}
                  </h2>
                  <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-4">
                    {lang === "id"
                      ? "Perbandingan dua filosofi utama skalabilitas Layer 1 modern: Celestia (berpusat pada DA) dan Sui (berpusat pada Eksekusi Paralel):"
                      : "A comparative breakdown between two modern L1 scaling philosophies: Celestia (DA-centric) and Sui (Execution-centric):"}
                  </p>
                </ScrollReveal>

                {/* Table 2 */}
                <ScrollReveal direction="up" duration={800} delay={100} className="mt-4">
                  <div className="overflow-x-auto border border-border-gray rounded-2xl bg-white/30">
                    <table className="min-w-full divide-y divide-border-gray text-left text-xs font-semibold text-zinc-800">
                      <thead className="bg-[#eae8e4]/50">
                        <tr>
                          <th className="px-6 py-4">{lang === "id" ? "Dimensi Arsitektur" : "Architectural Dimension"}</th>
                          <th className="px-6 py-4">Celestia (DA-Centric)</th>
                          <th className="px-6 py-4">Sui (Execution-Centric)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-gray">
                        <tr>
                          <td className="px-6 py-4 font-bold">{lang === "id" ? "Fokus Utamanya" : "Primary Focus"}</td>
                          <td className="px-6 py-4">Data Availability &amp; Consensus ordering murni untuk Rollups.</td>
                          <td className="px-6 py-4">High-throughput parallel smart contract execution.</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 font-bold">{lang === "id" ? "Verifikasi Light Client" : "Light Client Verification"}</td>
                          <td className="px-6 py-4">Data Availability Sampling (DAS) acak dengan kepastian 99.999%.</td>
                          <td className="px-6 py-4">Memerlukan verifikasi state proof / validator committee signatures.</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 font-bold">{lang === "id" ? "Model Skalabilitas" : "Scaling Mechanism"}</td>
                          <td className="px-6 py-4">Skalabilitas linear: Semakin banyak Light Node, semakin besar ukuran blok DA.</td>
                          <td className="px-6 py-4">Multi-core CPU parallel execution pada object-centric model.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </ScrollReveal>
              </article>

              {/* 7. KESIMPULAN */}
              <article id="kesimpulan" className="scroll-mt-28 flex flex-col gap-4">
                <ScrollReveal direction="up" duration={800}>
                  <h2 className="font-bebas text-3xl sm:text-4xl text-[#1a1a1a] tracking-wide border-b border-border-gray pb-2 uppercase">
                    {lang === "id" ? "7. Kesimpulan dan Saran" : "7. Conclusion and Future Directions"}
                  </h2>
                  <div className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-4 flex flex-col gap-4">
                    {lang === "id" ? (
                      <p>
                        Penelitian ini membuktikan bahwa arsitektur ketersediaan data (DA) Celestia mampu memberikan saluran *plumbing data* berkecepatan tinggi bagi Layer 2 Rollup. Kombinasi 2D Reed-Solomon Erasure Coding dan Data Availability Sampling (DAS) memungkinkan Light Node memverifikasi ketersediaan megabyte data blob dalam hitungan milidetik.
                      </p>
                    ) : (
                      <p>
                        This research empirically confirms that Celestia&apos;s dedicated DA architecture provides robust, scalable data plumbing for Layer 2 Rollups. The synergy of 2D Reed-Solomon Erasure Coding and Data Availability Sampling (DAS) allows resource-constrained Light Nodes to verify megabytes of data availability within milliseconds.
                      </p>
                    )}
                  </div>
                </ScrollReveal>
              </article>

              {/* LAMPIRAN DENGAN TABS */}
              <article id="lampiran" className="scroll-mt-28 flex flex-col gap-4">
                <ScrollReveal direction="up" duration={800}>
                  <h2 className="font-bebas text-3xl sm:text-4xl text-[#1a1a1a] tracking-wide border-b border-border-gray pb-2 uppercase">
                    {lang === "id" ? "Lampiran: Kode & Skrip Teknis" : "Appendix: Technical Code & Scripts"}
                  </h2>
                  <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-4 mb-4">
                    {lang === "id"
                      ? "Skrip otomatisasi untuk pengiriman blob data dan pemantauan metrik sistem Celestia:"
                      : "Automation scripts for Celestia blob submission and system metrics monitoring:"}
                  </p>

                  {/* Tab Navigation */}
                  <div className="flex border-b border-border-gray select-none">
                    <button
                      onClick={() => setActiveTab("submit")}
                      className={`px-4 py-3.5 font-bold text-xs uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${
                        activeTab === "submit" ? "border-accent-red text-accent-red" : "border-transparent text-zinc-500 hover:text-[#1a1a1a]"
                      }`}
                    >
                      submit-blob.sh
                    </button>
                    <button
                      onClick={() => setActiveTab("metrics")}
                      className={`px-4 py-3.5 font-bold text-xs uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${
                        activeTab === "metrics" ? "border-accent-red text-accent-red" : "border-transparent text-zinc-500 hover:text-[#1a1a1a]"
                      }`}
                    >
                      collect-metrics.sh
                    </button>
                  </div>

                  {/* Tab Contents */}
                  <div className="bg-[#0c0c0c] border border-zinc-850 rounded-b-3xl p-6 sm:p-8 text-white relative">
                    <div className="absolute right-6 top-6 flex items-center gap-1.5 text-[9px] font-bold text-zinc-500 select-none">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>BASH SCRIPT</span>
                    </div>

                    <pre className="overflow-x-auto text-[11px] font-mono text-zinc-350 leading-relaxed max-h-[500px]">
                      {activeTab === "submit" && submitBlobScript}
                      {activeTab === "metrics" && metricsScript}
                    </pre>
                  </div>
                </ScrollReveal>
              </article>

            </div>

          </div>
        </div>
      </main>

      <AboutFooter />
    </div>
  );
}
