# Oemah Batik Lentera Mandiri - Web & Supabase CMS

Sistem Informasi dan Katalog Digital Terintegrasi Content Management System (CMS) berbasis Supabase untuk **Oemah Batik Lentera Mandiri (Desa Wisata Petahunan)**.

---

## Fitur Utama

1. **Dashboard Statistik**: Pemantauan data secara real-time (karya galeri, program edukasi, destinasi wisata, dan kotak pesan).
2. **Manajemen Konten (CMS)**: CRUD dinamis terhubung penuh ke database Supabase untuk modul Galeri, Edukasi, Kegiatan, Destinasi, dan Kontak.
3. **Penyimpanan Media**: Upload dan hapus file gambar (logo instansi, galeri batik, spanduk, dll.) langsung dari Supabase Storage.
4. **Halaman Publik**: Tampilan portofolio karya batik Banyumasan, panduan komunikasi, rute kunjungan, dan pemesanan produk terintegrasi WhatsApp.

---

## Persiapan Lokal (Local Setup)

### 1. Prasyarat
* [Node.js](https://nodejs.org/) (versi 18 ke atas direkomendasikan)
* Git

### 2. Kloning Repositori
```bash
git clone <url-repositori-anda>
cd oemah-batik-lentera-mandiri
```

### 3. Instalasi Dependensi
```bash
npm install
```

### 4. Konfigurasi Environment Variables
Buat berkas `.env` di direktori utama (sejajar dengan `package.json`) dan isi dengan kredensial Supabase Anda:
```env
VITE_SUPABASE_URL=https://gzxlxfnklldqgwxywbqy.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_6-avlibkXwBlyK7XYRqqng_i7ER4Wi9
```

### 5. Jalankan Server Dev Lokal
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di peramban Anda.

---

## Perintah Pengembangan (Scripts)

* `npm run dev`: Menjalankan server pengembangan lokal.
* `npm run build`: Melakukan kompilasi aset untuk deployment produksi.
* `npm run lint`: Memeriksa kepatuhan tipe TypeScript dan linter.

---

## Panduan Deployment Vercel

Aplikasi ini siap di-deploy secara instan ke Vercel dengan konfigurasi berikut:

### Langkah Deployment:
1. Hubungkan repositori GitHub Anda ke akun Vercel.
2. Tambahkan proyek baru di dashboard Vercel.
3. Sesuaikan parameter konfigurasi berikut:
   * **Framework Preset**: `Vite`
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
4. Tambahkan berkas **Environment Variables** di setelan proyek Vercel:
   * `VITE_SUPABASE_URL` = `https://gzxlxfnklldqgwxywbqy.supabase.co`
   * `VITE_SUPABASE_ANON_KEY` = `sb_publishable_6-avlibkXwBlyK7XYRqqng_i7ER4Wi9`
5. Klik **Deploy**.
