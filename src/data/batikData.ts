export interface GalleryItem {
  id: string;
  title: string;
  category: 'Tulis' | 'Cap' | 'Kombinasi';
  description: string;
  imageUrl: string;
  philosophy?: string;
}

export interface EducationArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'Produksi' | 'Edukasi' | 'Kunjungan';
}

export interface Destination {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  activity: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'Batik Tulis Motif Parang Banyumasan',
    category: 'Tulis',
    description: 'Motif Parang melambangkan keberanian dan kekuatan. Dibuat dengan ketelitian tinggi oleh pengrajin lokal.',
    imageUrl: 'https://picsum.photos/seed/batik1/800/1000',
    philosophy: 'Melambangkan jalinan yang tidak pernah putus, menggambarkan semangat yang terus membara dan perjuangan yang tiada henti.'
  },
  {
    id: '2',
    title: 'Batik Cap Motif Sekar Jagad',
    category: 'Cap',
    description: 'Sekar Jagad melambangkan keindahan keragaman dunia. Menggunakan teknik cap tembaga tradisional.',
    imageUrl: 'https://picsum.photos/seed/batik2/800/1000',
    philosophy: 'Keberagaman yang menyatu dalam harmoni keindahan alam semesta.'
  },
  {
    id: '3',
    title: 'Batik Kombinasi Paruh Burung',
    category: 'Kombinasi',
    description: 'Perpaduan teknik cap dan tulis dengan motif kontemporer yang elegan.',
    imageUrl: 'https://picsum.photos/seed/batik3/800/1000',
    philosophy: 'Simbol kebebasan dan kearifan lokal yang dituangkan dalam kain.'
  }
];

export const educationArticles: EducationArticle[] = [
  {
    id: '1',
    title: 'Mengenal Teknik Canting Tulis',
    excerpt: 'Teknik tertua dalam pembuatan batik yang membutuhkan ketelitian tinggi.',
    content: 'Membatik dengan canting tulis adalah proses menorehkan malam (lilin) panas ke atas kain menggunakan alat bernama canting. Proses ini membutuhkan waktu yang lama, mulai dari hitungan minggu hingga bulan, tergantung kerumitan motifnya.',
    imageUrl: 'https://picsum.photos/seed/process1/800/600'
  }
];

export const activities: Activity[] = [
  {
    id: '1',
    title: 'Proses Produksi Batik',
    description: 'Melihat langsung bagaimana setiap helai kain diolah dengan seni desain, pencantingan, hingga pewarnaan alami.',
    imageUrl: 'https://picsum.photos/seed/activity1/800/600',
    category: 'Produksi'
  },
  {
    id: '2',
    title: 'Workshop Edukasi Membatik',
    description: 'Pengalaman mencanting sendiri bagi pelajar dan wisatawan untuk mendalami warisan budaya secara interaktif.',
    imageUrl: 'https://picsum.photos/seed/activity2/800/600',
    category: 'Edukasi'
  },
  {
    id: '3',
    title: 'Kunjungan & Studi Budaya',
    description: 'Menerima tamu rombongan untuk diskusi dan observasi pelestarian batik di Desa Wisata Petahunan.',
    imageUrl: 'https://picsum.photos/seed/activity3/800/600',
    category: 'Kunjungan'
  }
];

export const destinations: Destination[] = [
  {
    id: '1',
    title: 'Curug Nangga',
    description: 'Air terjun bertingkat tujuh yang memukau, permata tersembunyi di Desa Petahunan.',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2042&auto=format&fit=crop',
    activity: 'Wisata Alam & Trekking'
  },
  {
    id: '2',
    title: 'Area Paralayang Petahunan',
    description: 'Menikmati lanskap hijau Banyumas dari ketinggian yang memacu adrenalin.',
    imageUrl: 'https://images.unsplash.com/photo-1544621920-5627f12e8460?q=80&w=2070&auto=format&fit=crop',
    activity: 'Olahraga Dirgantara & Fotografi'
  }
];
