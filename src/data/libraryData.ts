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
    year: "2024",
    title: "BLOCKNOTARY: MENJAGA KEASLIAN DOKUMEN DENGAN BLOCKCHAIN",
    desc: "Eksplorasi arsitektur sistem notarisasi dokumen berbasis Ethereum. Membahas trade-off antara on-chain storage vs off-chain hashing, gas cost optimisation, dan UX untuk pengguna non-teknis.",
    tags: ["ETHEREUM", "SOLIDITY", "IPFS", "DOCUMENT SECURITY"],
    link: "/portfolio/blocknotary"
  },
  {
    index: "02",
    status: "IN PROGRESS",
    category: "RESEARCH",
    year: "2024",
    title: "VERICHAIN: TOKENISASI KREDIT KARBON DI BLOCKCHAIN",
    desc: "Analisis mekanisme tokenisasi RWA (Real-World Asset) untuk pasar karbon sukarela. Mencakup desain ERC-1155 multi-token, integrasi Chainlink oracle untuk data verifikasi off-chain, dan mekanisme retirement yang irreversible.",
    tags: ["ERC-1155", "REFI", "CARBON MARKETS", "CHAINLINK"],
    link: "/portfolio/verichain"
  },
  {
    index: "03",
    status: "NOTE",
    category: "NOTE",
    year: "2023",
    title: "CATATAN: REENTRANCY ATTACK & THE DAO HACK 2016",
    desc: "Analisis singkat dari salah satu serangan terbesar dalam sejarah DeFi. 60 juta dolar hilang karena satu pola kode yang salah. Ini yang mendorong saya untuk selalu melakukan destructive testing sebelum deployment.",
    tags: ["SECURITY", "SOLIDITY", "ATTACK VECTORS"],
    link: "/portfolio/auditchain"
  }
];

export const activeResearch: string[] = [
  "Tokenisasi aset nyata (RWA) sebagai mekanisme jaminan kredit di pasar berkembang",
  "Mekanisme verifikasi dokumen zero-knowledge untuk privasi data pengguna",
  "Desain permissioned blockchain untuk sistem audit sektor publik"
];
