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
    link: "#contact"
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
    link: "#contact"
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
    link: "#contact"
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
