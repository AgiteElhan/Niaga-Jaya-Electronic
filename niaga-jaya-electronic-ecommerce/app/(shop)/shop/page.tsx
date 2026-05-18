"use client";

import React, { useState } from "react";
import Container from "@/components/ui/Container";
import { SlidersHorizontal, LayoutGrid, Check } from "lucide-react";
// Import ProductCard dan data dummy
import ProductCard from "@/components/ProductCard";
import { dummyProducts } from "@/components/constants/product";

export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<any>(null);

  // 1. Ekstrak data unik untuk filter
  const categories = Array.from(new Set(dummyProducts.map((p) => p.category)));
  const brands = Array.from(new Set(dummyProducts.map((p) => p.name.split(" ")[0])));

  const priceRanges = [
    { label: "Semua Harga", min: 0, max: 100000000 },
    { label: "", min: 0, max: 2000000 },
    { label: "2 - 5 Juta", min: 2000000, max: 5000000 },
    { label: "Di atas 5 Juta", min: 5000000, max: 100000000 },
  ];

  // 2. Logika Toggle Filter
  const toggleFilter = (item: string, state: string[], setState: React.Dispatch<React.SetStateAction<string[]>>) => {
    setState((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
  };

  // 3. LOGIKA FILTERING PRODUK (Inti dari halaman Shop)
  const filteredProducts = dummyProducts.filter((product) => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.name.split(" ")[0]);
    const matchesPrice = !selectedPriceRange || (product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max);
    
    return matchesCategory && matchesBrand && matchesPrice;
  });

  return (
    <Container>
      <div className="py-12">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase tracking-[0.3em]">
              <LayoutGrid size={12} strokeWidth={3} /> Niaga Jaya Catalog
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
              Katalog <span className="text-blue-600">Elektronik</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 px-6 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-500 text-[10px] font-black uppercase tracking-widest">
            <SlidersHorizontal size={14} /> {filteredProducts.length} Produk Ditemukan
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* SIDEBAR FILTER */}
          <div className="w-full lg:w-60 shrink-0">
            <div className="sticky top-32 space-y-12">
              
              {/* KATEGORI */}
              <div className="flex flex-col gap-5">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Kategori</h4>
                <div className="flex flex-col gap-3">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 group cursor-pointer">
                      <div className="relative flex items-center justify-center">
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
                  ))}
                </div>
              </div>

              {/* MERK */}
              <div className="flex flex-col gap-5">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Merk</h4>
                <div className="flex flex-col gap-3">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center gap-3 group cursor-pointer">
                      <div className="relative flex items-center justify-center">
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
                  ))}
                </div>
              </div>

              {/* FILTER HARGA */}
              <div className="flex flex-col gap-5">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Rentang Harga</h4>
                <div className="flex flex-col gap-3">
                  {priceRanges.map((range, index) => (
                    <label key={index} className="flex items-center gap-3 group cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        checked={selectedPriceRange?.label === range.label}
                        onChange={() => setSelectedPriceRange(range)}
                        className="w-5 h-5 border-2 border-slate-200 text-blue-600 focus:ring-blue-600 transition-all cursor-pointer"
                      />
                      <span className="text-sm font-bold text-slate-600 group-hover:text-blue-600 transition-colors">
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* DISPLAY PRODUK */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-24 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">
                  Produk Tidak Ditemukan
                </p>
                <button 
                  onClick={() => {setSelectedCategories([]); setSelectedBrands([]); setSelectedPriceRange(null);}}
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