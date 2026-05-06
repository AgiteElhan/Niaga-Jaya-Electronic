// @/components/constants/product.ts

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  images: string[];
  rating: number;
  reviews: number;
  stock: number;
  description: string;
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
    reviews: 124,
    stock: 15,
    description: "Mesin cuci LG TurboWash memberikan performa pencucian maksimal hanya dalam waktu 59 menit. Dilengkapi dengan teknologi AI DD untuk menjaga keutuhan kain dan fitur Steam untuk membasmi alergen hingga 99.9%."
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
    reviews: 89,
    stock: 8,
    description: "Kulkas Samsung Side by Side hadir dengan teknologi SpaceMax yang memungkinkan dinding kulkas lebih tipis sehingga kapasitas penyimpanan jauh lebih besar. Hemat energi dengan Digital Inverter."
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
    reviews: 56,
    stock: 10,
    description: "Nikmati pengalaman menonton bioskop di rumah dengan Sony Bravia 4K. Prosesor X1 menghasilkan gambar yang tajam dan kaya warna, didukung dengan Google TV untuk akses aplikasi streaming favorit Anda."
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
    reviews: 210,
    stock: 25,
    description: "AC Sharp Sayonara Panas J-Tech Inverter mendinginkan ruangan dengan cepat namun tetap hemat listrik. Fitur Plasmacluster menjaga udara tetap bersih dari bakteri dan jamur."
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
    reviews: 42,
    stock: 12,
    description: "Microwave Panasonic mempermudah proses memasak dan menghangatkan makanan dengan kontrol digital yang presisi. Desain compact namun berkapasitas besar."
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
    reviews: 75,
    stock: 7,
    description: "Dispenser Modena dengan sistem galon bawah memudahkan penggantian air tanpa perlu mengangkat galon. Dilengkapi dengan 3 pilihan suhu: panas, dingin, dan normal."
  }
];