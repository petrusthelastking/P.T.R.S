# 🔍 FULL PROJECT AUDIT & REFRACTOR STATUS — P.T.R.S Portfolio Website

> **Audit Date:** 2026-07-10  
> **Project Name:** projek-portofolio  
> **Purpose:** Personal portfolio website untuk **P.T.R.S** — Blockchain Developer & Researcher  
> **Framework:** Next.js 16.2.10 (App Router) + React 19.2.4  
> **Refactor Status:** 🚀 **Critical Issues & Warnings RESOLVED** (Refactoring Phase 1 & 2 Completed)

---

## 📂 1. STRUKTUR PROJEK (File Tree)

```
PROJEK PORTOFOLIO/
├── .git/                          # Git version control
├── .gitignore                     # Standard Next.js gitignore
├── .next/                         # Build output (auto-generated)
├── AGENTS.md                      # AI agent rules (Next.js breaking changes warning)
├── CLAUDE.md                      # Points to AGENTS.md (@AGENTS.md)
├── README.md                      # [UPDATED] Dokumentasi detail proyek portofolio
├── PROJECT_AUDIT.md               # [NEW] Dokumen audit & referensi arsitektur ini
├── components.json                # shadcn/ui v4 config (style: base-nova)
├── eslint.config.mjs              # ESLint 9 flat config (core-web-vitals + typescript)
├── next-env.d.ts                  # Next.js TypeScript declarations (auto-generated)
├── next.config.ts                 # Next.js config (KOSONG, tidak ada custom config)
├── node_modules/                  # Dependencies
├── package-lock.json              # Lock file
├── package.json                   # Project manifest
├── postcss.config.mjs             # PostCSS with @tailwindcss/postcss
├── public/                        # Static assets (Bersih dari default assets)
│   └── developer_portrait.png     # Foto portrait developer (416KB)
├── src/
│   ├── app/
│   │   ├── favicon.ico            # App favicon
│   │   ├── globals.css            # Global styles + Tailwind v4 + shadcn theme tokens
│   │   ├── layout.tsx             # Root layout (fonts + metadata)
│   │   ├── page.tsx               # ✅ MODULAR PAGE — 23 lines (Refactored)
│   │   └── portfolio/             # [NEW] Portfolio sub-route
│   │       ├── page.tsx           # [NEW] Main Portfolio menu page (ALL WORK list)
│   │       └── [slug]/
│   │           └── page.tsx       # [NEW] Dynamic project case studies detail page
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx         # [UPDATED] Sticky navbar (Client Component with active link state)
│   │   │   └── Footer.tsx         # [NEW] Dynamic copyright footer & contact section
│   │   ├── sections/
│   │   │   ├── Hero.tsx           # [NEW] Interactive Hero Section (Client Component)
│   │   │   ├── About.tsx          # [NEW] Personal & Skill tags section
│   │   │   ├── Methodology.tsx    # [NEW] Roadmap fase pengerjaan proyek
│   │   │   ├── Projects.tsx       # [NEW] Case Studies & Beyond Blockchain
│   │   │   ├── Expertise.tsx      # [NEW] Stack Matrix grid
│   │   │   ├── Evidence.tsx       # [NEW] Track Record, stats, & principles
│   │   │   ├── PortfolioList.tsx  # [NEW] Container projects list for portfolio route
│   │   │   └── PortfolioFooter.tsx# [NEW] Sand bg footer call-to-action for portfolio
│   │   └── ui/
│   │       ├── button.tsx         # shadcn Button (Base UI variant, TIDAK DIGUNAKAN)
│   │       ├── ProjectCard.tsx    # [NEW] Reusable card untuk blockchain projects
│   │       └── PortfolioCard.tsx  # [NEW] Reusable custom card untuk portfolio listing
│   ├── data/
│   │   └── portfolioData.ts       # [UPDATED] Central data store (semua teks & data case study)
│   └── lib/
│       └── utils.ts               # cn() utility (clsx + tailwind-merge)
└── tsconfig.json                  # TypeScript config (target ES2017, bundler resolution)
```

---

## 🛠️ 2. TECH STACK & DEPENDENCIES

### Production Dependencies
| Package | Versi | Fungsi |
|---------|-------|--------|
| `next` | 16.2.10 | Framework utama (App Router, RSC) |
| `react` / `react-dom` | 19.2.4 | UI library |
| `@base-ui/react` | ^1.6.0 | Headless UI primitives (dipakai shadcn) |
| `class-variance-authority` | ^0.7.1 | Variant styling untuk components |
| `clsx` | ^2.1.1 | Conditional className builder |
| `lucide-react` | ^1.24.0 | Icon library |
| `shadcn` | ^4.13.0 | Component CLI (base-nova style) |
| `tailwind-merge` | ^3.6.0 | Merge Tailwind classes tanpa konflik |
| `tw-animate-css` | ^1.4.0 | Tailwind CSS animation utilities |

### Dev Dependencies
| Package | Versi | Fungsi |
|---------|-------|--------|
| `tailwindcss` | ^4 | Styling engine (v4, CSS-first config) |
| `@tailwindcss/postcss` | ^4 | PostCSS plugin untuk Tailwind v4 |
| `typescript` | ^5 | Type safety |
| `eslint` + `eslint-config-next` | ^9 / 16.2.10 | Linting |
| `@types/node`, `@types/react`, `@types/react-dom` | ^20, ^19, ^19 | Type definitions |

---

## 🎨 3. DESIGN SYSTEM & THEMING

### Fonts
| Variabel CSS | Font | Penggunaan |
|-------------|------|------------|
| `--font-plus-jakarta` | **Plus Jakarta Sans** | Body text (`font-sans`) |
| `--font-big-shoulders` | **Big Shoulders** | Headings (`font-bebas`, `font-heading`) |

> ⚠️ **WARNING:** Font `Big Shoulders` menghasilkan warning berulang di console:  
> `Failed to find font override values for font 'Big Shoulders' — Skipping generating a fallback font.`  
> Ini terjadi setiap kali halaman di-compile (~20+ kali terlihat di log). Fungsionalitas tidak terganggu, tapi menambah noise di dev log.

### Color Palette (Light Mode)
| Token | Hex | Kegunaan |
|-------|-----|----------|
| `--color-sand` / `--background` | `#f5f4f0` | Background utama |
| `--foreground` | `#1a1a1a` | Teks utama |
| `--color-accent-red` / `--primary` | `#d92525` | Accent merah (brand color) |
| `--color-dark-bg` | `#0c0c0c` | Section gelap (Methodology, Contact) |
| `--color-dark-card` | `#141414` | Card di section gelap |
| `--color-border-gray` / `--border` | `#e2e2e0` | Border standar |
| `--muted-foreground` | `#666666` | Teks sekunder |

### Dark Mode
- ✅ Defined di CSS (`.dark` class) menggunakan `oklch()` color space
- ❌ **TIDAK ADA toggle dark mode** di UI — variabel dark mode tidak terpakai

---

## 📄 4. HALAMAN & SECTIONS MAP

Halaman terbagi menjadi layout dan section-section modular yang diatur di dalam [page.tsx](file:///c:/Peyimpanan Pribadi/PROJEK BESAR/PROJEK PORTOFOLIO/src/app/page.tsx):

| # | Komponen / Section | ID / Path | Path File | Background | Deskripsi |
|---|--------------------|-----------|-----------|------------|-----------|
| 1 | **Header/Navbar** | — | [Header.tsx](file:///c:/Peyimpanan Pribadi/PROJEK BESAR/PROJEK PORTOFOLIO/src/components/layout/Header.tsx) | `bg-sand/80 backdrop-blur-md` | Sticky header, logo SVG monogram, dynamic active links (Home, Portfolio, About, Library), status badge "Open to work" |
| 2 | **Hero Section** | `#home` | [Hero.tsx](file:///c:/Peyimpanan Pribadi/PROJEK BESAR/PROJEK PORTOFOLIO/src/components/sections/Hero.tsx) | `bg-sand` | Giant title "BLOCKCHAIN DEVELOPER", portrait, 5 floating tech badges, dynamic specialty selector (`"use client"`) |
| 3 | **About Section** | `#about` | [About.tsx](file:///c:/Peyimpanan Pribadi/PROJEK BESAR/PROJEK PORTOFOLIO/src/components/sections/About.tsx) | `bg-[#f0eee9]` | Profil riset, kutipan, tag skill dinamis, biografi (who/what/how), collaboration pill |
| 4 | **Methodology** | — | [Methodology.tsx](file:///c:/Peyimpanan Pribadi/PROJEK BESAR/PROJEK PORTOFOLIO/src/components/sections/Methodology.tsx) | `bg-[#0c0c0c]` (dark) | Roadmap 6 fase kerja dengan ikon Lucide dinamis dan outputs. |
| 5 | **Projects Section** | `#portfolio` | [Projects.tsx](file:///c:/Peyimpanan Pribadi/PROJEK BESAR/PROJEK PORTOFOLIO/src/components/sections/Projects.tsx) | `bg-sand` | Merender 3 blockchain projects menggunakan reusable [ProjectCard.tsx](file:///c:/Peyimpanan Pribadi/PROJEK BESAR/PROJEK PORTOFOLIO/src/components/ui/ProjectCard.tsx) secara dinamis, dan list IoT projects. |
| 6 | **Expertise** | — | [Expertise.tsx](file:///c:/Peyimpanan Pribadi/PROJEK BESAR/PROJEK PORTOFOLIO/src/components/sections/Expertise.tsx) | `bg-sand` | Stack Matrix 4 kolom terintegrasi. |
| 7 | **Evidence Section** | `#library` | [Evidence.tsx](file:///c:/Peyimpanan Pribadi/PROJEK BESAR/PROJEK PORTOFOLIO/src/components/sections/Evidence.tsx) | `bg-[#f0eee9]` | Grid track record stats, fokus riset, prinsip kerja, testimonial placeholder. |
| 8 | **Contact & Footer** | `#contact` | [Footer.tsx](file:///c:/Peyimpanan Pribadi/PROJEK BESAR/PROJEK PORTOFOLIO/src/components/layout/Footer.tsx) | `bg-[#0c0c0c]` (dark) | Start a project call-to-actions, action buttons, dynamic copyright year. |
| 9 | **Portfolio Menu** | `/portfolio` | [PortfolioList.tsx](file:///c:/Peyimpanan Pribadi/PROJEK BESAR/PROJEK PORTOFOLIO/src/components/sections/PortfolioList.tsx) | `bg-sand` (light) & `bg-[#0c0c0c]` (dark) | Dynamic routing page showing ALL WORK, 3 blockchain projects using [PortfolioCard.tsx](file:///c:/Peyimpanan Pribadi/PROJEK BESAR/PROJEK PORTOFOLIO/src/components/ui/PortfolioCard.tsx) and 2 dark IoT project cards. Includes [PortfolioFooter.tsx](file:///c:/Peyimpanan Pribadi/PROJEK BESAR/PROJEK PORTOFOLIO/src/components/sections/PortfolioFooter.tsx) CTA. |
| 10| **Project Case Study**| `/portfolio/[slug]` | [[slug]/page.tsx](file:///c:/Peyimpanan Pribadi/PROJEK BESAR/PROJEK PORTOFOLIO/src/app/portfolio/[slug]/page.tsx) | `bg-sand` (light) & `bg-[#0c0c0c]` (dark) | Pre-rendered project case study showing details, sidebar stats and specs, overview columns, and horizontal flow system architecture layout. |

---

## 🏗️ 5. ARSITEKTUR & CARA KERJA (Refactored)

### Rendering Strategy
- **React Server Components (RSC):** Halaman utama `page.tsx`, dynamic project detail `[slug]/page.tsx`, sub-page `/portfolio/page.tsx` serta komponen `Header`, `About`, `Methodology`, `Projects`, `PortfolioList`, `PortfolioFooter`, `Expertise`, `Evidence`, `Footer` adalah Server Components. Rendah JavaScript on-load, performa loading super cepat!
- **Client Components ("use client"):** Komponen `Hero` dan `Header` diekstrak khusus sebagai Client Component karena memerlukan React `useState` / Next.js `usePathname` untuk interaktifitas pergantian spesialisasi dan deteksi active link.

### Component Architecture
```
RootLayout (layout.tsx)                 ← Server Component
├── Home (page.tsx)                     ← Server Component
│   ├── Header                          ← Client Component ("use client" - active link)
│   ├── Hero Section                    ← Client Component ("use client" - specialty selector)
│   ├── About Section                   ← Server Component
│   ├── Methodology Section             ← Server Component
│   ├── Projects Section                ← Server Component
│   │   └── ProjectCard (x3)            ← Server Component (reusable)
│   ├── Expertise Section               ← Server Component
│   ├── Evidence Section                ← Server Component
│   └── Footer                          ← Server Component
├── Portfolio (portfolio/page.tsx)       ← Server Component
│   ├── Header                          ← Client Component
│   ├── PortfolioList                   ← Server Component
│   │   └── PortfolioCard (x3)          ← Server Component (reusable)
│   └── PortfolioFooter                 ← Server Component
└── Project Detail ([slug]/page.tsx)     ← Server Component
    ├── Header                          ← Client Component
    ├── Project Detail Content          ← Server Component
    └── Pagination Footer               ← Server Component
```

### Data Flow
Semua data di-import dari [portfolioData.ts](file:///c:/Peyimpanan Pribadi/PROJEK%20BESAR/PROJEK%20PORTOFOLIO/src/data/portfolioData.ts) secara terpusat, mempermudah pembaruan teks/konten portofolio tanpa menyentuh file coding React/JSX.

---

## 🚨 6. STATUS TEMUAN & ISSUES

### 🔴 Critical Issues — 100% RESOLVED
| # | Issue | Status | Penjelasan Perbaikan |
|---|-------|--------|----------------------|
| 1 | **Monolithic page.tsx** | ✅ **RESOLVED** | Dipecah menjadi 9 file sub-komponen layout/sections terpisah. |
| 2 | **Semua data hardcoded** | ✅ **RESOLVED** | Dipindahkan ke file data terpusat `src/data/portfolioData.ts`. |
| 3 | **Duplikasi Project Cards** | ✅ **RESOLVED** | Menggunakan komponen [ProjectCard.tsx](file:///c:/Peyimpanan Pribadi/PROJEK BESAR/PROJEK PORTOFOLIO/src/components/ui/ProjectCard.tsx) dan dipetakan dinamis menggunakan `.map()`. |

### 🟡 Warnings — RESOLVED & CLEANED
| # | Issue | Status | Penjelasan Perbaikan |
|---|-------|--------|----------------------|
| 4 | **9 unused icon imports** | ✅ **RESOLVED** | Di-refactor dan semua unused imports lucide-react telah dihapus. |
| 5 | **Button component tidak dipakai** | 🟡 *Pending* | shadcn Button masih di-install tapi belum dipakai. |
| 6 | **Font fallback warning** | ✅ **RESOLVED** | Menambahkan `adjustFontFallback: false` pada loader Big Shoulders di `layout.tsx`. |
| 7 | **Dark mode CSS tidak dipakai** | 🟡 *Pending* | Belum ada dark mode toggle button. |
| 8 | **Default Next.js assets** | ✅ **RESOLVED** | Menghapus file svg default (file, globe, next, vercel, window) dari `/public`. |
| 9 | **README.md belum dikustomisasi** | ✅ **RESOLVED** | Diupdate & kustomisasi lengkap berisi deskripsi proyek dan stack. |
| 10| **next.config.ts kosong** | 🟡 *Pending* | Belum dikustomisasi. |
| 11| **Typo: "ETHERUM"** | ✅ **RESOLVED** | Typo dibetulkan menjadi **"ETHEREUM"** di file data. |
| 12| **Dead links (`href="#"`)** | ✅ **RESOLVED** | Diubah mengarah ke `#contact` (scroll) atau sub-profile yang aman. |
| 13| **Placeholder links** | 🟡 *Pending* | LinkedIn & GitHub masih standard domain. |
| 14| **Testimonial placeholder** | 🟡 *Pending* | Masih text dummy. |
| 15| **Copyright tahun hardcoded 2024**| ✅ **RESOLVED** | Diganti menjadi dinamis (`new Date().getFullYear()`) di Footer. |

### 🔵 Suggestions (Nice-to-Have)
- [ ] **Tambah mobile hamburger menu** (Nav links disembunyikan di mobile tanpa alternatif).
- [ ] **Tambah meta tags & Open Graph** (SEO & Social card preview).
- [ ] **Image optimization** (Mengganti flag `unoptimized` pada portret developer).
- [ ] **Accessibility** (Penambahan label ARIA).
- [ ] **Loading & Scroll Animations** (Integrasi Framer Motion/GSAP).

---

## 📊 7. RINGKASAN METRICS (Refactored)

| Metric | Sebelum | Sesudah | Keterangan |
|--------|---------|---------|------------|
| Total Source Files | 4 | **17** | Bertambah karena modulasi & dynamic routing |
| Total Components | 1 | **13** | Extract components & subcomponents |
| Baris Kode `page.tsx` | 1163 | **23** | Turun drastis (-98%) |
| Data Location | Inline JSX | **portfolioData.ts** | Sentralisasi data & metadata case studies |
| Dynamic Mapping | No | **Yes** | Menggunakan array `.map()` |
| Unused Imports | 9 | **0** | Bersih dari unused lucide icons |
| Copyright Year | Hardcoded (2024) | **Dinamis (Auto)** | Mengikuti tahun berjalan |
| Build Status | — | **Success** | Berhasil build static & dynamic SSG pages |

---

## 🗺️ 8. REKOMENDASI PRIORITAS PENGEMBANGAN SELANJUTNYA

### Phase 3 — Feature Completion (Rekomendasi Utama)
1. **📱 Mobile Menu:** Membuat slider/hamburger untuk navigasi links di perangkat mobile.
2. **🔗 Real Links:** Memperbarui placeholder GitHub, LinkedIn, Email, dan file PDF Resume dengan data asli.
3. **🌓 Dark Mode:** Membuat toggle switch agar variable color `.dark` di CSS dapat digunakan.
4. **🖼️ SEO Optimization:** Memasang setup metadata lengkap beserta layout Open Graph.
