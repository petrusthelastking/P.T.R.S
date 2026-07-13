"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, BookOpen, Cpu, FileText, CheckCircle, AlertCircle, TrendingUp, Terminal, Code, Layers } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { AboutFooter } from "@/components/sections/AboutFooter";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export default function SuiResearchDetailPage() {
  const [activeTab, setActiveTab] = useState<"contract" | "benchmark" | "chaos">("contract");
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
    { id: "abstract", label: "Abstract" },
    { id: "pendahuluan", label: "1. Pendahuluan" },
    { id: "arsitektur", label: "2. Arsitektur SUI" },
    { id: "metodologi", label: "3. Metodologi" },
    { id: "implementasi", label: "4. Deployment" },
    { id: "evaluasi", label: "5. Hasil Evaluasi" },
    { id: "diskusi", label: "6. Perbandingan" },
    { id: "kesimpulan", label: "7. Kesimpulan" },
    { id: "lampiran", label: "Lampiran Kode" }
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
          {/* Back link */}
          <ScrollReveal direction="up" duration={500}>
            <Link
              href="/library/riset-blockchain"
              className="inline-flex items-center gap-2 text-xs font-extrabold text-[#888] hover:text-[#1a1a1a] transition-colors select-none mb-8 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 duration-300" />
              <span>Kembali ke Riset Blockchain</span>
            </Link>
          </ScrollReveal>

          {/* Page Title */}
          <ScrollReveal direction="up" duration={800} delay={100}>
            <div className="flex flex-col gap-3 pb-8 border-b border-border-gray mb-12">
              <span className="text-[11px] font-bold tracking-[0.22em] text-accent-red uppercase">
                // TECHNICAL RESEARCH REPORT
              </span>
              <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-[0.95] text-[#1a1a1a] tracking-tight uppercase">
                ANALISIS MENDALAM BLOCKCHAIN SUI
              </h1>
              <p className="text-base sm:text-lg text-zinc-550 font-medium leading-relaxed max-w-4xl italic mt-1">
                Arsitektur, Deployment, dan Pengujian Jaringan dalam Lingkungan Kontainer
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
                  <h4 className="text-[10px] font-extrabold tracking-widest text-[#1a1a1a] uppercase pb-2 border-b border-border-gray/60">METADATA RISET</h4>
                  <div className="flex flex-col gap-3 text-xs">
                    <div>
                      <span className="text-[#888] block font-bold text-[9px] uppercase tracking-wider mb-0.5">Penulis</span>
                      <span className="font-semibold text-zinc-800">Petrus Tyang Agung Rosario</span>
                    </div>
                    <div>
                      <span className="text-[#888] block font-bold text-[9px] uppercase tracking-wider mb-0.5">Peran</span>
                      <span className="font-semibold text-zinc-800">Peneliti Blockchain Independen</span>
                    </div>
                    <div>
                      <span className="text-[#888] block font-bold text-[9px] uppercase tracking-wider mb-0.5">Tanggal Terbit</span>
                      <span className="font-semibold text-zinc-800 font-mono">Juli 2026</span>
                    </div>
                    <div>
                      <span className="text-[#888] block font-bold text-[9px] uppercase tracking-wider mb-0.5">Estimasi Baca</span>
                      <span className="font-semibold text-zinc-800">18 Menit</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Table of Contents / Outline */}
              <ScrollReveal direction="up" duration={700} delay={200}>
                <div className="bg-white/45 border border-border-gray/70 rounded-3xl p-6 flex flex-col gap-3 shadow-sm">
                  <h4 className="text-[10px] font-extrabold tracking-widest text-[#1a1a1a] uppercase pb-2 border-b border-border-gray/60">DAFTAR ISI</h4>
                  <nav className="flex flex-col gap-2">
                    {sections.map((sec) => (
                      <button
                        key={sec.id}
                        onClick={() => scrollToSection(sec.id)}
                        className="text-left text-xs font-semibold text-zinc-550 hover:text-accent-red hover:translate-x-0.5 transition-all duration-200 cursor-pointer"
                      >
                        {sec.label}
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
                    <h5 className="font-bebas text-xl uppercase tracking-wide text-white leading-none">DOKUMEN PDF ASLI</h5>
                    <p className="text-[10px] text-zinc-400 font-medium leading-normal mt-2">
                      Unduh naskah lengkap hasil riset akademis ini untuk dibaca secara luring (*offline*).
                    </p>
                  </div>
                  <a
                    href="/Riset Blockchain SUI (Bahasa Indoensia).pdf"
                    download="Riset Blockchain SUI (Petrus Rosario).pdf"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-white hover:bg-[#eae8e4] text-[#1a1a1a] font-extrabold text-xs uppercase tracking-wider transition-colors duration-300 shadow-md active:scale-[0.98] transform group"
                  >
                    <Download className="w-4 h-4 text-accent-red group-hover:translate-y-0.5 transition-transform" />
                    <span>Unduh File PDF</span>
                  </a>
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
                      Blockchain Sui mewakili pergeseran mendasar dalam desain jaringan terdesentralisasi dengan memperkenalkan model data berpusat pada objek (object-centric) dan memisahkan diseminasi transaksi dari pengurutan konsensus global. Laporan riset ini mengeksplorasi inovasi arsitektur utama Sui, termasuk bahasa pemrograman Sui Move, eksekusi paralel, dan mesin konsensus Mysticeti. Kami mendokumentasikan deployment jaringan multi-node lokal Sui dalam lingkungan kontainer dan melakukan pengujian performa (TPS dan latensi di bawah beban stres), chaos testing (ketahanan kegagalan node), serta evaluasi smart contract. Temuan kami menunjukkan kemampuan praktis Sui dalam mencapai finalitas sub-detik dan throughput konkurensi yang tinggi, sekaligus mengidentifikasi keterbatasan operasional dan tantangan tata kelola terdesentralisasi.
                    </p>
                  </div>
                </ScrollReveal>
              </article>

              {/* 1. PENDAHULUAN */}
              <article id="pendahuluan" className="scroll-mt-28 flex flex-col gap-4">
                <ScrollReveal direction="up" duration={800}>
                  <h2 className="font-bebas text-3xl sm:text-4xl text-[#1a1a1a] tracking-wide border-b border-border-gray pb-2 uppercase">
                    1. Pendahuluan
                  </h2>
                  <div className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-4 flex flex-col gap-4">
                    <p>
                      Teknologi blockchain telah bertransisi dari jaringan uang elektronik peer-to-peer sederhana menjadi platform komputasi terdesentralisasi kompleks yang menghosting aplikasi terdistribusi (dApps). Blockchain Layer 1 tradisional, seperti Ethereum, mengandalkan model eksekusi sekuensial dan penyimpanan key-value global di mana transisi status diproses dalam urutan linier. Meskipun hal ini menjamin pengurutan deterministik yang ketat, hal ini memperkenalkan hambatan skalabilitas yang parah (sering disebut sebagai &ldquo;blockchain trilemma&rdquo;). Di bawah volume transaksi yang tinggi, throughput jaringan menurun, latensi validasi transaksi melonjak, dan biaya gas berfluktuasi secara dramatis.
                    </p>
                    <p>
                      Untuk memecahkan batasan skalabilitas ini, arsitektur Layer 1 yang lebih baru telah muncul. Di antaranya, blockchain Sui, yang dikembangkan oleh Mysten Labs, mengusulkan pergeseran paradigma yang mendasar. Alih-alih memperlakukan status ledger sebagai ruang akun monolitik tunggal, Sui memperkenalkan model data berpusat pada objek (object-centric). Di bawah desain ini, setiap aset, koin, smart contract, dan kredensial adalah &ldquo;objek&rdquo; kelas satu yang dapat dialamatkan dengan tipe kepemilikan yang jelas. Hal ini memungkinkan Sui untuk secara native mengidentifikasi dan mengeksekusi transaksi independen secara paralel, melewati hambatan pengurutan konsensus global tradisional untuk aset yang tidak saling berkonflik.
                    </p>
                    <p>
                      Selain itu, Sui memisahkan diseminasi transaksi dari pengurutan. Sui menggunakan mempool berbasis Directed Acyclic Graph (DAG), Narwhal, yang dipasangkan dengan mesin konsensus (secara historis Bullshark, dan baru-baru ini Mysticeti). Mysticeti mengurangi latensi bolak-balik konsensus ke tingkat sub-detik, memungkinkan finalitas cepat untuk objek bersama (shared objects) sementara objek yang dimiliki (owned objects) dapat melewati konsensus sepenuhnya menggunakan mekanisme Byzantine Consistent Broadcast (BCB).
                    </p>
                  </div>
                </ScrollReveal>

                {/* Sub 1.1 Motivasi */}
                <ScrollReveal direction="up" duration={800} delay={50} className="mt-4">
                  <h3 className="font-bold text-sm text-[#1a1a1a] uppercase tracking-wider border-l-2 border-accent-red pl-3">
                    1.1 Motivasi dan Tujuan Penelitian
                  </h3>
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
                </ScrollReveal>

                {/* Sub 1.2 Pertanyaan Riset */}
                <ScrollReveal direction="up" duration={800} delay={100} className="mt-4">
                  <h3 className="font-bold text-sm text-[#1a1a1a] uppercase tracking-wider border-l-2 border-accent-red pl-3">
                    1.2 Pertanyaan Penelitian
                  </h3>
                  <div className="flex flex-col gap-4 mt-4">
                    <div className="bg-white/35 border border-border-gray/50 p-4 rounded-xl flex gap-3">
                      <AlertCircle className="w-5 h-5 text-accent-red shrink-0" />
                      <div>
                        <span className="font-mono text-xs font-bold text-[#1a1a1a] block mb-1">RQ1</span>
                        <p className="text-xs text-[#555] font-semibold italic">Bagaimana model data berpusat pada objek Sui diterjemahkan ke dalam throughput transaksi paralel dan latensi di bawah pengujian stres dalam jaringan lokal?</p>
                      </div>
                    </div>
                    <div className="bg-white/35 border border-border-gray/50 p-4 rounded-xl flex gap-3">
                      <AlertCircle className="w-5 h-5 text-accent-red shrink-0" />
                      <div>
                        <span className="font-mono text-xs font-bold text-[#1a1a1a] block mb-1">RQ2</span>
                        <p className="text-xs text-[#555] font-semibold italic">Bagaimana perilaku ketahanan dan pemulihan mekanisme konsensus Sui (Mysticeti/Bullshark) ketika node validator mengalami kegagalan mendadak atau partisi jaringan?</p>
                      </div>
                    </div>
                    <div className="bg-white/35 border border-border-gray/50 p-4 rounded-xl flex gap-3">
                      <AlertCircle className="w-5 h-5 text-accent-red shrink-0" />
                      <div>
                        <span className="font-mono text-xs font-bold text-[#1a1a1a] block mb-1">RQ3</span>
                        <p className="text-xs text-[#555] font-semibold italic">Bagaimana pengalaman pengembang dan keamanan kontrak Sui Move dibandingkan dengan pengembangan EVM/Solidity berbasis akun tradisional?</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </article>

              {/* 2. ARSITEKTUR SUI */}
              <article id="arsitektur" className="scroll-mt-28 flex flex-col gap-4">
                <ScrollReveal direction="up" duration={800}>
                  <h2 className="font-bebas text-3xl sm:text-4xl text-[#1a1a1a] tracking-wide border-b border-border-gray pb-2 uppercase">
                    2. Gambaran Teknis Arsitektur SUI
                  </h2>
                  <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-4">
                    Blockchain Sui memperkenalkan inovasi utama yang membedakannya dari jaringan berbasis akun tradisional seperti Ethereum atau Cosmos SDK. Memahami inovasi ini sangat penting untuk menganalisis kinerja dan keamanannya. Bagian ini merinci model data berpusat pada objek Sui, mekanisme konsensusnya, dan bahasa pemrograman Move.
                  </p>
                </ScrollReveal>

                {/* Sub 2.1 Model Data */}
                <ScrollReveal direction="up" duration={800} delay={50} className="mt-4">
                  <h3 className="font-bold text-sm text-[#1a1a1a] uppercase tracking-wider border-l-2 border-accent-red pl-3 mb-3">
                    2.1 Model Data Berpusat pada Objek (Object-Centric)
                  </h3>
                  <div className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium flex flex-col gap-3">
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
                  </div>
                </ScrollReveal>

                {/* Diagram Parallel Execution */}
                <ScrollReveal direction="up" duration={800} delay={100} className="my-6">
                  <div className="bg-[#eae8e4]/60 border border-border-gray rounded-3xl p-6 sm:p-8 flex flex-col items-center">
                    <span className="text-[10px] font-extrabold uppercase text-[#888] tracking-widest block mb-6">DIAGRAM: ALUR EKSEKUSI TRANSAKSI PARALEL VS SEKUENSIAL SUI</span>
                    
                    <div className="flex flex-col gap-6 w-full max-w-xl text-xs font-semibold text-zinc-800">
                      {/* Paralel line 1 */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white/70 border border-border-gray/50 rounded-2xl w-full">
                        <div className="flex items-center gap-3">
                          <div className="px-3 py-1.5 bg-[#eae8e4] rounded-lg font-mono">Tx 1</div>
                          <span className="text-[#555]">Mutasi Objek Alamat A</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-600 font-bold">Core CPU 1</span>
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-800 border border-emerald-500/15 px-2 py-0.5 rounded">Eksekusi Paralel (Instan)</span>
                        </div>
                      </div>

                      {/* Paralel line 2 */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white/70 border border-border-gray/50 rounded-2xl w-full">
                        <div className="flex items-center gap-3">
                          <div className="px-3 py-1.5 bg-[#eae8e4] rounded-lg font-mono">Tx 2</div>
                          <span className="text-[#555]">Mutasi Objek Alamat B</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-600 font-bold">Core CPU 2</span>
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-800 border border-emerald-500/15 px-2 py-0.5 rounded">Eksekusi Paralel (Instan)</span>
                        </div>
                      </div>

                      {/* Shared consensus line */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white/70 border border-border-gray/50 rounded-2xl w-full">
                        <div className="flex items-center gap-3">
                          <div className="px-3 py-1.5 bg-accent-red/10 text-accent-red rounded-lg font-mono">Tx 3 & 4</div>
                          <span className="text-[#555]">Mutasi Objek Bersama C</span>
                        </div>
                        <div className="flex flex-col items-center sm:items-end gap-1.5">
                          <span className="text-accent-red font-bold text-xs uppercase tracking-wider">Konsensus Mysticeti</span>
                          <span className="text-[10px] bg-accent-red/10 text-accent-red border border-accent-red/15 px-2 py-0.5 rounded">Eksekusi Sekuensial (Pengurutan Total)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Sub 2.2 Konsensus */}
                <ScrollReveal direction="up" duration={800} delay={100} className="mt-4">
                  <h3 className="font-bold text-sm text-[#1a1a1a] uppercase tracking-wider border-l-2 border-accent-red pl-3 mb-3">
                    2.2 Mesin Konsensus: Narwhal, Bullshark, dan Mysticeti
                  </h3>
                  <div className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium flex flex-col gap-3">
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
                  </div>
                </ScrollReveal>

                {/* Sub 2.3 Bahasa Move */}
                <ScrollReveal direction="up" duration={800} delay={150} className="mt-4">
                  <h3 className="font-bold text-sm text-[#1a1a1a] uppercase tracking-wider border-l-2 border-accent-red pl-3 mb-3">
                    2.3 Bahasa Pemrograman Sui Move
                  </h3>
                  <div className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium flex flex-col gap-3">
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
                  </div>
                </ScrollReveal>
              </article>

              {/* 3. METODOLOGI PENELITIAN */}
              <article id="metodologi" className="scroll-mt-28 flex flex-col gap-4">
                <ScrollReveal direction="up" duration={800}>
                  <h2 className="font-bebas text-3xl sm:text-4xl text-[#1a1a1a] tracking-wide border-b border-border-gray pb-2 uppercase">
                    3. Metodologi Penelitian
                  </h2>
                  <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-4">
                    Bagian ini menjelaskan metodologi, desain eksperimen, dan metrik yang digunakan untuk mengevaluasi kinerja dan ketahanan blockchain Sui.
                  </p>
                </ScrollReveal>

                <ScrollReveal direction="up" duration={800} delay={50} className="mt-2 text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium flex flex-col gap-4">
                  <div>
                    <h4 className="font-bold text-[#1a1a1a] uppercase text-[11px] tracking-wider mb-1">3.1 Desain Eksperimen</h4>
                    <p>Untuk melakukan analisis empiris yang terkontrol, kami melakukan deployment jaringan Sui lokal pada server host tunggal menggunakan virtualisasi. Jaringan dikonfigurasi dengan empat node validator dan satu full node lokal, mereplikasi konfigurasi pengujian default yang direkomendasikan untuk pengembangan lokal Sui. Setup ini mengisolasi blockchain dari latensi internet eksternal dan kemacetan jaringan publik, memastikan bahwa hasilnya mencerminkan kemampuan intrinsik dari perangkat lunak dan alokasi perangkat keras.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-[#1a1a1a] uppercase text-[11px] tracking-wider mb-2">3.2 Variabel Eksperimen</h4>
                    <ul className="list-decimal pl-5 flex flex-col gap-2">
                      <li>
                        <strong>Variabel Bebas (Independent Variables):</strong> Laju Beban Transaksi (100 tx/s s.d 5.000 tx/s), Tingkat Konkurensi (jumlah klien paralel), dan Status Validator (aktif, offline, atau partisi).
                      </li>
                      <li>
                        <strong>Variabel Terikat (Dependent Variables):</strong> Throughput/TPS (transaksi sukses masuk checkpoint per detik), Latensi (durasi tanda tangan hingga masuk checkpoint), dan Pemanfaatan Sumber Daya Sistem (CPU, RAM, disk I/O, network).
                      </li>
                      <li>
                        <strong>Variabel Kontrol (Control Variables):</strong> Spesifikasi Perangkat Keras (Alokasi tetap 8 core CPU Intel Xeon E5-2697 v2 @ 2.70GHz, RAM 31 GB, SSD) dan Konfigurasi Perangkat Lunak (versi Sui Devnet dengan parameter default).
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#1a1a1a] uppercase text-[11px] tracking-wider mb-2">3.3 Skenario Evaluasi</h4>
                    <p className="mb-2">Kami merancang sembilan skenario pengujian (S1 s.d S9) untuk mengevaluasi jaringan:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-white/40 border border-border-gray/50 rounded-xl">
                        <strong>S1: Aliran Transaksi Dasar.</strong> Pengiriman transfer objek address-owned sederhana antara dua akun untuk verifikasi &ldquo;jalur cepat&rdquo;.
                      </div>
                      <div className="p-3 bg-white/40 border border-border-gray/50 rounded-xl">
                        <strong>S2: Deployment Kontrak Move.</strong> Mengompilasi dan mendeploy smart contract Move kustom untuk mengevaluasi compiler &amp; biaya gas.
                      </div>
                      <div className="p-3 bg-white/40 border border-border-gray/50 rounded-xl">
                        <strong>S3: Interaksi Smart Contract.</strong> Mengeksekusi transaksi baca-tulis memanggil entry function kontrak Move untuk mengukur gas &amp; latensi.
                      </div>
                      <div className="p-3 bg-white/40 border border-border-gray/50 rounded-xl">
                        <strong>S4: Benchmarking Throughput (TPS).</strong> Meningkatkan beban input transaksi bertahap untuk mencari batas puncak TPS lokal.
                      </div>
                      <div className="p-3 bg-white/40 border border-border-gray/50 rounded-xl">
                        <strong>S5: Profiling Latensi Transaksi.</strong> Mengukur rata-rata latensi finalitas transaksi di berbagai tingkat throughput.
                      </div>
                      <div className="p-3 bg-white/40 border border-border-gray/50 rounded-xl">
                        <strong>S6: Transfer Kepemilikan Objek.</strong> Membandingkan benchmark mutasi objek milik alamat vs mentransfer objek bersama.
                      </div>
                      <div className="p-3 bg-white/40 border border-border-gray/50 rounded-xl">
                        <strong>S7: Persaingan Objek Bersama.</strong> Mengirimkan transaksi berkonflik pada satu shared objek counter untuk mengukur degradasi TPS.
                      </div>
                      <div className="p-3 bg-white/40 border border-border-gray/50 rounded-xl">
                        <strong>S8: Kegagalan &amp; Pemulihan Node (Chaos).</strong> Mematikan node validator untuk menguji toleransi kesalahan BFT konsensus Mysticeti.
                      </div>
                      <div className="p-3 bg-white/40 border border-border-gray/50 rounded-xl">
                        <strong>S9: Pemantauan Hardware.</strong> Mengumpulkan metrik pemanfaatan CPU, RAM, dan Disk I/O selama beban puncak.
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </article>

              {/* 4. IMPLEMENTASI SISTEM */}
              <article id="implementasi" className="scroll-mt-28 flex flex-col gap-4">
                <ScrollReveal direction="up" duration={800}>
                  <h2 className="font-bebas text-3xl sm:text-4xl text-[#1a1a1a] tracking-wide border-b border-border-gray pb-2 uppercase">
                    4. Implementasi Sistem dan Deployment
                  </h2>
                  <div className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-4 flex flex-col gap-4">
                    <p>
                      Jaringan eksperimen dideploy pada server Ubuntu 22.04 LTS. Binari SUI dikelola menggunakan `suiup`, yang memungkinkan peralihan konfigurasi antar devnet, testnet, dan localnet. Deployment jaringan dijalankan menggunakan otomasi skrip bash lokal yang melakukan inisialisasi database, konfigurasi genesis blok, dan eksekusi set validator.
                    </p>
                    <p className="font-bold text-[#1a1a1a]">Topologi jaringan lokal mencakup beberapa proses independen:</p>
                    <ul className="list-disc pl-5 flex flex-col gap-2.5">
                      <li>
                        <strong>4 Node Validator:</strong> Menjalankan protokol konsensus Mysticeti/Bullshark dan Narwhal DAG.
                      </li>
                      <li>
                        <strong>1 Full Node:</strong> Melayani endpoint RPC JSON-RPC pada port 9000.
                      </li>
                      <li>
                        <strong>1 Layanan Faucet:</strong> Berjalan pada port 9123 untuk pendanaan alamat uji secara otomatis.
                      </li>
                    </ul>
                    <p>
                      Di bawah sub-bab 4.4, kami menyiapkan proyek smart contract SUI Move bernama `hello_sui` yang berisi konfigurasi `Move.toml` serta logika kontrak di `hello_sui.move` untuk mendefinisikan objek kustom berupa counter bersama (shared object). Detail skrip deployment selengkapnya dapat dilihat pada lampiran naskah.
                    </p>
                  </div>
                </ScrollReveal>
              </article>

              {/* 5. EVALUASI DAN HASIL */}
              <article id="evaluasi" className="scroll-mt-28 flex flex-col gap-4">
                <ScrollReveal direction="up" duration={800}>
                  <h2 className="font-bebas text-3xl sm:text-4xl text-[#1a1a1a] tracking-wide border-b border-border-gray pb-2 uppercase">
                    5. Evaluasi Eksperimental dan Hasil
                  </h2>
                  <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-4">
                    Bagian ini menyajikan data kuantitatif dari sembilan skenario pengujian yang telah didefinisikan sebelumnya.
                  </p>
                </ScrollReveal>

                {/* Sub 5.1 & 5.2 */}
                <ScrollReveal direction="up" duration={800} delay={50} className="mt-2 text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium flex flex-col gap-4">
                  <div>
                    <h4 className="font-bold text-[#1a1a1a] uppercase text-[11px] tracking-wider mb-1">5.1 S1: Aliran Transaksi Dasar</h4>
                    <p>Kami menginisiasi transfer peer-to-peer sederhana untuk token SUI antara dua akun milik alamat (address-owned). Jaringan berhasil menyelesaikan transfer tersebut melewati &ldquo;jalur cepat&rdquo; tanpa konsensus global global (Byzantine Consistent Broadcast), mencapai finalitas instan dalam waktu sekitar <strong>120ms</strong>.</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#1a1a1a] uppercase text-[11px] tracking-wider mb-2">5.2 S2 &amp; S3: Deployment dan Interaksi Smart Contract</h4>
                    <p className="mb-4">Kami mendeploy kontrak kustom Move `hello_sui`. Kontrak berhasil terpublikasi di chain sebagai objek paket imutabel. Metrik konsumsi gas dan latensi diukur pada Tabel 1 di bawah ini:</p>
                    
                    {/* Table 1 */}
                    <div className="overflow-x-auto border border-border-gray rounded-2xl bg-white/30">
                      <table className="min-w-full divide-y divide-border-gray text-left text-xs font-semibold text-zinc-800">
                        <thead className="bg-[#eae8e4]/50">
                          <tr>
                            <th className="px-6 py-4">Operasi</th>
                            <th className="px-6 py-4">Biaya Gas (MIST)</th>
                            <th className="px-6 py-4">Latensi Eksekusi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border-gray">
                          <tr>
                            <td className="px-6 py-3.5 font-bold">Publikasi Paket</td>
                            <td className="px-6 py-3.5 font-mono">12.450.000</td>
                            <td className="px-6 py-3.5">240ms</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-3.5 font-bold">Mint Objek Hello (Bersama)</td>
                            <td className="px-6 py-3.5 font-mono">2.100.000</td>
                            <td className="px-6 py-3.5">420ms</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-3.5 font-bold">Baca Objek Hello</td>
                            <td className="px-6 py-3.5 font-mono">0 (RPC Lokal)</td>
                            <td className="px-6 py-3.5">15ms</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-3.5 font-bold">Modifikasi Objek Hello (Bersama)</td>
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
                  <h4 className="font-bold text-[#1a1a1a] uppercase text-[11px] tracking-wider mb-2">5.3 S4 &amp; S5: Benchmarking Throughput (TPS) dan Latensi</h4>
                  <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mb-6">
                    Melalui injeksi beban transaksi konkuren secara bertahap, kami menemukan karakteristik performa yang berbeda antara objek milik alamat (jalur cepat) dan objek bersama (konsensus Mysticeti). Grafik performa di bawah ini menunjukkan dinamika perubahan latensi rata-rata terhadap volume TPS.
                  </p>

                  {/* INTERACTIVE SVG CHART CARD */}
                  <div className="bg-[#eae8e4]/60 border border-border-gray rounded-3xl p-6 flex flex-col items-center relative">
                    <span className="text-[10px] font-extrabold uppercase text-[#888] tracking-widest block mb-4">GRAFIK PERFORMA: LATENSI TRANSAKSI VS BEBAN THROUGHPUT (TPS)</span>
                    
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

                      {/* Line 1: Owned Objects (Jalur Cepat) */}
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
                        <span className="text-blue-600">Objek Milik Alamat (Jalur Cepat)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-1 bg-[#f97316] rounded"></span>
                        <span className="text-orange-500">Objek Bersama (Mysticeti)</span>
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
                    Pada beban rendah (100–500 TPS), latensi tetap datar sekitar 150ms untuk objek milik alamat, dan 420ms untuk objek bersama. Ketika laju transaksi melampaui 1.500 TPS, mempool konsensus mulai menumpuk. Jaringan lokal mencapai throughput puncak di angka <strong>2.450 TPS</strong> untuk objek milik alamat (jalur cepat) sebelum mengalami kejenuhan CPU. Objek bersama memuncak di angka <strong>1.120 TPS</strong> karena overhead urutan konsensus global.
                  </p>
                </ScrollReveal>

                {/* Sub 5.4, 5.5 & Table 2 */}
                <ScrollReveal direction="up" duration={800} delay={100} className="mt-4">
                  <h4 className="font-bold text-[#1a1a1a] uppercase text-[11px] tracking-wider mb-2">5.4 Kendala Penguncian Koin Gas dan Kegagalan Konkurensi</h4>
                  <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mb-4">
                    Saat memulai pengujian konkuren, terjadi kegagalan transaksi hingga 100% dari satu alamat klien. Hal ini terjadi karena koin gas yang digunakan untuk membayar transaksi bertindak sebagai objek milik alamat yang terkunci secara berurutan hingga transaksi selesai. Untuk menyiasatinya, kami melakukan *gas-splitting* (membagi satu koin 200 SUI menjadi 25 koin kecil masing-masing 7,99 SUI) untuk dieksekusi oleh thread paralel yang terpisah secara independen.
                  </p>

                  <h4 className="font-bold text-[#1a1a1a] uppercase text-[11px] tracking-wider mb-2">5.5 S6 &amp; S7: Analisis Persaingan Objek (Contention)</h4>
                  <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mb-4">
                    Kami membandingkan beban kerja paralel tanpa konflik dengan kondisi persaingan tinggi (konflik 100% di mana banyak klien memodifikasi satu objek counter bersama). Terlihat degradasi performa yang sangat tajam pada Tabel 2:
                  </p>

                  {/* Table 2 */}
                  <div className="overflow-x-auto border border-border-gray rounded-2xl bg-white/30 mb-4">
                    <table className="min-w-full divide-y divide-border-gray text-left text-xs font-semibold text-zinc-800">
                      <thead className="bg-[#eae8e4]/50">
                        <tr>
                          <th className="px-6 py-4">Tipe Beban Kerja</th>
                          <th className="px-6 py-4">Throughput Puncak (TPS)</th>
                          <th className="px-6 py-4">Rata-rata Latensi</th>
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
                  <h4 className="font-bold text-[#1a1a1a] uppercase text-[11px] tracking-wider mb-1">5.6 S8: Kegagalan dan Pemulihan Node (Chaos Testing)</h4>
                  <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mb-4">
                    Kami menghentikan 1 dari 4 node validator lokal selama beban kerja 500 TPS berjalan. Jaringan tetap dapat memproses transaksi karena konsensus toleransi kesalahan BFT (membutuhkan supermayoritas 3f+1 aktif). Namun, hilangnya node validator menaikkan latensi dari 420ms menjadi 780ms. Ketika validator di-restart, ia melakukan sinkronisasi catch-up P2P dalam waktu <strong>8 detik</strong> dan latensi langsung kembali normal.
                  </p>

                  <h4 className="font-bold text-[#1a1a1a] uppercase text-[11px] tracking-wider mb-1">5.7 S9: Pemanfaatan Sumber Daya Sistem</h4>
                  <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium">
                    Selama beban puncak, utilisasi CPU memuncak di angka 92% di seluruh 8 core, membuktikan efisiensi multi-threading. Konsumsi RAM validator lokal stabil di kisaran 8,2 GB dari kapasitas host, sementara I/O penulisan database checkpoint rata-rata mencapai kecepatan tulis berkelanjutan sebesar 45 MB/s pada SSD.
                  </p>
                </ScrollReveal>
              </article>

              {/* 6. DISKUSI DAN ANALISIS PERBANDINGAN */}
              <article id="diskusi" className="scroll-mt-28 flex flex-col gap-4">
                <ScrollReveal direction="up" duration={800}>
                  <h2 className="font-bebas text-3xl sm:text-4xl text-[#1a1a1a] tracking-wide border-b border-border-gray pb-2 uppercase">
                    6. Diskusi dan Analisis Perbandingan
                  </h2>
                  <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-4">
                    Hasil pengujian memvalidasi klaim parallel execution milik Sui untuk beban kerja tanpa konflik (seperti game atau NFT), tetapi menunjukkan penurunan drastis pada persaingan objek bersama yang ketat (seperti decentralized exchange monolitik). Di bawah ini kami membandingkan arsitektur Sui dengan Cosmos SDK dalam tiga dimensi utama:
                  </p>
                </ScrollReveal>

                {/* Comparison Table */}
                <ScrollReveal direction="up" duration={800} delay={100} className="mt-4">
                  <div className="overflow-x-auto border border-border-gray rounded-2xl bg-white/30">
                    <table className="min-w-full divide-y divide-border-gray text-left text-xs font-semibold text-zinc-800">
                      <thead className="bg-[#eae8e4]/50">
                        <tr>
                          <th className="px-6 py-4">Dimensi Perbandingan</th>
                          <th className="px-6 py-4">Sui (Mysticeti)</th>
                          <th className="px-6 py-4">Cosmos SDK (Tendermint/CometBFT)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-gray">
                        <tr>
                          <td className="px-6 py-4 font-bold">Model Eksekusi</td>
                          <td className="px-6 py-4">Eksekusi paralel secara native. Transaksi tanpa konflik melewati konsensus global (fast path 120ms).</td>
                          <td className="px-6 py-4">Eksekusi sekuensial (berurutan) per blok. Skalabilitas dibatasi satu thread CPU (waktu blok ~6s).</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 font-bold">Bahasa &amp; Keamanan</td>
                          <td className="px-6 py-4">Ditulis dalam Rust, smart contract menggunakan Sui Move dengan resource safety bawaan tingkat compiler.</td>
                          <td className="px-6 py-4">Ditulis dalam Go. Logika transisi status manual, pengembang wajib merancang validasi manual (AnteHandlers).</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 font-bold">Konsensus Bolak-Balik</td>
                          <td className="px-6 py-4">Konsensus validator aktif-aktif berbasis DAG (Mysticeti). Menghilangkan leader round-trip delay.</td>
                          <td className="px-6 py-4">Skema pemungutan suara multi-putaran berbasis leader (Propose, Prevote, Precommit).</td>
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
                    7. Kesimpulan dan Saran
                  </h2>
                  <div className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-4 flex flex-col gap-4">
                    <p>
                      Penelitian ini berhasil mengevaluasi performa blockchain Sui secara empiris. Model berpusat pada objek Sui terbukti memberikan throughput paralel yang sangat tinggi (2.450 TPS) untuk objek milik alamat. Di sisi lain, mesin konsensus BFT berbasis DAG Mysticeti menunjukkan pemulihan yang sangat cepat (8 detik) dari kegagalan node validator. Jaminan keamanan tingkat bahasa pemrograman dari compiler Move mempermudah pencegahan celah eksploitasi Web3 yang kritis. Namun, degradasi performa pada persaingan objek bersama (shared object contention) menegaskan perlunya dApp developer untuk merancang status aplikasi dengan tingkat konflik yang serendah mungkin.
                    </p>
                    <p>
                      <strong>Saran Riset Selanjutnya:</strong> Pengujian di bawah latensi WAN antar-wilayah geografis, integrasi benchmarking dengan AMM kompleks, serta pengujian skalabilitas set validator yang lebih besar (20 s.d 50 node).
                    </p>
                  </div>
                </ScrollReveal>
              </article>

              {/* LAMPIRAN DENGAN TABS */}
              <article id="lampiran" className="scroll-mt-28 flex flex-col gap-4">
                <ScrollReveal direction="up" duration={800}>
                  <h2 className="font-bebas text-3xl sm:text-4xl text-[#1a1a1a] tracking-wide border-b border-border-gray pb-2 uppercase">
                    Lampiran: Kode &amp; Skrip Teknis
                  </h2>
                  <p className="text-xs sm:text-[13px] text-[#444] leading-relaxed font-medium mt-4 mb-4">
                    Berikut adalah skrip lengkap yang digunakan untuk deployment jaringan, benchmarking performa, chaos testing, dan kode smart contract Sui Move:
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

      <AboutFooter />
    </div>
  );
}
