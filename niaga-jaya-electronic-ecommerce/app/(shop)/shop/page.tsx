import React from "react";
import Container from "@/components/ui/Container";
import ProductGrid from "@/components/ProductGrid";
import ShopSidebar from "@/components/shop/ShopSidebar";
import { SlidersHorizontal, LayoutGrid } from "lucide-react";

// 1. Deklarasi Data Dummy (Wajib di atas agar bisa diakses oleh fungsi di bawahnya)
const dummyProducts = [
  {
    id: 1,
    name: "Mesin Cuci LG TurboWash 12kg",
    category: "MESIN CUCI",
    price: 4500000,
    image_url: "/products/mesin-cuci.png",
  },
  {
    id: 2,
    name: "Kulkas Samsung Side by Side 500L",
    category: "KULKAS",
    price: 8200000,
    image_url: "/products/kulkas.png",
  },
  {
    id: 3,
    name: "Smart TV Sony Bravia 4K 55 Inch",
    category: "TELEVISI",
    price: 12500000,
    image_url: "/products/tv.png",
  },
  {
    id: 4,
    name: "AC Sharp 1/2 PK Sayonara Panas",
    category: "AC",
    price: 3450000,
    image_url: "/products/ac.png",
  }
];

// 2. Gunakan SATU fungsi ShopPage saja
export default function ShopPage() {
  return (
    <Container>
      <div className="py-12">
        {/* Header yang lebih rapi */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-[0.2em]">
              <LayoutGrid size={14} /> Catalog Niaga Jaya
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Katalog <span className="text-blue-600">Elektronik</span>
            </h1>
            <p className="text-slate-500 font-medium">Cari kebutuhan rumah tangga terbaik Anda di sini.</p>
          </div>
          
          <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-widest">
            <SlidersHorizontal size={14} /> Filter
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filter */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="sticky top-28">
              <ShopSidebar />
            </div>
          </div>

          {/* Konten Produk */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="bg-slate-50 p-2 rounded-[20px] mb-8 flex items-center gap-2 overflow-x-auto no-scrollbar border border-slate-100">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mr-2">Urutkan</span>
              <button className="bg-white shadow-sm text-blue-600 px-6 py-2.5 rounded-2xl text-xs font-bold">Terpopuler</button>
              <button className="text-slate-500 hover:bg-white px-6 py-2.5 rounded-2xl text-xs font-bold transition-all">Terbaru</button>
              <button className="text-slate-500 hover:bg-white px-6 py-2.5 rounded-2xl text-xs font-bold transition-all">Harga</button>
            </div>

            {/* Panggil dummyProducts di sini */}
            <ProductGrid products={dummyProducts} />
          </div>
        </div>
      </div>
    </Container>
  );
}