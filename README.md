# P.T.R.S | Blockchain Developer & Researcher Portfolio

Website portofolio profesional untuk **P.T.R.S** — Blockchain Developer & Researcher. Menyajikan keahlian dalam perancangan smart contracts, arsitektur protokol terdistribusi, tokenisasi aset, riset sistem terdistribusi, serta integrasi dashboard dApp dan sistem IoT (Smart Farming & Smart Monitoring).

## 🚀 Fitur Utama

- **Brutalist Editorial Design:** Estetika premium bertema pasir (*sand-toned*) dengan tipografi tajam menggunakan font *Big Shoulders* & *Plus Jakarta Sans*.
- **Client-Side Interactivity:** *Specialty selector* interaktif di Hero section untuk menampilkan fokus keahlian.
- **Dynamic Projects Section:** Case studies blockchain dan IoT yang ter-render secara dinamis dari database statis terpusat.
- **RSC Architecture:** Arsitektur komponen Next.js modern, memaksimalkan penggunaan React Server Components (RSC) untuk loading kilat dan optimalisasi performa.
- **Dynamic footer:** Tahun copyright otomatis mengikuti tahun berjalan.

## 🛠️ Tech Stack

- **Core:** React 19, Next.js 16 (App Router), TypeScript 5
- **Styling:** Tailwind CSS v4, tw-animate-css
- **Icons:** Lucide React
- **Primitive UI:** Base UI by MUI

## 📂 Struktur Folder Proyek

```
src/
├── data/
│   └── portfolioData.ts          # Central data store (semua teks & daftar proyek)
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Sticky navbar utama
│   │   └── Footer.tsx            # Kontak, links, & copyright
│   ├── sections/
│   │   ├── Hero.tsx              # Hero (Client Component: interactive specialty)
│   │   ├── About.tsx             # Biografi & Skill Tags
│   │   ├── Methodology.tsx       # Roadmap fase kerja
│   │   ├── Projects.tsx          # Case Studies & Beyond Blockchain IoT
│   │   ├── Expertise.tsx         # Grid Stack Matrix
│   │   └── Evidence.tsx          # Track Record metrik & prinsip
│   └── ui/
│       └── ProjectCard.tsx       # Reusable card component untuk case studies
├── app/
│   ├── favicon.ico
│   ├── globals.css               # PostCSS Tailwind v4 variables & custom utility rules
│   ├── layout.tsx                # Font loader & meta setup
│   └── page.tsx                  # Main router index
└── lib/
    └── utils.ts                  # cn() merging helper (clsx + tailwind-merge)
```

## 💻 Cara Menjalankan Secara Lokal

1. **Clone repository:**
   ```bash
   git clone <repository-url>
   cd projek-portofolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Jalankan development server:**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

4. **Build untuk produksi:**
   ```bash
   npm run build
   npm run start
   ```

## 📝 Lisensi

Proyek ini bersifat private dan dilindungi hak cipta © 2026 P.T.R.S.
