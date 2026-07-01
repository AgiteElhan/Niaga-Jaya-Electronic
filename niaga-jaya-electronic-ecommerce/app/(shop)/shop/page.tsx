"use client";

import React, { useState, useEffect } from "react";
import Container from "@/components/ui/Container";
import { SlidersHorizontal, LayoutGrid, Check, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: number | string;
  nama_produk: string;
  harga_jual: string | number;
  gambar?: string;
  gambar_url?: string;
  stok?: number;
  deskripsi?: string;
  kategori?: { id: number; nama_kategori: string };
  merk?: { id: number; nama_merk: string };
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // State untuk kontrol buka/tutup laci filter di mobile
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  // State filter aktif
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<any>(null);

  const priceRanges = [
    { label: "Semua Harga", min: 0, max: 100000000 },
    { label: "Di bawah 2 Juta", min: 0, max: 2000000 },
    { label: "2 - 5 Juta", min: 2000000, max: 5000000 },
    { label: "Di atas 5 Juta", min: 5000000, max: 100000000 },
  ];

useEffect(() => {
  const fetchAllData = async () => {
    try {
    const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL!;

      // Fetch Produk
      const resProducts = await fetch(`${BACKEND_URL}/products`);
      const productsData = await resProducts.json();
      setProducts(Array.isArray(productsData) ? productsData : (productsData.data || []));

      // Fetch Kategori & Merk (API Baru)
      const resFilters = await fetch(`${BACKEND_URL}/filters`);
      const filters = await resFilters.json();
      
      // Update state dari data master
      setCategories(filters.categories.map((c: any) => c.nama_kategori));
      setBrands(filters.brands.map((b: any) => b.nama_merk));

    } catch (error) {
      console.error("Gagal ambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchAllData();
}, []);

 

  const toggleFilter = (item: string, state: string[], setState: React.Dispatch<React.SetStateAction<string[]>>) => {
    setState((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = 
      selectedCategories.length === 0 || 
      (product.kategori?.nama_kategori && selectedCategories.includes(product.kategori.nama_kategori));
      
    const matchesBrand = 
      selectedBrands.length === 0 || 
      (product.merk?.nama_merk && selectedBrands.includes(product.merk.nama_merk));
      
    const matchesPrice = 
      !selectedPriceRange || 
      selectedPriceRange.label === "Semua Harga" ||
      (Number(product.harga_jual) >= selectedPriceRange.min && Number(product.harga_jual) <= selectedPriceRange.max);
    
    return matchesCategory && matchesBrand && matchesPrice;
  });

  // Filter Sidebar Konten (Reusable Component)
  const FilterContent = () => (
    <div className="space-y-10">
      {/* FILTER KATEGORI */}
      <div className="flex flex-col gap-4">
        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Kategori</h4>
        <div className="flex flex-col gap-3">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <label key={cat} className="flex items-center gap-3 group cursor-pointer">
                <div className="relative flex items-center justify-center flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                    className="peer w-5 h-5 appearance-none rounded-lg border-2 border-slate-200 checked:border-blue-600 checked:bg-blue-600 transition-all cursor-pointer"
                  />
                  <Check size={12} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={4} />
                </div>
                <span className="text-sm font-bold text-slate-600 group-hover:text-blue-600 transition-colors uppercase">
                  {cat}
                </span>
              </label>
            ))
          ) : (
            <p className="text-[10px] text-slate-400 italic px-1">Belum ada kategori tersedia.</p>
          )}
        </div>
      </div>

      {/* FILTER MERK */}
      <div className="flex flex-col gap-4">
        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Merk</h4>
        <div className="flex flex-col gap-3">
          {brands.length > 0 ? (
            brands.map((brand) => (
              <label key={brand} className="flex items-center gap-3 group cursor-pointer">
                <div className="relative flex items-center justify-center flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleFilter(brand, selectedBrands, setSelectedBrands)}
                    className="peer w-5 h-5 appearance-none rounded-lg border-2 border-slate-200 checked:border-blue-600 checked:bg-blue-600 transition-all cursor-pointer"
                  />
                  <Check size={12} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={4} />
                </div>
                <span className="text-sm font-bold text-slate-600 group-hover:text-blue-600 transition-colors">
                  {brand}
                </span>
              </label>
            ))
          ) : (
            <p className="text-[10px] text-slate-400 italic px-1">Belum ada merk tersedia.</p>
          )}
        </div>
      </div>

      {/* FILTER RENTANG HARGA */}
      <div className="flex flex-col gap-4">
        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Rentang Harga</h4>
        <div className="flex flex-col gap-3">
          {priceRanges.map((range, index) => (
            <label key={index} className="flex items-center gap-3 group cursor-pointer">
              <input
                type="radio"
                name="price"
                checked={selectedPriceRange?.label === range.label}
                onChange={() => setSelectedPriceRange(range)}
                className="w-5 h-5 border-2 border-slate-200 text-blue-600 focus:ring-blue-600 transition-all cursor-pointer flex-shrink-0"
              />
              <span className="text-sm font-bold text-slate-600 group-hover:text-blue-600 transition-colors">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="py-24 text-center text-slate-500">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-blue-600 rounded-full mb-2" role="status"></div>
        <p className="text-xs font-bold">Memuat katalog Niaga Jaya Electronic...</p>
      </div>
    );
  }

  return (
    <Container>
      <div className="py-6 md:py-12">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-12 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase tracking-[0.3em]">
              <LayoutGrid size={12} strokeWidth={3} /> Niaga Jaya Catalog
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
              Katalog <span className="text-blue-600">Elektronik</span>
            </h1>
          </div>
          
          {/* TOMBOL AKSI MOBILE */}
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-100"
            >
              <SlidersHorizontal size={14} /> Filter & Spesifikasi
            </button>
            
            <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-100 shadow-sm text-slate-500 text-[10px] font-black uppercase tracking-widest">
              {filteredProducts.length} Produk
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* A. SIDEBAR FILTER DESKTOP */}
          <div className="hidden lg:block w-60 shrink-0">
            <div className="sticky top-32">
              <FilterContent />
            </div>
          </div>

          {/* B. DRAWER FILTER MOBILE */}
          {isFilterOpen && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9999] lg:hidden animate-in fade-in duration-200">
              <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white p-6 shadow-2xl flex flex-col justify-between h-full animate-in slide-in-from-left duration-300">
                <div className="overflow-y-auto pr-2 flex-1">
                  <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                    <h3 className="font-black text-slate-800 text-lg">Filter Pencarian</h3>
                    <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                      <X size={18} className="text-slate-500" />
                    </button>
                  </div>
                  <FilterContent />
                </div>
                
                <div className="pt-4 border-t border-slate-100 mt-4">
                  <button 
                    onClick={() => setIsFilterOpen(false)} 
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors shadow-lg shadow-blue-100"
                  >
                    Terapkan Filter ({filteredProducts.length} Item)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* C. GRID KATALOG PRODUK */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-8 md:gap-y-12">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16 md:py-24 bg-slate-50 rounded-[32px] md:rounded-[40px] border-2 border-dashed border-slate-200 px-4">
                <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">
                  Produk Tidak Ditemukan
                </p>
                <button 
                  onClick={() => {
                    setSelectedCategories([]); 
                    setSelectedBrands([]); 
                    setSelectedPriceRange(null);
                    setIsFilterOpen(false);
                  }}
                  className="mt-4 text-blue-600 font-bold text-xs underline underline-offset-4"
                >
                  Reset Semua Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}