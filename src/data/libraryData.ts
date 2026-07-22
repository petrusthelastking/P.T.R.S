export interface LibraryArticle {
  index: string;
  status: 'PUBLISHED' | 'IN PROGRESS' | 'NOTE';
  category: string;
  year: string;
  title: string;
  desc: string;
  tags: string[];
  link: string;
}

export const libraryArticles: LibraryArticle[] = [
  {
    index: "01",
    status: "PUBLISHED",
    category: "RESEARCH",
    year: "2026",
    title: "ANALISIS MENDALAM BLOCKCHAIN SUI: ARSITEKTUR, DEPLOYMENT, DAN PENGUJIAN JARINGAN",
    desc: "Laporan riset independen mengeksplorasi inovasi arsitektur Sui (Sui Move, paralel eksekusi, Mysticeti) disertai pengujian performa throughput (TPS), chaos testing validator, dan kompilasi smart contract.",
    tags: ["SUI", "MOVE", "MYSTICETI", "CHAOS TESTING", "BENCHMARK"],
    link: "/library/riset-blockchain/analisis-blockchain-sui"
  },
  {
    index: "02",
    status: "PUBLISHED",
    category: "RESEARCH",
    year: "2026",
    title: "ANALISIS MENDALAM CELESTIA: ARSITEKTUR, DEPLOYMENT MODULAR, DAN BENCHMARKING KETERSEDIAAN DATA (DATA AVAILABILITY)",
    desc: "Laporan riset akademis independen mengeksplorasi arsitektur blockchain modular Celestia, Data Availability Sampling (DAS), 2D Reed-Solomon Erasure Coding, serta benchmarking throughput blob data.",
    tags: ["CELESTIA", "DATA AVAILABILITY", "DAS", "ERASURE CODING", "MODULAR"],
    link: "/library/riset-blockchain/analisis-blockchain-celestia"
  }
];

export const activeResearch: string[] = [
  "Tokenisasi aset nyata (RWA) sebagai mekanisme jaminan kredit di pasar berkembang",
  "Mekanisme verifikasi dokumen zero-knowledge untuk privasi data pengguna",
  "Desain permissioned blockchain untuk sistem audit sektor publik"
];
