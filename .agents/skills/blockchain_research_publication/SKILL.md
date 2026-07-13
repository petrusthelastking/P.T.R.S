mi---
name: blockchain-research-publication
description: Publish new blockchain research reports from PDF/text sources as premium, interactive web pages with SVG performance charts and code tabs.
---

# Blockchain Research Publication Guide (Vibe Coding)

Panduan ini mendokumentasikan pola desain, arsitektur, dan cara mempublikasikan dokumen hasil riset blockchain (misal dari PDF) menjadi halaman web interaktif premium di dalam portal Library.

---

## 1. Persiapan Data Riset

Setiap artikel riset baru wajib didaftarkan di dalam berkas [libraryData.ts](file:///c:/Peyimpanan%20Pribadi/PROJEK%20BESAR/PROJEK%20PORTOFOLIO/src/data/libraryData.ts) pada objek `libraryArticles` dengan skema berikut:

```typescript
export interface LibraryArticle {
  index: string;
  status: 'PUBLISHED' | 'IN PROGRESS' | 'NOTE';
  category: string;
  year: string;
  title: string;
  desc: string;
  tags: string[];
  link: string; // Tautan ke rute halaman interaktif, misal: /library/riset-blockchain/nama-riset
}
```

---

## 2. Struktur Tata Letak Halaman (Layout)

Buat rute halaman baru di `src/app/library/riset-blockchain/[slug]/page.tsx` dengan tata letak dua kolom menggunakan Tailwind CSS:

1. **Header & Footer:**
   - Gunakan komponen `<Header />` dari `@/components/layout/Header` di bagian atas.
   - Gunakan komponen `<AboutFooter />` dari `@/components/sections/AboutFooter` di bagian bawah.

2. **Dua Kolom (Grid):**
   - Kolom Utama (75% / `lg:col-span-9`): Menampilkan teks jurnal, kutipan abstrak, tabel data, grafik SVG, dan tab kode.
   - Kolom Samping (25% / `lg:col-span-3 lg:sticky lg:top-28`): Menyediakan metadata riset, indeks daftar isi melayang (TOC), dan tombol unduh file PDF asli.

---

## 3. Implementasi Grafik Performa SVG Interaktif

Untuk memvisualisasikan hasil uji performa (seperti TPS vs Latensi), gunakan grafik berbasis SVG React kustom agar responsif dan modern:

- Simpan data koordinat di array state React.
- Petakan data tersebut ke koordinat SVG:
  ```typescript
  const getCoordinates = (tps: number, latency: number) => {
    const x = padding + ((tps - minTps) / rangeTps) * (chartWidth - padding * 2);
    const y = chartHeight - padding - (latency / maxLatency) * (chartHeight - padding * 2);
    return { x, y };
  };
  ```
- Gambar kurva dengan elemen `<path d={linePath} fill="none" stroke="..." strokeWidth="..." />`.
- Tambahkan lingkaran `<circle>` pada setiap data point dengan event handler `onMouseEnter` dan `onMouseLeave` untuk menampilkan tooltip detail.

---

## 4. Implementasi Tab Lampiran Kode

Gunakan state React sederhana untuk mengontrol tab lampiran kode di bagian bawah artikel:

```typescript
const [activeTab, setActiveTab] = useState<"contract" | "script">("contract");
```

Struktur komponen tab:
- **Navigasi Tab:** Tombol baris horizontal dengan border bawah dinamis (`border-accent-red` jika aktif).
- **Konten Kode:** Elemen `<pre className="font-mono text-[11px] overflow-x-auto">` di dalam kontainer bertema gelap (`bg-[#0c0c0c] text-white`).

---

## 5. Daftar Isi Melayang (Sticky Table of Contents)

Terapkan navigasi cepat daftar isi pada kolom samping menggunakan fungsi scroll halus:

```typescript
const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const offset = 100; // Offset tinggi header agar tidak tertutup
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
```
Setiap judul artikel di kolom utama wajib diberi `id` yang cocok dengan id navigasi di sidebar serta kelas `scroll-mt-28` untuk margin scroll otomatis.
