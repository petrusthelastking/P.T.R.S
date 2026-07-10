export interface ProjectSpec {
  label: string;
  value: string;
}

export interface Project {
  num: string;
  status: 'COMPLETED' | 'IN PROGRESS';
  categories: string;
  title: string;
  subtitle: string;
  desc: string;
  highlight: string;
  tech: string[];
  role: string;
  link: string;
  slug: string;
  year: string;
  specs: ProjectSpec[];
  overview: string[];
  impact: string;
  challenges: string[];
  architecture: string;
  nextSlug: string;
  nextTitle: string;
}

export interface BeyondBlockchainProject {
  title: string;
  role: string;
  desc: string;
  tech: string[];
  initialLetter: string;
}

export interface MethodologyStep {
  num: string;
  phase: string;
  title: string;
  desc: string;
  out: string;
  iconName: 'Search' | 'Settings' | 'Code' | 'ShieldAlert' | 'Eye' | 'ShieldCheck';
}

export interface StackCategory {
  title: string;
  items: string[];
}

export interface Stat {
  num: string;
  label: string;
  desc: string;
}

export interface Principle {
  title: string;
  desc: string;
}

export const specialties = [
  "Smart Contract Dev",
  "DeFi Protocol Design",
  "NFT Marketplace",
  "dApp Development",
  "Blockchain Consulting"
];

export const aboutTags = [
  "Blockchain Developer",
  "Blockchain Researcher",
  "Smart Contract Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Open to Collaboration"
];

export const methodologySteps: MethodologyStep[] = [
  {
    num: "01",
    phase: "PHASE 01",
    title: "RESEARCH & PROBLEM FRAMING",
    desc: "Sebelum menulis satu baris kode pun, saya memetakan domain masalahnya — siapa adversary-nya, data apa yang harus immutable, trust boundary di mana.",
    out: "Problem definition · Threat model · Architecture decision record",
    iconName: "Search"
  },
  {
    num: "02",
    phase: "PHASE 02",
    title: "PROTOCOL & ARCHITECTURE DESIGN",
    desc: "Memilih layer teknologi yang tepat — apakah perlu on-chain atau cukup off-chain, public chain atau permissioned network. Desain sebelum implementasi.",
    out: "System diagram · Data flow · Smart contract interface spec",
    iconName: "Settings"
  },
  {
    num: "03",
    phase: "PHASE 03",
    title: "SMART CONTRACT DEVELOPMENT",
    desc: "Penulisan kontrak dengan standar keamanan ketat — checks-effects-interactions, reentrancy guard, gas optimization. Setiap fungsi publik adalah attack surface.",
    out: "Solidity/Go contracts · Unit & integration tests · Gas report",
    iconName: "Code"
  },
  {
    num: "04",
    phase: "PHASE 04",
    title: "SECURITY AUDIT & DESTRUCTIVE TESTING",
    desc: "Static analysis (Slither, Mythril) + destructive testing manual — mencoba membreak kontrak sebelum orang lain melakukannya.",
    out: "Audit report · Vulnerability log · Refactored contracts",
    iconName: "ShieldAlert"
  },
  {
    num: "05",
    phase: "PHASE 05",
    title: "FRONTEND & INTEGRATION",
    desc: "UI terhubung ke chain menggunakan wagmi/ethers.js dengan error handling yang manusiawi — wallet errors, pending states, rejection flows semuanya dirancang.",
    out: "React/Next.js dApp · Wallet integration · Real-time chain data",
    iconName: "Eye"
  },
  {
    num: "06",
    phase: "PHASE 06",
    title: "DEPLOY & MONITOR",
    desc: "Deployment ke testnet lebih dulu, monitoring on-chain events via The Graph atau custom indexer. Mainnet bertahap dengan upgrade path yang sudah dirancang dari awal.",
    out: "Deployed contracts · Subgraph · Monitoring dashboard",
    iconName: "ShieldCheck"
  }
];

export const blockchainProjects: Project[] = [
  {
    num: "01",
    status: "COMPLETED",
    categories: "BLOCKCHAIN · DOCUMENT SECURITY · RESEARCH",
    title: "BLOCKNOTARY",
    subtitle: "Document Authenticity on Blockchain",
    desc: "A decentralized notarisation system that anchors cryptographic hashes of official documents on-chain, making forgery mathematically impossible without invalidating the entire chain.",
    highlight: "Eliminates single-point-of-trust forgery risk for official document workflows.",
    tech: ["SOLIDITY", "IPFS", "ETHEREUM", "NEXT.JS", "HARDHAT", "ETHERS.JS"],
    role: "Full-Stack & Smart Contract Developer",
    link: "/portfolio/blocknotary",
    slug: "blocknotary",
    year: "2024",
    specs: [
      { label: "Verification time", value: "< 2 detik" },
      { label: "Hash algorithm", value: "SHA-256" },
      { label: "Storage layer", value: "IPFS + Ethereum" },
      { label: "Smart contract standard", value: "Custom ERC" }
    ],
    overview: [
      "BlockNotary menyelesaikan masalah fundamental: bagaimana kita membuktikan sebuah dokumen asli tanpa bergantung pada satu otoritas terpusat yang bisa korup atau gagal?",
      "Solusinya adalah menyimpan kriptografis hash (SHA-256) dari setiap dokumen ke dalam smart contract Ethereum. Siapapun bisa memverifikasi keaslian dokumen dengan membandingkan hashnya terhadap yang tersimpan on-chain — tanpa perlu mempercayai institusi manapun.",
      "Dokumen fisik tetap di-host secara off-chain (IPFS), hanya fingerprint kriptografisnya yang on-chain. Ini menjaga privasi konten sekaligus memastikan proof of existence yang tidak bisa dimanipulasi."
    ],
    impact: "Eliminates single-point-of-trust forgery risk for official document workflows.",
    challenges: [
      "Menjaga privasi konten dokumen sambil tetap memungkinkan verifikasi publik — dijawab dengan hashing off-chain sebelum on-chain anchoring.",
      "Gas cost optimisation untuk operasi batch notarissasi — dijawab dengan Merkle tree batching.",
      "UX untuk pengguna non-teknis yang tidak paham wallet atau gas fee."
    ],
    architecture: "User uploads document → SHA-256 hash computed client-side → Hash + metadata submitted to Solidity contract → Contract emits NotarizationEvent → Document stored on IPFS → Verification flow reads hash from chain and compares.",
    nextSlug: "verichain",
    nextTitle: "VERICHAIN"
  },
  {
    num: "02",
    status: "IN PROGRESS",
    categories: "BLOCKCHAIN · REFI · CARBON MARKETS",
    title: "VERICHAIN",
    subtitle: "Carbon Tokenization Protocol",
    desc: "Tokenizes carbon credits as on-chain assets, enabling transparent trading, double-spend prevention, and real-time retirement tracking — removing greenwashing from voluntary carbon markets.",
    highlight: "Building verifiable ReFi infrastructure for institutional carbon compliance.",
    tech: ["SOLIDITY", "ERC-1155", "CHAINLINK", "THE GRAPH", "NEXT.JS", "WAGMI"],
    role: "Blockchain Architect & Researcher",
    link: "/portfolio/verichain",
    slug: "verichain",
    year: "2024",
    specs: [
      { label: "Verification time", value: "< 3 detik" },
      { label: "Hash algorithm", value: "SHA-256" },
      { label: "Storage layer", value: "IPFS + Polygon" },
      { label: "Smart contract standard", value: "ERC-1155" }
    ],
    overview: [
      "VeriChain menyelesaikan masalah transparansi dan kepercayaan pada voluntary carbon markets, di mana klaim penyerapan karbon seringkali sulit diverifikasi atau mengalami double-spending.",
      "Protokol ini menokenisasi kredit karbon terverifikasi menjadi on-chain assets (ERC-1155) di jaringan Polygon, memungkinkan perdagangan yang transparan, pencegahan penjualan ganda secara real-time, dan pensiun kredit karbon yang terdokumentasi permanen.",
      "Dengan mengintegrasikan chainlink oracles, data status sertifikat karbon off-chain di-sync secara aman ke dalam smart contract, menjembatani dunia nyata dan Web3 secara trustless."
    ],
    impact: "Building verifiable ReFi infrastructure for institutional carbon compliance.",
    challenges: [
      "Integrasi dApp dengan indexer chain untuk retrieval data pensiun secara real-time.",
      "Memverifikasi keabsahan kredit karbon dari register eksternal (off-chain) secara trustless.",
      "Menjaga konsistensi data antara ledger on-chain dan database sertifikat karbon."
    ],
    architecture: "Off-chain registry issues credit → Oracles verify validation status → Smart contract mints ERC-1155 Carbon Token → Trading on decentralised exchange → Token retirement burns asset and logs permanent proof on-chain.",
    nextSlug: "auditchain",
    nextTitle: "AUDITCHAIN"
  },
  {
    num: "03",
    status: "COMPLETED",
    categories: "BLOCKCHAIN · ENTERPRISE · AUDIT",
    title: "AUDITCHAIN",
    subtitle: "Immutable Transaction Audit Trail",
    desc: "Stores every state mutation as a cryptographically-signed event inside distributed blockchain nodes, creating a tamper-evident audit log that serves as ground-truth for transaction authenticity verification.",
    highlight: "Provides regulators and auditors with an unforgeable change-history record.",
    tech: ["HYPERLEDGER FABRIC", "GO", "NODE.JS", "COUCHDB", "DOCKER", "GRPC"],
    role: "Blockchain Developer & System Designer",
    link: "/portfolio/auditchain",
    slug: "auditchain",
    year: "2023",
    specs: [
      { label: "Verification time", value: "< 1 detik" },
      { label: "Consensus", value: "Raft / Kafka" },
      { label: "State Database", value: "CouchDB" },
      { label: "Framework", value: "Hyperledger Fabric" }
    ],
    overview: [
      "AuditChain menyediakan solusi pencatatan transaksi yang tamper-evident dan tidak dapat dipalsukan untuk kebutuhan kepatuhan regulasi industri enterprise.",
      "Menggunakan Hyperledger Fabric sebagai platform permissioned blockchain, sistem ini mencatat setiap perubahan data state sebagai transaksi yang ditandatangani secara kriptografis oleh organisasi terkait.",
      "Ini memberikan log audit lengkap yang kredibel bagi regulator, meminimalkan dispute antar-organisasi, dan memastikan akuntabilitas operasional secara penuh."
    ],
    impact: "Provides regulators and auditors with an unforgeable change-history record.",
    challenges: [
      "Sinkronisasi throughput tinggi dengan latensi konsensus rendah.",
      "Membatasi akses audit log hanya untuk regulator yang berwenang.",
      "Integrasi gRPC dengan legacy system untuk pelacakan secara realtime."
    ],
    architecture: "Client system triggers action → Transaction proposal sent to endorsing nodes → Endorsements collected and submitted to Orderer → Block generated and committed to CouchDB state database → Event sent to client.",
    nextSlug: "blocknotary",
    nextTitle: "BLOCKNOTARY"
  }
];

export const beyondBlockchainProjects: BeyondBlockchainProject[] = [
  {
    title: "SMART FARMING",
    role: "Frontend & Backend Developer",
    desc: "Autonomous precision-agriculture system (60% production-ready). Minimal human intervention — the system self-regulates irrigation, nutrient dosing, and environment controls.",
    tech: ["REACT", "NODE.JS", "MQTT", "POSTGRESQL", "IOT", "SENSOR INTEGRATION"],
    initialLetter: "S"
  },
  {
    title: "SMART MONITORING",
    role: "Frontend Developer",
    desc: "Real-time power consumption monitoring across a multi-floor building with live dashboards, anomaly detection, and historical analytics.",
    tech: ["REACT", "RECHARTS", "WEBSOCKET", "REST API", "DATA VISUALIZATION"],
    initialLetter: "S"
  }
];

export const stackMatrix: StackCategory[] = [
  {
    title: "BLOCKCHAIN CORE",
    items: [
      "Solidity",
      "Hyperledger Fabric",
      "Ethereum",
      "Polygon",
      "IPFS",
      "Hardhat",
      "Chainlink",
      "The Graph",
      "ERC-20 / 721 / 1155"
    ]
  },
  {
    title: "INTERFACE & DESIGN",
    items: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Figma",
      "Recharts",
      "WebSocket UI",
      "Responsive Design"
    ]
  },
  {
    title: "BACKEND & SYSTEMS",
    items: [
      "Node.js",
      "Go",
      "PostgreSQL",
      "CouchDB",
      "Docker",
      "Linux VPS",
      "REST API",
      "MQTT",
      "gRPC"
    ]
  },
  {
    title: "RESEARCH & METHODOLOGY",
    items: [
      "Blockchain Architecture",
      "Smart Contract Auditing",
      "ReFi Protocol Design",
      "Destructive Testing",
      "Academic Research Writing",
      "Threat Modelling"
    ]
  }
];

export const stats: Stat[] = [
  {
    num: "3",
    label: "Blockchain projects shipped",
    desc: "BlockNotary, VeriChain, AuditChain"
  },
  {
    num: "2",
    label: "IoT systems built",
    desc: "Smart Farming, Smart Monitoring"
  },
  {
    num: "5+",
    label: "Smart contract standards",
    desc: "ERC-20, ERC-721, ERC-1155, ERC-2612, custom"
  },
  {
    num: "∞",
    label: "Tamper-proof audit logs",
    desc: "Setiap keputusan desain dinilai secara matematis"
  }
];

export const principles: Principle[] = [
  {
    title: "Security over convenience",
    desc: "Setiap keputusan desain dimulai dari asumsi adversarial."
  },
  {
    title: "On-chain bukan selalu jawabannya",
    desc: "Saya memilih layer kepercayaan yang tepat untuk setiap komponen."
  },
  {
    title: "UI adalah bagian dari protokol",
    desc: "Antarmuka yang membingungkan adalah celah keamanan."
  }
];
