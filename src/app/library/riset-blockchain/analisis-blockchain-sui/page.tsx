"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, AlertCircle, Terminal, Globe, Maximize2, X } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { AboutFooter } from "@/components/sections/AboutFooter";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export default function SuiResearchDetailPage() {
  const [lang, setLang] = useState<"id" | "en">("id");
  const [activeTab, setActiveTab] = useState<"contract" | "benchmark" | "chaos">("contract");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; valX: number; valY: number; line: string } | null>(null);

  // SVG Chart data
  const chartWidth = 500;
  const chartHeight = 250;
  const padding = 40;

  const dataOwned = [
    { tps: 100, latency: 120 },
    { tps: 500, latency: 130 },
    { tps: 1000, latency: 140 },
    { tps: 1500, latency: 150 },
    { tps: 2000, latency: 180 },
    { tps: 2500, latency: 240 }
  ];

  const dataShared = [
    { tps: 100, latency: 420 },
    { tps: 500, latency: 430 },
    { tps: 1000, latency: 480 },
    { tps: 1500, latency: 780 }
  ];

  // Helper to map data points to SVG coordinates
  const getCoordinates = (tps: number, latency: number) => {
    const x = padding + ((tps - 100) / 2400) * (chartWidth - padding * 2);
    const y = chartHeight - padding - (latency / 1000) * (chartHeight - padding * 2);
    return { x, y };
  };

  const linePathOwned = dataOwned.map((d, i) => {
    const { x, y } = getCoordinates(d.tps, d.latency);
    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ");

  const linePathShared = dataShared.map((d, i) => {
    const { x, y } = getCoordinates(d.tps, d.latency);
    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ");

  const sections = [
    { id: "abstract", labelId: "Abstract", labelEn: "Abstract" },
    { id: "infografis", labelId: "Infografis Ringkasan", labelEn: "Summary Infographic" },
    { id: "pendahuluan", labelId: "1. Pendahuluan", labelEn: "1. Introduction" },
    { id: "arsitektur", labelId: "2. Arsitektur SUI", labelEn: "2. SUI Architecture" },
    { id: "metodologi", labelId: "3. Metodologi", labelEn: "3. Methodology" },
    { id: "implementasi", labelId: "4. Deployment", labelEn: "4. Deployment" },
    { id: "evaluasi", labelId: "5. Hasil Evaluasi", labelEn: "5. Evaluation Results" },
    { id: "diskusi", labelId: "6. Perbandingan", labelEn: "6. Comparison" },
    { id: "kesimpulan", labelId: "7. Kesimpulan", labelEn: "7. Conclusion" },
    { id: "lampiran", labelId: "Lampiran Kode", labelEn: "Code Appendix" }
  ];

  const helloSuiCode = `module hello_sui::hello_sui {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;

    public struct HelloObject has key, store {
        id: UID,
        counter: u64,
    }

    // Init function runs on publish
    fun init(ctx: &mut TxContext) {
        let hello = HelloObject {
            id: object::new(ctx),
            counter: 0,
        };
        transfer::share_object(hello);
    }

    public entry fun increment(self: &mut HelloObject, _ctx: &mut TxContext) {
        self.counter = self.counter + 1;
    }
}`;

  const benchmarkScript = `#!/bin/bash
# Benchmark SUI transaction throughput (TPS) and latency using parallel
# execution without object lock conflict
set -e

PROJECT_DIR="/home/ubuntu/lxc-manager/projects/sui-research"
DATA_DIR="$PROJECT_DIR/data"
LOG_FILE="$DATA_DIR/benchmark_results.json"
export PATH="$HOME/.local/bin:$HOME/.sui/bin:$PATH"

mkdir -p "$DATA_DIR"
echo "=== SUI TPS Benchmarking ==="

# 1. Fetch available gas coins for parallel injection (those split into 7.99 SUI)
echo "Querying available parallel gas coins..."
COINS=($(sui client gas --json | jq -r '.[] | select(.suiBalance == "7.99") | .gasCoinId'))
NUM_COINS=\${#COINS[@]}

if [ "$NUM_COINS" -eq 0 ]; then
  echo "Error: No parallel gas coins found with balance 7.99 SUI."
  exit 1
fi
echo "Found $NUM_COINS gas coins ready for parallel transaction execution."

# 2. Generate a recipient address
echo "Generating recipient address..."
RECIPIENT_RES=$(sui client new-address ed25519 --json)
RECIPIENT_ADDR=$(echo "$RECIPIENT_RES" | sed -n '/^{/,$p' | jq -r '.address')
echo "Recipient address: $RECIPIENT_ADDR"

# Concurrency parameters
NUM_TX=$NUM_COINS
echo "Injecting $NUM_TX parallel transfer transactions..."
START_TIME=$(date +%s%3N)

# Launch all transactions in parallel
pids=()
for ((i=0; i<NUM_TX; i++)); do
  COIN_ID="\${COINS[$i]}"
  sui client transfer-sui --to "$RECIPIENT_ADDR" --sui-coin-object-id "$COIN_ID" --amount 1000000 --gas-budget 5000000 --json > "$DATA_DIR/tx_$i.json" 2>&1 &
  pids+=($!)
done

SUCCESS_COUNT=0
FAILED_COUNT=0

# Wait for all background transaction processes to complete
for pid in "\${pids[@]}"; do
  if wait "$pid"; then
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
  else
    FAILED_COUNT=$((FAILED_COUNT + 1))
  fi
done

END_TIME=$(date +%s%3N)
TOTAL_TIME_MS=$((END_TIME - START_TIME))
TOTAL_TIME_SEC=$(echo "scale=3; $TOTAL_TIME_MS / 1000" | bc)
TPS=$(echo "scale=2; $SUCCESS_COUNT / $TOTAL_TIME_SEC" | bc)
AVG_LATENCY=$(echo "scale=1; $TOTAL_TIME_MS / $NUM_TX" | bc)

echo "Benchmark finished in \${TOTAL_TIME_SEC}s"
echo "Success: $SUCCESS_COUNT, Failed: $FAILED_COUNT"
echo "Throughput (TPS): $TPS tx/sec"
echo "Average Latency: \${AVG_LATENCY}ms"`;

  const chaosScript = `#!/bin/bash
# Chaos engineering test: simulate node/network failure and verify recovery
set -e

PROJECT_DIR="/home/ubuntu/lxc-manager/projects/sui-research"
DATA_DIR="$PROJECT_DIR/data"
LOG_FILE="$DATA_DIR/chaos_test_results.json"
export PATH="$HOME/.local/bin:$HOME/.sui/bin:$PATH"

# 1. Fetch current contract counter state from the latest deployment
MOVE_TEST_LOG="$DATA_DIR/move_test_results.json"
if [ ! -f "$MOVE_TEST_LOG" ]; then
  echo "Error: No Move test results found. Run Move test first."
  exit 1
fi

HELLO_OBJECT_ID=$(jq -r '.hello_object_id' "$MOVE_TEST_LOG")
echo "Querying initial state of HelloObject ($HELLO_OBJECT_ID)..."
INIT_VAL=$(sui client object "$HELLO_OBJECT_ID" --json | sed -n '/^{/,$p' | jq -r '.content.counter')
echo "Initial counter value: $INIT_VAL"

# 2. Simulate Node/Network Failure (Kill SUI Process)
echo "Simulating network crash (killing 'sui start' process)..."
CRASH_START=$(date +%s%3N)
pkill -f "sui start" || true

# Wait until port 9000 is free
echo "Waiting for ports to clear..."
while ss -tulpn | grep -q ":9000"; do
  sleep 0.5
done
echo "Network crashed successfully."

# 3. Simulate Node/Network Restart (Recovery)
echo "Restarting SUI local network..."
RESTART_START=$(date +%s%3N)
sui start --network.config "$DATA_DIR/localnet" --with-faucet=0.0.0.0:9123 --fullnode-rpc-port 9000 > "$DATA_DIR/chaos_localnet.log" 2>&1 &

# Wait for RPC to become responsive
echo "Waiting for RPC endpoint to recover..."
RECOVERY_TIMEOUT=30
RECOVERY_TIME=0
while ! curl -s -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1,"method":"sui_getLatestCheckpointSequenceNumber","params":[]}' http://127.0.0.1:9000 > /dev/null; do
  sleep 0.5
  RECOVERY_TIME=$(echo "scale=3; $RECOVERY_TIME + 0.5" | bc)
  if (( $(echo "$RECOVERY_TIME > $RECOVERY_TIMEOUT" | bc -l) )); then
    echo "Error: Recovery timed out!"
    exit 1
  fi
done

CRASH_END=$(date +%s%3N)
DOWNTIME=$((CRASH_END - CRASH_START))
echo "RPC endpoint recovered in \${RECOVERY_TIME}s. Total downtime: \${DOWNTIME}ms."

# 4. Verify data persistence
echo "Verifying data persistence after recovery..."
RECOVERED_VAL=$(sui client object "$HELLO_OBJECT_ID" --json | sed -n '/^{/,$p' | jq -r '.content.counter')
echo "Counter value after recovery: $RECOVERED_VAL"`;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100; // Header offset
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
                  // TECHNICAL RESEARCH REPORT
                </span>
                <span className="px-2 py-0.5 rounded bg-zinc-200/60 text-zinc-700 font-mono text-[9px] font-bold uppercase tracking-wider">
                  BILINGUAL VERSION (ID / EN)
                </span>
              </div>
              <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-[0.95] text-[#1a1a1a] tracking-tight uppercase">
                {lang === "id" ? "ANALISIS MENDALAM BLOCKCHAIN SUI" : "DEEP DIVE SUI BLOCKCHAIN ANALYSIS"}
              </h1>
              <p className="text-base sm:text-lg text-zinc-550 font-medium leading-relaxed max-w-4xl italic mt-1">
                {lang === "id"
                  ? "Arsitektur, Deployment, dan Pengujian Jaringan dalam Lingkungan Kontainer"
                  : "Architecture, Deployment, and Network Benchmarking inside Containerized Environment"}
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
                        {lang === "id" ? "18 Menit" : "18 Mins"}
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
                        ? "Unduh naskah lengkap hasil riset akademis ini dalam versi Bahasa Indonesia atau Bahasa Inggris:"
                        : "Download the complete academic research paper in Bahasa Indonesia or English:"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <a
                      href="/Riset Blockchain SUI (Bahasa Indoensia).pdf"
                      download="Riset Blockchain SUI (Bahasa Indonesia).pdf"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-white hover:bg-[#eae8e4] text-[#1a1a1a] font-extrabold text-xs uppercase tracking-wider transition-colors duration-300 shadow-md active:scale-[0.98] transform group"
                    >
                      <Download className="w-3.5 h-3.5 text-accent-red group-hover:translate-y-0.5 transition-transform" />
                      <span>Bahasa Indonesia (PDF)</span>
                    </a>
                    <a
                      href="/Riset Blockchain SUI (Bahasa Inggris).pdf"
                      download="Sui Blockchain Research (English Version).pdf"
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
                        ? "Blockchain Sui mewakili pergeseran mendasar dalam desain jaringan terdesentralisasi dengan memperkenalkan model data berpusat pada objek (object-centric) dan memisahkan diseminasi transaksi dari pengurutan konsensus global. Laporan riset ini mengeksplorasi inovasi arsitektur utama Sui, termasuk bahasa pemrograman Sui Move, eksekusi paralel, dan mesin konsensus Mysticeti. Kami mendokumentasikan deployment jaringan multi-node lokal Sui dalam lingkungan kontainer dan melakukan pengujian performa (TPS dan latensi di bawah beban stres), chaos testing (ketahanan kegagalan node), serta evaluasi smart contract. Temuan kami menunjukkan kemampuan praktis Sui dalam mencapai finalitas sub-detik dan throughput konkurensi yang tinggi, sekaligus mengidentifikasi keterbatasan operasional dan tantangan tata kelola terdesentralisasi."
                        : "The Sui blockchain represents a fundamental shift in decentralized network design by introducing an object-centric data model and decoupling transaction dissemination from global consensus ordering. This research paper explores Sui's key architectural innovations, including the Sui Move programming language, parallel execution, and the Mysticeti consensus engine. We document the deployment of a local multi-node Sui network in a containerized environment and conduct performance benchmarking (TPS and latency under stress load), chaos testing (validator node resilience), and smart contract evaluations. Our findings demonstrate Sui's practical capability to achieve sub-second finality and high concurrency throughput, while identifying operational trade-offs and decentralized governance challenges."}
                    </p>
                  </div>
                </ScrollReveal>
              </article>

              {/* EXECUTIVE INFOGRAPHIC SUMMARY SECTION */}
              <article id="infografis" className="scroll-mt-28">
                <ScrollReveal direction="up" duration={800}>
                  <div className="bg-[#0c0c0c] border border-zinc-850 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col gap-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                      <div>
                        <span className="text-accent-red font-extrabold text-[10px] uppercase tracking-widest block mb-1">
                          // EXECUTIVE RESEARCH INFOGRAPHIC
                        </span>
                        <h3 className="font-bebas text-2xl sm:text-3xl uppercase tracking-wide text-white leading-none">
                          {lang === "id" ? "ANALISIS PERFORMA & ARSITEKTUR BLOCKCHAIN SUI" : "PERFORMANCE & ARCHITECTURE ANALYSIS OF SUI BLOCKCHAIN"}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-[#1a1a1a] hover:bg-[#eae8e4] text-xs font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
                        >
                          <Maximize2 className="w-3.5 h-3.5 text-accent-red" />
                          <span>{lang === "id" ? "Perbesar Infografis" : "Full View"}</span>
                        </button>
                        <a
                          href="/infografis-sui.png"
                          download="Infografis-Sui-Petrus-Rosario.png"
                          className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
                          title="Download Infographic HD"
                        >
                          <Download className="w-3.5 h-3.5 text-accent-red" />
                        </a>
                      </div>
                    </div>

                    {/* Image Display Card */}
                    <div 
                      onClick={() => setIsModalOpen(true)}
                      className="relative rounded-2xl overflow-hidden border border-zinc-800 cursor-pointer group bg-zinc-950/80 shadow-md"
                    >
                      <img
                        src="/infografis-sui.png"
                        alt="Analisis Performa dan Arsitektur Blockchain SUI Infografis"
                        className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white font-extrabold text-xs uppercase tracking-wider">
                        <Maximize2 className="w-5 h-5 text-accent-red" />
                        <span>{lang === "id" ? "Klik Untuk Memperbesar (Full View)" : "Click to Enlarge (Full View)"}</span>
                      </div>
                    </div>
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
                          Teknologi blockchain telah bertransisi dari jaringan uang elektronik peer-to-peer sederhana menjadi platform komputasi terdesentralisasi kompleks yang menghosting aplikasi terdistribusi (dApps). Blockchain Layer 1 tradisional, seperti Ethereum, mengandalkan model eksekusi sekuensial dan penyimpanan key-value global di mana transisi status diproses dalam urutan linier. Meskipun hal ini menjamin pengurutan deterministik yang ketat, hal ini memperkenalkan hambatan skalabilitas yang parah (sering disebut sebagai &ldquo;blockchain trilemma&rdquo;). Di bawah volume transaksi yang tinggi, throughput jaringan menurun, latensi validasi transaksi melonjak, dan biaya gas berfluktuasi secara dramatis.
                        </p>
                        <p>
                          Untuk memecahkan batasan skalabilitas ini, arsitektur Layer 1 yang lebih baru telah muncul. Di antaranya, blockchain Sui, yang dikembangkan oleh Mysten Labs, mengusulkan pergeseran paradigma yang mendasar. Alih-alih memperlakukan status ledger sebagai ruang akun monolitik tunggal, Sui memperkenalkan model data berpusat pada objek (object-centric). Di bawah desain ini, setiap aset, koin, smart contract, dan kredensial adalah &ldquo;objek&rdquo; kelas satu yang dapat dialamatkan dengan tipe kepemilikan yang jelas. Hal ini memungkinkan Sui untuk secara native mengidentifikasi dan mengeksekusi transaksi independen secara paralel, melewati hambatan pengurutan konsensus global tradisional untuk aset yang tidak saling berkonflik.
                        </p>
                        <p>
                          Selain itu, Sui memisahkan diseminasi transaksi dari pengurutan. Sui menggunakan mempool berbasis Directed Acyclic Graph (DAG), Narwhal, yang dipasangkan dengan mesin konsensus (secara historis Bullshark, dan baru-baru ini Mysticeti). Mysticeti mengurangi latensi bolak-balik konsensus ke tingkat sub-detik, memungkinkan finalitas cepat untuk objek bersama (shared objects) sementara objek yang dimiliki (owned objects) dapat melewati konsensus sepenuhnya menggunakan mekanisme Byzantine Consistent Broadcast (BCB).
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          Blockchain technology has transitioned from simple peer-to-peer electronic cash networks into complex decentralized computing platforms hosting distributed applications (dApps). Traditional Layer 1 blockchains, such as Ethereum, rely on a sequential execution model and global key-value storage where state transitions are processed in linear order. While this guarantees strict deterministic ordering, it introduces severe scalability bottlenecks (often referred to as the &ldquo;blockchain trilemma&rdquo;). Under high transaction volume, network throughput drops, transaction validation latency spikes, and gas fees fluctuate dramatically.
                        </p>
                        <p>
                          To break through these scalability limits, newer Layer 1 architectures have emerged. Among them, the Sui blockchain, developed by Mysten Labs, proposes a fundamental paradigm shift. Instead of treating the ledger state as a single monolithic account space, Sui introduces an object-centric data model. Under this design, every asset, coin, smart contract, and credential is a first-class addressable &ldquo;object&rdquo; with explicit ownership rules. This allows Sui to natively identify and execute independent transactions in parallel, bypassing traditional global consensus ordering bottlenecks for non-conflicting assets.
                        </p>
                        <p>
                          Furthermore, Sui decouples transaction dissemination from ordering. Sui utilizes a Directed Acyclic Graph (DAG)-based mempool, Narwhal, paired with a consensus engine (historically Bullshark, and more recently Mysticeti). Mysticeti reduces consensus round-trip latency to sub-second levels, enabling rapid finality for shared objects while address-owned objects can bypass consensus entirely using a Byzantine Consistent Broadcast (BCB) fast path.
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
                        Meskipun klaim teoretis Sui sangat kuat—seperti mendukung ratusan ribu Transaksi Per Detik (TPS) dan finalitas sub-detik—masih ada kekurangan penelitian empiris independen yang menganalisis kinerja, stabilitas, dan persyaratan operasionalnya dalam lingkungan infrastruktur yang terkendali. Sebagian besar benchmark yang ada dirilis oleh Mysten Labs sendiri atau dilakukan di testnet yang disimulasikan.
                      </p>
                      <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-3">
                        Penelitian ini bertujuan untuk menjembatani kesenjangan ini dengan melakukan deployment jaringan Sui lokal di dalam lingkungan kontainer dan melakukan evaluasi komprehensif terhadap kinerja, pengalaman pengembang, dan ketahanan sistem. Tujuan utamanya adalah:
                      </p>
                      <ul className="list-decimal pl-5 text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-3 flex flex-col gap-2">
                        <li>Menyelidiki dan mendokumentasikan inovasi arsitektur Sui (model berpusat pada objek, bahasa Move, dan konsensus berbasis DAG).</li>
                        <li>Melakukan deployment dan mendokumentasikan jaringan pengembangan lokal Sui multi-node yang dapat direplikasi di dalam kontainer.</li>
                        <li>Melakukan benchmark empiris throughput transaksi (TPS) dan latensi di bawah berbagai beban jaringan.</li>
                        <li>Menganalisis ketahanan jaringan melalui pengujian chaos (khususnya kegagalan node validator).</li>
                        <li>Mengevaluasi pengalaman pengembang dan jaminan keamanan bahasa pemrograman Sui Move.</li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-3">
                        Despite Sui&apos;s strong theoretical claims—such as supporting hundreds of thousands of Transactions Per Second (TPS) and sub-second finality—there remains a lack of independent empirical research analyzing its performance, stability, and operational requirements in controlled infrastructure environments. Most existing benchmarks are either published directly by Mysten Labs or conducted on simulated public testnets.
                      </p>
                      <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-3">
                        This research aims to bridge this gap by deploying a local multi-node Sui network inside a containerized environment and conducting a comprehensive evaluation of performance, developer experience, and system resilience. The primary objectives are:
                      </p>
                      <ul className="list-decimal pl-5 text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-3 flex flex-col gap-2">
                        <li>Investigate and document Sui&apos;s architectural innovations (object-centric model, Sui Move language, DAG-based consensus).</li>
                        <li>Deploy and document a reproducible multi-node local Sui development network inside containers.</li>
                        <li>Empirically benchmark transaction throughput (TPS) and latency under varying network loads.</li>
                        <li>Analyze network resilience through chaos testing (specifically validator node failures).</li>
                        <li>Evaluate the developer experience and safety guarantees of the Sui Move programming language.</li>
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
                            ? "Bagaimana model data berpusat pada objek Sui diterjemahkan ke dalam throughput transaksi paralel dan latensi di bawah pengujian stres dalam jaringan lokal?"
                            : "How does Sui's object-centric data model translate into parallel transaction throughput and latency under stress testing in a local network?"}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/35 border border-border-gray/50 p-4 rounded-xl flex gap-3">
                      <AlertCircle className="w-5 h-5 text-accent-red shrink-0" />
                      <div>
                        <span className="font-mono text-xs font-bold text-[#1a1a1a] block mb-1">RQ2</span>
                        <p className="text-xs text-[#555] font-semibold italic">
                          {lang === "id"
                            ? "Bagaimana perilaku ketahanan dan pemulihan mekanisme konsensus Sui (Mysticeti/Bullshark) ketika node validator mengalami kegagalan mendadak atau partisi jaringan?"
                            : "What is the resilience and recovery behavior of Sui's consensus mechanism (Mysticeti/Bullshark) when validator nodes encounter sudden failure or network partition?"}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/35 border border-border-gray/50 p-4 rounded-xl flex gap-3">
                      <AlertCircle className="w-5 h-5 text-accent-red shrink-0" />
                      <div>
                        <span className="font-mono text-xs font-bold text-[#1a1a1a] block mb-1">RQ3</span>
                        <p className="text-xs text-[#555] font-semibold italic">
                          {lang === "id"
                            ? "Bagaimana pengalaman pengembang dan keamanan kontrak Sui Move dibandingkan dengan pengembangan EVM/Solidity berbasis akun tradisional?"
                            : "How does developer experience and contract security in Sui Move compare to traditional account-based EVM/Solidity development?"}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </article>

              {/* 2. ARSITEKTUR SUI */}
              <article id="arsitektur" className="scroll-mt-28 flex flex-col gap-4">
                <ScrollReveal direction="up" duration={800}>
                  <h2 className="font-bebas text-3xl sm:text-4xl text-[#1a1a1a] tracking-wide border-b border-border-gray pb-2 uppercase">
                    {lang === "id" ? "2. Gambaran Teknis Arsitektur SUI" : "2. SUI Technical Architecture Overview"}
                  </h2>
                  <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-4">
                    {lang === "id"
                      ? "Blockchain Sui memperkenalkan inovasi utama yang membedakannya dari jaringan berbasis akun tradisional seperti Ethereum atau Cosmos SDK. Memahami inovasi ini sangat penting untuk menganalisis kinerja dan keamanannya. Bagian ini merinci model data berpusat pada objek Sui, mekanisme konsensusnya, dan bahasa pemrograman Move."
                      : "The Sui blockchain introduces fundamental innovations that distinguish it from traditional account-based networks like Ethereum or Cosmos SDK. Understanding these innovations is key to evaluating its performance and safety. This section details Sui's object-centric model, consensus mechanics, and Sui Move language."}
                  </p>
                </ScrollReveal>

                {/* Sub 2.1 Model Data */}
                <ScrollReveal direction="up" duration={800} delay={50} className="mt-4">
                  <h3 className="font-bold text-sm text-[#1a1a1a] uppercase tracking-wider border-l-2 border-accent-red pl-3 mb-3">
                    {lang === "id" ? "2.1 Model Data Berpusat pada Objek (Object-Centric)" : "2.1 Object-Centric Data Model"}
                  </h3>
                  <div className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium flex flex-col gap-3">
                    {lang === "id" ? (
                      <>
                        <p>
                          Pada blockchain tradisional (misalnya, Ethereum), status global adalah ledger monolitik yang memetakan alamat akun ke saldo masing-masing dan slot penyimpanan smart contract. Untuk mengeksekusi transaksi, jaringan harus mengunci status global, memperbarui saldo secara berurutan, dan membukanya. Hal ini memperkenalkan persaingan (*contention*) yang tinggi dan membatasi kecepatan eksekusi hanya pada satu thread.
                        </p>
                        <p>
                          Sui menggantikan paradigma berbasis akun ini dengan model data berpusat pada objek. Di Sui, status global direpresentasikan sebagai kumpulan objek independen yang dapat dialamatkan, masing-masing diberikan ID Objek 32-byte yang unik secara global. Setiap objek memiliki serangkaian atribut, termasuk pemiliknya, versinya (*sequence number*), digest transaksi (hash dari transaksi terakhir yang memutasi objek tersebut), dan data binernya.
                        </p>
                        <p className="font-bold text-[#1a1a1a] mt-2 mb-1">Objek Sui dikategorikan berdasarkan empat jenis kepemilikan:</p>
                        <ul className="list-decimal pl-5 flex flex-col gap-2.5">
                          <li>
                            <strong className="text-zinc-800">Address-Owned Objects (Objek Milik Alamat):</strong> Dikendalikan oleh pasangan kunci kriptografi tertentu (misalnya, saldo koin individu atau NFT). Hanya pemilik yang dapat menandatangani transaksi untuk memutasi atau mentransfer objek tersebut.
                          </li>
                          <li>
                            <strong className="text-zinc-800">Shared Objects (Objek Bersama):</strong> Dapat diakses oleh siapa saja. Banyak pengguna dapat membaca atau menulis ke objek bersama (misalnya, pool decentralized exchange, kontrak lelang, atau papan permainan bersama). Objek-objek ini memerlukan pengurutan konsensus global untuk mencegah *race conditions*.
                          </li>
                          <li>
                            <strong className="text-zinc-800">Immutable Objects (Objek Imutabel):</strong> Aset baca-saja yang tidak dapat dimutasi, dihapus, atau ditransfer setelah pembuatan (misalnya, paket kode smart contract yang dideploy).
                          </li>
                          <li>
                            <strong className="text-zinc-800">Object-Owned Objects (Objek Milik Objek):</strong> Dimiliki oleh objek lain, memungkinkan komposisi hierarkis (misalnya, objek karakter game yang memiliki objek pedang).
                          </li>
                        </ul>
                      </>
                    ) : (
                      <>
                        <p>
                          On traditional blockchains (e.g., Ethereum), the global state is a monolithic ledger mapping account addresses to balances and smart contract storage slots. To execute transactions, the network locks global state, updates balances sequentially, and unlocks. This introduces severe contention and caps execution speed to a single thread.
                        </p>
                        <p>
                          Sui replaces this account-based paradigm with an object-centric model. In Sui, global state is represented as a collection of independent addressable objects, each assigned a globally unique 32-byte Object ID. Each object carries metadata including owner, sequence version, transaction digest, and binary payload.
                        </p>
                        <p className="font-bold text-[#1a1a1a] mt-2 mb-1">Sui objects are categorized across four ownership models:</p>
                        <ul className="list-decimal pl-5 flex flex-col gap-2.5">
                          <li>
                            <strong className="text-zinc-800">Address-Owned Objects:</strong> Controlled by a specific cryptographic keypair (e.g., user coin balances or NFTs). Only the owner can authorize mutations.
                          </li>
                          <li>
                            <strong className="text-zinc-800">Shared Objects:</strong> Accessible by anyone. Multiple users can read or mutate shared state (e.g., DEX liquidity pools, order books). These require global consensus ordering to prevent race conditions.
                          </li>
                          <li>
                            <strong className="text-zinc-800">Immutable Objects:</strong> Read-only assets that can never be modified or transferred post-publish (e.g., deployed Move smart contract packages).
                          </li>
                          <li>
                            <strong className="text-zinc-800">Object-Owned Objects:</strong> Owned by another object, supporting hierarchical composition (e.g., a gaming avatar object owning a sword item object).
                          </li>
                        </ul>
                      </>
                    )}
                  </div>
                </ScrollReveal>

                {/* Diagram Parallel Execution */}
                <ScrollReveal direction="up" duration={800} delay={100} className="my-6">
                  <div className="bg-[#eae8e4]/60 border border-border-gray rounded-3xl p-6 sm:p-8 flex flex-col items-center">
                    <span className="text-[10px] font-extrabold uppercase text-[#888] tracking-widest block mb-6">
                      {lang === "id"
                        ? "DIAGRAM: ALUR EKSEKUSI TRANSAKSI PARALEL VS SEKUENSIAL SUI"
                        : "DIAGRAM: SUI PARALLEL VS SEQUENTIAL TRANSACTION EXECUTION FLOW"}
                    </span>

                    <div className="flex flex-col gap-6 w-full max-w-xl text-xs font-semibold text-zinc-800">
                      {/* Paralel line 1 */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white/70 border border-border-gray/50 rounded-2xl w-full">
                        <div className="flex items-center gap-3">
                          <div className="px-3 py-1.5 bg-[#eae8e4] rounded-lg font-mono">Tx 1</div>
                          <span className="text-[#555]">
                            {lang === "id" ? "Mutasi Objek Alamat A" : "Mutate Address-Owned Object A"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-600 font-bold">Core CPU 1</span>
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-800 border border-emerald-500/15 px-2 py-0.5 rounded">
                            {lang === "id" ? "Eksekusi Paralel (Instan)" : "Parallel Execution (Fast Path)"}
                          </span>
                        </div>
                      </div>

                      {/* Paralel line 2 */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white/70 border border-border-gray/50 rounded-2xl w-full">
                        <div className="flex items-center gap-3">
                          <div className="px-3 py-1.5 bg-[#eae8e4] rounded-lg font-mono">Tx 2</div>
                          <span className="text-[#555]">
                            {lang === "id" ? "Mutasi Objek Alamat B" : "Mutate Address-Owned Object B"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-600 font-bold">Core CPU 2</span>
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-800 border border-emerald-500/15 px-2 py-0.5 rounded">
                            {lang === "id" ? "Eksekusi Paralel (Instan)" : "Parallel Execution (Fast Path)"}
                          </span>
                        </div>
                      </div>

                      {/* Shared consensus line */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white/70 border border-border-gray/50 rounded-2xl w-full">
                        <div className="flex items-center gap-3">
                          <div className="px-3 py-1.5 bg-accent-red/10 text-accent-red rounded-lg font-mono">Tx 3 & 4</div>
                          <span className="text-[#555]">
                            {lang === "id" ? "Mutasi Objek Bersama C" : "Mutate Shared Object C"}
                          </span>
                        </div>
                        <div className="flex flex-col items-center sm:items-end gap-1.5">
                          <span className="text-accent-red font-bold text-xs uppercase tracking-wider">
                            {lang === "id" ? "Konsensus Mysticeti" : "Mysticeti Consensus"}
                          </span>
                          <span className="text-[10px] bg-accent-red/10 text-accent-red border border-accent-red/15 px-2 py-0.5 rounded">
                            {lang === "id" ? "Eksekusi Sekuensial (Pengurutan Total)" : "Sequential Execution (Total Ordering)"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Sub 2.2 Konsensus */}
                <ScrollReveal direction="up" duration={800} delay={100} className="mt-4">
                  <h3 className="font-bold text-sm text-[#1a1a1a] uppercase tracking-wider border-l-2 border-accent-red pl-3 mb-3">
                    {lang === "id" ? "2.2 Mesin Konsensus: Narwhal, Bullshark, dan Mysticeti" : "2.2 Consensus Engine: Narwhal, Bullshark, and Mysticeti"}
                  </h3>
                  <div className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium flex flex-col gap-3">
                    {lang === "id" ? (
                      <>
                        <p>
                          Sui memisahkan diseminasi transaksi (mempool) dari pengurutan transaksi (konsensus) untuk memaksimalkan throughput jaringan.
                        </p>
                        <p>
                          <strong>Narwhal (Mempool DAG):</strong> Mempool tradisional menyiarkan transaksi secara tidak teratur, menyebabkan transmisi redundan dan hambatan CPU selama pengurutan. Narwhal memecahkan ini dengan mengatur batch transaksi ke dalam Directed Acyclic Graph (DAG). Validator mengusulkan batch transaksi dan merujuk ke batch yang diusulkan sebelumnya dari validator lain, membangun grafik kausal. Narwhal menjamin ketersediaan data, artinya setelah batch menjadi bagian dari DAG, semua validator jujur dijamin memiliki akses ke isinya.
                        </p>
                        <p>
                          <strong>Bullshark dan Mysticeti (Mesin Pengurut):</strong> Setelah Narwhal menetapkan DAG, mesin pengurut menavigasi grafik untuk menentukan urutan total transaksi tanpa memerlukan pesan voting tambahan.
                        </p>
                        <ul className="list-disc pl-5 flex flex-col gap-2.5">
                          <li>
                            <strong>Bullshark:</strong> Mesin konsensus awal Sui. Ini mengurutkan DAG dalam putaran (*waves*), menunggu kondisi tertentu sebelum melakukan commit sub-graph. Meskipun sangat efisien dalam throughput, ia memperkenalkan penundaan latensi karena menunggu proposal leader di setiap wave.
                          </li>
                          <li>
                            <strong>Mysticeti:</strong> Diperkenalkan oleh Mysten Labs pada tahun 2024 untuk menggantikan Bullshark. Mysticeti mempertahankan struktur DAG tetapi mengoptimalkan aturan commit. Ia menggunakan pendekatan validator aktif-aktif di mana validator dapat melakukan commit sub-graph secara terus-menerus, melewati waktu tunggu leader. Ini memangkas latensi konsensus menjadi sekitar 400 milidetik.
                          </li>
                        </ul>
                        <p className="mt-2 text-zinc-600 font-semibold italic">
                          Catatan: Untuk transaksi sederhana (seperti transfer aset milik alamat), Sui melewati konsensus sepenuhnya. Sebagai gantinya, Sui menggunakan protokol Byzantine Consistent Broadcast (BCB) yang ringan untuk mencapai validasi instan (fast path) sekitar 120ms.
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          Sui decouples transaction dissemination (mempool) from transaction ordering (consensus) to maximize network throughput.
                        </p>
                        <p>
                          <strong>Narwhal (DAG Mempool):</strong> Traditional mempools broadcast unorganized transactions, resulting in redundant network bandwidth and CPU bottlenecks during ordering. Narwhal solves this by structuring transaction batches into a Directed Acyclic Graph (DAG). Validators propose transaction batches referencing earlier batches from peers, constructing a causal graph. Narwhal guarantees data availability across honest validators.
                        </p>
                        <p>
                          <strong>Bullshark &amp; Mysticeti (Ordering Engines):</strong> Once Narwhal establishes the DAG, an ordering engine traverses the graph to determine global total ordering without requiring additional voting rounds.
                        </p>
                        <ul className="list-disc pl-5 flex flex-col gap-2.5">
                          <li>
                            <strong>Bullshark:</strong> Sui&apos;s initial consensus engine. It orders DAG nodes in waves, waiting for leader proposals before committing sub-graphs. While throughput-efficient, it incurs latency overhead while awaiting leader turns.
                          </li>
                          <li>
                            <strong>Mysticeti:</strong> Introduced by Mysten Labs in 2024 to succeed Bullshark. Mysticeti retains the DAG topology but optimizes commit rules using active-active validator committing, slashing consensus finality latency to ~400ms.
                          </li>
                        </ul>
                        <p className="mt-2 text-zinc-600 font-semibold italic">
                          Note: For simple transactions (such as address-owned coin transfers), Sui bypasses consensus entirely using a lightweight Byzantine Consistent Broadcast (BCB) fast path achieving ~120ms execution.
                        </p>
                      </>
                    )}
                  </div>
                </ScrollReveal>

                {/* Sub 2.3 Bahasa Move */}
                <ScrollReveal direction="up" duration={800} delay={150} className="mt-4">
                  <h3 className="font-bold text-sm text-[#1a1a1a] uppercase tracking-wider border-l-2 border-accent-red pl-3 mb-3">
                    {lang === "id" ? "2.3 Bahasa Pemrograman Sui Move" : "2.3 Sui Move Programming Language"}
                  </h3>
                  <div className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium flex flex-col gap-3">
                    {lang === "id" ? (
                      <>
                        <p>
                          Sui Move adalah adaptasi dari bahasa Move yang awalnya dikembangkan oleh Meta untuk proyek Diem. Bahasa ini dirancang khusus untuk manajemen sumber daya (*resource*) yang aman.
                        </p>
                        <p>
                          <strong>Keamanan Berorientasi Sumber Daya:</strong> Berbeda dengan Solidity, yang melacak aset sebagai saldo di dalam pemetaan penyimpanan tingkat kontrak, Move memperlakukan aset sebagai objek fisik (sumber daya) dengan aturan ketat yang diterapkan oleh compiler:
                        </p>
                        <ul className="list-disc pl-5 flex flex-col gap-2">
                          <li>
                            <strong>Tidak Ada Penyalinan atau Penghapusan Implisit:</strong> Objek yang mewakili token atau NFT tidak dapat disalin (yang akan menyebabkan pengeluaran ganda/double spending) atau dihapus secara implisit (yang akan menghilangkan aset). Objek tersebut harus ditransfer, dibakar, atau disimpan secara eksplisit.
                          </li>
                          <li>
                            <strong>Keamanan Tipe yang Ketat (Strict Type Safety):</strong> Verifikator bytecode Move memeriksa tipe dan keamanan kepemilikan secara off-chain sebelum eksekusi kontrak, mencegah serangan reentrancy, integer overflow, dan akses tidak sah sejak awal desain.
                          </li>
                        </ul>
                        <p>
                          <strong>Kekhasan Sui Move:</strong> Sementara Move standar menyimpan sumber daya di dalam penyimpanan akun, Sui Move menyimpan sumber daya sebagai objek global independen. Kontrak Sui Move adalah objek paket berisi modul yang mendefinisikan tipe struct kustom (mewakili objek) dan fungsi entry untuk menginstansiasi, memutasi, atau mentransfernya. Integrasi struktural dengan model objek blockchain ini memungkinkan kontrak Sui Move berjalan dengan paralelisme maksimum.
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          Sui Move is an adaptation of the Move language originally developed by Meta for the Diem project. It is specifically built for secure resource management.
                        </p>
                        <p>
                          <strong>Resource-Oriented Safety:</strong> Unlike Solidity, which tracks assets as balances inside contract storage mappings, Move treats assets as physical objects (resources) governed by strict compiler safety rules:
                        </p>
                        <ul className="list-disc pl-5 flex flex-col gap-2">
                          <li>
                            <strong>No Implicit Copying or Dropping:</strong> Objects representing tokens or NFTs cannot be copied (preventing double spending) or silently dropped (preventing asset loss). They must be explicitly transferred, burned, or stored.
                          </li>
                          <li>
                            <strong>Strict Type Safety:</strong> The Move bytecode verifier checks types and ownership rules off-chain prior to execution, structurally preventing reentrancy attacks, integer overflows, and unauthorized access.
                          </li>
                        </ul>
                        <p>
                          <strong>Sui Move Specifics:</strong> While standard Move stores resources inside account storage, Sui Move stores resources as independent first-class global objects. Sui Move packages define struct types (representing objects) and entry functions to instantiate, mutate, or transfer them in maximum parallel alignment with the execution engine.
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
                      ? "Bagian ini menjelaskan metodologi, desain eksperimen, dan metrik yang digunakan untuk mengevaluasi kinerja dan ketahanan blockchain Sui."
                      : "This section details the methodology, experimental setup, and metrics used to benchmark Sui blockchain performance and resilience."}
                  </p>
                </ScrollReveal>

                <ScrollReveal direction="up" duration={800} delay={50} className="mt-2 text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium flex flex-col gap-4">
                  <div>
                    <h4 className="font-bold text-[#1a1a1a] uppercase text-[11px] tracking-wider mb-1">
                      {lang === "id" ? "3.1 Desain Eksperimen" : "3.1 Experimental Setup"}
                    </h4>
                    <p>
                      {lang === "id"
                        ? "Untuk melakukan analisis empiris yang terkontrol, kami melakukan deployment jaringan Sui lokal pada server host tunggal menggunakan virtualisasi. Jaringan dikonfigurasi dengan empat node validator dan satu full node lokal, mereplikasi konfigurasi pengujian default yang direkomendasikan untuk pengembangan lokal Sui. Setup ini mengisolasi blockchain dari latensi internet eksternal dan kemacetan jaringan publik, memastikan bahwa hasilnya mencerminkan kemampuan intrinsik dari perangkat lunak dan alokasi perangkat keras."
                        : "To perform controlled empirical benchmarks, we deployed a local multi-node Sui network on a single host server using containerization. The topology comprises 4 validator nodes and 1 local full node, replicating recommended local test setups. This isolates performance from public internet latency and external congestion."}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#1a1a1a] uppercase text-[11px] tracking-wider mb-2">
                      {lang === "id" ? "3.2 Variabel Eksperimen" : "3.2 Experimental Variables"}
                    </h4>
                    <ul className="list-decimal pl-5 flex flex-col gap-2">
                      <li>
                        <strong>{lang === "id" ? "Variabel Bebas (Independent Variables):" : "Independent Variables:"}</strong> {lang === "id" ? "Laju Beban Transaksi (100 tx/s s.d 5.000 tx/s), Tingkat Konkurensi (jumlah klien paralel), dan Status Validator (aktif, offline, atau partisi)." : "Transaction Load Rate (100 to 5,000 tx/sec), Concurrency Level (parallel clients), and Validator Node State (healthy, crash offline, or partitioned)."}
                      </li>
                      <li>
                        <strong>{lang === "id" ? "Variabel Terikat (Dependent Variables):" : "Dependent Variables:"}</strong> {lang === "id" ? "Throughput/TPS (transaksi sukses masuk checkpoint per detik), Latensi (durasi tanda tangan hingga masuk checkpoint), dan Pemanfaatan Sumber Daya Sistem (CPU, RAM, disk I/O, network)." : "Throughput / TPS (committed checkpoint tx/sec), Latency (signing to finality duration), and System Resource Utilization (CPU, RAM, Disk I/O)."}
                      </li>
                      <li>
                        <strong>{lang === "id" ? "Variabel Kontrol (Control Variables):" : "Control Variables:"}</strong> {lang === "id" ? "Spesifikasi Perangkat Keras (Alokasi tetap 8 core CPU Intel Xeon E5-2697 v2 @ 2.70GHz, RAM 31 GB, SSD) dan Konfigurasi Perangkat Lunak (versi Sui Devnet dengan parameter default)." : "Hardware Specifications (Fixed allocation 8 CPU cores @ 2.70GHz, 31 GB RAM, NVMe SSD) and Software Config (Sui Devnet binaries with default params)."}
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#1a1a1a] uppercase text-[11px] tracking-wider mb-2">
                      {lang === "id" ? "3.3 Skenario Evaluasi" : "3.3 Evaluation Scenarios"}
                    </h4>
                    <p className="mb-2">
                      {lang === "id" ? "Kami merancang sembilan skenario pengujian (S1 s.d S9) untuk mengevaluasi jaringan:" : "We structured nine test scenarios (S1 through S9) to evaluate the network:"}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-white/40 border border-border-gray/50 rounded-xl">
                        <strong>S1: {lang === "id" ? "Aliran Transaksi Dasar" : "Basic Transaction Flow"}.</strong> {lang === "id" ? "Pengiriman transfer objek address-owned sederhana antara dua akun untuk verifikasi jalur cepat." : "Peer-to-peer address-owned coin transfer to verify Fast Path execution."}
                      </div>
                      <div className="p-3 bg-white/40 border border-border-gray/50 rounded-xl">
                        <strong>S2: {lang === "id" ? "Deployment Kontrak Move" : "Move Package Publishing"}.</strong> {lang === "id" ? "Mengompilasi dan mendeploy smart contract Move kustom untuk mengevaluasi compiler & biaya gas." : "Publishing custom Move contract package to evaluate bytecode verification & gas fees."}
                      </div>
                      <div className="p-3 bg-white/40 border border-border-gray/50 rounded-xl">
                        <strong>S3: {lang === "id" ? "Interaksi Smart Contract" : "Smart Contract Interaction"}.</strong> {lang === "id" ? "Mengeksekusi transaksi baca-tulis memanggil entry function kontrak Move untuk mengukur gas & latensi." : "Executing entry function transactions on custom Move objects measuring gas & latency."}
                      </div>
                      <div className="p-3 bg-white/40 border border-border-gray/50 rounded-xl">
                        <strong>S4: {lang === "id" ? "Benchmarking Throughput (TPS)" : "Throughput (TPS) Benchmarking"}.</strong> {lang === "id" ? "Meningkatkan beban input transaksi bertahap untuk mencari batas puncak TPS lokal." : "Ramping concurrent transaction rates to identify peak local network throughput capacity."}
                      </div>
                      <div className="p-3 bg-white/40 border border-border-gray/50 rounded-xl">
                        <strong>S5: {lang === "id" ? "Profil Latensi Transaksi" : "Transaction Latency Profiling"}.</strong> {lang === "id" ? "Mengukur rata-rata latensi finalitas transaksi di berbagai tingkat throughput." : "Profiling transaction finality latency across escalating throughput tiers."}
                      </div>
                      <div className="p-3 bg-white/40 border border-border-gray/50 rounded-xl">
                        <strong>S6: {lang === "id" ? "Transfer Kepemilikan Objek" : "Object Ownership Transfer"}.</strong> {lang === "id" ? "Membandingkan benchmark mutasi objek milik alamat vs mentransfer objek bersama." : "Comparing execution latency between address-owned vs shared object mutations."}
                      </div>
                      <div className="p-3 bg-white/40 border border-border-gray/50 rounded-xl">
                        <strong>S7: {lang === "id" ? "Persaingan Objek Bersama" : "Shared Object Contention"}.</strong> {lang === "id" ? "Mengirimkan transaksi berkonflik pada satu shared objek counter untuk mengukur degradasi TPS." : "Injecting 100% conflicting transactions on a single shared counter object to measure TPS degradation."}
                      </div>
                      <div className="p-3 bg-white/40 border border-border-gray/50 rounded-xl">
                        <strong>S8: {lang === "id" ? "Kegagalan & Pemulihan Node (Chaos)" : "Validator Failure & Recovery (Chaos)"}.</strong> {lang === "id" ? "Mematikan node validator untuk menguji toleransi kesalahan BFT konsensus Mysticeti." : "Killing validator processes to test BFT fault tolerance and P2P recovery catch-up time."}
                      </div>
                      <div className="p-3 bg-white/40 border border-border-gray/50 rounded-xl">
                        <strong>S9: {lang === "id" ? "Pemantauan Hardware" : "Hardware Resource Monitoring"}.</strong> {lang === "id" ? "Mengumpulkan metrik pemanfaatan CPU, RAM, dan Disk I/O selama beban puncak." : "Monitoring host CPU core utilization, RAM footprint, and disk I/O under stress."}
                      </div>
                    </div>
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
                      <>
                        <p>
                          Jaringan eksperimen dideploy pada server Ubuntu 22.04 LTS. Binari SUI dikelola menggunakan `suiup`, yang memungkinkan peralihan konfigurasi antar devnet, testnet, dan localnet. Deployment jaringan dijalankan menggunakan otomasi skrip bash lokal yang melakukan inisialisasi database, konfigurasi genesis blok, dan eksekusi set validator.
                        </p>
                        <p className="font-bold text-[#1a1a1a]">Topologi jaringan lokal mencakup beberapa proses independen:</p>
                        <ul className="list-disc pl-5 flex flex-col gap-2.5">
                          <li><strong>4 Node Validator:</strong> Menjalankan protokol konsensus Mysticeti/Bullshark dan Narwhal DAG.</li>
                          <li><strong>1 Full Node:</strong> Melayani endpoint RPC JSON-RPC pada port 9000.</li>
                          <li><strong>1 Layanan Faucet:</strong> Berjalan pada port 9123 untuk pendanaan alamat uji secara otomatis.</li>
                        </ul>
                      </>
                    ) : (
                      <>
                        <p>
                          The experimental network was deployed on an Ubuntu 22.04 LTS host server. Sui binaries were managed using `suiup`, enabling seamless version switching across localnet configurations. Deployment was fully orchestrated via automated bash scripts managing database setup, genesis initialization, and validator process startup.
                        </p>
                        <p className="font-bold text-[#1a1a1a]">The local topology runs several independent processes:</p>
                        <ul className="list-disc pl-5 flex flex-col gap-2.5">
                          <li><strong>4 Validator Nodes:</strong> Running the Mysticeti DAG consensus protocol and Narwhal mempool.</li>
                          <li><strong>1 Local Full Node:</strong> Exposing JSON-RPC services at port 9000.</li>
                          <li><strong>1 Faucet Service:</strong> Running on port 9123 to automatically seed test coin objects.</li>
                        </ul>
                      </>
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
                      ? "Bagian ini menyajikan data kuantitatif dari sembilan skenario pengujian yang telah didefinisikan sebelumnya."
                      : "This section presents quantitative empirical data across all nine test scenarios."}
                  </p>
                </ScrollReveal>

                {/* Sub 5.1 & 5.2 */}
                <ScrollReveal direction="up" duration={800} delay={50} className="mt-2 text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium flex flex-col gap-4">
                  <div>
                    <h4 className="font-bold text-[#1a1a1a] uppercase text-[11px] tracking-wider mb-1">
                      {lang === "id" ? "5.1 S1: Aliran Transaksi Dasar" : "5.1 S1: Basic Transaction Flow"}
                    </h4>
                    <p>
                      {lang === "id"
                        ? "Kami menginisiasi transfer peer-to-peer sederhana untuk token SUI antara dua akun milik alamat (address-owned). Jaringan berhasil menyelesaikan transfer tersebut melewati jalur cepat tanpa konsensus global, mencapai finalitas instan dalam waktu sekitar 120ms."
                        : "Simple peer-to-peer SUI transfers between address-owned accounts executed successfully through the Fast Path protocol (BCB), achieving sub-second finality at approximately ~120ms without invoking global consensus ordering."}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#1a1a1a] uppercase text-[11px] tracking-wider mb-2">
                      {lang === "id" ? "5.2 S2 & S3: Deployment dan Interaksi Smart Contract" : "5.2 S2 & S3: Smart Contract Deployment and Interaction"}
                    </h4>
                    <p className="mb-4">
                      {lang === "id"
                        ? "Kami mendeploy kontrak kustom Move `hello_sui`. Kontrak berhasil terpublikasi di chain sebagai objek paket imutabel. Metrik konsumsi gas dan latensi diukur pada Tabel 1 di bawah ini:"
                        : "Publishing the Move custom package `hello_sui` created an immutable package object. Gas consumption and latency metrics are outlined in Table 1 below:"}
                    </p>

                    {/* Table 1 */}
                    <div className="overflow-x-auto border border-border-gray rounded-2xl bg-white/30">
                      <table className="min-w-full divide-y divide-border-gray text-left text-xs font-semibold text-zinc-800">
                        <thead className="bg-[#eae8e4]/50">
                          <tr>
                            <th className="px-6 py-4">{lang === "id" ? "Operasi" : "Operation"}</th>
                            <th className="px-6 py-4">{lang === "id" ? "Biaya Gas (MIST)" : "Gas Cost (MIST)"}</th>
                            <th className="px-6 py-4">{lang === "id" ? "Latensi Eksekusi" : "Execution Latency"}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border-gray">
                          <tr>
                            <td className="px-6 py-3.5 font-bold">{lang === "id" ? "Publikasi Paket" : "Publish Move Package"}</td>
                            <td className="px-6 py-3.5 font-mono">12.450.000</td>
                            <td className="px-6 py-3.5">240ms</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-3.5 font-bold">{lang === "id" ? "Mint Objek Hello (Bersama)" : "Mint Hello Object (Shared)"}</td>
                            <td className="px-6 py-3.5 font-mono">2.100.000</td>
                            <td className="px-6 py-3.5">420ms</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-3.5 font-bold">{lang === "id" ? "Baca Objek Hello" : "Read Hello Object"}</td>
                            <td className="px-6 py-3.5 font-mono">0 (RPC Local)</td>
                            <td className="px-6 py-3.5">15ms</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-3.5 font-bold">{lang === "id" ? "Modifikasi Objek Hello (Bersama)" : "Mutate Hello Object (Shared)"}</td>
                            <td className="px-6 py-3.5 font-mono">3.250.000</td>
                            <td className="px-6 py-3.5">480ms</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Sub 5.3 Benchmarking & Interactive SVG Chart */}
                <ScrollReveal direction="up" duration={800} delay={100} className="mt-6">
                  <h4 className="font-bold text-[#1a1a1a] uppercase text-[11px] tracking-wider mb-2">
                    {lang === "id" ? "5.3 S4 & S5: Benchmarking Throughput (TPS) dan Latensi" : "5.3 S4 & S5: Throughput (TPS) and Latency Benchmarking"}
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mb-6">
                    {lang === "id"
                      ? "Melalui injeksi beban transaksi konkuren secara bertahap, kami menemukan karakteristik performa yang berbeda antara objek milik alamat (jalur cepat) dan objek bersama (konsensus Mysticeti). Grafik performa di bawah ini menunjukkan dinamika perubahan latensi rata-rata terhadap volume TPS."
                      : "Gradually increasing concurrent transaction load revealed distinct performance dynamics between address-owned objects (Fast Path) and shared objects (Mysticeti consensus). The SVG performance chart below illustrates latency response across throughput tiers."}
                  </p>

                  {/* INTERACTIVE SVG CHART CARD */}
                  <div className="bg-[#eae8e4]/60 border border-border-gray rounded-3xl p-6 flex flex-col items-center relative">
                    <span className="text-[10px] font-extrabold uppercase text-[#888] tracking-widest block mb-4">
                      {lang === "id"
                        ? "GRAFIK PERFORMA: LATENSI TRANSAKSI VS BEBAN THROUGHPUT (TPS)"
                        : "PERFORMANCE CHART: TRANSACTION LATENCY VS THROUGHPUT LOAD (TPS)"}
                    </span>

                    {/* SVG Element */}
                    <svg
                      width="100%"
                      height="100%"
                      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                      className="max-w-md w-full bg-white/70 border border-border-gray/50 rounded-2xl p-4 shadow-sm"
                    >
                      {/* Grid Lines */}
                      {[200, 400, 600, 800, 1000].map((lat) => {
                        const y = chartHeight - padding - (lat / 1000) * (chartHeight - padding * 2);
                        return (
                          <g key={lat}>
                            <line x1={padding} y1={y} x2={chartWidth - padding} y2={y} stroke="#e2e2e0" strokeWidth="1" strokeDasharray="3 3" />
                            <text x={padding - 8} y={y + 4} textAnchor="end" fontSize="9" fontWeight="bold" fill="#888">{lat}</text>
                          </g>
                        );
                      })}
                      {/* Bottom axis labels */}
                      {[100, 500, 1000, 1500, 2000, 2500].map((tps) => {
                        const x = padding + ((tps - 100) / 2400) * (chartWidth - padding * 2);
                        return (
                          <g key={tps}>
                            <line x1={x} y1={chartHeight - padding} x2={x} y2={padding} stroke="#e2e2e0" strokeWidth="1" strokeDasharray="3 3" />
                            <text x={x} y={chartHeight - padding + 16} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#888">{tps}</text>
                          </g>
                        );
                      })}

                      {/* X and Y Axes */}
                      <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="#1a1a1a" strokeWidth="1.5" />
                      <line x1={padding} y1={padding} x2={padding} y2={chartHeight - padding} stroke="#1a1a1a" strokeWidth="1.5" />

                      {/* Line 1: Owned Objects (Fast Path) */}
                      <path d={linePathOwned} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />

                      {/* Line 2: Shared Objects (Mysticeti) */}
                      <path d={linePathShared} fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />

                      {/* Interaction Area / Points */}
                      {dataOwned.map((d, i) => {
                        const { x, y } = getCoordinates(d.tps, d.latency);
                        const isHovered = hoveredPoint?.line === "Owned" && hoveredPoint?.valX === d.tps;
                        return (
                          <circle
                            key={`o-${i}`}
                            cx={x}
                            cy={y}
                            r={isHovered ? 6 : 4}
                            fill="#3b82f6"
                            stroke="#fff"
                            strokeWidth="1.5"
                            className="cursor-pointer transition-all"
                            onMouseEnter={() => setHoveredPoint({ x, y, valX: d.tps, valY: d.latency, line: "Owned" })}
                            onMouseLeave={() => setHoveredPoint(null)}
                          />
                        );
                      })}

                      {dataShared.map((d, i) => {
                        const { x, y } = getCoordinates(d.tps, d.latency);
                        const isHovered = hoveredPoint?.line === "Shared" && hoveredPoint?.valX === d.tps;
                        return (
                          <circle
                            key={`s-${i}`}
                            cx={x}
                            cy={y}
                            r={isHovered ? 6 : 4}
                            fill="#f97316"
                            stroke="#fff"
                            strokeWidth="1.5"
                            className="cursor-pointer transition-all"
                            onMouseEnter={() => setHoveredPoint({ x, y, valX: d.tps, valY: d.latency, line: "Shared" })}
                            onMouseLeave={() => setHoveredPoint(null)}
                          />
                        );
                      })}
                    </svg>

                    {/* Chart Legend */}
                    <div className="flex gap-6 mt-4 text-[10px] font-extrabold tracking-wider uppercase select-none">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-1 bg-[#3b82f6] rounded"></span>
                        <span className="text-blue-600">
                          {lang === "id" ? "Objek Milik Alamat (Jalur Cepat)" : "Address-Owned Objects (Fast Path)"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-1 bg-[#f97316] rounded"></span>
                        <span className="text-orange-500">
                          {lang === "id" ? "Objek Bersama (Mysticeti)" : "Shared Objects (Mysticeti Consensus)"}
                        </span>
                      </div>
                    </div>

                    {/* Interactive Tooltip */}
                    {hoveredPoint && (
                      <div
                        className="absolute p-3 bg-zinc-900 border border-zinc-800 text-white rounded-xl text-[10px] font-semibold flex flex-col gap-1 shadow-md pointer-events-none z-20"
                        style={{
                          left: `${hoveredPoint.x + 20}px`,
                          top: `${hoveredPoint.y - 20}px`
                        }}
                      >
                        <span className="text-accent-red font-bold text-[8px] uppercase tracking-wider">{hoveredPoint.line} Object</span>
                        <span>Load: {hoveredPoint.valX} TPS</span>
                        <span>Latency: {hoveredPoint.valY} ms</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-6">
                    {lang === "id"
                      ? "Pada beban rendah (100–500 TPS), latensi tetap datar sekitar 150ms untuk objek milik alamat, dan 420ms untuk objek bersama. Ketika laju transaksi melampaui 1.500 TPS, mempool konsensus mulai menumpuk. Jaringan lokal mencapai throughput puncak di angka 2.450 TPS untuk objek milik alamat (jalur cepat) sebelum mengalami kejenuhan CPU. Objek bersama memuncak di angka 1.120 TPS karena overhead urutan konsensus global."
                      : "At lower load (100–500 TPS), latency holds flat at ~150ms for address-owned objects and ~420ms for shared objects. Beyond 1,500 TPS, consensus mempool queues build up. The local setup hit peak throughput at 2,450 TPS for address-owned Fast Path transactions before CPU saturation, while shared objects peaked at 1,120 TPS due to global total-ordering overhead."}
                  </p>
                </ScrollReveal>

                {/* Sub 5.4, 5.5 & Table 2 */}
                <ScrollReveal direction="up" duration={800} delay={100} className="mt-4">
                  <h4 className="font-bold text-[#1a1a1a] uppercase text-[11px] tracking-wider mb-2">
                    {lang === "id" ? "5.4 Kendala Penguncian Koin Gas dan Kegagalan Konkurensi" : "5.4 Gas Coin Locking Constraints and Concurrency Failures"}
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mb-4">
                    {lang === "id"
                      ? "Saat memulai pengujian konkuren, terjadi kegagalan transaksi hingga 100% dari satu alamat klien. Hal ini terjadi karena koin gas yang digunakan untuk membayar transaksi bertindak sebagai objek milik alamat yang terkunci secara berurutan hingga transaksi selesai. Untuk menyiasatinya, kami melakukan gas-splitting (membagi satu koin 200 SUI menjadi 25 koin kecil masing-masing 7,99 SUI) untuk dieksekusi oleh thread paralel yang terpisah secara independen."
                      : "Initial concurrent test runs triggered up to 100% transaction failure rates from a single client account. This occurred because gas coins paying for gas fees act as address-owned objects locked sequentially per transaction. To resolve this, we implemented gas coin splitting (dividing 200 SUI into 25 separate 7.99 SUI coins) for parallel thread execution."}
                  </p>

                  <h4 className="font-bold text-[#1a1a1a] uppercase text-[11px] tracking-wider mb-2">
                    {lang === "id" ? "5.5 S6 & S7: Analisis Persaingan Objek (Contention)" : "5.5 S6 & S7: Shared Object Contention Analysis"}
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mb-4">
                    {lang === "id"
                      ? "Kami membandingkan beban kerja paralel tanpa konflik dengan kondisi persaingan tinggi (konflik 100% di mana banyak klien memodifikasi satu objek counter bersama). Terlihat degradasi performa yang sangat tajam pada Tabel 2:"
                      : "Comparing non-conflicting parallel workloads against high contention (100% conflict modifying a single shared counter object) demonstrated severe performance degradation as shown in Table 2:"}
                  </p>

                  {/* Table 2 */}
                  <div className="overflow-x-auto border border-border-gray rounded-2xl bg-white/30 mb-4">
                    <table className="min-w-full divide-y divide-border-gray text-left text-xs font-semibold text-zinc-800">
                      <thead className="bg-[#eae8e4]/50">
                        <tr>
                          <th className="px-6 py-4">{lang === "id" ? "Tipe Beban Kerja" : "Workload Type"}</th>
                          <th className="px-6 py-4">{lang === "id" ? "Throughput Puncak (TPS)" : "Peak Throughput (TPS)"}</th>
                          <th className="px-6 py-4">{lang === "id" ? "Rata-rata Latensi" : "Average Latency"}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-gray">
                        <tr>
                          <td className="px-6 py-3.5 font-bold">Parallel (Owned Objects)</td>
                          <td className="px-6 py-3.5 font-mono">2.450</td>
                          <td className="px-6 py-3.5">140ms</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-3.5 font-bold">Low Contention (Shared, 10% conflict)</td>
                          <td className="px-6 py-3.5 font-mono">1.120</td>
                          <td className="px-6 py-3.5">420ms</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-3.5 font-bold">High Contention (Shared, 100% conflict)</td>
                          <td className="px-6 py-3.5 font-mono">235</td>
                          <td className="px-6 py-3.5">1.850ms</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </ScrollReveal>

                {/* Sub 5.6 & 5.7 */}
                <ScrollReveal direction="up" duration={800} delay={150} className="mt-4">
                  <h4 className="font-bold text-[#1a1a1a] uppercase text-[11px] tracking-wider mb-1">
                    {lang === "id" ? "5.6 S8: Kegagalan dan Pemulihan Node (Chaos Testing)" : "5.6 S8: Node Failure and Recovery (Chaos Testing)"}
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mb-4">
                    {lang === "id"
                      ? "Kami menghentikan 1 dari 4 node validator lokal selama beban kerja 500 TPS berjalan. Jaringan tetap dapat memproses transaksi karena konsensus toleransi kesalahan BFT (membutuhkan supermayoritas 3f+1 aktif). Namun, hilangnya node validator menaikkan latensi dari 420ms menjadi 780ms. Ketika validator di-restart, ia melakukan sinkronisasi catch-up P2P dalam waktu 8 detik dan latensi langsung kembali normal."
                      : "Terminating 1 out of 4 validator nodes during a 500 TPS workload tested BFT fault tolerance (requiring 3f+1 active quorum). The network maintained transaction processing, though latency increased from 420ms to 780ms. Upon restarting, the validator completed P2P catch-up sync within 8 seconds and latency normalized immediately."}
                  </p>

                  <h4 className="font-bold text-[#1a1a1a] uppercase text-[11px] tracking-wider mb-1">
                    {lang === "id" ? "5.7 S9: Pemanfaatan Sumber Daya Sistem" : "5.7 S9: System Resource Utilization"}
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium">
                    {lang === "id"
                      ? "Selama beban puncak, utilisasi CPU memuncak di angka 92% di seluruh 8 core, membuktikan efisiensi multi-threading. Konsumsi RAM validator lokal stabil di kisaran 8,2 GB dari kapasitas host, sementara I/O penulisan database checkpoint rata-rata mencapai kecepatan tulis berkelanjutan sebesar 45 MB/s pada SSD."
                      : "Under peak load, host CPU utilization peaked at 92% across all 8 cores, confirming multi-threading efficiency. Local validator RAM usage stabilized around 8.2 GB, while checkpoint write I/O averaged sustained rates of 45 MB/s to SSD storage."}
                  </p>
                </ScrollReveal>
              </article>

              {/* 6. DISKUSI DAN ANALISIS PERBANDINGAN */}
              <article id="diskusi" className="scroll-mt-28 flex flex-col gap-4">
                <ScrollReveal direction="up" duration={800}>
                  <h2 className="font-bebas text-3xl sm:text-4xl text-[#1a1a1a] tracking-wide border-b border-border-gray pb-2 uppercase">
                    {lang === "id" ? "6. Diskusi dan Analisis Perbandingan" : "6. Comparative Analysis & Discussion"}
                  </h2>
                  <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-4">
                    {lang === "id"
                      ? "Hasil pengujian memvalidasi klaim parallel execution milik Sui untuk beban kerja tanpa konflik (seperti game atau NFT), tetapi menunjukkan penurunan drastis pada persaingan objek bersama yang ketat (seperti decentralized exchange monolitik). Di bawah ini kami membandingkan arsitektur Sui dengan Cosmos SDK dalam tiga dimensi utama:"
                      : "The experimental results validate Sui's parallel execution claims for non-conflicting workloads (gaming, NFTs), while illustrating throughput degradation under high shared object contention. Below is a comparative overview against Cosmos SDK:"}
                  </p>
                </ScrollReveal>

                {/* Comparison Table */}
                <ScrollReveal direction="up" duration={800} delay={100} className="mt-4">
                  <div className="overflow-x-auto border border-border-gray rounded-2xl bg-white/30">
                    <table className="min-w-full divide-y divide-border-gray text-left text-xs font-semibold text-zinc-800">
                      <thead className="bg-[#eae8e4]/50">
                        <tr>
                          <th className="px-6 py-4">{lang === "id" ? "Dimensi Perbandingan" : "Comparison Dimension"}</th>
                          <th className="px-6 py-4">Sui (Mysticeti)</th>
                          <th className="px-6 py-4">Cosmos SDK (Tendermint/CometBFT)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-gray">
                        <tr>
                          <td className="px-6 py-4 font-bold">{lang === "id" ? "Model Eksekusi" : "Execution Model"}</td>
                          <td className="px-6 py-4">
                            {lang === "id"
                              ? "Eksekusi paralel secara native. Transaksi tanpa konflik melewati konsensus global (fast path 120ms)."
                              : "Native parallel execution. Non-conflicting transactions bypass consensus (Fast Path ~120ms)."}
                          </td>
                          <td className="px-6 py-4">
                            {lang === "id"
                              ? "Eksekusi sekuensial (berurutan) per blok. Skalabilitas dibatasi satu thread CPU (waktu blok ~6s)."
                              : "Sequential block-by-block execution. Single CPU thread bottleneck (~6s block time)."}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 font-bold">{lang === "id" ? "Bahasa & Keamanan" : "Language & Safety"}</td>
                          <td className="px-6 py-4">
                            {lang === "id"
                              ? "Ditulis dalam Rust, smart contract menggunakan Sui Move dengan resource safety bawaan tingkat compiler."
                              : "Written in Rust, smart contracts use Sui Move with compiler-enforced resource safety."}
                          </td>
                          <td className="px-6 py-4">
                            {lang === "id"
                              ? "Ditulis dalam Go. Logika transisi status manual, pengembang wajib merancang validasi manual (AnteHandlers)."
                              : "Written in Go. Manual state transition logic requiring custom AnteHandler validations."}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 font-bold">{lang === "id" ? "Konsensus Bolak-Balik" : "Consensus Round-Trips"}</td>
                          <td className="px-6 py-4">
                            {lang === "id"
                              ? "Konsensus validator aktif-aktif berbasis DAG (Mysticeti). Menghilangkan leader round-trip delay."
                              : "DAG-based active-active consensus (Mysticeti), bypassing leader round-trip delays."}
                          </td>
                          <td className="px-6 py-4">
                            {lang === "id"
                              ? "Skema pemungutan suara multi-putaran berbasis leader (Propose, Prevote, Precommit)."
                              : "Leader-driven multi-round voting scheme (Propose, Prevote, Precommit)."}
                          </td>
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
                      <>
                        <p>
                          Penelitian ini berhasil mengevaluasi performa blockchain Sui secara empiris. Model berpusat pada objek Sui terbukti memberikan throughput paralel yang sangat tinggi (2.450 TPS) untuk objek milik alamat. Di sisi lain, mesin konsensus BFT berbasis DAG Mysticeti menunjukkan pemulihan yang sangat cepat (8 detik) dari kegagalan node validator. Jaminan keamanan tingkat bahasa pemrograman dari compiler Move mempermudah pencegahan celah eksploitasi Web3 yang kritis. Namun, degradasi performa pada persaingan objek bersama (shared object contention) menegaskan perlunya dApp developer untuk merancang status aplikasi dengan tingkat konflik yang serendah mungkin.
                        </p>
                        <p>
                          <strong>Saran Riset Selanjutnya:</strong> Pengujian di bawah latensi WAN antar-wilayah geografis, integrasi benchmarking dengan AMM kompleks, serta pengujian skalabilitas set validator yang lebih besar (20 s.d 50 node).
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          This research empirically evaluates Sui blockchain performance. Sui&apos;s object-centric model delivers exceptional parallel throughput (2,450 TPS) for address-owned objects. Concurrently, the Mysticeti DAG consensus engine exhibits rapid recovery (8 seconds) during validator crash scenarios. Compiler-enforced Move safety guarantees mitigate critical smart contract attack vectors. However, throughput drops under shared object contention highlight the importance of designing dApp application state with minimal conflict overlap.
                        </p>
                        <p>
                          <strong>Future Research Directions:</strong> Multi-region WAN latency testing, automated AMM benchmark integration, and scaling tests across larger validator quorums (20 to 50 nodes).
                        </p>
                      </>
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
                      ? "Berikut adalah skrip lengkap yang digunakan untuk deployment jaringan, benchmarking performa, chaos testing, dan kode smart contract Sui Move:"
                      : "Below are the complete source scripts used for network deployment, benchmarking, chaos testing, and Sui Move smart contracts:"}
                  </p>

                  {/* Tab Navigation */}
                  <div className="flex border-b border-border-gray select-none">
                    <button
                      onClick={() => setActiveTab("contract")}
                      className={`px-4 py-3.5 font-bold text-xs uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${
                        activeTab === "contract" ? "border-accent-red text-accent-red" : "border-transparent text-zinc-500 hover:text-[#1a1a1a]"
                      }`}
                    >
                      hello_sui.move
                    </button>
                    <button
                      onClick={() => setActiveTab("benchmark")}
                      className={`px-4 py-3.5 font-bold text-xs uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${
                        activeTab === "benchmark" ? "border-accent-red text-accent-red" : "border-transparent text-zinc-500 hover:text-[#1a1a1a]"
                      }`}
                    >
                      benchmark-tps.sh
                    </button>
                    <button
                      onClick={() => setActiveTab("chaos")}
                      className={`px-4 py-3.5 font-bold text-xs uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${
                        activeTab === "chaos" ? "border-accent-red text-accent-red" : "border-transparent text-zinc-500 hover:text-[#1a1a1a]"
                      }`}
                    >
                      chaos-test.sh
                    </button>
                  </div>

                  {/* Tab Contents */}
                  <div className="bg-[#0c0c0c] border border-zinc-850 rounded-b-3xl p-6 sm:p-8 text-white relative">
                    {/* Syntax highlight prefix */}
                    <div className="absolute right-6 top-6 flex items-center gap-1.5 text-[9px] font-bold text-zinc-500 select-none">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>{activeTab === "contract" ? "SUI MOVE SOURCE" : "BASH SCRIPT"}</span>
                    </div>

                    <pre className="overflow-x-auto text-[11px] font-mono text-zinc-350 leading-relaxed max-h-[500px]">
                      {activeTab === "contract" && helloSuiCode}
                      {activeTab === "benchmark" && benchmarkScript}
                      {activeTab === "chaos" && chaosScript}
                    </pre>
                  </div>
                </ScrollReveal>
              </article>

            </div>

          </div>
        </div>
      </main>

      {/* LIGHTBOX FULLVIEW MODAL FOR SUI INFOGRAPHIC */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-12 right-0 p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider bg-zinc-900/80 px-3 py-1.5 rounded-full border border-zinc-800"
            >
              <X className="w-4 h-4 text-accent-red" />
              <span>{lang === "id" ? "Tutup" : "Close"}</span>
            </button>
            <img
              src="/infografis-sui.png"
              alt="Analisis Performa dan Arsitektur Blockchain SUI Infografis Fullview"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-zinc-800 shadow-2xl"
            />
          </div>
        </div>
      )}

      <AboutFooter />
    </div>
  );
}
