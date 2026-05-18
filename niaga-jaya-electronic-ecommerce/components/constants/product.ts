// @/components/constants/product.ts

/**
 * Interface untuk setiap ulasan dari pengguna
 * Memudahkan integrasi API di masa mendatang
 */
export interface Review {
  id: string;
  userName: string;
  rating: number; // Skala 1-5
  comment: string;
  date: string;
}

/**
 * Interface Utama Produk
 * Data rating akan dihitung secara dinamis di sisi komponen 
 * berdasarkan rata-rata dari array reviews
 */
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  images: string[];
  rating: number;
  stock: number;
  description: string;
  reviews: Review[]; // Mendukung ulasan pengguna
}

export const dummyProducts: Product[] = [
  {
    id: 1,
    name: "Mesin Cuci LG TurboWash 12kg",
    category: "MESIN CUCI",
    price: 4500000,
    images: [
      "/products/mesin-cuci.png",
      "/products/mesin-cuci-detail-1.png",
      "/products/mesin-cuci-detail-2.png"
    ],
    rating: 4.8,
    stock: 15,
    description: "Mesin cuci LG TurboWash memberikan performa pencucian maksimal hanya dalam waktu 59 menit. Dilengkapi dengan teknologi AI DD untuk menjaga keutuhan kain dan fitur Steam untuk membasmi alergen hingga 99.9%.",
    reviews: [
      { id: "rev-101", userName: "Budi Santoso", rating: 5, comment: "Hasil cucian sangat bersih dan suara mesin halus banget!", date: "12 Mei 2026" },
      { id: "rev-102", userName: "Siti Aminah", rating: 4, comment: "Barang ori, pengiriman aman sampai depan pintu.", date: "10 Mei 2026" }
    ]
  },
  {
    id: 2,
    name: "Kulkas Samsung Side by Side 500L",
    category: "KULKAS",
    price: 8200000,
    images: [
      "/products/kulkas.png",
      "/products/kulkas-open.png"
    ],
    rating: 4.9,
    stock: 8,
    description: "Kulkas Samsung Side by Side hadir dengan teknologi SpaceMax yang memungkinkan dinding kulkas lebih tipis sehingga kapasitas penyimpanan jauh lebih besar. Hemat energi dengan Digital Inverter.",
    reviews: [
      { id: "rev-201", userName: "Andi Wijaya", rating: 5, comment: "Kulkasnya mewah, kapasitasnya benar-benar lega untuk stok seminggu.", date: "14 Mei 2026" }
    ]
  },
  {
    id: 3,
    name: "Smart TV Sony Bravia 4K 55 Inch",
    category: "TELEVISI",
    price: 12500000,
    images: [
      "/products/tv.png",
      "/products/tv-side.png"
    ],
    rating: 4.7,
    stock: 10,
    description: "Nikmati pengalaman menonton bioskop di rumah dengan Sony Bravia 4K. Prosesor X1 menghasilkan gambar yang tajam dan kaya warna, didukung dengan Google TV untuk akses aplikasi streaming favorit Anda.",
    reviews: [] // Siap untuk menerima data ulasan dari API
  },
  {
    id: 4,
    name: "AC Sharp 1/2 PK Sayonara Panas",
    category: "AC",
    price: 3450000,
    images: [
      "/products/ac.png",
      "/products/ac-remote.png"
    ],
    rating: 4.6,
    stock: 25,
    description: "AC Sharp Sayonara Panas J-Tech Inverter mendinginkan ruangan dengan cepat namun tetap hemat listrik. Fitur Plasmacluster menjaga udara tetap bersih dari bakteri dan jamur.",
    reviews: [
      { id: "rev-401", userName: "Rina Kartika", rating: 5, comment: "Dinginnya cepat merata, fitur plasmacluster bikin udara kamar segar.", date: "05 Mei 2026" }
    ]
  },
  {
    id: 5,
    name: "Microwave Panasonic Digital",
    category: "ELEKTRONIK",
    price: 1850000,
    images: [
      "/products/microwave.png"
    ],
    rating: 4.5,
    stock: 12,
    description: "Microwave Panasonic mempermudah proses memasak dan menghangatkan makanan dengan kontrol digital yang presisi. Desain compact namun berkapasitas besar.",
    reviews: []
  },
  {
    id: 6,
    name: "Dispenser Modena Bottom Loading",
    category: "ELEKTRONIK",
    price: 2700000,
    images: [
      "/products/dispenser.png"
    ],
    rating: 4.8,
    stock: 7,
    description: "Dispenser Modena dengan sistem galon bawah memudahkan penggantian air tanpa perlu mengangkat galon. Dilengkapi dengan 3 pilihan suhu: panas, dingin, dan normal.",
    reviews: [
      { id: "rev-601", userName: "Hendra Kurniawan", rating: 5, comment: "Desain elegan, sangat membantu nggak perlu angkat galon berat lagi.", date: "01 Mei 2026" }
    ]
  }
];