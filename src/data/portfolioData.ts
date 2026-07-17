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
  link?: string;
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
    nextSlug: "moontes-steak-house",
    nextTitle: "MOONTES STEAK HOUSE"
  }
];

export const uiProjects: Project[] = [
  {
    num: "04",
    status: "COMPLETED",
    categories: "UI/UX DESIGN · BRANDING · WEB DESIGN",
    title: "MOONTES STEAK HOUSE",
    subtitle: "Elegant Culinary Web Experience",
    desc: "Desain website steak house yang berfokus pada kesederhanaan elegan, mencerminkan kemewahan dan kualitas premium lewat perpaduan warna emas gelap dan charcoal.",
    highlight: "Mewujudkan identitas brand premium restoran ke dalam visual digital.",
    tech: ["FIGMA", "FRAMER", "TYPOGRAPHY", "BRANDING"],
    role: "UI/UX Designer",
    link: "/portfolio/moontes-steak-house",
    slug: "moontes-steak-house",
    year: "2024",
    specs: [
      { label: "Typography", value: "Hermona, Memphis LT Pro" },
      { label: "Primary Color", value: "#C68F5C (Dark Gold)" },
      { label: "Background Color", value: "#332C2B (Charcoal)" },
      { label: "Design Tool", value: "Figma + Framer" }
    ],
    overview: [
      "Desain website untuk Moontes Steak House ini dirancang untuk mencerminkan nuansa mewah dan kualitas hidangan premium steak.",
      "Pemilihan palet warna hitam, emas gelap, dan merah tua mendominasi desain untuk memperkuat atmosfer eksklusif restoran.",
      "Setiap layout diatur dengan keseimbangan visual yang presisi, memastikan foto-foto interior dan menu makanan menjadi sajian utama yang memikat selera."
    ],
    impact: "Meningkatkan estetika merek digital dan memberikan alur visual menu yang nyaman bagi pelanggan.",
    challenges: [
      "Menyeimbangkan teks informatif dengan visual mewah agar tidak terkesan penuh.",
      "Memilih kombinasi tipografi eksklusif yang mudah dibaca di layar seluler."
    ],
    architecture: "Design in Figma → Prototype transitions → Compile assets → Framer layout implementation.",
    nextSlug: "gogo-fried-chicken",
    nextTitle: "GOGO FRIED CHICKEN"
  },
  {
    num: "05",
    status: "COMPLETED",
    categories: "UI/UX DESIGN · MOBILE APP · FUN LAYOUT",
    title: "GOGO FRIED CHICKEN",
    subtitle: "Fast Food Delivery Interface",
    desc: "Desain antarmuka aplikasi pemesanan kuliner cepat saji dengan layout yang fun, dinamis, dan visual makanan yang menggugah selera.",
    highlight: "Optimasi tata letak pesanan untuk menaikkan rasio konversi keranjang belanja.",
    tech: ["FIGMA", "FRAMER", "UI DESIGN", "PROTOTYPING"],
    role: "UI/UX Designer",
    link: "/portfolio/gogo-fried-chicken",
    slug: "gogo-fried-chicken",
    year: "2024",
    specs: [
      { label: "Main Typography", value: "Franklin-Gothic, Poppins" },
      { label: "Accent Typography", value: "Poller One" },
      { label: "Primary Color", value: "#3366FF (Vibrant Blue)" },
      { label: "Design Tool", value: "Figma + Framer" }
    ],
    overview: [
      "GOGO Fried Chicken adalah konsep desain aplikasi delivery kuliner cepat saji yang dinamis dan berenergi tinggi.",
      "Desain ini menggunakan kombinasi warna kontras biru cerah dan hitam-putih untuk menciptakan kontras modern, menyimpang dari skema merah-kuning konvensional restoran cepat saji.",
      "Fokus utama diletakkan pada kecepatan akses menu, visual card hidangan yang besar, dan mikro-interaksi tombol tambah pesanan yang responsif."
    ],
    impact: "Menciptakan brand digital yang unik di industri food delivery dengan visual modern.",
    challenges: [
      "Meninggalkan skema warna tradisional makanan (merah/kuning) namun tetap mempertahankan selera makan.",
      "Mendesain alur pembayaran (checkout) satu halaman yang ringkas."
    ],
    architecture: "User research → Information architecture → Wireframe screens → UI details & High-fi prototyping.",
    nextSlug: "service-computer",
    nextTitle: "SERVICE COMPUTER"
  },
  {
    num: "06",
    status: "COMPLETED",
    categories: "UI/UX DESIGN · PORTAL JASA · WEB DESIGN",
    title: "SERVICE COMPUTER",
    subtitle: "IT Repair Service Hub",
    desc: "Konsep UI portal jasa perbaikan perangkat komputer dengan penekanan pada alur pemesanan yang ringkas dan tingkat kepercayaan yang tinggi.",
    highlight: "Membangun alur booking perbaikan yang transparan dan informatif.",
    tech: ["FIGMA", "FRAMER", "UX RESEARCH", "INTERFACE"],
    role: "UI/UX Designer",
    link: "/portfolio/service-computer",
    slug: "service-computer",
    year: "2023",
    specs: [
      { label: "Typography", value: "Open Sans, Play, Poppins" },
      { label: "Primary Colors", value: "#009E99 (Teal), #00709E" },
      { label: "Visual Vibe", value: "Professional & Trustworthy" },
      { label: "Design Tool", value: "Figma + Framer" }
    ],
    overview: [
      "Desain portal Service Computer ini dibuat untuk memudahkan pengguna yang sedang mencari jasa perbaikan gadget atau komputer secara instan.",
      "Antarmuka didesain bersih dengan dominasi warna hijau teal dan biru muda untuk memancarkan aura profesionalitas dan keandalan.",
      "Terdapat kalkulator perkiraan biaya servis yang interaktif, di mana pengguna bisa memilih tipe kerusakan sebelum memesan kurir penjemputan barang."
    ],
    impact: "Memudahkan konsumen memahami estimasi harga jasa servis secara mandiri.",
    challenges: [
      "Menyusun skema estimasi harga yang mudah dipahami bagi pengguna awam.",
      "Mendesain dashboard pemantauan status perbaikan secara real-time."
    ],
    architecture: "Competitor research → UX flow mapping → Interactive estimator design → UI elements and layout construction.",
    nextSlug: "smart-farming",
    nextTitle: "SMART FARMING"
  }
];

export const generalProjects: Project[] = [
  {
    num: "07",
    status: "IN PROGRESS",
    categories: "IOT · SYSTEMS · AUTOMATION",
    title: "SMART FARMING",
    subtitle: "Autonomous Precision Agriculture",
    desc: "Sistem pertanian presisi otonom yang meminimalisir intervensi manusia dengan otomatisasi irigasi, dosis nutrisi, dan kontrol lingkungan.",
    highlight: "Meningkatkan efisiensi air dan nutrisi tanaman secara mandiri.",
    tech: ["REACT", "NODE.JS", "MQTT", "POSTGRESQL", "IOT", "SENSOR INTEGRATION"],
    role: "Frontend & Backend Developer",
    link: "/portfolio/smart-farming",
    slug: "smart-farming",
    year: "2024",
    specs: [
      { label: "Communication Protocol", value: "MQTT" },
      { label: "Database", value: "PostgreSQL" },
      { label: "Development Status", value: "60% Production Ready" },
      { label: "Hardware Integration", value: "ESP32, Sensor PH, NPK" }
    ],
    overview: [
      "Smart Farming adalah proyek pertanian presisi otonom yang bertujuan untuk meningkatkan efisiensi panen dengan memantau kelembapan tanah, suhu udara, dan pH air secara real-time.",
      "Sistem ini menggunakan mikrokontroler ESP32 untuk mengirim data sensor ke server Node.js melalui protokol MQTT yang sangat ringan.",
      "Sebuah algoritma khusus dijalankan untuk secara otomatis mengontrol pompa air dan dispenser nutrisi tanpa campur tangan manusia."
    ],
    impact: "Membantu petani mengotomatisasi pemeliharaan tanaman secara presisi.",
    challenges: [
      "Integrasi sensor fisik dengan koneksi jaringan yang kadang tidak stabil di lahan pertanian.",
      "Desain algoritma penjadwalan nutrisi berdasarkan kelembapan tanah dan suhu lingkungan."
    ],
    architecture: "ESP32 sensors → MQTT Broker (Mosquitto) → Node.js backend parser → PostgreSQL storage → React frontend dashboard for live monitoring.",
    nextSlug: "smart-monitoring",
    nextTitle: "SMART MONITORING"
  },
  {
    num: "08",
    status: "COMPLETED",
    categories: "IOT · DASHBOARD · UTILITIES",
    title: "SMART MONITORING",
    subtitle: "Real-time Power Analytics",
    desc: "Sistem monitoring konsumsi daya listrik gedung bertingkat secara real-time dengan grafik analitik, deteksi anomali, dan visualisasi data.",
    highlight: "Memantau efisiensi penggunaan energi listrik gedung multi-lantai.",
    tech: ["REACT", "RECHARTS", "WEBSOCKET", "REST API", "DATA VISUALIZATION"],
    role: "Frontend Developer",
    link: "/portfolio/smart-monitoring",
    slug: "smart-monitoring",
    year: "2023",
    specs: [
      { label: "Data Pipeline", value: "WebSockets" },
      { label: "Chart Library", value: "Recharts" },
      { label: "Protocol", value: "REST API / WS" },
      { label: "Feature", value: "Anomaly Detection" }
    ],
    overview: [
      "Smart Monitoring merupakan sistem pemantauan daya listrik gedung bertingkat yang menyajikan konsumsi watt, voltase, dan arus secara langsung.",
      "Data disalurkan menggunakan WebSocket untuk memastikan visualisasi grafik batang dan garis (Recharts) berjalan mulus tanpa lag.",
      "Sistem ini juga dilengkapi modul notifikasi jika terjadi tegangan berlebih atau anomali konsumsi listrik di salah satu lantai."
    ],
    impact: "Memudahkan pengelola gedung melacak penggunaan energi dan memangkas pemborosan daya.",
    challenges: [
      "Menangani volume data WebSocket yang padat dan cepat dari sensor daya.",
      "Merancang antarmuka dashboard yang bersih dan informatif untuk memantau puluhan panel listrik sekaligus."
    ],
    architecture: "Power sensors → Gateway receiver → REST/Websocket server → React app with live Recharts updates and alert trigger.",
    nextSlug: "arbitrage-bot",
    nextTitle: "ARBITRAGE BOT"
  },
  {
    num: "09",
    status: "COMPLETED",
    categories: "ALGORITHMS · SYSTEMS · BLOCKCHAIN",
    title: "ARBITRAGE BOT",
    subtitle: "Cross-DEX Arbitrage Engine",
    desc: "Bot arbitrage lintas decentralized exchange di EVM chains dengan integrasi Flashloan Aave, optimasi gas limit, dan monitoring metrics via Grafana.",
    highlight: "Mengeksekusi arbitrage keuntungan selisih harga token lintas DEX secara instan.",
    tech: ["GO", "NODE.JS", "SOLIDITY", "ETHERS.JS", "REDIS", "DOCKER", "GRAFANA"],
    role: "Backend Developer & Protocol Analyst",
    link: "/portfolio/arbitrage-bot",
    slug: "arbitrage-bot",
    year: "2024",
    specs: [
      { label: "Execution Engine", value: "Go (Golang)" },
      { label: "Smart Contracts", value: "Solidity / Vyper" },
      { label: "Fast Storage", value: "Redis Cache" },
      { label: "Metrics Server", value: "Prometheus + Grafana" }
    ],
    overview: [
      "Arbitrage Bot adalah mesin pengeksekusi arbitrage instan yang mendeteksi inefisiensi harga token di Uniswap, Sushiswap, dan DEX lainnya.",
      "Ditulis dengan Go untuk performa konkurensi tinggi dalam pelacakan blok baru, serta Solidity untuk smart contract yang meminjam dana (Aave Flashloans).",
      "Seluruh metrik performa, gas cost, dan laba bersih diintegrasikan ke panel visual Grafana untuk pemantauan 24/7."
    ],
    impact: "Mengamankan peluang arbitrase gas-optimized sebelum mempool didominasi bot saingan.",
    challenges: [
      "Optimasi performa eksekusi dalam hitungan milidetik agar tidak kedahuluan frontrunner.",
      "Meminimalkan risiko kerugian akibat transaksi gagal (revert) melalui simulasi gas."
    ],
    architecture: "Block scanner (Go) → Price feed analyzer → Profit computation → Solidity execution contract (via flashloan) → Prometheus metric logger.",
    nextSlug: "blocknotary",
    nextTitle: "BLOCKNOTARY"
  }
];

export const beyondBlockchainProjects: Project[] = [
  generalProjects[0],
  generalProjects[1]
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
