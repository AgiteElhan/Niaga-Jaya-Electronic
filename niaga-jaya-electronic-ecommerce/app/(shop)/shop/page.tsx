"use client";

import React, { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import ProductGrid from "@/components/ProductGrid";
import ShopSidebar from "@/components/shop/ShopSidebar";
import { SlidersHorizontal, LayoutGrid } from "lucide-react";

// ... (import tetap sama)

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]); // Data asli dari API
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]); // Data yang ditampilkan
  const [loading, setLoading] = useState(true);

  // State untuk menyimpan pilihan filter
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ min: number; max: number } | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/api/products");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Set awal, tampilkan semua
      } catch (error) {
        console.error("Gagal mengambil data produk:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // LOGIKA FILTER: Jalankan setiap kali kriteria filter berubah
  // Logika Filtering
  useEffect(() => {
    let result = products;

    // 1. Filter berdasarkan Kategori (kategori_id)
    if (selectedCategories.length > 0) {
      result = result.filter((product: any) => 
        selectedCategories.includes(Number(product.kategori_id))
      );
    }

    // 2. Filter berdasarkan Rentang Harga (harga_jual)
    if (selectedPriceRange) {
      result = result.filter((product: any) => {
        // Konversi harga_jual dari string "2999999.00" menjadi angka
        const hargaProduk = parseFloat(product.harga_jual);
        
        return (
          hargaProduk >= selectedPriceRange.min && 
          hargaProduk <= selectedPriceRange.max
        );
      });
    }

    setFilteredProducts(result);
  }, [selectedCategories, selectedPriceRange, products]);

  // Handler untuk Sidebar
  const handleCategoryChange = (ids: number[]) => {
    setSelectedCategories(ids);
  };

  const handlePriceChange = (range: { min: number; max: number } | null) => {
    setSelectedPriceRange(range);
  };

  return (
    <Container>
      <div className="py-12">

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
        <div className="w-full lg:w-64 shrink-0">
          <div className="sticky top-28">
            <ShopSidebar 
              onCategoryChange={handleCategoryChange} 
              onPriceChange={handlePriceChange} 
            />
          </div>
        </div>

        <div className="flex-1">
            <div className="bg-slate-50 p-2 rounded-[20px] mb-8 flex items-center gap-2 overflow-x-auto no-scrollbar border border-slate-100">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mr-2">Urutkan</span>
              <button className="bg-white shadow-sm text-blue-600 px-6 py-2.5 rounded-2xl text-xs font-bold">Terpopuler</button>
              <button className="text-slate-500 hover:bg-white px-6 py-2.5 rounded-2xl text-xs font-bold transition-all">Terbaru</button>
              <button className="text-slate-500 hover:bg-white px-6 py-2.5 rounded-2xl text-xs font-bold transition-all">Harga</button>
            </div>

          {loading ? (
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="aspect-square bg-slate-100 animate-pulse rounded-2xl" />
                ))}
              </div>
          ) : (
            // PAKAI filteredProducts, BUKAN products
            <ProductGrid products={filteredProducts} />
          )}

          {/* Pesan jika produk tidak ditemukan */}
          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400 font-medium">Tidak ada produk yang sesuai dengan filter.</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </Container>
  );
}